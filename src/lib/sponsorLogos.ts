import type { Sponsor } from './types'

export const SPONSOR_LOGO_BASE = '/media/sponsors'

/** Local sponsor logos served from public/media/sponsors. */
export const SPONSOR_LOGOS: Omit<Sponsor, 'id'>[] = [
  { name: 'Pressing On', logoUrl: `${SPONSOR_LOGO_BASE}/pressing-on.png`, tier: 'gold', order: 1 },
  {
    name: 'Union Home Mortgage',
    logoUrl: `${SPONSOR_LOGO_BASE}/union-home-mortgage.png`,
    tier: 'gold',
    order: 2,
  },
  {
    name: 'All American Baseball Center',
    logoUrl: `${SPONSOR_LOGO_BASE}/all-american-baseball-center.png`,
    tier: 'silver',
    order: 3,
  },
  {
    name: "Dunham's Sports",
    logoUrl: `${SPONSOR_LOGO_BASE}/dunham-sports.png`,
    tier: 'silver',
    order: 4,
  },
  {
    name: "Dick's Sporting Goods",
    logoUrl: `${SPONSOR_LOGO_BASE}/dicks-sporting-goods.png`,
    tier: 'silver',
    order: 5,
  },
  {
    name: 'Affinity Counselling and Wellness',
    logoUrl: `${SPONSOR_LOGO_BASE}/affinity-counselling-and-wellness.png`,
    tier: 'bronze',
    order: 6,
  },
  {
    name: 'Bridges Hospice',
    logoUrl: `${SPONSOR_LOGO_BASE}/bridges-hospice.png`,
    tier: 'bronze',
    order: 7,
  },
  { name: 'C & H', logoUrl: `${SPONSOR_LOGO_BASE}/c-and-h.png`, tier: 'bronze', order: 8 },
  {
    name: 'Caliente Pittsburgh',
    logoUrl: `${SPONSOR_LOGO_BASE}/ch.png`,
    tier: 'bronze',
    order: 9,
  },
  {
    name: 'Comfort Keepers',
    logoUrl: `${SPONSOR_LOGO_BASE}/comfort-keepers.png`,
    tier: 'bronze',
    order: 10,
  },
  {
    name: "Dale Shirley's",
    logoUrl: `${SPONSOR_LOGO_BASE}/dale-shirleys.png`,
    tier: 'bronze',
    order: 11,
  },
  {
    name: 'Edward Lehman Agency',
    logoUrl: `${SPONSOR_LOGO_BASE}/edward-lehman-agency.png`,
    tier: 'bronze',
    order: 12,
  },
  {
    name: 'Meagan Capalongo, Allstate',
    logoUrl: `${SPONSOR_LOGO_BASE}/meagan-capalongo-allstate.png`,
    tier: 'bronze',
    order: 13,
  },
  {
    name: "Papa Rock's Pizza Pub",
    logoUrl: `${SPONSOR_LOGO_BASE}/papa-rocks-pizza-pub.png`,
    tier: 'bronze',
    order: 14,
  },
  {
    name: 'Rosato Land Services',
    logoUrl: `${SPONSOR_LOGO_BASE}/rosato-land-services.png`,
    tier: 'bronze',
    order: 15,
  },
  {
    name: 'Sherwin-Williams',
    logoUrl: `${SPONSOR_LOGO_BASE}/sherwin-williams.png`,
    tier: 'bronze',
    order: 16,
  },
  {
    name: 'Sons of the American Legion',
    logoUrl: `${SPONSOR_LOGO_BASE}/sons-of-the-american-legion.png`,
    tier: 'bronze',
    order: 17,
  },
  {
    name: 'Visit Monroeville',
    logoUrl: `${SPONSOR_LOGO_BASE}/visit-monroeville.png`,
    tier: 'bronze',
    order: 18,
  },
]

export function toSponsorRecords(logos: Omit<Sponsor, 'id'>[]): Sponsor[] {
  return logos.map((logo) => ({
    ...logo,
    id: logo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  }))
}

export const SPONSOR_RECORDS = toSponsorRecords(SPONSOR_LOGOS)

export type SponsorLogoDisplay = { name: string; logo: string }

export function toSponsorLogoDisplay(logos: Omit<Sponsor, 'id'>[]): SponsorLogoDisplay[] {
  return logos.map(({ name, logoUrl }) => ({ name, logo: logoUrl }))
}
