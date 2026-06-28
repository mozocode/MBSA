import { motion } from 'framer-motion'
import { fallbackTournaments } from '../../lib/fallbackData'
import { useTournaments } from '../../lib/hooks/useTournaments'
import { TournamentCard, TournamentCardSkeleton } from '../ui/TournamentCard'

export function TournamentsGrid() {
  const { data: tournaments, loading, error } = useTournaments()
  const displayTournaments = tournaments.length > 0 ? tournaments : fallbackTournaments

  return (
    <section className="py-16 bg-cream" aria-label="Tournaments">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="font-display font-bold text-3xl md:text-4xl text-navy uppercase mb-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Upcoming Tournaments
        </motion.h2>

        {error && (
          <p className="text-amber-700 mb-6 text-sm" role="status">
            Showing cached tournament listings.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <TournamentCardSkeleton key={i} />)
            : displayTournaments.map((tournament, index) => (
                <TournamentCard key={tournament.id} tournament={tournament} index={index} />
              ))}
        </div>

        {!loading && tournaments.length === 0 && !error && (
          <p className="text-text-muted text-center py-8">No tournaments available at this time.</p>
        )}
      </div>
    </section>
  )
}
