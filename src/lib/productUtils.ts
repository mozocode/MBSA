export function tournamentRegisterPath(tournament: { slug?: string; registrationUrl?: string }): string {
  if (tournament.slug) return `/register/${tournament.slug}`
  if (tournament.registrationUrl) return tournament.registrationUrl
  return '/'
}

export function productRegisterPath(product: { slug: string }): string {
  return `/register/${product.slug}`
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}
