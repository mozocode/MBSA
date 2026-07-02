import { motion } from 'framer-motion'
import {
  COACHES_HERO,
  CONSTITUTION_PDF,
  POLICIES_PDF,
} from '../lib/coachesContent'
import { CoachesTabs } from '../components/ui/CoachesTabs'
import { GoldButton } from '../components/ui/GoldButton'
import { PageHero } from '../components/ui/PageHero'
import { PageLayout } from '../components/layout/PageLayout'

const DECORATIVE_SHAPE = '/media/2023/12/shape-elements-about.png'

export function Coaches() {
  return (
    <PageLayout overlayNav>
      <main>
        <PageHero
          title="Coaches"
          titleAccent="Corner"
          backgroundImage={COACHES_HERO}
          decorativeImage={DECORATIVE_SHAPE}
        />

        <section className="relative -mt-24 md:-mt-32 pt-16 md:pt-20 pb-16 md:pb-24 bg-gradient-to-b from-transparent via-cream/95 to-cream">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-10 md:mb-12 bg-white rounded-sm border border-navy/10 shadow-sm px-6 py-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-navy leading-relaxed">
                Interested in coaching? Please review MBSA&apos;s{' '}
                <a
                  href={CONSTITUTION_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-navy underline decoration-gold/60 hover:text-gold transition-colors"
                >
                  Constitution and Bylaws
                </a>{' '}
                and{' '}
                <a
                  href={POLICIES_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-navy underline decoration-gold/60 hover:text-gold transition-colors"
                >
                  Policies
                </a>
                . Contact Executive Commissioner Josh Plassmeyer at{' '}
                <a
                  href="mailto:commissioner@mbsagators.com"
                  className="font-semibold text-gold hover:text-navy transition-colors"
                >
                  commissioner@mbsagators.com
                </a>{' '}
                for more details.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <CoachesTabs />
            </motion.div>

            <motion.div
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <GoldButton to="/practice-schedule">Practice Schedule</GoldButton>
              <GoldButton to="/contact" variant="outline" className="!border-gold !text-navy">
                Contact Us
              </GoldButton>
            </motion.div>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
