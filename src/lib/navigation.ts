export interface NavLink {
  label: string
  to?: string
  href?: string
}

export interface NavItem {
  label: string
  href?: string
  to?: string
  children?: NavLink[]
}

export const navItems: NavItem[] = [
  { label: 'HOME', to: '/' },
  {
    label: 'ABOUT US',
    children: [
      { label: 'GET STARTED', to: '/get-started' },
      { label: 'EXECUTIVE BOARD', to: '/executive-board' },
      { label: 'HALL OF CHAMPIONS', to: '/hall-of-champions' },
      { label: 'FAQ', to: '/faq' },
      { label: 'GRANTS', to: '/grants' },
      { label: 'CLINICS', to: '/clinics' },
      { label: 'CONTACT', to: '/contact' },
    ],
  },
  { label: 'GET INVOLVED', to: '/get-involved' },
  { label: 'SPONSOR', to: '/sponsor' },
  {
    label: 'COACHES',
    children: [
      { label: 'Coaches Information', to: '/coaches' },
      { label: 'Practice Schedule', to: '/practice-schedule' },
    ],
  },
  {
    label: 'TOURNAMENTS',
    children: [
      { label: 'All Tournaments', to: '/tournaments' },
      { label: 'Register', to: '/tournaments' },
    ],
  },
  { label: 'CALENDAR', to: '/calendar' },
]
