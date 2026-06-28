import { motion } from 'framer-motion'
import { useSponsors } from '../../lib/hooks/useSponsors'
import { SponsorLogo, SponsorLogoSkeleton } from '../ui/SponsorLogo'

const fallbackSponsors = [
  {
    id: 'pressing-on',
    name: 'Pressing On',
    logoUrl: '/media/2024/01/Pressing-On-Logo.png',
    tier: 'gold' as const,
    order: 1,
  },
  {
    id: 'union-home',
    name: 'Union Home Mortgage',
    logoUrl: '/media/2024/01/Union-Home-Mortgage-Logo.png',
    tier: 'gold' as const,
    order: 2,
  },
  {
    id: 'all-american',
    name: 'All-American Baseball Center',
    logoUrl: '/media/2024/01/All-American-Baseball-Center-Logo.png',
    tier: 'silver' as const,
    order: 3,
  },
  {
    id: 'dunhams',
    name: "Dunham's Sports",
    logoUrl: '/media/2024/01/Dunhams-Sports-Logo.png',
    tier: 'bronze' as const,
    order: 4,
  },
]

export function SponsorsRow() {
  const { data: sponsors, loading, error } = useSponsors()
  const displaySponsors = sponsors.length > 0 ? sponsors : fallbackSponsors

  return (
    <section className="py-10 md:py-12 bg-white border-t border-gray-100 content-auto" aria-label="Sponsors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <motion.h2
            className="font-display font-bold text-2xl text-navy uppercase shrink-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Sponsors
          </motion.h2>

          {error && (
            <p className="text-sm text-text-muted" role="alert">
              Showing sponsor logos from cache.
            </p>
          )}

          <div className="flex-1 overflow-x-auto md:overflow-visible">
            <div className="flex md:flex-wrap items-center gap-4 md:gap-8 min-w-max md:min-w-0">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <SponsorLogoSkeleton key={i} />)
                : displaySponsors.map((sponsor, index) => (
                    <motion.div
                      key={sponsor.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.08 }}
                    >
                      <SponsorLogo sponsor={sponsor} />
                    </motion.div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
