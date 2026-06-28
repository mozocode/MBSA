import { motion } from 'framer-motion'
import { useHomePage } from '../../lib/hooks/useHomePage'
import { NavyButton } from '../ui/NavyButton'

const MISSION_IMAGE =
  'https://mbsagators.com/wp-content/uploads/2024/01/Monroeville-Plays-Ball.jpg'

const PDF_LINKS = [
  {
    label: 'MBSA Code of Conduct',
    href: 'https://mbsagators.com/wp-content/uploads/2024/01/MBSA-Code-of-Conduct.pdf',
  },
  {
    label: 'MBSA Constitution and Bylaws',
    href: 'https://mbsagators.com/wp-content/uploads/2024/01/MBSA-Constitution-and-By-Laws.pdf',
  },
  {
    label: 'MBSA Policies',
    href: 'https://mbsagators.com/wp-content/uploads/2024/01/MBSA-Policies.pdf',
  },
]

export function MissionSection() {
  const { data: content, loading } = useHomePage()

  return (
    <section className="py-16 bg-white" aria-label="Mission">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="aspect-video w-full overflow-hidden rounded-sm bg-navy"
          >
            {loading ? (
              <div className="w-full h-full animate-pulse bg-navy-light/30" />
            ) : content.videoUrl ? (
              <iframe
                src={content.videoUrl}
                title="MBSA Gators video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                src={MISSION_IMAGE}
                alt="Monroeville Plays Ball"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl uppercase leading-tight">
              <span className="text-gold">Monroeville</span>
              <br />
              <span className="text-navy">Plays Ball</span>
            </h2>
            {loading ? (
              <div className="mt-6 space-y-3 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
              </div>
            ) : (
              <>
                <p className="mt-6 text-text-muted leading-relaxed">{content.missionBody}</p>
                <a
                  href={`mailto:${content.missionEmail}`}
                  className="inline-block mt-4 text-gold-dark font-semibold hover:text-gold transition-colors focus-ring rounded"
                >
                  {content.missionEmail}
                </a>
              </>
            )}
            <div className="mt-8 space-y-3">
              {PDF_LINKS.map((link) => (
                <NavyButton key={link.label} href={link.href}>
                  {link.label}
                </NavyButton>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
