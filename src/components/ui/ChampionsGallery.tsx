import { motion } from 'framer-motion'
import { useState } from 'react'
import type { ChampionPhoto } from '../../lib/championsGallery'
import { PhotoLightbox } from './PhotoLightbox'

interface ChampionsGalleryProps {
  photos: ChampionPhoto[]
}

export function ChampionsGallery({ photos }: ChampionsGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
        {photos.map((photo, index) => (
          <motion.button
            key={photo.id}
            type="button"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.35, delay: (index % 8) * 0.03 }}
            className="group relative aspect-[3/2] overflow-hidden rounded-sm focus-ring"
            onClick={() => setActiveIndex(index)}
            aria-label={`View champion photo ${index + 1}`}
          >
            <img
              src={photo.imageUrl}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 group-focus-visible:bg-black/50 transition-colors" />
          </motion.button>
        ))}
      </div>

      {activeIndex !== null && (
        <PhotoLightbox
          photos={photos}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  )
}
