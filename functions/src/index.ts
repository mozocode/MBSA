import { onCall } from 'firebase-functions/v2/https'
import { initializeApp } from 'firebase-admin/app'
import { getAuthorizeClientConfig } from './secrets'
import { processPaymentHandler } from './payments'

initializeApp()

/** Public client-safe config (Authorize.net public keys when configured). */
export const getClientConfig = onCall({ cors: true }, async () => ({
  payments: getAuthorizeClientConfig(),
}))

export const processPayment = onCall({ cors: true }, processPaymentHandler)
