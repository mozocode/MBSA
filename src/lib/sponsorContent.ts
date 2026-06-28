export const SPONSOR_HERO =
  '/media/2023/12/Banner-BG-image.webp'

export const SPONSOR_BANNER_IMAGE =
  '/media/2026/04/2026-Sponsor-Banner.jpeg'

export const SPONSOR_LOGO_WHITE =
  '/media/2023/01/MBSA_vector_file_white.svg'

export const SPONSORSHIP_FORM_URL =
  '/media/2026/02/Sponsorship-form.pdf'

export const SPONSORSHIP_EMAIL = 'sponsorship@mbsagators.com'
export const SPONSORSHIP_PHONE = '412-818-6147'
export const SPONSORSHIP_MAIL_ADDRESS = '903 Macbeth Drive, Monroeville, PA 15146'
export const SPONSORSHIP_WEBSITE = 'https://www.mbsagators.com'

export const SPONSOR_INTRO_HEADING =
  'Interested in becoming a sponsor or partnering with Monroeville Baseball & Softball Association?'

export const SPONSOR_CONTACT_NAME = 'Mehdi Hedjazi'

export type SponsorTierId = 'white' | 'black' | 'gold' | 'gator' | 'mvp'

export interface SponsorTier {
  id: SponsorTierId
  name: string
  price: number
  benefits: string[]
}

export const sponsorTiers: SponsorTier[] = [
  {
    id: 'white',
    name: 'White Sponsor',
    price: 100,
    benefits: [
      'Name on League Sponsor Banner',
      'LED Board Recognition',
      'Social Media Recognition',
      'Website Recognition',
    ],
  },
  {
    id: 'black',
    name: 'Black Sponsor',
    price: 250,
    benefits: [
      'Small-Sized Decal – League Sponsor Banner',
      'Concession Stand Recognition',
      'First Pitch of a Regular Season Game',
    ],
  },
  {
    id: 'gold',
    name: 'Gold Sponsor',
    price: 500,
    benefits: [
      'Medium Sized Decal – League Sponsor Banner',
      'Thank You Plaque for Sponsored Team',
      'Team Sponsor Banner',
    ],
  },
  {
    id: 'gator',
    name: 'Gator Sponsor',
    price: 750,
    benefits: [
      'Large Sized Decal – League Sponsor Banner',
      '10 Second Video Capable Time-Slot featured on LED boards',
      'To run M–F 2× per day',
    ],
  },
  {
    id: 'mvp',
    name: 'MVP Event Sponsor',
    price: 1500,
    benefits: [
      'XL Sized Decal – League Sponsor Banner',
      'Featured Event Sponsor',
      'Tournaments / All-star day',
    ],
  },
]

export interface PartnerLogo {
  id: string
  name: string
  logoUrl: string
}

export const partnerLogos: PartnerLogo[] = [
  { id: 'dc-welding', name: 'DC Welding', logoUrl: '/media/2023/12/dc-welding-1.png' },
  { id: 'caliente', name: 'Caliente', logoUrl: '/media/2023/12/caliente-1.png' },
  { id: 'gama', name: 'GAMA', logoUrl: '/media/2023/12/gama-1.png' },
  { id: 'dicks', name: "Dick's Sporting Goods", logoUrl: '/media/2023/12/dicks-sporting-goods-1.png' },
  { id: 'all-american', name: 'All American Baseball Center', logoUrl: '/media/2023/12/all_american_baseball_2022_large-1.png' },
  { id: 'pressing-on', name: 'Pressing On', logoUrl: '/media/2023/12/pressing-on.png' },
  { id: 'rosato', name: 'Rosato', logoUrl: '/media/2023/12/rosato.png' },
  { id: 'woodring', name: 'Woodring', logoUrl: '/media/2023/12/woodring.png' },
  { id: 'heartland', name: 'Heartland', logoUrl: '/media/2023/12/heartland-logo_dark_33393d.png' },
  { id: 'monroeville-animal-shelter', name: 'Monroeville Animal Shelter', logoUrl: '/media/2023/12/monroeville-animal-shelter.png' },
  { id: 'comfort-keepers', name: 'Comfort Keepers', logoUrl: '/media/2023/12/comfort-keepers.png' },
  { id: 'fazio', name: 'Fazio Heating and Cooling', logoUrl: '/media/2023/12/fazio-heating-and-cooling.png' },
  { id: 'artex', name: 'Artex Designs', logoUrl: '/media/2023/12/artex-designs.png' },
  { id: 'dale-shirley', name: 'Dale Shirley', logoUrl: '/media/2023/12/dale-shirley.png' },
  { id: 'affinity', name: 'Affinity Counseling', logoUrl: '/media/2023/12/affinity-counseling.png' },
  { id: 'supanic', name: 'Supanic', logoUrl: '/media/2023/12/supanic.png' },
  { id: 'james-street-tavern', name: 'James Street Tavern', logoUrl: '/media/2023/12/james-street-tavern.png' },
  { id: 'dunhams', name: "Dunham's", logoUrl: '/media/2023/12/dunhams.png' },
  { id: 'doyle-bros', name: 'Doyle Bros', logoUrl: '/media/2023/12/doyle-bros_.png' },
  { id: 'first-national-bank', name: 'First National Bank', logoUrl: '/media/2023/12/first-national-bank-logo.png' },
  { id: 'kafeayiti', name: 'Kafe Ayiti', logoUrl: '/media/2023/12/kafeayiti.png' },
  { id: 'matheys', name: "Mathey's", logoUrl: '/media/2023/12/matheys.png' },
]
