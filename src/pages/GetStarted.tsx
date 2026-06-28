import { motion } from 'framer-motion'
import { PageHero } from '../components/ui/PageHero'
import { LeagueTable } from '../components/ui/LeagueTable'
import { GoldButton } from '../components/ui/GoldButton'
import { PageLayout } from '../components/layout/PageLayout'

const HERO_IMAGE =
  'https://mbsagators.com/wp-content/uploads/2024/01/In_House_Recreation_Rules-scaled.jpg'
const DECORATIVE_SHAPE =
  'https://mbsagators.com/wp-content/uploads/2023/12/shape-elements-about.png'
const COACHES_IMAGE =
  'https://mbsagators.com/wp-content/uploads/2024/01/coaches_corner.jpeg'

const baseballLeagues = [
  { league: 'Instructional League', ages: '5-6' },
  { league: 'Coach Pitch', ages: '7-8' },
  { league: 'Mustang', ages: '9-10' },
  { league: 'Bronco', ages: '11-12' },
  { league: 'Pony', ages: '13-14' },
  { league: 'American Legion', ages: '13-16' },
  { league: 'Colt', ages: '15-17' },
  { league: 'American Legion', ages: '19u' },
]

const softballLeagues = [
  { league: '6U', ages: '4-6' },
  { league: '8U', ages: '7-8' },
  { league: '10U', ages: '9-10' },
  { league: '12U', ages: '11-12' },
  { league: '14U', ages: '13-14' },
]

export function GetStarted() {
  return (
    <PageLayout overlayNav>
      <main>
        <PageHero
          title="Getting Started with"
          titleAccent="Monroeville Baseball & Softball"
          backgroundImage={HERO_IMAGE}
          decorativeImage={DECORATIVE_SHAPE}
        />

        <section className="relative bg-gradient-to-br from-navy via-navy-light to-navy py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl uppercase leading-tight text-white">
                  In House
                  <br />
                  <span className="text-gold">Recreation Leagues</span>
                </h2>
                <div className="mt-6 space-y-4 text-white/85 leading-relaxed">
                  <p>
                    Monroeville Baseball & Softball Recreation Leagues consist of two seasons: Spring
                    (April – June) and Fall (September – October). Registration for the spring league
                    begins in January while fall registration typically opens in July. Below is a list
                    of leagues and age brackets. Placement is determined on the player&apos;s age as of
                    April 30 for baseball and August 31 for softball.
                  </p>
                  <p>
                    Registration for these leagues cost $75 per session which includes a uniform.
                    Parents are additionally required to provide some concession items ($15–$20).
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="overflow-hidden rounded-sm shadow-2xl"
              >
                <img
                  src={COACHES_IMAGE}
                  alt="MBSA coaches and players at the field"
                  className="w-full h-full object-cover aspect-[4/3]"
                  loading="lazy"
                />
              </motion.div>
            </div>

            <motion.div
              className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <LeagueTable title="Baseball" rows={baseballLeagues} />
              <LeagueTable title="Softball" rows={softballLeagues} />
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-cream">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display font-bold text-3xl md:text-4xl text-navy uppercase">
                Tournament <span className="text-gold">Travel Teams</span>
              </h2>
              <p className="mt-6 text-text-muted leading-relaxed">
                Tournament teams start at age 7U. Tournament teams will travel to local tournaments in
                the Pittsburgh area just about every weekend in July. To be eligible to play in the
                tournament season, a player must be registered for spring in-house session, participate
                in 50% of the games for their in-house team and participate in at least one of the
                scheduled tryouts.
              </p>
              <div className="mt-8">
                <GoldButton href="https://mbsagators.com/register/">Get Started</GoldButton>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
