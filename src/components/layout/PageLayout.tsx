import type { ReactNode } from 'react'
import { AnnouncementBar } from './AnnouncementBar'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

interface PageLayoutProps {
  children: ReactNode
  overlayNav?: boolean
}

export function PageLayout({ children, overlayNav = false }: PageLayoutProps) {
  return (
    <>
      <AnnouncementBar />
      <Navbar overlay={overlayNav} />
      {children}
      <Footer />
    </>
  )
}
