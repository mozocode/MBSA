import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { fallbackTournaments } from '../src/lib/fallbackData'
import { resolveTournamentArtwork, resolveTournamentSlug } from '../src/lib/productUtils'

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

const snap = await db.collection('tournaments').get()
let updated = 0

for (const doc of snap.docs) {
  const data = doc.data()
  const slug = resolveTournamentSlug({ id: doc.id, ...data } as Parameters<typeof resolveTournamentSlug>[0])
  const resolved = resolveTournamentArtwork(slug, data.artworkUrl as string | undefined)
  const fallback = fallbackTournaments.find((t) => t.slug === slug)?.artworkUrl

  if (!resolved || resolved === data.artworkUrl) continue

  await doc.ref.update({ artworkUrl: resolved })
  console.log(`Updated ${data.name}: ${data.artworkUrl} → ${resolved}`)
  updated++
}

console.log(`Done. ${updated} tournament(s) updated.`)
