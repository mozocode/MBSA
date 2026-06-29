import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SPONSOR_RECORDS } from '../../lib/sponsorLogos'
import { SponsorLogo } from '../ui/SponsorLogo'

function SponsorMarquee() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const logos = reduceMotion ? SPONSOR_RECORDS : [...SPONSOR_RECORDS, ...SPONSOR_RECORDS]

  return (
    <div className="relative w-full overflow-hidden">
      {!reduceMotion && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent" />
        </>
      )}
      <div
        className={
          reduceMotion
            ? 'flex flex-wrap items-center justify-center gap-6 md:gap-8 py-2'
            : 'flex w-max animate-sponsor-marquee items-center gap-10 md:gap-14 py-2'
        }
      >
        {logos.map((sponsor, index) => (
          <div key={`${sponsor.id}-${index}`} className="shrink-0">
            <SponsorLogo sponsor={sponsor} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function SponsorsRow() {
  return (
    <section className="py-10 md:py-12 bg-white border-t border-gray-100 content-auto" aria-label="Sponsors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 text-center sm:text-left">
          <motion.h2
            className="font-display font-bold text-2xl text-navy uppercase"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Sponsors
          </motion.h2>
          <Link
            to="/sponsor"
            className="font-display font-bold text-xs uppercase tracking-wide text-gold hover:text-gold-dark transition-colors focus-ring rounded"
          >
            Become a Sponsor →
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <SponsorMarquee />
        </motion.div>
      </div>
    </section>
  )
}
