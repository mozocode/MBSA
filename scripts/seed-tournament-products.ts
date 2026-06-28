import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import {
  combinedSportAgeFields,
  sanitizeRegistrationFields,
  splitSportAgeFields,
} from '../src/lib/registrationFields'

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

const updates: Array<{ matchName: string; slug: string; fields: ReturnType<typeof combinedSportAgeFields> }> = [
  {
    matchName: 'Summer Slam 1.0',
    slug: 'summer-slam-1-0',
    fields: combinedSportAgeFields(),
  },
  {
    matchName: 'Summer Slam 2.0',
    slug: 'summer-slam-2-0',
    fields: combinedSportAgeFields(),
  },
  {
    matchName: 'Monroeville Beach Bash',
    slug: 'monroeville-beach-bash',
    fields: splitSportAgeFields(),
  },
  {
    matchName: 'Baseball Pumpkin Smash',
    slug: 'monroeville-baseball-pumpkin-smash',
    fields: splitSportAgeFields(),
  },
]

async function seedTournamentProducts() {
  console.log('Updating tournament registration products…')
  const snap = await db.collection('tournaments').get()

  for (const config of updates) {
    const doc = snap.docs.find((d) => d.data().name === config.matchName || d.data().shortName === config.matchName.replace('Monroeville ', ''))
    if (!doc) {
      console.warn(`  ! Not found: ${config.matchName}`)
      continue
    }
    await doc.ref.update({
      slug: config.slug,
      registrationFields: sanitizeRegistrationFields(config.fields),
      paymentRequired: true,
    })
    console.log(`  ✓ ${config.matchName} → /register/${config.slug}`)
  }

  const donateRef = db.collection('products').doc('donate')
  await donateRef.set(
    {
      slug: 'donate',
      name: 'MBSA Donation',
      description: 'Support Monroeville Baseball & Softball Association programs.',
      price: 0,
      allowCustomAmount: true,
      type: 'donation',
      registrationFields: sanitizeRegistrationFields([
        {
          id: 'donor-name',
          label: 'Your Name',
          type: 'text',
          required: true,
          order: 0,
        },
        {
          id: 'donor-email',
          label: 'Email',
          type: 'email',
          required: true,
          order: 1,
        },
        {
          id: 'donor-message',
          label: 'Message (optional)',
          type: 'textarea',
          required: false,
          order: 2,
        },
      ]),
      active: true,
      order: 0,
    },
    { merge: true },
  )
  console.log('  ✓ Donation product → /register/donate')

  console.log('Done.')
}

seedTournamentProducts().catch((err) => {
  console.error(err)
  process.exit(1)
})
