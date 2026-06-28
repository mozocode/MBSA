import { motion } from 'framer-motion'
import { PRACTICE_SCHEDULE_HERO } from '../lib/practiceScheduleContent'
import { PracticeCalendarEmbed } from '../components/ui/PracticeCalendarEmbed'
import { GoldButton } from '../components/ui/GoldButton'
import { PageHero } from '../components/ui/PageHero'
import { PageLayout } from '../components/layout/PageLayout'

const DECORATIVE_SHAPE = '/media/2023/12/shape-elements-about.png'

export function PracticeSchedule() {
  return (
    <PageLayout overlayNav>
      <main>
        <PageHero
          title="2026"
          titleAccent="Practice Schedule"
          backgroundImage={PRACTICE_SCHEDULE_HERO}
          decorativeImage={DECORATIVE_SHAPE}
        />

        <section className="relative -mt-24 md:-mt-32 pt-16 md:pt-20 pb-16 md:pb-24 bg-gradient-to-b from-transparent via-cream/95 to-cream">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              className="text-center max-w-2xl mx-auto mb-8 md:mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-navy/85 leading-relaxed">
                View the latest MBSA practice schedule below. Times and locations are updated by
                league commissioners — check back often for changes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <PracticeCalendarEmbed />
            </motion.div>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <GoldButton to="/coaches">Coaches Information</GoldButton>
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
