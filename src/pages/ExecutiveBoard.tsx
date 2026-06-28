import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { boardMembers } from '../lib/boardMembers'
import { BoardMemberCard } from '../components/ui/BoardMemberCard'
import { PageHero } from '../components/ui/PageHero'
import { PageLayout } from '../components/layout/PageLayout'

const HERO_IMAGE =
  'https://mbsagators.com/wp-content/uploads/2024/01/IMG_2177-scaled.jpeg'
const DECORATIVE_SHAPE =
  'https://mbsagators.com/wp-content/uploads/2023/12/shape-elements-about.png'

export function ExecutiveBoard() {
  return (
    <PageLayout overlayNav>
      <main>
        <PageHero
          title="MBSA Executive Board"
          titleAccent="Monroeville Baseball & Softball"
          backgroundImage={HERO_IMAGE}
          decorativeImage={DECORATIVE_SHAPE}
        />

        <section className="py-12 md:py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-navy uppercase leading-tight">
                Monroeville Baseball & Softball
                <br />
                <span className="text-gold">Association Executive Board</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {boardMembers.map((member, index) => (
                <BoardMemberCard key={member.id} member={member} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-navy">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white uppercase mb-4">
                Contact us at
              </h2>
              <a
                href="mailto:info@mbsagators.com"
                className="inline-flex items-center gap-2 text-gold text-lg font-semibold hover:text-gold-light transition-colors focus-ring rounded"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
                info@mbsagators.com
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
