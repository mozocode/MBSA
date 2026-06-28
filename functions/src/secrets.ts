import { defineString } from 'firebase-functions/params'

/**
 * Platform API configuration.
 *
 * Deploys without credentials (empty defaults → payments disabled).
 * When Authorize.net credentials are ready, store them in Secret Manager and
 * switch the entries below to defineSecret() — see secrets.manifest.json.
 */
export const params = {
  authorizeApiLoginId: defineString('AUTHORIZE_API_LOGIN_ID', { default: '' }),
  authorizeClientKey: defineString('AUTHORIZE_CLIENT_KEY', { default: '' }),
  authorizeTransactionKey: defineString('AUTHORIZE_TRANSACTION_KEY', { default: '' }),
  authorizeSandbox: defineString('AUTHORIZE_SANDBOX', { default: 'true' }),
} as const

export function isAuthorizeSandbox(): boolean {
  return params.authorizeSandbox.value() !== 'false'
}

export function getAuthorizeClientConfig() {
  const apiLoginId = params.authorizeApiLoginId.value()
  const clientKey = params.authorizeClientKey.value()
  return {
    enabled: Boolean(apiLoginId && clientKey),
    apiLoginId,
    clientKey,
    sandbox: isAuthorizeSandbox(),
  }
}

export function getAuthorizeServerConfig() {
  return {
    apiLoginId: params.authorizeApiLoginId.value(),
    transactionKey: params.authorizeTransactionKey.value(),
    sandbox: isAuthorizeSandbox(),
  }
}
