import { GalleryGrid } from '../components/sections/GalleryGrid'
import { Hero } from '../components/sections/Hero'
import { MissionSection } from '../components/sections/MissionSection'
import { QuickLinks } from '../components/sections/QuickLinks'
import { SponsorsRow } from '../components/sections/SponsorsRow'
import { TournamentsGrid } from '../components/sections/TournamentsGrid'
import { PageLayout } from '../components/layout/PageLayout'

export function Home() {
  return (
    <PageLayout overlayNav>
      <main>
        <Hero />
        <QuickLinks />
        <MissionSection />
        <TournamentsGrid />
        <GalleryGrid />
        <SponsorsRow />
      </main>
    </PageLayout>
  )
}
