import { getFunctions, httpsCallable } from 'firebase/functions'
import { app } from './firebase'

export interface PaymentClientConfig {
  enabled: boolean
  apiLoginId: string
  clientKey: string
  sandbox: boolean
}

export interface PlatformConfig {
  payments: PaymentClientConfig
}

let cached: PlatformConfig | null = null
let loadPromise: Promise<PlatformConfig> | null = null

function configFromEnv(): PlatformConfig {
  const apiLoginId = import.meta.env.VITE_AUTHORIZE_API_LOGIN_ID ?? ''
  const clientKey = import.meta.env.VITE_AUTHORIZE_CLIENT_KEY ?? ''
  return {
    payments: {
      enabled: Boolean(apiLoginId && clientKey),
      apiLoginId,
      clientKey,
      sandbox: import.meta.env.VITE_AUTHORIZE_SANDBOX !== 'false',
    },
  }
}

/** Load platform config from Secret Manager via Cloud Function, with local env fallback. */
export async function getPlatformConfig(): Promise<PlatformConfig> {
  if (cached) return cached
  if (loadPromise) return loadPromise

  loadPromise = (async () => {
    try {
      const functions = getFunctions(app)
      const callable = httpsCallable<void, PlatformConfig>(functions, 'getClientConfig')
      const result = await callable()
      if (result.data?.payments) {
        cached = result.data
        return cached
      }
    } catch {
      // Function not deployed or secrets not set — fall back for local dev
    }
    cached = configFromEnv()
    return cached
  })()

  return loadPromise
}

export function getPlatformConfigCached(): PlatformConfig | null {
  return cached
}

/** Reset cache (e.g. after admin updates secrets and user refreshes). */
export function resetPlatformConfigCache(): void {
  cached = null
  loadPromise = null
}

export async function getPaymentConfig(): Promise<PaymentClientConfig> {
  const cfg = await getPlatformConfig()
  return cfg.payments
}
