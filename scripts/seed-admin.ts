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

const tournaments = [
  {
    name: 'Monroeville Spring Ding',
    shortName: 'Spring Ding',
    dateStart: Timestamp.fromDate(new Date('2026-04-10')),
    dateEnd: Timestamp.fromDate(new Date('2026-04-12')),
    dateLabel: 'Apr 10–12',
    sport: 'Baseball',
    ages: '7u–10u',
    level: 'C, single community',
    price: 450,
    artworkUrl: 'https://mbsagators.com/wp-content/uploads/2025/11/Spring-Ding.jpg',
    registrationUrl:
      'https://mbsagators.com/product/monroeville-spring-ding-april-10-april-12th/',
    status: 'closed',
    order: 1,
  },
  {
    name: 'Gators Swing into Spring',
    shortName: 'Swing into Spring',
    dateStart: Timestamp.fromDate(new Date('2026-04-24')),
    dateEnd: Timestamp.fromDate(new Date('2026-04-26')),
    dateLabel: 'Apr 24–26',
    sport: 'Softball & Baseball',
    ages: '7u–10u',
    level: 'C, single community',
    price: 450,
    artworkUrl: 'https://mbsagators.com/wp-content/uploads/2024/04/Swing-into-Spring.jpg',
    registrationUrl:
      'https://mbsagators.com/product/monroeville-gators-swing-into-spring-april-24th-26th/',
    status: 'closed',
    order: 2,
  },
  {
    name: 'Summer in the Swamp',
    shortName: 'Summer in the Swamp',
    dateStart: Timestamp.fromDate(new Date('2026-05-29')),
    dateEnd: Timestamp.fromDate(new Date('2026-05-31')),
    dateLabel: 'May 29–31',
    sport: 'Softball & Baseball',
    ages: '8u–14u',
    level: 'B, Community',
    price: 450,
    artworkUrl: 'https://mbsagators.com/wp-content/uploads/2025/04/Summer-in-the-Swamp.jpg',
    registrationUrl:
      'https://mbsagators.com/product/monroeville-summer-in-the-swamp-may-29st-31st/',
    status: 'upcoming',
    order: 3,
  },
  {
    name: 'Summer Slam 1.0',
    shortName: 'Summer Slam 1.0',
    dateStart: Timestamp.fromDate(new Date('2026-07-09')),
    dateEnd: Timestamp.fromDate(new Date('2026-07-12')),
    dateLabel: 'Jul 9–12',
    sport: 'Softball & Baseball',
    ages: '8u–14u',
    level: 'B, Community',
    price: 450,
    artworkUrl: 'https://mbsagators.com/wp-content/uploads/2025/11/Summer-Slam.jpg',
    registrationUrl:
      'https://mbsagators.com/product/monroeville-summer-slam-1-0-july-9-12th/',
    status: 'upcoming',
    order: 4,
  },
  {
    name: 'Summer Slam 2.0',
    shortName: 'Summer Slam 2.0',
    dateStart: Timestamp.fromDate(new Date('2026-07-23')),
    dateEnd: Timestamp.fromDate(new Date('2026-07-26')),
    dateLabel: 'Jul 23–26',
    sport: 'Softball & Baseball',
    ages: '8u–14u',
    level: 'B, Community',
    price: 450,
    artworkUrl: 'https://mbsagators.com/wp-content/uploads/2025/11/Summer-Slam.jpg',
    registrationUrl:
      'https://mbsagators.com/product/monroeville-summer-slam-2-0-july-23rd-26th/',
    status: 'upcoming',
    order: 5,
  },
  {
    name: 'Monroeville Beach Bash',
    shortName: 'Beach Bash',
    dateStart: Timestamp.fromDate(new Date('2026-07-30')),
    dateEnd: Timestamp.fromDate(new Date('2026-08-02')),
    dateLabel: 'Jul 30–Aug 2',
    sport: 'Softball & Baseball',
    ages: '8u–14u',
    level: 'B, Community',
    price: 450,
    artworkUrl: 'https://mbsagators.com/wp-content/uploads/2025/11/Beach-Bash.jpg',
    registrationUrl:
      'https://mbsagators.com/product/monroeville-beach-bash-july-30th-august-2nd/',
    status: 'open',
    order: 6,
  },
  {
    name: 'Baseball Pumpkin Smash',
    shortName: 'Pumpkin Smash',
    dateStart: Timestamp.fromDate(new Date('2026-10-01')),
    dateEnd: Timestamp.fromDate(new Date('2026-10-04')),
    dateLabel: 'Oct 1–4',
    sport: 'Baseball',
    ages: '8u–14u',
    level: 'B, Community',
    price: 450,
    artworkUrl: 'https://mbsagators.com/wp-content/uploads/2025/11/Pumpkin-Smash.jpg',
    registrationUrl:
      'https://mbsagators.com/product/monroeville-baseball-pumpkin-smash-october-1st-4th/',
    status: 'upcoming',
    order: 7,
  },
]

async function seed() {
  console.log('Seeding Firestore via Admin SDK...')

  for (const tournament of tournaments) {
    await db.collection('tournaments').add(tournament)
    console.log(`  + tournament: ${tournament.name}`)
  }

  await db.collection('announcements').add({
    text: '2026 Spring Registration is CLOSED',
    link: 'https://mbsagators.com/register/',
    active: true,
    createdAt: Timestamp.now(),
  })
  console.log('  + announcement')

  const sponsors = [
    {
      name: 'Pressing On',
      logoUrl: 'https://mbsagators.com/wp-content/uploads/2024/01/Pressing-On-Logo.png',
      websiteUrl: 'https://pressingon.org',
      tier: 'gold',
      order: 1,
    },
    {
      name: 'Union Home Mortgage',
      logoUrl: 'https://mbsagators.com/wp-content/uploads/2024/01/Union-Home-Mortgage-Logo.png',
      websiteUrl: 'https://www.uhm.com',
      tier: 'gold',
      order: 2,
    },
    {
      name: 'All-American Baseball Center',
      logoUrl:
        'https://mbsagators.com/wp-content/uploads/2024/01/All-American-Baseball-Center-Logo.png',
      tier: 'silver',
      order: 3,
    },
    {
      name: "Dunham's Sports",
      logoUrl: 'https://mbsagators.com/wp-content/uploads/2024/01/Dunhams-Sports-Logo.png',
      websiteUrl: 'https://www.dunhamssports.com',
      tier: 'bronze',
      order: 4,
    },
  ]

  for (const sponsor of sponsors) {
    await db.collection('sponsors').add(sponsor)
    console.log(`  + sponsor: ${sponsor.name}`)
  }

  const galleryPhotos = [
    'DSC_0724',
    'DSC_0725',
    'DSC_0726',
    'DSC_0727',
    'DSC_0728',
    'DSC_0729',
    'DSC_0830',
    'DSC_0831',
    'IMG_7340',
    'IMG_7919',
  ].map((name, order) => ({
    imageUrl: `https://mbsagators.com/wp-content/uploads/2024/02/${name}${name.startsWith('IMG_7919') ? '.jpg' : '.jpeg'}`,
    caption: 'MBSA Gators in action',
    instagramUrl: 'https://www.instagram.com/mbsagators',
    order,
    active: true,
  }))

  for (const photo of galleryPhotos) {
    await db.collection('gallery').add(photo)
  }
  console.log(`  + ${galleryPhotos.length} gallery photos`)

  await db.collection('pages').doc('home').set({
    heroHeadline: 'Helping Youth',
    heroHeadlineAccent: 'Succeed',
    heroSubline: 'on & off the field',
    heroSubtext:
      'Monroeville Baseball & Softball Association builds character, teamwork, and lifelong skills through youth baseball and softball in Monroeville, PA.',
    missionTitle: 'MONROEVILLE PLAYS BALL',
    missionBody:
      'MBSA Gators is a community-driven youth sports organization dedicated to providing a positive, competitive environment for players of all skill levels. Our coaches, volunteers, and families work together to help every athlete grow on and off the field.',
    missionEmail: 'info@mbsagators.com',
    statsBar: [
      { label: 'Years of Service', value: '25+' },
      { label: 'Active Players', value: '500+' },
      { label: 'Tournaments Hosted', value: '30+' },
      { label: 'Community Partners', value: '20+' },
    ],
  })
  console.log('  + pages/home')

  console.log('Done!')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
