import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect } from 'react'

interface PhotoLightboxProps {
  photos: { imageUrl: string; alt: string }[]
  activeIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function PhotoLightbox({ photos, activeIndex, onClose, onNavigate }: PhotoLightboxProps) {
  const photo = photos[activeIndex]
  const hasPrev = activeIndex > 0
  const hasNext = activeIndex < photos.length - 1

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(activeIndex - 1)
  }, [activeIndex, hasPrev, onNavigate])

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(activeIndex + 1)
  }, [activeIndex, hasNext, onNavigate])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [goNext, goPrev, onClose])

  if (!photo) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Champion photo lightbox"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white hover:text-gold transition-colors focus-ring rounded-full"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {hasPrev && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            goPrev()
          }}
          className="absolute left-2 md:left-6 z-10 w-10 h-10 flex items-center justify-center text-white hover:text-gold transition-colors focus-ring rounded-full"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            goNext()
          }}
          className="absolute right-2 md:right-6 z-10 w-10 h-10 flex items-center justify-center text-white hover:text-gold transition-colors focus-ring rounded-full"
          aria-label="Next photo"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      <figure
        className="relative max-w-6xl max-h-[85vh] w-full"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={photo.imageUrl}
          alt={photo.alt}
          className="w-full max-h-[85vh] object-contain mx-auto"
        />
        <figcaption className="sr-only">
          Photo {activeIndex + 1} of {photos.length}
        </figcaption>
      </figure>
    </div>
  )
}
