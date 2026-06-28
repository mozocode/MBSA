import { fallbackTournaments } from './fallbackData'
import { slugify } from './registrationFields'

const slugByShortName = Object.fromEntries(
  fallbackTournaments.map((t) => [t.shortName, t.slug]),
)

const slugByName = Object.fromEntries(fallbackTournaments.map((t) => [t.name, t.slug]))

/** Resolve internal register slug for a tournament record. */
export function resolveTournamentSlug(tournament: {
  slug?: string
  shortName?: string
  name?: string
}): string {
  if (tournament.slug) return tournament.slug
  if (tournament.shortName && slugByShortName[tournament.shortName]) {
    return slugByShortName[tournament.shortName]
  }
  if (tournament.name && slugByName[tournament.name]) {
    return slugByName[tournament.name]
  }
  return slugify(tournament.shortName || tournament.name || '')
}

export function tournamentRegisterPath(tournament: {
  slug?: string
  shortName?: string
  name?: string
}): string {
  const slug = resolveTournamentSlug(tournament)
  return slug ? `/register/${slug}` : '/'
}

export function productRegisterPath(product: { slug: string }): string {
  return `/register/${product.slug}`
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}
