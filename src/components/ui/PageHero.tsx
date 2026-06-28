import { motion } from 'framer-motion'

interface PageHeroProps {
  title: string
  titleAccent: string
  backgroundImage: string
  decorativeImage?: string
}

export function PageHero({ title, titleAccent, backgroundImage, decorativeImage }: PageHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        role="img"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.55)]" />

      {decorativeImage && (
        <img
          src={decorativeImage}
          alt=""
          className="absolute right-0 bottom-0 w-48 md:w-72 lg:w-96 opacity-20 pointer-events-none hidden md:block"
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-32 text-center">
        <motion.h1
          className="font-display font-bold uppercase leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">{title}</span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold mt-2">{titleAccent}</span>
        </motion.h1>
      </div>
    </section>
  )
}
