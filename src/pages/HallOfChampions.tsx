import { championsGallery, HALL_OF_CHAMPIONS_HERO } from '../lib/championsGallery'
import { ChampionsGallery } from '../components/ui/ChampionsGallery'
import { PageHero } from '../components/ui/PageHero'
import { PageLayout } from '../components/layout/PageLayout'

const DECORATIVE_SHAPE =
  'https://mbsagators.com/wp-content/uploads/2023/12/shape-elements-about.png'

export function HallOfChampions() {
  return (
    <PageLayout overlayNav>
      <main>
        <PageHero
          title="Hall of"
          titleAccent="Champions"
          backgroundImage={HALL_OF_CHAMPIONS_HERO}
          decorativeImage={DECORATIVE_SHAPE}
        />

        <section className="py-12 md:py-16 bg-cream" aria-label="Champion team photos">
          <div className="max-w-7xl mx-auto px-4">
            <ChampionsGallery photos={championsGallery} />
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
