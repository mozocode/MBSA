import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { fallbackTournaments } from '../src/lib/fallbackData'
import {
  combinedSportAgeFields,
  sanitizeRegistrationFields,
  splitSportAgeFields,
} from '../src/lib/registrationFields'
import { resolveTournamentSlug } from '../src/lib/productUtils'

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

function fieldsForShortName(shortName: string) {
  if (shortName === 'Summer Slam 1.0' || shortName === 'Summer Slam 2.0') {
    return combinedSportAgeFields()
  }
  return splitSportAgeFields()
}

async function seedTournamentProducts() {
  console.log('Updating all tournament registration products…')
  const snap = await db.collection('tournaments').get()

  for (const template of fallbackTournaments) {
    const doc = snap.docs.find((d) => {
      const data = d.data()
      return (
        data.shortName === template.shortName ||
        data.name === template.name ||
        resolveTournamentSlug({
          slug: data.slug as string | undefined,
          shortName: data.shortName as string | undefined,
          name: data.name as string | undefined,
        }) === template.slug
      )
    })

    if (!doc) {
      console.warn(`  ! Not found: ${template.name}`)
      continue
    }

    await doc.ref.update({
      slug: template.slug,
      registrationFields: sanitizeRegistrationFields(fieldsForShortName(template.shortName)),
      paymentRequired: true,
      registrationUrl: FieldValue.delete(),
    })
    console.log(`  ✓ ${template.shortName} → /register/${template.slug}`)
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
        { id: 'donor-name', label: 'Your Name', type: 'text', required: true, order: 0 },
        { id: 'donor-email', label: 'Email', type: 'email', required: true, order: 1 },
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
