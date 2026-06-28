import { motion } from 'framer-motion'
import { useInstagramFeed } from '../../lib/hooks/useInstagramFeed'
import { GoldButton } from '../ui/GoldButton'
import { FacebookIcon, InstagramIcon, TwitterIcon } from '../ui/SocialIcons'

const INSTAGRAM_PROFILE = 'https://www.instagram.com/mbsagators'

type DisplayPhoto = {
  id: string
  imageUrl: string
  permalink: string
  caption?: string
}

const fallbackPhotos: DisplayPhoto[] = [
  '/media/2024/02/DSC_0724.jpeg',
  '/media/2024/02/DSC_0725.jpeg',
  '/media/2024/02/DSC_0726.jpeg',
  '/media/2024/02/DSC_0727.jpeg',
  '/media/2024/02/DSC_0728.jpeg',
  '/media/2024/02/DSC_0729.jpeg',
  '/media/2024/02/DSC_0830.jpeg',
  '/media/2024/02/DSC_0831.jpeg',
].map((url, i) => ({
  id: `fallback-${i}`,
  imageUrl: url,
  permalink: INSTAGRAM_PROFILE,
}))

function GallerySkeleton() {
  return (
    <div className="aspect-square bg-navy-light/30 animate-pulse rounded-sm" aria-hidden="true" />
  )
}

export function GalleryGrid() {
  const { data: posts, loading, error } = useInstagramFeed(8)
  const displayPhotos = posts.length > 0 ? posts : fallbackPhotos

  return (
    <section className="py-16 bg-navy" aria-label="Instagram gallery">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <motion.h2
            className="font-display font-bold text-3xl md:text-4xl text-white uppercase"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Ball Out With Us
          </motion.h2>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/mbsagators"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-gold/40 text-gold hover:bg-gold hover:text-navy transition-colors focus-ring rounded-full"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a
              href={INSTAGRAM_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-gold/40 text-gold hover:bg-gold hover:text-navy transition-colors focus-ring rounded-full"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/mbsagators"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-gold/40 text-gold hover:bg-gold hover:text-navy transition-colors focus-ring rounded-full"
              aria-label="X (Twitter)"
            >
              <TwitterIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {error && (
          <p className="text-gold-light mb-6" role="alert">
            Showing cached gallery photos.
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <GallerySkeleton key={i} />)
            : displayPhotos.slice(0, 8).map((photo, index) => (
                <motion.a
                  key={photo.id}
                  href={photo.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative aspect-square overflow-hidden rounded-sm focus-ring"
                  aria-label={photo.caption ?? 'View on Instagram'}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption ?? 'MBSA Gators on Instagram'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/70 transition-colors flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                    <InstagramIcon className="w-8 h-8 text-gold mb-2" aria-hidden="true" />
                    <span className="text-white font-semibold text-sm">@mbsagators</span>
                  </div>
                </motion.a>
              ))}
        </div>

        <div className="mt-8 text-center">
          <GoldButton
            href={INSTAGRAM_PROFILE}
            variant="outline"
            className="!text-white !border-gold hover:!text-navy"
          >
            Follow @mbsagators on Instagram
          </GoldButton>
        </div>
      </div>
    </section>
  )
}
