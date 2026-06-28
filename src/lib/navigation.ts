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
  { label: 'GET INVOLVED', href: 'https://mbsagators.com/get-involved/' },
  { label: 'SPONSOR', href: 'https://mbsagators.com/sponsor/' },
  {
    label: 'COACHES',
    children: [
      { label: 'Coaches Information', href: 'https://mbsagators.com/coaches/' },
      { label: 'Practice Schedule', href: 'https://mbsagators.com/practice-schedule/' },
    ],
  },
  {
    label: 'TOURNAMENTS',
    children: [
      { label: 'All Tournaments', href: 'https://mbsagators.com/tournaments/' },
      { label: 'Register', href: 'https://mbsagators.com/shop/' },
    ],
  },
  { label: 'SHOP', href: 'https://mbsagators.com/shop/' },
  { label: 'SIGN IN', href: 'https://mbsagators.com/my-account/' },
]
