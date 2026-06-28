import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { initializeApp } from 'firebase-admin/app'
import { fetchInstagramPosts } from './instagram'
import { getAuthorizeClientConfig } from './secrets'
import { processPaymentHandler } from './payments'

initializeApp()

/** Public client-safe config (Authorize.net public keys when configured). */
export const getClientConfig = onCall({ cors: true }, async () => ({
  payments: getAuthorizeClientConfig(),
}))

export const processPayment = onCall({ cors: true }, processPaymentHandler)

/** Latest public Instagram posts for @mbsagators (cached server-side). */
export const getInstagramFeed = onCall({ cors: true }, async (request) => {
  const rawLimit = Number(request.data?.limit)
  const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 12) : 8
  try {
    const posts = await fetchInstagramPosts(limit)
    return { posts }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load Instagram feed'
    throw new HttpsError('unavailable', message)
  }
})
