import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { fallbackTournaments } from '../../lib/fallbackData'
import { useTournaments } from '../../lib/hooks/useTournaments'
import { getClosestUpcomingTournaments } from '../../lib/tournamentUtils'
import { TournamentCard, TournamentCardSkeleton } from '../ui/TournamentCard'
import { GoldButton } from '../ui/GoldButton'

const UPCOMING_LIMIT = 3

export function TournamentsGrid() {
  const { data: tournaments, loading, error } = useTournaments()
  const source = tournaments.length > 0 ? tournaments : fallbackTournaments

  const upcomingTournaments = useMemo(
    () => getClosestUpcomingTournaments(source, UPCOMING_LIMIT),
    [source],
  )

  return (
    <section className="py-12 md:py-16 bg-cream content-auto overflow-x-clip" aria-label="Upcoming tournaments carousel">
      <div className="max-w-7xl mx-auto px-4 w-full min-w-0">
        <motion.h2
          className="font-display font-bold text-3xl md:text-4xl text-navy uppercase mb-8 text-center md:text-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Upcoming Tournaments
        </motion.h2>

        {error && (
          <p className="text-amber-700 mb-6 text-sm text-center md:text-left" role="status">
            Showing cached tournament listings.
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {Array.from({ length: UPCOMING_LIMIT }).map((_, i) => (
              <div key={i} className="min-w-0 max-w-full w-full">
                <TournamentCardSkeleton />
              </div>
            ))}
          </div>
        ) : upcomingTournaments.length === 0 ? (
          <p className="text-text-muted text-center py-8">No upcoming tournaments at this time.</p>
        ) : (
          <>
            <div
              className="grid grid-cols-1 gap-6 md:grid-cols-3"
              role="list"
              aria-label="Next three upcoming tournaments"
            >
              {upcomingTournaments.map((tournament, index) => (
                <div key={tournament.id} role="listitem" className="min-w-0 max-w-full w-full">
                  <TournamentCard tournament={tournament} index={index} />
                </div>
              ))}
            </div>
            <motion.div
              className="flex justify-center mt-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <GoldButton to="/tournaments">View All Tournaments</GoldButton>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
