/** Public routes where the announcement banner can appear. */
export const ANNOUNCEMENT_PAGE_OPTIONS = [
  { path: '/', label: 'Home' },
  { path: '/calendar', label: 'Calendar' },
  { path: '/get-started', label: 'Get Started' },
  { path: '/get-involved', label: 'Get Involved' },
  { path: '/executive-board', label: 'Executive Board' },
  { path: '/hall-of-champions', label: 'Hall of Champions' },
  { path: '/faq', label: 'FAQ' },
  { path: '/grants', label: 'Grants' },
  { path: '/clinics', label: 'Clinics' },
  { path: '/coaches', label: 'Coaches' },
  { path: '/practice-schedule', label: 'Practice Schedule' },
  { path: '/contact', label: 'Contact' },
  { path: '/sponsor', label: 'Sponsor' },
  { path: '/donate', label: 'Donate' },
  { path: '/register', label: 'Registration pages' },
] as const

export type AnnouncementPagePath = (typeof ANNOUNCEMENT_PAGE_OPTIONS)[number]['path']

export function formatAnnouncementPages(pages: AnnouncementPageScope | undefined): string {
  if (!pages || pages === 'all') return 'All pages'
  if (pages.length === 0) return 'No pages'
  const labels = pages.map((path) => {
    const match = ANNOUNCEMENT_PAGE_OPTIONS.find((o) => o.path === path)
    return match?.label ?? path
  })
  return labels.join(', ')
}

export type AnnouncementPageScope = 'all' | AnnouncementPagePath[]

export function announcementMatchesPage(
  pages: AnnouncementPageScope | undefined,
  pathname: string,
): boolean {
  if (!pages || pages === 'all') return true
  return pages.some((page) => {
    if (page === '/register') return pathname === '/register' || pathname.startsWith('/register/')
    return pathname === page
  })
}
