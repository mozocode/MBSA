import { grantDocuments, GRANTS_HERO } from '../lib/grantsContent'
import { GrantCard } from '../components/ui/GrantCard'
import { GoldButton } from '../components/ui/GoldButton'
import { PageHero } from '../components/ui/PageHero'
import { PageLayout } from '../components/layout/PageLayout'

const DECORATIVE_SHAPE =
  '/media/2023/12/shape-elements-about.png'

export function Grants() {
  return (
    <PageLayout overlayNav>
      <main>
        <PageHero
          title="MBSA"
          titleAccent="Grants"
          backgroundImage={GRANTS_HERO}
          decorativeImage={DECORATIVE_SHAPE}
        />

        <section
          className="relative -mt-24 md:-mt-32 pt-16 md:pt-20 pb-16 md:pb-24 bg-gradient-to-b from-transparent via-navy/95 to-navy"
          aria-label="Grant documents"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {grantDocuments.map((document, index) => (
                <GrantCard key={document.id} document={document} index={index} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <GoldButton to="/contact" variant="outline">
                Contact Us
              </GoldButton>
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
