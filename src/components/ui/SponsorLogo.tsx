import type { Sponsor } from '../../lib/types'

interface SponsorLogoProps {
  sponsor: Sponsor
}

export function SponsorLogo({ sponsor }: SponsorLogoProps) {
  const content = (
    <img
      src={sponsor.logoUrl}
      alt={`${sponsor.name} logo`}
      className="h-12 md:h-16 w-auto max-w-[200px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
      loading="lazy"
    />
  )

  if (sponsor.websiteUrl) {
    return (
      <a
        href={sponsor.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center p-3 focus-ring rounded"
        aria-label={`Visit ${sponsor.name} website`}
      >
        {content}
      </a>
    )
  }

  return <div className="flex items-center justify-center p-3">{content}</div>
}

export function SponsorLogoSkeleton() {
  return <div className="h-16 w-32 bg-navy-light/20 rounded animate-pulse" />
}
