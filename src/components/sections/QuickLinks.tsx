import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const cards = [
  {
    title: 'GET STARTED WITH MBSA',
    href: '/get-started',
    image: '/media/2024/02/DSC_0724.jpeg',
  },
  {
    title: 'COACHES INFORMATION',
    href: '/coaches',
    image: '/media/2024/02/DSC_0728.jpeg',
  },
  {
    title: 'MBSA FAQ',
    href: '/faq',
    image: '/media/2024/02/DSC_0831.jpeg',
  },
]

export function QuickLinks() {
  return (
    <section className="py-16 bg-cream" aria-label="Quick links">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const inner = (
              <>
                <img
                  src={card.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/50 transition-colors" />
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <h2 className="font-display font-bold text-xl text-white uppercase leading-tight">
                    {card.title}
                  </h2>
                  <ArrowRight
                    className="w-6 h-6 text-gold mt-3 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </>
            )
            const motionProps = {
              initial: { opacity: 0, y: 24 } as const,
              whileInView: { opacity: 1, y: 0 } as const,
              viewport: { once: true, margin: '-40px' } as const,
              transition: { duration: 0.4, delay: index * 0.1 },
              className:
                'group relative h-64 overflow-hidden block focus-ring rounded-sm',
              'aria-label': card.title,
            }

            return card.href.startsWith('/') ? (
              <motion.div key={card.title} {...motionProps}>
                <Link to={card.href} className="absolute inset-0">
                  {inner}
                </Link>
              </motion.div>
            ) : (
              <motion.a key={card.title} href={card.href} {...motionProps}>
                {inner}
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
