import { motion } from 'framer-motion'
import { PDF_ICON, type GrantDocument } from '../../lib/grantsContent'

interface GrantCardProps {
  document: GrantDocument
  index: number
}

export function GrantCard({ document, index }: GrantCardProps) {
  return (
    <motion.a
      href={document.pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full bg-white rounded-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow focus-ring"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      aria-label={`Open ${document.title} PDF`}
    >
      <div className="flex items-center justify-center bg-white p-6 min-h-[220px]">
        <img
          src={document.previewImage}
          alt=""
          className="max-h-52 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      <div className="flex items-center gap-3 bg-navy px-4 py-3 mt-auto">
        <img src={PDF_ICON} alt="" className="w-6 h-7 shrink-0" aria-hidden="true" />
        <span className="text-white text-sm font-semibold leading-snug group-hover:text-gold transition-colors">
          {document.title}
        </span>
      </div>
    </motion.a>
  )
}
