import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Tournament } from '../../lib/types'
import { tournamentRegisterPath } from '../../lib/productUtils'

interface TournamentCardProps {
  tournament: Tournament
  index?: number
}

export function TournamentCard({ tournament, index = 0 }: TournamentCardProps) {
  const isClosed = tournament.status === 'closed'
  const registerPath = tournamentRegisterPath(tournament)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex flex-col bg-white shadow-md overflow-hidden border-l-4 border-gold"
    >
      <div className="relative aspect-square bg-navy p-4">
        <img
          src={tournament.artworkUrl}
          alt={`${tournament.name} tournament artwork`}
          className="w-full h-full object-contain"
          loading="lazy"
          decoding="async"
        />
        <span className="absolute top-3 right-3 bg-gold text-navy font-display font-bold text-xs px-3 py-1 uppercase">
          {tournament.dateLabel}
        </span>
        {isClosed && (
          <span className="absolute bottom-3 left-3 bg-red-600 text-white font-display font-bold text-xs px-3 py-1 uppercase">
            Out of Stock
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-display font-bold text-lg text-navy leading-tight">{tournament.name}</h3>
        <p className="text-sm text-text-muted">
          {tournament.sport} · {tournament.ages}
        </p>
        <p className="text-sm text-text-muted">{tournament.level}</p>
        <p className="font-bold text-navy mt-auto">${tournament.price}</p>
        {!isClosed ? (
          <Link
            to={registerPath}
            className="inline-flex items-center gap-1 text-gold-dark font-semibold text-sm hover:text-gold focus-ring rounded"
            aria-label={`Register for ${tournament.name}`}
          >
            Register <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        ) : (
          <span className="text-sm text-text-muted">Registration closed</span>
        )}
      </div>
    </motion.article>
  )
}

export function TournamentCardSkeleton() {
  return (
    <div className="flex flex-col bg-white shadow-md overflow-hidden border-l-4 border-gold animate-pulse">
      <div className="aspect-square bg-navy-light/30" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-5 bg-gray-200 rounded w-1/4 mt-4" />
      </div>
    </div>
  )
}
