import { motion } from 'framer-motion'
import { useHomePage } from '../../lib/hooks/useHomePage'
import { GoldButton } from '../ui/GoldButton'

const HERO_IMAGE = '/media/2024/02/DSC_0830.jpeg'

export function Hero() {
  const { data: content, loading } = useHomePage()

  return (
    <section
      className="relative min-h-[70vh] md:min-h-[85vh] flex items-center -mt-[var(--nav-height)] md:-mt-32"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 0 100%)' }}
      aria-label="Hero"
    >
      <img
        src={HERO_IMAGE}
        alt=""
        fetchPriority="high"
        decoding="async"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.65)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-20 w-full">
        {loading ? (
          <div className="space-y-4 animate-pulse max-w-xl">
            <div className="h-12 bg-white/20 rounded w-3/4" />
            <div className="h-12 bg-gold/30 rounded w-1/2" />
            <div className="h-6 bg-white/20 rounded w-2/3" />
          </div>
        ) : (
          <div className="max-w-2xl text-left">
            <motion.h1
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase leading-none"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {content.heroHeadline}
            </motion.h1>
            <motion.p
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold uppercase leading-none mt-1"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {content.heroHeadlineAccent}
            </motion.p>
            <motion.p
              className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-white uppercase mt-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {content.heroSubline}
            </motion.p>
            <motion.p
              className="text-white/85 text-base sm:text-lg mt-6 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              {content.heroSubtext}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <GoldButton to="/get-started" className="w-full sm:w-auto justify-center">
                Get Started
              </GoldButton>
              <GoldButton
                href="https://mbsagators.com/register/"
                variant="outline"
                className="w-full sm:w-auto justify-center"
              >
                Register Now
              </GoldButton>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
