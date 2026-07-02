import { motion } from 'framer-motion'
import { CLINICS_HERO, CLINICS_INTRO_HEADING, CLINICS_INTRO_TEXT, CLINICS_SOFTBALL_FLYER } from '../lib/clinicEvents'
import { GoldButton } from '../components/ui/GoldButton'
import { PageHero } from '../components/ui/PageHero'
import { PageLayout } from '../components/layout/PageLayout'

const DECORATIVE_SHAPE =
  '/media/2023/12/shape-elements-about.png'

export function Clinics() {
  return (
    <PageLayout overlayNav>
      <main>
        <PageHero
          title="MBSA"
          titleAccent="Clinics"
          backgroundImage={CLINICS_HERO}
          decorativeImage={DECORATIVE_SHAPE}
        />

        <section className="py-12 md:py-16 lg:py-20 bg-cream">
          <div className="max-w-5xl mx-auto px-4">
            <motion.h2
              className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-navy uppercase text-center leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              {CLINICS_INTRO_HEADING}
            </motion.h2>

            <motion.p
              className="text-center text-navy/80 max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              {CLINICS_INTRO_TEXT}
            </motion.p>

            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <img
                src={CLINICS_SOFTBALL_FLYER}
                alt="MBSA sponsored softball clinic flyer"
                className="w-full rounded-sm shadow-md border border-navy/10"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <GoldButton to="/get-started" variant="outline" className="!border-gold !text-navy">
                Get Started
              </GoldButton>
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
