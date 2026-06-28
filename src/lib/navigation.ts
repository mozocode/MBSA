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
      { label: 'HALL OF CHAMPIONS', href: 'https://mbsagators.com/hall-of-champions/' },
      { label: 'FAQ', href: 'https://mbsagators.com/faq/' },
      { label: 'GRANTS', href: 'https://mbsagators.com/grants/' },
      { label: 'CLINICS', href: 'https://mbsagators.com/clinics/' },
      { label: 'CONTACT', href: 'https://mbsagators.com/contact/' },
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
