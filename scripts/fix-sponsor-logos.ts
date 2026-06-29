import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { resolveSponsorLogo } from '../src/lib/sponsorLogos'

function initAdmin() {
  const serviceAccountPath = resolve(process.cwd(), 'serviceAccountKey.json')
  if (existsSync(serviceAccountPath)) {
    initializeApp({ credential: cert(JSON.parse(readFileSync(serviceAccountPath, 'utf-8'))) })
    return
  }
  initializeApp({ credential: applicationDefault(), projectId: 'mbsa-cbbf8' })
}

initAdmin()
const db = getFirestore()

const snap = await db.collection('sponsors').get()
let updated = 0

for (const doc of snap.docs) {
  const data = doc.data()
  const name = data.name as string
  const logoUrl = data.logoUrl as string | undefined
  const resolved = resolveSponsorLogo(name, logoUrl)

  if (!resolved || resolved === logoUrl) continue

  await doc.ref.update({ logoUrl: resolved })
  console.log(`Updated ${name}: ${logoUrl} → ${resolved}`)
  updated++
}

console.log(`Done. ${updated} sponsor(s) updated.`)
