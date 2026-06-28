import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { PDF_ICON } from '../../lib/grantsContent'
import type { CoachResource } from '../../lib/coachesContent'

interface CoachResourceCardProps {
  resource: CoachResource
  index: number
}

export function CoachResourceCard({ resource, index }: CoachResourceCardProps) {
  const isExternal = resource.href.startsWith('http')

  return (
    <motion.a
      href={resource.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full bg-white rounded-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow focus-ring"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      aria-label={`Open ${resource.title}`}
    >
      <div className="flex items-center justify-center bg-white p-4 min-h-[220px]">
        <img
          src={resource.previewImage}
          alt=""
          className="max-h-52 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      <div className="flex items-center gap-3 bg-navy px-4 py-3 mt-auto">
        {isExternal ? (
          <ExternalLink className="w-5 h-5 shrink-0 text-gold" aria-hidden="true" />
        ) : (
          <img src={PDF_ICON} alt="" className="w-6 h-7 shrink-0" aria-hidden="true" />
        )}
        <span className="text-white text-sm font-semibold leading-snug group-hover:text-gold transition-colors">
          {resource.title}
        </span>
      </div>
    </motion.a>
  )
}
