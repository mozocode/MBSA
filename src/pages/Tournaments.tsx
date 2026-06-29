import { AnimatePresence, motion } from 'framer-motion'
import { Filter } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PageLayout } from '../components/layout/PageLayout'
import { tournamentArtwork, tournamentsHeroImage } from '../lib/tournamentArtwork'

type Status = 'open' | 'closed' | 'upcoming'
type Sport = 'baseball' | 'softball' | 'both' | 'open'
type FilterId = 'all' | 'baseball' | 'softball' | 'open'

interface TournamentListing {
  id: string
  name: string
  dates: string
  month: string
  price: string
  sport: Sport
  ages: string
  level: string
  status: Status
  image: string
  link: string
  description: string
}

const HERO_IMAGE = tournamentsHeroImage

const tournaments: TournamentListing[] = [
  {
    id: 'spring-ding',
    name: 'Monroeville Spring Ding',
    dates: 'April 10 – 12',
    month: 'APR',
    price: '$450',
    sport: 'both',
    ages: '*7u (baseball only), 8u, 9u, 10u, 11u, 12u, *14u (softball only)',
    level: 'OPEN',
    status: 'closed',
    image: tournamentArtwork.springDing,
    link: 'https://mbsagators.com/product/monroeville-spring-ding-april-10-april-12th/',
    description:
      'Kick off the spring season with the Gators. A community-level tournament welcoming baseball and softball teams from across Western PA.',
  },
  {
    id: 'swing-into-spring',
    name: 'Monroeville Gators Swing Into Spring',
    dates: 'April 24 – 26',
    month: 'APR',
    price: '$450',
    sport: 'both',
    ages: 'Baseball: 7u, 8u, 9u, 10u · Softball: 8u',
    level: 'C, Single Community',
    status: 'closed',
    image: tournamentArtwork.swingIntoSpring,
    link: 'https://mbsagators.com/product/monroeville-gators-swing-into-spring-april-24th-26th/',
    description:
      'The second spring showcase from the Gators — competitive play in a fun, family-friendly environment at some of the best fields in Western PA.',
  },
  {
    id: 'summer-in-the-swamp',
    name: 'Monroeville Summer in the Swamp',
    dates: 'May 29 – 31',
    month: 'MAY',
    price: '$450',
    sport: 'open',
    ages: '*7u (baseball only), 8u, 9u, 10u, 11u, 12u, *14u (softball only)',
    level: 'OPEN',
    status: 'open',
    image: tournamentArtwork.summerInTheSwamp,
    link: 'https://mbsagators.com/product/monroeville-summer-in-the-swamp-may-29st-31st/',
    description:
      'An open Memorial Day weekend tournament drawing teams from across the region. All skill levels welcome — come compete in the swamp.',
  },
  {
    id: 'summer-slam-1',
    name: 'Monroeville Summer Slam 1.0',
    dates: 'July 9 – 12',
    month: 'JUL',
    price: '$450',
    sport: 'both',
    ages: '*7u (baseball only), 8u, 9u, 10u, 11u, 12u, *14u (softball only)',
    level: 'B, Community',
    status: 'open',
    image: tournamentArtwork.summerSlam,
    link: 'https://mbsagators.com/product/monroeville-summer-slam-1-0-july-9-12th/',
    description:
      'The first of two Summer Slam events — a high-energy mid-summer tournament for baseball and softball teams looking for competitive B-level play.',
  },
  {
    id: 'summer-slam-2',
    name: 'Monroeville Summer Slam 2.0',
    dates: 'July 23 – 26',
    month: 'JUL',
    price: '$450',
    sport: 'both',
    ages: '*7u (baseball only), 8u, 9u, 10u, 11u, 12u, *14u (softball only)',
    level: 'B, Community',
    status: 'open',
    image: tournamentArtwork.summerSlam,
    link: 'https://mbsagators.com/product/monroeville-summer-slam-2-0-july-23rd-26th/',
    description:
      "Round two of the Summer Slam series. More teams, more games, more Gator hospitality. Don't miss the biggest summer weekend in Monroeville.",
  },
  {
    id: 'beach-bash',
    name: 'Monroeville Beach Bash',
    dates: 'July 30 – August 2',
    month: 'JUL',
    price: '$450',
    sport: 'both',
    ages: '*7u (baseball only), 8u, 9u, 10u, 11u, 12u, *14u (softball only)',
    level: 'B, Community',
    status: 'open',
    image: tournamentArtwork.beachBash,
    link: 'https://mbsagators.com/product/monroeville-beach-bash-july-30th-august-2nd/',
    description:
      "Summer's biggest bash. A beach-themed tournament with great competition and an unforgettable atmosphere for players and families alike.",
  },
  {
    id: 'pumpkin-smash',
    name: 'Monroeville Baseball Pumpkin Smash',
    dates: 'October 1 – 4',
    month: 'OCT',
    price: '$450',
    sport: 'baseball',
    ages: '*7u (baseball only), 8u, 9u, 10u, 11u, 12u',
    level: 'B, Community',
    status: 'upcoming',
    image: tournamentArtwork.pumpkinSmash,
    link: 'https://mbsagators.com/product/monroeville-baseball-pumpkin-smash-october-1st-4th/',
    description:
      'Close out the season with a fall classic. The Pumpkin Smash is a beloved Gators tradition — baseball at its best as the leaves start to turn.',
  },
]

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All Tournaments' },
  { id: 'baseball', label: 'Baseball' },
  { id: 'softball', label: 'Softball' },
  { id: 'open', label: 'Open' },
]

const STAT_PILLS = [
  { icon: '🏆', label: '7 Tournaments' },
  { icon: '📅', label: 'April – October' },
  { icon: '💲', label: '$450 Per Team' },
  { icon: '👥', label: 'Baseball & Softball' },
] as const

const VENUE_BADGES = [
  { icon: '🏟️', label: 'Turf Fields with Lights' },
  { icon: '📺', label: 'Digital Scoreboards & LED Screens' },
  { icon: '🍔', label: 'Full-Service Concessions' },
  { icon: '💳', label: 'Credit Cards Accepted On-Site' },
  { icon: '🧑‍⚖️', label: 'Patch Umpires All Games' },
  { icon: '📱', label: 'Online Ordering Available' },
] as const

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07 },
  }),
}

const STATUS_CONFIG: Record<
  Status,
  { label: string; bg: string; text: string }
> = {
  open: { label: 'Registration Open', bg: '#16A34A', text: '#FFFFFF' },
  closed: { label: 'Registration Closed', bg: '#6B7280', text: '#FFFFFF' },
  upcoming: { label: 'Coming Soon', bg: '#F4C430', text: '#0D1B2A' },
}

function hideBrokenImage(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.style.display = 'none'
}

function matchesFilter(tournament: TournamentListing, filter: FilterId): boolean {
  if (filter === 'all') return true
  if (filter === 'baseball') {
    return (
      tournament.sport === 'baseball' ||
      tournament.sport === 'both' ||
      tournament.sport === 'open'
    )
  }
  if (filter === 'softball') {
    return tournament.sport === 'softball' || tournament.sport === 'both'
  }
  return tournament.sport === 'open'
}

function TournamentCard({
  tournament,
  index,
}: {
  tournament: TournamentListing
  index: number
}) {
  const statusStyle = STATUS_CONFIG[tournament.status]

  return (
    <motion.article
      key={tournament.id}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group flex flex-col bg-white border-2 border-[#E5E7EB] hover:border-gold transition-colors"
    >
      <div className="relative aspect-square bg-navy overflow-hidden">
        <img
          src={tournament.image}
          alt={`${tournament.name} tournament artwork`}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={hideBrokenImage}
        />
        <span className="absolute top-0 left-0 bg-gold text-navy font-display font-bold text-xs px-3 py-1.5 uppercase tracking-wide">
          {tournament.month}
        </span>
        <span
          className="absolute top-0 right-0 font-display font-bold text-xs px-3 py-1.5 uppercase tracking-wide"
          style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
        >
          {statusStyle.label}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display font-bold text-xl text-navy uppercase leading-tight">
          {tournament.name}
        </h3>
        <p className="text-text-muted text-sm mt-2 leading-relaxed">{tournament.description}</p>

        <div className="grid grid-cols-2 gap-px bg-[#E5E7EB] mt-5 border border-[#E5E7EB]">
          <DetailCell icon="📅" label="Dates" value={tournament.dates} />
          <DetailCell icon="💲" label="Price" value={tournament.price} />
          <DetailCell icon="👥" label="Ages" value={tournament.ages} />
          <DetailCell icon="🏆" label="Level" value={tournament.level} />
        </div>

        <div className="mt-5">
          {tournament.status === 'open' && (
            <a
              href={tournament.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-gold text-navy font-display font-bold uppercase text-sm tracking-wide py-3 hover:bg-gold-dark transition-colors focus-ring"
            >
              Register Now →
            </a>
          )}
          {tournament.status === 'upcoming' && (
            <a
              href={tournament.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center border-2 border-gold text-gold font-display font-bold uppercase text-sm tracking-wide py-3 hover:bg-gold hover:text-navy transition-colors focus-ring"
            >
              View Details →
            </a>
          )}
          {tournament.status === 'closed' && (
            <span
              className="block w-full text-center bg-[#6B7280] text-white font-display font-bold uppercase text-sm tracking-wide py-3 cursor-not-allowed"
              aria-disabled="true"
            >
              Registration Closed
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function DetailCell({
  icon,
  label,
  value,
}: {
  icon: string
  label: string
  value: string
}) {
  return (
    <div className="bg-cream p-3">
      <p className="text-gold text-base leading-none mb-1" aria-hidden="true">
        {icon}
      </p>
      <p className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">{label}</p>
      <p className="font-bold text-navy text-sm mt-0.5 leading-snug">{value}</p>
    </div>
  )
}

export function Tournaments() {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all')

  const filteredTournaments = useMemo(
    () => tournaments.filter((t) => matchesFilter(t, activeFilter)),
    [activeFilter],
  )

  return (
    <PageLayout overlayNav>
      <main>
        {/* Hero */}
        <section
          className="relative min-h-[50vh] flex items-center"
          aria-label="Tournaments hero"
        >
          <div
            className="absolute inset-x-0 bottom-0 top-[calc(-1*(var(--nav-height)+env(safe-area-inset-top,0px)))]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 0 100%)' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${HERO_IMAGE})` }}
              role="img"
              aria-label="MBSA Gators tournament action photo"
            />
            <div className="absolute inset-0 bg-[rgba(7,15,24,0.80)]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-20 w-full">
            <div className="max-w-3xl text-left">
              <motion.span
                className="inline-flex items-center gap-2 bg-gold/20 text-gold font-display font-bold text-xs uppercase tracking-widest px-4 py-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                📍 Monroeville, Western PA
              </motion.span>

              <motion.h1
                className="font-display font-bold text-white uppercase leading-none"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                MBSA{' '}
                <span className="text-gold">Tournaments</span>
              </motion.h1>

              <motion.p
                className="text-white/90 text-lg mt-6 max-w-xl leading-relaxed italic"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                Seven events. One season. Register your team and compete at some of the best
                fields in Western PA.
              </motion.p>

              <div className="flex flex-wrap gap-3 mt-8">
                {STAT_PILLS.map((pill, i) => (
                  <motion.span
                    key={pill.label}
                    custom={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                    className="inline-flex items-center gap-2 bg-white/10 text-white font-display font-bold text-xs uppercase tracking-wide px-4 py-2"
                  >
                    <span className="text-gold" aria-hidden="true">
                      {pill.icon}
                    </span>
                    {pill.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Venue info */}
        <section className="bg-white border-b border-[#E5E7EB] py-16" aria-label="Venue information">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display font-bold text-2xl md:text-3xl text-navy uppercase leading-tight mb-6">
                  Our Tournaments Bring the Action to{' '}
                  <span className="text-gold">Monroeville Community Parks</span>
                </h2>
                <div className="space-y-4 text-navy/80 leading-relaxed">
                  <p>
                    Monroeville Baseball & Softball Tournaments are held at our Monroeville
                    Community Park West/East in Monroeville, PA — 2399 Tilbrook Rd, Monroeville,
                    PA 15146.
                  </p>
                  <p>
                    Our tournaments are played at a state-of-the-art facility with turf fields,
                    lights, digital scoreboards and LED screens, with a full-service concessions
                    operation that offers a variety of food, drinks and snacks. We accept credit
                    cards at our point of sale with online ordering for those that don&apos;t want to
                    wait in line!
                  </p>
                  <p>
                    Each of our tournaments are officiated by patch umpires for all games other
                    than 7U/8U Pool Play Baseball (MBSA board members umpire those games). All
                    semi-final and championship games will have at least 1 official umpire.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {VENUE_BADGES.map((badge) => (
                  <div
                    key={badge.label}
                    className="bg-cream border-l-4 border-gold px-4 py-4 flex flex-col gap-2"
                  >
                    <span className="text-xl" aria-hidden="true">
                      {badge.icon}
                    </span>
                    <span className="font-display font-bold text-sm text-navy uppercase leading-snug">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sticky filter bar — sits directly above the event grid */}
        <div
          className="sticky top-[calc(var(--nav-height)+env(safe-area-inset-top,0px))] z-30 bg-navy border-b border-white/10"
          role="toolbar"
          aria-label="Filter tournaments"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3 md:gap-4">
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 min-w-0">
              <span className="inline-flex items-center gap-2 text-white/70 font-display font-bold text-xs uppercase tracking-wide shrink-0">
                <Filter className="w-4 h-4 text-gold" aria-hidden="true" />
                Filter
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap [-webkit-overflow-scrolling:touch]">
                {FILTERS.map((filter) => {
                  const isActive = activeFilter === filter.id
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setActiveFilter(filter.id)}
                      className={`font-display font-bold text-xs uppercase tracking-wide px-4 py-2.5 transition-colors focus-ring shrink-0 ${
                        isActive
                          ? 'bg-gold text-navy'
                          : 'border border-white/20 text-white/70 hover:border-gold hover:text-gold'
                      }`}
                      aria-pressed={isActive}
                    >
                      {filter.label}
                    </button>
                  )
                })}
              </div>
            </div>
            <p className="font-display font-bold text-sm text-gold uppercase tracking-wide shrink-0 sm:text-right">
              {filteredTournaments.length} event{filteredTournaments.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Tournament grid */}
        <section className="py-16 bg-cream" aria-label="Tournament listings">
          <div className="max-w-7xl mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredTournaments.map((tournament, index) => (
                  <TournamentCard key={tournament.id} tournament={tournament} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredTournaments.length === 0 && (
              <p className="text-center text-text-muted py-12 font-display uppercase tracking-wide">
                No tournaments match this filter.
              </p>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-navy py-16" aria-label="Tournament registration contact">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <motion.h2
              className="font-display font-bold text-3xl md:text-4xl text-white uppercase"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Questions About{' '}
              <span className="text-gold">Registration?</span>
            </motion.h2>
            <motion.p
              className="text-white/80 mt-4 leading-relaxed"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Contact our tournaments director for information on team registration, scheduling,
              age groups, or field locations.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a
                href="mailto:tournaments@mbsagators.com"
                className="w-full sm:w-auto inline-block bg-gold text-navy font-display font-bold uppercase text-sm tracking-wide px-8 py-3 hover:bg-gold-dark transition-colors focus-ring"
              >
                Email Tournaments Director
              </a>
              <a
                href="https://mbsagators.com/tournaments/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-block border-2 border-gold text-gold font-display font-bold uppercase text-sm tracking-wide px-8 py-3 hover:bg-gold hover:text-navy transition-colors focus-ring"
              >
                View on MBSA Site
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
