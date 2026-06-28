import { lazy, Suspense } from 'react'
import { Hero } from '../components/sections/Hero'
import { MissionSection } from '../components/sections/MissionSection'
import { QuickLinks } from '../components/sections/QuickLinks'
import { TournamentsGrid } from '../components/sections/TournamentsGrid'
import { PageLayout } from '../components/layout/PageLayout'
import { RouteFallback } from '../components/ui/RouteFallback'

const GalleryGrid = lazy(() =>
  import('../components/sections/GalleryGrid').then((m) => ({ default: m.GalleryGrid })),
)
const SponsorsRow = lazy(() =>
  import('../components/sections/SponsorsRow').then((m) => ({ default: m.SponsorsRow })),
)

export function Home() {
  return (
    <PageLayout overlayNav>
      <main>
        <Hero />
        <QuickLinks />
        <MissionSection />
        <TournamentsGrid />
        <Suspense fallback={<RouteFallback />}>
          <GalleryGrid />
          <SponsorsRow />
        </Suspense>
      </main>
    </PageLayout>
  )
}
