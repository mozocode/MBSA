import { motion } from 'framer-motion'
import { PublicCalendar } from '../components/calendar/PublicCalendar'
import { PageHero } from '../components/ui/PageHero'
import { PageLayout } from '../components/layout/PageLayout'

const HERO_IMAGE = '/media/2024/01/IMG_8377.jpeg'
const DECORATIVE_SHAPE = '/media/2023/12/shape-elements-about.png'

export function Calendar() {
  return (
    <PageLayout overlayNav>
      <main>
        <PageHero
          title="Events"
          titleAccent="Calendar"
          backgroundImage={HERO_IMAGE}
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
                Stay up to date on tournaments, registration windows, tryouts, meetings, and more.
                Click any event for details.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <PublicCalendar />
            </motion.div>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
