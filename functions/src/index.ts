import { onCall, HttpsError } from 'firebase-functions/v2/https'
import { initializeApp } from 'firebase-admin/app'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { defineSecret } from 'firebase-functions/params'

initializeApp()

const authorizeLoginId = defineSecret('AUTHORIZE_API_LOGIN_ID')
const authorizeTransactionKey = defineSecret('AUTHORIZE_TRANSACTION_KEY')

interface ProcessPaymentRequest {
  opaqueData?: { dataDescriptor: string; dataValue: string }
  amount: number
  productType: string
  productId: string
  productSlug: string
  productName: string
  fieldResponses: Record<string, string>
  payerEmail?: string
  payerName?: string
}

export const processPayment = onCall(
  {
    secrets: [authorizeLoginId, authorizeTransactionKey],
    cors: true,
  },
  async (request) => {
    const data = request.data as ProcessPaymentRequest

    if (!data.productSlug || !data.productName) {
      throw new HttpsError('invalid-argument', 'Missing product information')
    }

    const amount = Number(data.amount)
    if (!Number.isFinite(amount) || amount < 0) {
      throw new HttpsError('invalid-argument', 'Invalid amount')
    }

    if (amount > 0 && !data.opaqueData) {
      throw new HttpsError('invalid-argument', 'Payment token required')
    }

    const sandbox = process.env.AUTHORIZE_SANDBOX !== 'false'
    let transactionId = amount === 0 ? 'FREE' : ''

    if (amount > 0) {
      transactionId = await chargeAuthorizeNet({
        amount,
        opaqueData: data.opaqueData!,
        description: data.productName,
        loginId: authorizeLoginId.value(),
        transactionKey: authorizeTransactionKey.value(),
        sandbox,
      })
    }

    const db = getFirestore()
    const orderRef = await db.collection('orders').add({
      productType: data.productType,
      productId: data.productId,
      productSlug: data.productSlug,
      productName: data.productName,
      amount,
      fieldResponses: data.fieldResponses ?? {},
      payerEmail: data.payerEmail ?? null,
      payerName: data.payerName ?? null,
      transactionId,
      status: 'paid',
      createdAt: FieldValue.serverTimestamp(),
    })

    return { orderId: orderRef.id, transactionId }
  },
)

async function chargeAuthorizeNet(input: {
  amount: number
  opaqueData: { dataDescriptor: string; dataValue: string }
  description: string
  loginId: string
  transactionKey: string
  sandbox: boolean
}): Promise<string> {
  const endpoint = input.sandbox
    ? 'https://apitest.authorize.net/xml/v1/request.api'
    : 'https://api.authorize.net/xml/v1/request.api'

  const body = {
    createTransactionRequest: {
      merchantAuthentication: {
        name: input.loginId,
        transactionKey: input.transactionKey,
      },
      transactionRequest: {
        transactionType: 'authCaptureTransaction',
        amount: input.amount.toFixed(2),
        payment: {
          opaqueData: {
            dataDescriptor: input.opaqueData.dataDescriptor,
            dataValue: input.opaqueData.dataValue,
          },
        },
        order: {
          description: input.description.slice(0, 255),
        },
      },
    },
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const json = (await res.json()) as {
    messages?: { resultCode?: string; message?: Array<{ text?: string }> }
    transactionResponse?: { transId?: string; responseCode?: string; errors?: Array<{ errorText?: string }> }
  }

  const resultCode = json.messages?.resultCode
  const transId = json.transactionResponse?.transId
  const responseCode = json.transactionResponse?.responseCode

  if (resultCode === 'Ok' && responseCode === '1' && transId) {
    return transId
  }

  const errMsg =
    json.transactionResponse?.errors?.[0]?.errorText ??
    json.messages?.message?.[0]?.text ??
    'Payment declined'

  throw new HttpsError('failed-precondition', errMsg)
}
