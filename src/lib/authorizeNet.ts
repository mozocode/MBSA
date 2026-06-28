const SANDBOX_SCRIPT = 'https://jstest.authorize.net/v1/Accept.js'
const PRODUCTION_SCRIPT = 'https://js.authorize.net/v1/Accept.js'

export interface AcceptOpaqueData {
  dataDescriptor: string
  dataValue: string
}

export interface AcceptJsResponse {
  opaqueData: AcceptOpaqueData
}

interface AcceptDispatchPayload {
  authData: {
    clientKey: string
    apiLoginID: string
  }
  cardData: {
    cardNumber: string
    month: string
    year: string
    cardCode: string
    zip?: string
    fullName?: string
  }
}

declare global {
  interface Window {
    Accept?: {
      dispatchData: (
        payload: AcceptDispatchPayload,
        callback: (response: {
          messages: { resultCode: string; message: Array<{ code: string; text: string }> }
          opaqueData?: AcceptOpaqueData
        }) => void,
      ) => void
    }
  }
}

let scriptPromise: Promise<void> | null = null

export function isAuthorizeNetConfigured(): boolean {
  return Boolean(
    import.meta.env.VITE_AUTHORIZE_API_LOGIN_ID && import.meta.env.VITE_AUTHORIZE_CLIENT_KEY,
  )
}

export function isAuthorizeNetSandbox(): boolean {
  return import.meta.env.VITE_AUTHORIZE_SANDBOX !== 'false'
}

function loadAcceptJs(): Promise<void> {
  if (window.Accept) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = isAuthorizeNetSandbox() ? SANDBOX_SCRIPT : PRODUCTION_SCRIPT
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Authorize.net Accept.js'))
    document.head.appendChild(script)
  })

  return scriptPromise
}

export async function tokenizeCard(input: {
  cardNumber: string
  expMonth: string
  expYear: string
  cvv: string
  zip?: string
  fullName?: string
}): Promise<AcceptOpaqueData> {
  if (!isAuthorizeNetConfigured()) {
    throw new Error('Payment processing is not configured. Contact MBSA.')
  }

  await loadAcceptJs()

  const apiLoginID = import.meta.env.VITE_AUTHORIZE_API_LOGIN_ID as string
  const clientKey = import.meta.env.VITE_AUTHORIZE_CLIENT_KEY as string

  return new Promise((resolve, reject) => {
    window.Accept?.dispatchData(
      {
        authData: { clientKey, apiLoginID },
        cardData: {
          cardNumber: input.cardNumber.replace(/\s/g, ''),
          month: input.expMonth.padStart(2, '0'),
          year: input.expYear.length === 2 ? `20${input.expYear}` : input.expYear,
          cardCode: input.cvv,
          zip: input.zip,
          fullName: input.fullName,
        },
      },
      (response) => {
        if (response.messages.resultCode === 'Error') {
          const msg = response.messages.message.map((m) => m.text).join(' ')
          reject(new Error(msg || 'Card tokenization failed'))
          return
        }
        if (!response.opaqueData) {
          reject(new Error('No payment token returned'))
          return
        }
        resolve(response.opaqueData)
      },
    )
  })
}
