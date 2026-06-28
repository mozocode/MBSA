import { motion } from 'framer-motion'
import type { PartnerLogo } from '../../lib/sponsorContent'

interface PartnerLogoGridProps {
  logos: PartnerLogo[]
}

export function PartnerLogoGrid({ logos }: PartnerLogoGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {logos.map((logo, index) => (
        <motion.div
          key={logo.id}
          className="flex items-center justify-center bg-white rounded-sm border border-gray-100 p-4 min-h-[100px] shadow-sm hover:shadow-md transition-shadow"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.35, delay: (index % 12) * 0.03 }}
        >
          <img
            src={logo.logoUrl}
            alt={`${logo.name} logo`}
            className="max-h-16 w-auto object-contain"
            loading="lazy"
          />
        </motion.div>
      ))}
    </div>
  )
}
