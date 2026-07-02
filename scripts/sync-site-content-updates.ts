import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
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
const db = getFirestore()

const announcementSnap = await db.collection('announcements').get()
for (const doc of announcementSnap.docs) {
  const text = String(doc.data().text ?? '')
  if (/spring registration is closed/i.test(text)) {
    await doc.ref.update({ active: false })
    console.log(`Deactivated announcement: ${text}`)
  }
}

const tournamentUpdates: Record<string, 'open' | 'closed' | 'upcoming'> = {
  'summer-in-the-swamp': 'closed',
  'monroeville-baseball-pumpkin-smash': 'open',
}

const tournamentSnap = await db.collection('tournaments').get()
for (const doc of tournamentSnap.docs) {
  const slug = doc.data().slug as string | undefined
  if (!slug || !tournamentUpdates[slug]) continue
  const status = tournamentUpdates[slug]
  await doc.ref.update({ status })
  console.log(`Updated ${slug} status → ${status}`)
}

console.log('Done.')
