import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'

function initAdmin() {
  const serviceAccountPath = resolve(process.cwd(), 'serviceAccountKey.json')
  if (existsSync(serviceAccountPath)) {
    initializeApp({ credential: cert(JSON.parse(readFileSync(serviceAccountPath, 'utf-8'))) })
    return
  }
  initializeApp({ credential: applicationDefault(), projectId: 'mbsa-cbbf8' })
}

initAdmin()

const uid = process.argv[2]
if (!uid) {
  console.error('Usage: npx tsx scripts/set-admin-claim.ts <user-uid>')
  process.exit(1)
}

await getAuth().setCustomUserClaims(uid, { admin: true })
console.log(`Admin claim set for UID: ${uid}`)
