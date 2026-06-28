import { motion } from 'framer-motion'
import { useHomePage } from '../../lib/hooks/useHomePage'
import { GoldButton } from '../ui/GoldButton'

const HERO_IMAGE =
  '/media/2024/02/DSC_0830.jpeg'

export function Hero() {
  const { data: content, loading } = useHomePage()

  return (
    <section
      className="relative min-h-[85vh] flex items-center"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 0 100%)' }}
      aria-label="Hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        role="img"
        aria-label="MBSA Gators youth baseball action photo"
      />
      <div className="absolute inset-0 bg-[rgba(7,15,24,0.65)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
        {loading ? (
          <div className="space-y-4 animate-pulse max-w-xl">
            <div className="h-12 bg-white/20 rounded w-3/4" />
            <div className="h-12 bg-gold/30 rounded w-1/2" />
            <div className="h-6 bg-white/20 rounded w-2/3" />
          </div>
        ) : (
          <div className="max-w-2xl text-left">
            <motion.h1
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white uppercase leading-none"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {content.heroHeadline}
            </motion.h1>
            <motion.p
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-gold uppercase leading-none mt-1"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {content.heroHeadlineAccent}
            </motion.p>
            <motion.p
              className="font-display font-bold text-2xl md:text-3xl text-white uppercase mt-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {content.heroSubline}
            </motion.p>
            <motion.p
              className="text-white/85 text-lg mt-6 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              {content.heroSubtext}
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4 mt-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <GoldButton to="/get-started">Get Started</GoldButton>
              <GoldButton href="https://mbsagators.com/register/" variant="outline">
                Register Now
              </GoldButton>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
