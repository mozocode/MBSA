import type { Sponsor } from '../../lib/types'

interface SponsorLogoProps {
  sponsor: Sponsor
  variant?: 'default' | 'marquee'
}

const sizeClasses = {
  default: 'h-12 md:h-16 w-auto max-w-[200px]',
  marquee: 'h-20 md:h-24 lg:h-28 w-auto max-w-[280px] md:max-w-[320px]',
} as const

export function SponsorLogo({ sponsor, variant = 'default' }: SponsorLogoProps) {
  const content = (
    <img
      src={sponsor.logoUrl}
      alt={`${sponsor.name} logo`}
      className={`${sizeClasses[variant]} object-contain grayscale hover:grayscale-0 transition-all duration-300`}
      loading="lazy"
    />
  )

  const wrapperClass =
    variant === 'marquee'
      ? 'flex items-center justify-center px-4 py-2 md:px-6'
      : 'flex items-center justify-center p-3'

  if (sponsor.websiteUrl) {
    return (
      <a
        href={sponsor.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${wrapperClass} focus-ring rounded`}
        aria-label={`Visit ${sponsor.name} website`}
      >
        {content}
      </a>
    )
  }

  return <div className={wrapperClass}>{content}</div>
}

export function SponsorLogoSkeleton() {
  return <div className="h-16 w-32 bg-navy-light/20 rounded animate-pulse" />
}
