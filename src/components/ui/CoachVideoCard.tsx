import { motion } from 'framer-motion'
import type { CoachVideo } from '../../lib/coachesContent'

function youtubeEmbedUrl(url: string): string {
  const match = url.match(/youtu\.be\/([^?\s]+)|youtube\.com\/watch\?v=([^&]+)/)
  const id = match?.[1] ?? match?.[2]
  return id ? `https://www.youtube.com/embed/${id}` : url
}

interface CoachVideoCardProps {
  video: CoachVideo
  index: number
}

export function CoachVideoCard({ video, index }: CoachVideoCardProps) {
  return (
    <motion.article
      className="bg-white rounded-sm overflow-hidden shadow-md border border-navy/10"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
    >
      <div className="aspect-video bg-navy">
        <iframe
          src={youtubeEmbedUrl(video.youtubeUrl)}
          title={video.title}
          className="w-full h-full border-0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="px-4 py-3 bg-navy">
        <h3 className="font-display font-bold text-sm md:text-base text-white uppercase tracking-wide">
          {video.title}
        </h3>
      </div>
    </motion.article>
  )
}
