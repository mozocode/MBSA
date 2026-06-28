import { getFunctions, httpsCallable } from 'firebase/functions'
import { app } from './firebase'
import type { AcceptOpaqueData } from './authorizeNet'
import type { ProductType } from './types'

export interface ProcessPaymentRequest {
  opaqueData?: AcceptOpaqueData
  amount: number
  productType: ProductType
  productId: string
  productSlug: string
  productName: string
  fieldResponses: Record<string, string>
  payerEmail?: string
  payerName?: string
}

export interface ProcessPaymentResponse {
  orderId: string
  transactionId: string
}

export async function processPayment(
  request: ProcessPaymentRequest,
): Promise<ProcessPaymentResponse> {
  const functions = getFunctions(app)
  const callable = httpsCallable<ProcessPaymentRequest, ProcessPaymentResponse>(
    functions,
    'processPayment',
  )
  const result = await callable(request)
  return result.data
}
