import { motion } from 'framer-motion'
import {
  partnerLogos,
  SPONSOR_BANNER_IMAGE,
  SPONSOR_CONTACT_NAME,
  SPONSOR_HERO,
  SPONSOR_INTRO_HEADING,
  SPONSOR_LOGO_WHITE,
  sponsorTiers,
  SPONSORSHIP_EMAIL,
  SPONSORSHIP_FORM_URL,
} from '../lib/sponsorContent'
import { PartnerLogoGrid } from '../components/ui/PartnerLogoGrid'
import { GoldButton } from '../components/ui/GoldButton'
import { PageHero } from '../components/ui/PageHero'
import { SponsorTierCard } from '../components/ui/SponsorTierCard'
import { PageLayout } from '../components/layout/PageLayout'

const DECORATIVE_SHAPE =
  '/media/2023/12/shape-elements-about.png'

export function Sponsor() {
  return (
    <PageLayout overlayNav>
      <main>
        <PageHero
          title="Promote Your"
          titleAccent="Business"
          backgroundImage={SPONSOR_HERO}
          decorativeImage={DECORATIVE_SHAPE}
        />

        <section className="relative bg-cream pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              className="relative -mt-24 md:-mt-32 mb-12 md:mb-16"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-sm shadow-2xl bg-navy">
                <img
                  src={SPONSOR_BANNER_IMAGE}
                  alt="2026 MBSA sponsor banner"
                  className="w-full h-auto object-cover"
                />
                <img
                  src={SPONSOR_LOGO_WHITE}
                  alt=""
                  className="absolute top-4 left-4 md:top-6 md:left-6 w-24 md:w-32 h-auto opacity-95 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </motion.div>

            <motion.div
              className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-navy uppercase leading-tight mb-6">
                {SPONSOR_INTRO_HEADING}
              </h2>
              <p className="text-navy/80 leading-relaxed mb-6">
                If you are interested in learning more, please contact {SPONSOR_CONTACT_NAME} at:
              </p>
              <a
                href={`mailto:${SPONSORSHIP_EMAIL}`}
                className="inline-block text-lg font-semibold text-gold hover:text-navy transition-colors focus-ring rounded"
              >
                {SPONSORSHIP_EMAIL}
              </a>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <GoldButton href={SPONSORSHIP_FORM_URL} target="_blank" rel="noopener noreferrer">
                  Click For Sponsorship Form
                </GoldButton>
                <GoldButton to="/contact" variant="outline" className="!border-gold !text-navy">
                  Contact Us
                </GoldButton>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-5 md:gap-6 mb-16 md:mb-20">
              {sponsorTiers.map((tier, index) => (
                <SponsorTierCard key={tier.id} tier={tier} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display font-bold text-2xl md:text-3xl text-navy uppercase text-center mb-8 md:mb-10">
                Our Sponsors & Partners
              </h2>
              <PartnerLogoGrid logos={partnerLogos} />
            </motion.div>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
