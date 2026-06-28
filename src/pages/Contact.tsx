import { motion } from 'framer-motion'
import { contactEmails, contactSocialLinks, CONTACT_HERO } from '../lib/contactContent'
import { ContactForm } from '../components/ui/ContactForm'
import { FacebookIcon, InstagramIcon, TwitterIcon } from '../components/ui/SocialIcons'
import { PageHero } from '../components/ui/PageHero'
import { PageLayout } from '../components/layout/PageLayout'

const DECORATIVE_SHAPE =
  '/media/2023/12/shape-elements-about.png'

const socialIcons = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  'X (Twitter)': TwitterIcon,
} as const

export function Contact() {
  return (
    <PageLayout overlayNav>
      <main>
        <PageHero
          title="Contact"
          titleAccent="Us"
          backgroundImage={CONTACT_HERO}
          decorativeImage={DECORATIVE_SHAPE}
        />

        <section
          className="relative -mt-24 md:-mt-32 pt-16 md:pt-20 pb-16 md:pb-24 bg-gradient-to-b from-transparent via-cream/95 to-cream"
          aria-label="Contact information and form"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-navy uppercase mb-8">
                  Get Connected
                </h2>

                <ul className="space-y-4 mb-10">
                  {contactEmails.map((email) => (
                    <li key={email}>
                      <a
                        href={`mailto:${email}`}
                        className="text-gold font-semibold uppercase tracking-wide text-sm md:text-base hover:text-navy transition-colors focus-ring rounded"
                      >
                        {email}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-4">
                  {contactSocialLinks.map(({ label, href }) => {
                    const Icon = socialIcons[label as keyof typeof socialIcons]
                    return (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center border-2 border-navy/20 text-navy hover:bg-gold hover:border-gold hover:text-navy transition-colors focus-ring rounded-full"
                        aria-label={label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    )
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-navy uppercase mb-8">
                  have questions
                </h2>
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
