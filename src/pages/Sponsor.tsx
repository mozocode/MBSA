import { motion } from 'framer-motion'
import { Check, Megaphone, Star, Trophy, Users } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { PageLayout } from '../components/layout/PageLayout'
import { useSponsors } from '../lib/hooks/useSponsors'

const HERO_BG =
  'https://mbsagators.com/wp-content/uploads/2025/06/banner-scaled.jpg'

const SPONSORSHIP_FORM_URL = 'https://mbsagators.com/sponsor-form/'
const SPONSORSHIP_EMAIL = 'sponsorship@mbsagators.com'
const CONTACT_NAME = 'Mehdi Hedjazi'

const LOGO_BASE = 'https://mbsagators.com/wp-content/uploads/2023/12'

const fallbackSponsorLogos: Array<{ name: string; logo: string }> = [
  { name: 'DC Welding', logo: `${LOGO_BASE}/dc-welding-1.png` },
  { name: 'Caliente', logo: `${LOGO_BASE}/caliente-1.png` },
  { name: 'GAMA', logo: `${LOGO_BASE}/gama-1.png` },
  { name: "Dick's Sporting Goods", logo: `${LOGO_BASE}/dicks-sporting-goods-1.png` },
  { name: 'All-American Baseball', logo: `${LOGO_BASE}/all_american_baseball_2023.png` },
  { name: 'Pressing On', logo: `${LOGO_BASE}/pressing-on.png` },
  { name: 'Rosato', logo: `${LOGO_BASE}/rosato.png` },
  { name: 'Woodring', logo: `${LOGO_BASE}/woodring.png` },
  { name: 'Heartland', logo: `${LOGO_BASE}/heartland-logo_dark_33390.png` },
  { name: 'Monroeville Animal Shelter', logo: `${LOGO_BASE}/monroeville-animal-shelter.png` },
  { name: 'Comfort Keepers', logo: `${LOGO_BASE}/comfort-keepers.png` },
  { name: 'Fazio Heating & Cooling', logo: `${LOGO_BASE}/fazio-heating-and-cooling.png` },
  { name: 'Artex Designs', logo: `${LOGO_BASE}/artex-designs.png` },
  { name: 'Dale Shirley', logo: `${LOGO_BASE}/dale-shirley.png` },
  { name: 'Affinity Counseling', logo: `${LOGO_BASE}/affinity-counseling.png` },
  { name: 'Supanic', logo: `${LOGO_BASE}/supanic.png` },
  { name: 'James Street Tavern', logo: `${LOGO_BASE}/james-street-tavern.png` },
  { name: "Dunham's Sports", logo: `${LOGO_BASE}/dunhams.png` },
  { name: 'Doyle Bros', logo: `${LOGO_BASE}/doyle-bros_.png` },
  { name: 'First National Bank', logo: `${LOGO_BASE}/first-national-bank-logo.png` },
  { name: 'Kafe Ayiti', logo: `${LOGO_BASE}/kafeayiti.png` },
  { name: "Mathey's", logo: `${LOGO_BASE}/matheys.png` },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
}

const whyStats = [
  {
    icon: Users,
    stat: '500+',
    label: 'Players & Families',
    description:
      'Reach hundreds of engaged community members at every game and event.',
  },
  {
    icon: Trophy,
    stat: '7',
    label: 'Tournaments Per Year',
    description:
      'Your brand featured at marquee events drawing teams from across the region.',
  },
  {
    icon: Megaphone,
    stat: '20+',
    label: 'Years of Community',
    description:
      'A trusted organization with deep roots in Monroeville, Western PA.',
  },
] as const

type TierId = 'white' | 'black' | 'gold' | 'gator' | 'mvp'

interface TierSpec {
  id: TierId
  icon: string
  name: string
  badge?: string
  bg: string
  text: string
  border: string
  ring?: boolean
  benefits: string[]
}

const tiers: TierSpec[] = [
  {
    id: 'white',
    icon: '⚾',
    name: 'White Sponsor',
    bg: '#FFFFFF',
    text: '#000000',
    border: '#E5E7EB',
    benefits: [
      'Name on League Sponsor Banner',
      'LED Board Recognition',
      'Social Media Recognition',
      'Website Recognition',
    ],
  },
  {
    id: 'black',
    icon: '🦎',
    name: 'Black Sponsor',
    bg: '#1A1A2E',
    text: '#FFFFFF',
    border: '#374151',
    benefits: [
      'Small-Sized Decal – League Sponsor Banner',
      'Concession Stand Recognition',
      'First Pitch of a Regular Season Game',
    ],
  },
  {
    id: 'gold',
    icon: '🏆',
    name: 'Gold Sponsor',
    badge: 'Most Popular',
    bg: '#F4C430',
    text: '#000000',
    border: '#F4C430',
    ring: true,
    benefits: [
      'Medium Sized Decal – League Sponsor Banner',
      'Thank You Plaque for Sponsored Team',
      'Team Sponsor Banner',
    ],
  },
  {
    id: 'gator',
    icon: '🐊',
    name: 'Gator Sponsor',
    bg: '#000000',
    text: '#F4C430',
    border: '#F4C430',
    benefits: [
      'Large Sized Decal – League Sponsor Banner',
      '10 Second Video Capable Time-Slot on LED Boards',
      'Runs M–F, 2× per day',
    ],
  },
  {
    id: 'mvp',
    icon: '🌟',
    name: 'MVP Event Sponsor',
    badge: 'Premium',
    bg: '#000000',
    text: '#FFFFFF',
    border: '#F4C430',
    benefits: [
      'XL Sized Decal – League Sponsor Banner',
      'Featured Event Sponsor',
      'Tournaments & All-star day',
    ],
  },
]

function GoldFilledButton({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="inline-flex items-center justify-center px-6 py-3 bg-gold text-navy font-display font-bold uppercase tracking-wide text-sm hover:bg-gold-light transition-all active:scale-[0.97] focus-ring"
    >
      {children}
    </a>
  )
}

function GoldOutlineButton({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center px-6 py-3 border-2 border-gold text-gold font-display font-bold uppercase tracking-wide text-sm hover:bg-gold hover:text-navy transition-all active:scale-[0.97] focus-ring"
    >
      {children}
    </a>
  )
}

function SponsorLogoCell({ name, logo }: { name: string; logo: string }) {
  const [hidden, setHidden] = useState(false)
  if (hidden) return null

  return (
    <motion.div
      className="aspect-square bg-white border border-gray-200 flex items-center justify-center p-4 transition-all hover:border-gold hover:shadow-md group"
      whileHover={{ scale: 1.02 }}
    >
      <img
        src={logo}
        alt={`${name} logo`}
        onError={() => setHidden(true)}
        className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
        loading="lazy"
      />
    </motion.div>
  )
}

function TierCard({ tier, index }: { tier: TierSpec; index: number }) {
  const isDarkText = tier.text === '#000000'

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`relative flex flex-col border hover:-translate-y-1 transition-transform duration-200 ${tier.ring ? 'ring-2 ring-gold' : ''}`}
      style={{ backgroundColor: tier.bg, color: tier.text, borderColor: tier.border }}
    >
      {tier.badge && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-display font-bold uppercase tracking-wide whitespace-nowrap"
          style={{
            backgroundColor: tier.id === 'gold' ? '#000000' : '#F4C430',
            color: tier.id === 'gold' ? '#F4C430' : '#000000',
          }}
        >
          {tier.badge}
        </div>
      )}

      <div className="p-5 pt-7 flex flex-col flex-1">
        <span className="text-3xl mb-3" aria-hidden>
          {tier.icon}
        </span>
        <h3 className="font-display font-bold uppercase text-lg mb-4 leading-tight">{tier.name}</h3>
        <ul className="space-y-2 flex-1 mb-6 text-sm leading-snug">
          {tier.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-2 items-start">
              <Check
                className="w-4 h-4 shrink-0 mt-0.5"
                style={{ color: isDarkText ? '#C49A0A' : '#F4C430' }}
                aria-hidden
              />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <a
          href={SPONSORSHIP_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center py-2.5 font-display font-bold uppercase text-sm transition-all active:scale-[0.97]"
          style={{
            backgroundColor: isDarkText ? '#000000' : '#F4C430',
            color: isDarkText ? '#FFFFFF' : '#000000',
          }}
        >
          Get Started
        </a>
      </div>
    </motion.div>
  )
}

export function Sponsor() {
  const { data: firestoreSponsors, loading } = useSponsors()

  const sponsorLogos: Array<{ name: string; logo: string }> =
    firestoreSponsors.length > 0
      ? firestoreSponsors.map((s) => ({ name: s.name, logo: s.logoUrl }))
      : fallbackSponsorLogos

  return (
    <PageLayout overlayNav>
      <main>
        {/* ── Hero ── */}
        <section
          className="relative min-h-[85vh] flex items-center"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 0 100%)' }}
          aria-label="Sponsor hero"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_BG})` }}
            role="img"
            aria-label="MBSA sponsor hero background"
          />
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.75)]" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 w-full">
            <div className="max-w-2xl text-left">
              <motion.span
                className="inline-block px-4 py-1.5 mb-6 text-xs font-display font-bold uppercase tracking-widest text-gold border border-gold/40 bg-navy/40"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                📍 MONROEVILLE, WESTERN PA
              </motion.span>

              <motion.h1
                className="font-display font-bold uppercase leading-none text-white"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                PROMOTE YOUR
              </motion.h1>
              <motion.p
                className="font-display font-bold uppercase leading-none text-gold mt-1"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                BUSINESS
              </motion.p>

              <motion.p
                className="mt-6 text-white/90 text-base md:text-lg leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Interested in becoming a sponsor or partnering with Monroeville Baseball & Softball
                Association? Join a community of local businesses investing in youth sports.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <GoldFilledButton href={SPONSORSHIP_FORM_URL}>
                  CLICK FOR SPONSORSHIP FORM →
                </GoldFilledButton>
                <GoldOutlineButton href={`mailto:${SPONSORSHIP_EMAIL}`}>
                  ✉ EMAIL US
                </GoldOutlineButton>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Why Sponsor ── */}
        <section className="bg-cream py-16 md:py-24" aria-label="Why sponsor">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-3xl md:text-4xl text-navy uppercase">
                WHY SPONSOR <span className="text-gold">MBSA?</span>
              </h2>
              <p className="mt-4 text-navy/80 leading-relaxed">
                Your sponsorship directly supports youth athletes in Monroeville and puts your brand
                in front of hundreds of local families every season.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whyStats.map((item, index) => (
                <motion.div
                  key={item.label}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white border-l-4 border-gold p-6 shadow-sm"
                >
                  <item.icon className="w-8 h-8 text-gold mb-4" aria-hidden />
                  <p className="font-display font-bold text-4xl text-navy">{item.stat}</p>
                  <p className="font-display font-bold uppercase text-navy mt-1 mb-2">
                    {item.label}
                  </p>
                  <p className="text-sm text-navy/70 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sponsorship Tiers ── */}
        <section className="bg-navy py-16 md:py-24" aria-label="Sponsorship tiers">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white uppercase">
                SPONSORSHIP <span className="text-gold">TIERS</span>
              </h2>
              <p className="mt-4 text-white/75 leading-relaxed">
                Choose the level that fits your business. Every tier includes recognition across our
                league, social media, and website.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 pt-4">
              {tiers.map((tier, index) => (
                <TierCard key={tier.id} tier={tier} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Logo Wall ── */}
        <section className="bg-cream py-16 md:py-24" aria-label="Current sponsors">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-3xl md:text-4xl text-navy uppercase">
                OUR <span className="text-gold">SPONSORS</span>
              </h2>
              <p className="mt-4 text-navy/80 leading-relaxed">
                Thank you to the local businesses and organizations who make MBSA possible.
              </p>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-white border border-gray-200 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {sponsorLogos.map((sponsor, index) => (
                  <motion.div
                    key={`${sponsor.name}-${index}`}
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <SponsorLogoCell name={sponsor.name} logo={sponsor.logo} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Contact CTA ── */}
        <section className="bg-navy py-16 md:py-24" aria-label="Contact">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Star className="w-10 h-10 text-gold mx-auto mb-6" aria-hidden />
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white uppercase">
                READY TO <span className="text-gold">PARTNER WITH US?</span>
              </h2>
              <p className="mt-4 text-white/80 leading-relaxed">
                Contact {CONTACT_NAME} to discuss sponsorship opportunities and find the right tier
                for your business.
              </p>
              <a
                href={`mailto:${SPONSORSHIP_EMAIL}`}
                className="inline-block mt-4 text-lg font-semibold text-gold hover:text-gold-light transition-colors focus-ring"
              >
                {SPONSORSHIP_EMAIL}
              </a>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <GoldFilledButton href={SPONSORSHIP_FORM_URL}>
                  CLICK FOR SPONSORSHIP FORM →
                </GoldFilledButton>
                <GoldOutlineButton href={`mailto:${SPONSORSHIP_EMAIL}`}>
                  ✉ EMAIL DIRECTLY
                </GoldOutlineButton>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
