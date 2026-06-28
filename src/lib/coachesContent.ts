export const COACHES_HERO = '/media/2024/01/coaches_corner.jpeg'

export const CONSTITUTION_PDF = '/media/2024/01/MBSA-Constitution-and-By-Laws.pdf'
export const POLICIES_PDF = '/media/2024/01/MBSA-Policies.pdf'

export interface CoachResource {
  id: string
  title: string
  href: string
  previewImage: string
}

export interface CoachVideo {
  id: string
  title: string
  youtubeUrl: string
  category: 'coaching' | 'drills'
}

export const coachesTabs = [
  { id: 'development', label: 'Player Development' },
  { id: 'rules', label: 'League Rules' },
  { id: 'clearance', label: 'Clearance Information' },
  { id: 'video', label: 'Video Training' },
  { id: 'awards', label: 'MBSA Weekly Awards' },
] as const

export type CoachesTabId = (typeof coachesTabs)[number]['id']

export const playerDevelopmentResources: CoachResource[] = [
  {
    id: 'coach-pitch-intro',
    title: 'Coach Pitch Introduction',
    href: '/media/2025/03/Coach-Pitch-Weeks-1-12.pdf',
    previewImage: '/media/2025/03/Screenshot-2025-03-04-at-8.56.03\u202fAM-886x1024.png',
  },
  {
    id: 'coach-pitch-week-1',
    title: 'Coach Pitch Week 1',
    href: '/media/2025/03/Coach-Pitch-Week-One.pdf',
    previewImage: '/media/2025/03/Screenshot-2025-03-04-at-8.56.11\u202fAM-787x1024.png',
  },
  {
    id: 'coach-pitch-week-2',
    title: 'Coach Pitch Week 2',
    href: '/media/2025/03/Coach-Pitch-Week-2.pdf',
    previewImage: '/media/2025/03/Screenshot-2025-03-04-at-8.56.22\u202fAM-791x1024.png',
  },
  {
    id: 'coach-pitch-week-3',
    title: 'Coach Pitch Week 3',
    href: '/media/2025/03/Coach-Pitch-Week-3.pdf',
    previewImage: '/media/2025/03/Screenshot-2025-03-04-at-8.56.33\u202fAM-789x1024.png',
  },
  {
    id: 'coach-pitch-week-4',
    title: 'Coach Pitch Week 4',
    href: '/media/2025/03/Coach-pitch-Week-4.pdf',
    previewImage: '/media/2025/03/Screenshot-2025-03-04-at-8.57.05\u202fAM-787x1024.png',
  },
  {
    id: 'coach-pitch-week-5',
    title: 'Coach Pitch Week 5',
    href: '/media/2025/03/Coach-Pitch-Week-5.pdf',
    previewImage: '/media/2025/03/Screenshot-2025-03-04-at-8.57.20\u202fAM-790x1024.png',
  },
  {
    id: 'instructional-program',
    title: 'Instructional Coaching Program',
    href: '/media/2025/03/Instructional-Coaching-Program-2.pdf',
    previewImage: '/media/2025/03/Screenshot-2025-03-05-at-7.05.52\u202fAM-785x1024.png',
  },
  {
    id: '10u-pitching-program',
    title: 'MBSA 10U Team Pitching Program',
    href: '/media/2025/12/MBSA-10U-Team-Pitching-Program.pdf',
    previewImage: '/media/2025/03/Screenshot-2025-12-19-at-10.37.21-AM-799x1024.png',
  },
  {
    id: '10u-pitching-video',
    title: 'MBSA 10U Team Pitching Program Video',
    href: 'https://drive.google.com/file/d/13uI-weSkhJW9JoduCh6K36odaTOpRlh-/view',
    previewImage: '/media/2025/12/Screenshot-2025-12-19-at-10.43.49-AM-1024x553.png',
  },
]

export const leagueRulesResources: CoachResource[] = [
  {
    id: 'softball-inhouse-2026',
    title: 'MBSA Softball In-house Spring 2026',
    href: '/media/2026/04/MBSA-in-house-Rules-Spring-2026.pdf',
    previewImage: '/media/2025/04/Screenshot-2025-04-28-at-6.50.26\u202fAM-816x1024.png',
  },
  {
    id: 'coach-pitch-rules-2026',
    title: 'MBSA Coach Pitch Rules 2026',
    href: '/media/2026/04/MBSA-Coach-Pitch-Rules-2026.pdf',
    previewImage: '/media/2025/02/MBSA-Coach-Pitch-Rules-2025.docx_Page_1-791x1024.jpg',
  },
  {
    id: 'bronco-rules-2026',
    title: 'MBSA Bronco Rules 2026',
    href: '/media/2026/04/MBSA-Bronco-Rules-2026.pdf',
    previewImage: '/media/2025/02/MBSA-Bronco-Rules-2025.docx_Page_1-784x1024.jpg',
  },
  {
    id: 'instructional-rules-2025',
    title: 'MBSA Instructional Rules 2025',
    href: '/media/2025/05/MBSA-Instructional-Rule-2025.docx.pdf',
    previewImage: '/media/2025/02/MBSA-Instructional-Rule-2025.docx_Page_1-808x1024.jpg',
  },
  {
    id: 'mustang-rules-2026',
    title: 'MBSA Mustang Rules 2026',
    href: '/media/2026/04/MBSA-Mustang-Rules-2026.pdf',
    previewImage: '/media/2025/02/MBSA-Mustang-Rules-2025.docx_Page_1-808x1024.jpg',
  },
]

export const clearanceVolunteerRequirements = [
  'State Police Criminal Record Check',
  'PA Child Abuse History Clearance',
]

export const clearancePaidRequirements = [
  'State Police Criminal Record Check',
  'PA Child Abuse History Clearance',
]

export const clearanceLinks = [
  {
    label: 'PA State Police Criminal Record Check (EPATCH)',
    href: 'https://epatch.pa.gov',
  },
  {
    label: 'PA Child Abuse History Clearance (COMPASS)',
    href: 'https://www.compass.state.pa.us/cwis/public/home',
  },
]

export const clearanceSteps = [
  {
    title: 'PA State Police Criminal Record Check — EPATCH',
    href: 'https://epatch.pa.gov',
    paragraphs: [
      'Go to this website and follow the directions. THIS IS FREE TO UNPAID VOLUNTEERS. Begin where it says “New Record Check” (in the yellow box); (Volunteers only) in red.',
      'Check the box under the Volunteer Acknowledgment Section and click “ACCEPT.”',
      'Continue on the next page and provide the personal information required under the VOLUNTEER FREE request. The volunteer organization name is the MONROEVILLE BASEBALL and SOFTBALL ASSOCIATION. Fill out all the required fields and proceed until you have finished. Upon completion, the system will provide a certificate saying that no criminal record in Pennsylvania exists.',
      'Please save, print a few copies, and provide the MBA with a copy of that certificate.',
    ],
  },
  {
    title: 'PA Child Abuse History Clearance — COMPASS',
    href: 'https://www.compass.state.pa.us/cwis/public/home',
    paragraphs: [
      'Go to this website and follow the directions. THIS IS ALSO FREE TO UNPAID VOLUNTEERS. Start at the Child Welfare Portal and CREATE AN INDIVIDUAL ACCOUNT. Follow the directions and provide all of the information asked for to include:',
      'Application purpose (Volunteer having contact with children), your personal information, your current address and any PAST addresses and ALL household members you have lived with (current AND IN THE PAST – siblings, parents, spouses etc.).',
      'When finished, follow the prompts to the end to complete the application. After a period of time, your clearance will be accessible to you. You may have to check back to the site at a later time when the clearance is processed. Keep all the information to access your individual account. When the clearance posts, you will see the “Eclearance ID” and will be able to print a copy for your records and provide a copy to the MBSA.',
    ],
  },
]

export const coachVideos: CoachVideo[] = [
  { id: 'v1', title: 'Coaching Little League Coaches', youtubeUrl: 'https://youtu.be/F4XD1EK_vX4', category: 'coaching' },
  { id: 'v2', title: 'Top 5 Coaching Mistakes', youtubeUrl: 'https://youtu.be/vh4NOnip-0g', category: 'coaching' },
  { id: 'v3', title: 'Practice Plan Elements', youtubeUrl: 'https://youtu.be/vh4NOnip-0g', category: 'coaching' },
  { id: 'v4', title: 'Infield Drills', youtubeUrl: 'https://youtu.be/SOEdJpoLhXI', category: 'drills' },
  { id: 'v5', title: 'Fun Drills (7–10-year-olds)', youtubeUrl: 'https://youtu.be/nJzDHd9Tc1M', category: 'drills' },
  { id: 'v6', title: 'Instructional Drills', youtubeUrl: 'https://youtu.be/xc-l7B0PGcs', category: 'drills' },
  { id: 'v7', title: 'Hitting Drills (Instructional and CP)', youtubeUrl: 'https://youtu.be/gOE484Meo_o', category: 'drills' },
  { id: 'v8', title: 'Pitching Drills', youtubeUrl: 'https://youtu.be/ImeXGqKYP7Y', category: 'drills' },
  { id: 'v9', title: 'Softball Drills', youtubeUrl: 'https://youtu.be/-4I2OLiluSM', category: 'drills' },
  { id: 'v10', title: 'Softball Infield Drills', youtubeUrl: 'https://youtu.be/LCNzZ0bjhzI', category: 'drills' },
  { id: 'v11', title: 'Softball Drills 11-12-year-old', youtubeUrl: 'https://youtu.be/wG33NM6REPc', category: 'drills' },
  { id: 'v12', title: 'Softball Drills 7–8-year-old', youtubeUrl: 'https://youtu.be/wG8pIAvWaGo', category: 'drills' },
  { id: 'v13', title: 'Softball Drills 9–10-year-old', youtubeUrl: 'https://youtu.be/jddeGmeVtHY', category: 'drills' },
  { id: 'v14', title: '10 best Softball Throwing Drills', youtubeUrl: 'https://youtu.be/a4KoltWcgc8', category: 'drills' },
  { id: 'v15', title: '6 Best Softball Drills for Kids', youtubeUrl: 'https://youtu.be/8UH_2_LEGlM', category: 'drills' },
]

export const weeklyAwardsFormUrl = 'https://forms.gle/PRk7RPGLQ8HUMP2p8'
export const weeklyAwardsImage = '/media/2025/04/Player-Awards-2025-819x1024.jpg'

export const weeklyAwardsParagraphs = [
  'MBSA prides itself on recognition of a job well done. You’ve instilled this mentality throughout each division every time you all take a team, help a player, or encourage a fan base to follow our Gator ways! This year we are asking you to take this one step further as we issue the new “Gator” and “Sigma Performance” weekly awards.',
  'Each award will be given to one player per division (8U/CP and older) each week.',
  'The Gator Award will be a player that reflects our Gator mentality of sportsmanship, helpfulness, attentiveness, and friendship. This is the player that puts in the effort at practice and at games. The player that is dedicated to the TEAM not him or herself.',
  'The Sigma Performance award will be a player that has that impressive stat line as tracked by your GameChanger. This can be a culmination of a week’s performance, a single game astonishment or a player that made significant improvement.',
  'We will be asking you all as head coaches to nominate one player for each on Friday using the submission form attached here. The winners from those nominations will be chosen by the MBSA Executive Commissioner, Softball Commissioner and Player Development Manager. The awards will be announced the following Monday on our social media pages so the entire league can cheer each winner on.',
  'The awards will give the player an opportunity to get one food and drink item of their choice for free from the concession stand any day that week!',
  'We hope that you like this idea and join us in celebrating these wins for our amazing group of athletes!',
]
