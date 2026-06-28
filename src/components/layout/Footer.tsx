import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FacebookIcon, InstagramIcon, TwitterIcon } from '../ui/SocialIcons'

const quickLinks = [
  { label: 'About', href: 'https://mbsagators.com/about-us/' },
  { label: 'Get Involved', href: 'https://mbsagators.com/get-involved/' },
  { label: 'Sponsor', to: '/sponsor' },
  { label: 'Coaches', to: '/coaches' },
  { label: 'Tournaments', href: 'https://mbsagators.com/tournaments/' },
  { label: 'Shop', href: 'https://mbsagators.com/shop/' },
]

const resources = [
  {
    label: 'Code of Conduct',
    href: '/media/2024/01/MBSA-Code-of-Conduct.pdf',
  },
  {
    label: 'Constitution & Bylaws',
    href: '/media/2024/01/MBSA-Constitution-and-By-Laws.pdf',
  },
  {
    label: 'Policies',
    href: '/media/2024/01/MBSA-Policies.pdf',
  },
  { label: 'FAQ', href: 'https://mbsagators.com/faq/' },
]

export function Footer() {
  return (
    <footer className="bg-navy text-white" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <img src="/MBSA-logo-vector.svg" alt="MBSA Gators logo" className="h-16 w-auto mb-4" />
          <p className="text-white/70 text-sm mb-4">
            Monroeville Baseball & Softball Association — building champions on and off the field.
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/mbsagators"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-gold transition-colors focus-ring rounded p-1"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/mbsagators"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-gold transition-colors focus-ring rounded p-1"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/mbsagators"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-gold transition-colors focus-ring rounded p-1"
              aria-label="X (Twitter)"
            >
              <TwitterIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display font-bold text-gold uppercase mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.label}>
                {'to' in link && link.to ? (
                  <Link
                    to={link.to}
                    className="text-white/70 hover:text-gold text-sm transition-colors focus-ring rounded"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-gold text-sm transition-colors focus-ring rounded"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display font-bold text-gold uppercase mb-4">Resources</h3>
          <ul className="space-y-2">
            {resources.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.endsWith('.pdf') ? '_blank' : undefined}
                  rel={link.href.endsWith('.pdf') ? 'noopener noreferrer' : undefined}
                  className="text-white/70 hover:text-gold text-sm transition-colors focus-ring rounded"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display font-bold text-gold uppercase mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <span>Monroeville, PA 15146</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0 text-gold" aria-hidden="true" />
              <a href="mailto:info@mbsagators.com" className="hover:text-gold transition-colors focus-ring rounded">
                info@mbsagators.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0 text-gold" aria-hidden="true" />
              <a href="tel:+14123731000" className="hover:text-gold transition-colors focus-ring rounded">
                (412) 373-1000
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Monroeville Baseball & Softball Association. All rights reserved.</p>
          <p>
            Powered by{' '}
            <Link to="/" className="text-gold hover:text-gold-light focus-ring rounded">
              MBSA
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
