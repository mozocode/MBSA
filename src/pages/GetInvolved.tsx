import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  GET_INVOLVED_HERO,
  GET_INVOLVED_INTRO,
  GET_INVOLVED_REGISTER_URL,
  volunteerLinks,
} from '../lib/getInvolvedContent'
import { GetInvolvedTabs } from '../components/ui/GetInvolvedTabs'
import { GoldButton } from '../components/ui/GoldButton'
import { PageHero } from '../components/ui/PageHero'
import { PageLayout } from '../components/layout/PageLayout'

const DECORATIVE_SHAPE =
  '/media/2023/12/shape-elements-about.png'

export function GetInvolved() {
  return (
    <PageLayout overlayNav>
      <main>
        <PageHero
          title="Join"
          titleAccent="Us"
          backgroundImage={GET_INVOLVED_HERO}
          decorativeImage={DECORATIVE_SHAPE}
        />

        <section className="relative -mt-24 md:-mt-32 pt-16 md:pt-20 pb-16 md:pb-24 bg-gradient-to-b from-transparent via-cream/95 to-cream">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-navy/85 leading-relaxed mb-4">{GET_INVOLVED_INTRO}</p>
              <p className="text-navy/80">
                {volunteerLinks.map((link, index) => (
                  <span key={link.label}>
                    {index > 0 && <span className="mx-2 text-navy/40">|</span>}
                    {link.href ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="font-semibold text-navy underline decoration-gold/60 hover:text-gold transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : link.to ? (
                      <Link
                        to={link.to}
                        className="font-semibold text-navy underline decoration-gold/60 hover:text-gold transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="font-semibold text-navy">{link.label}</span>
                    )}
                  </span>
                ))}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GetInvolvedTabs />
            </motion.div>

            <motion.div
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <GoldButton href={GET_INVOLVED_REGISTER_URL}>Register</GoldButton>
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
