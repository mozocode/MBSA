import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
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

const events = [
  {
    title: 'Summer Slam 2.0 Registration Opens',
    type: 'registration',
    startDate: new Date('2026-06-15T09:00:00'),
    endDate: new Date('2026-06-15T09:00:00'),
    allDay: true,
    description: 'Registration opens for Summer Slam 2.0 (Jul 23–26)',
    registrationUrl: '/register/summer-slam-2-0',
    color: '#22C55E',
    active: true,
  },
  {
    title: 'Monroeville Beach Bash',
    type: 'tournament',
    startDate: new Date('2026-07-30T08:00:00'),
    endDate: new Date('2026-08-02T20:00:00'),
    allDay: false,
    location: 'Monroeville, PA',
    description: 'Softball & Baseball · Ages 8u–14u · Level B, Community · $450',
    registrationUrl: '/register/monroeville-beach-bash',
    color: '#F4C430',
    active: true,
  },
  {
    title: 'Fall Tryouts — Baseball',
    type: 'tryout',
    startDate: new Date('2026-08-10T09:00:00'),
    endDate: new Date('2026-08-10T12:00:00'),
    allDay: false,
    location: 'Monroeville Community Park',
    description:
      'Open tryouts for the 2027 spring baseball season. All ages welcome.',
    color: '#3B82F6',
    active: true,
  },
  {
    title: 'Board Meeting',
    type: 'meeting',
    startDate: new Date('2026-07-08T19:00:00'),
    endDate: new Date('2026-07-08T21:00:00'),
    allDay: false,
    location: 'Monroeville Community Center',
    description: 'Monthly MBSA board meeting. Open to all members.',
    color: '#8B5CF6',
    active: true,
  },
  {
    title: 'Baseball Pumpkin Smash',
    type: 'tournament',
    startDate: new Date('2026-10-01T08:00:00'),
    endDate: new Date('2026-10-04T20:00:00'),
    allDay: false,
    location: 'Monroeville, PA',
    description: 'Baseball · Ages 8u–14u · Level B, Community · $450',
    registrationUrl: '/register/monroeville-baseball-pumpkin-smash',
    color: '#F4C430',
    active: true,
  },
  {
    title: 'Spring Practice — All Divisions',
    type: 'practice',
    startDate: new Date('2026-04-01T17:00:00'),
    endDate: new Date('2026-04-01T19:00:00'),
    allDay: false,
    location: 'Monroeville Community Park West',
    description: 'Weekly spring practice session. Check with your coach for field assignment.',
    color: '#F97316',
    active: true,
  },
  {
    title: 'Volunteer Coach Orientation',
    type: 'other',
    startDate: new Date('2026-03-15T18:00:00'),
    endDate: new Date('2026-03-15T20:00:00'),
    allDay: false,
    location: 'Monroeville Community Center',
    description: 'Orientation for new and returning volunteer coaches.',
    color: '#6B7280',
    active: true,
  },
]

async function seedEvents() {
  console.log('Seeding events collection…')
  const now = Timestamp.now()

  for (const event of events) {
    await db.collection('events').add({
      ...event,
      startDate: Timestamp.fromDate(event.startDate),
      endDate: Timestamp.fromDate(event.endDate),
      createdAt: now,
      updatedAt: now,
    })
    console.log(`  + ${event.title}`)
  }

  console.log(`Done. Seeded ${events.length} events.`)
}

seedEvents().catch((err) => {
  console.error(err)
  process.exit(1)
})
