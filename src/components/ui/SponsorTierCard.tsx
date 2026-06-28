import { motion } from 'framer-motion'
import type { SponsorTier } from '../../lib/sponsorContent'

const tierStyles: Record<
  SponsorTier['id'],
  { card: string; title: string; bullet: string }
> = {
  white: {
    card: 'bg-white border-gray-200 text-navy',
    title: 'text-navy',
    bullet: 'text-navy/75',
  },
  black: {
    card: 'bg-navy border-navy-light text-white',
    title: 'text-gold',
    bullet: 'text-white/85',
  },
  gold: {
    card: 'bg-cream border-gold/60 text-navy',
    title: 'text-navy',
    bullet: 'text-navy/80',
  },
  gator: {
    card: 'bg-navy-light border-gold/40 text-white',
    title: 'text-gold',
    bullet: 'text-white/85',
  },
  mvp: {
    card: 'bg-gradient-to-br from-gold via-gold-light to-gold text-navy border-gold',
    title: 'text-navy',
    bullet: 'text-navy/85',
  },
}

interface SponsorTierCardProps {
  tier: SponsorTier
  index: number
}

export function SponsorTierCard({ tier, index }: SponsorTierCardProps) {
  const styles = tierStyles[tier.id]

  return (
    <motion.article
      className={`flex flex-col h-full rounded-sm border p-6 shadow-sm ${styles.card}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <h3 className={`font-display font-bold text-xl md:text-2xl uppercase mb-4 ${styles.title}`}>
        {tier.name}
      </h3>
      <ul className="space-y-2 mt-auto">
        {tier.benefits.map((benefit) => (
          <li key={benefit} className={`flex gap-2 text-sm leading-relaxed ${styles.bullet}`}>
            <span className="text-gold shrink-0" aria-hidden="true">
              •
            </span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}
