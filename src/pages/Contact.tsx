import { motion } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { PageLayout } from '../components/layout/PageLayout'
import { FacebookIcon, InstagramIcon, TwitterIcon } from '../components/ui/SocialIcons'

const HERO_IMAGE = '/media/2024/02/DSC_0830.jpeg'

const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Player Registration',
  'Tournament Registration',
  'Softball Division',
  'Sponsorship',
  'Coaches & Volunteers',
  'Equipment & Uniforms',
  'Payments & Refunds',
  'Other',
] as const

const DEPARTMENTS = [
  {
    icon: '📧',
    department: 'General Inquiries',
    email: 'info@mbsagators.com',
    description: 'General questions and information',
  },
  {
    icon: '📝',
    department: 'Player Registration',
    email: 'registration@mbsagators.com',
    description: 'Sign up your player for a league season',
  },
  {
    icon: '🏆',
    department: 'Tournaments',
    email: 'tournaments@mbsagators.com',
    description: 'Tournament registration, scheduling, brackets',
  },
  {
    icon: '🥎',
    department: 'Softball Division',
    email: 'softball@mbsagators.com',
    description: 'All softball-specific questions',
  },
  {
    icon: '🤝',
    department: 'Sponsorship',
    email: 'sponsor@mbsagators.com',
    description: 'Become a sponsor or partner with MBSA',
  },
  {
    icon: '🧑‍🏫',
    department: 'Coaches & Volunteers',
    email: 'coaches@mbsagators.com',
    description: 'Coaching applications and volunteer info',
  },
  {
    icon: '👕',
    department: 'Equipment & Uniforms',
    email: 'equipment@mbsagators.com',
    description: 'Uniform orders, equipment questions',
  },
  {
    icon: '💳',
    department: 'Payments & Refunds',
    email: 'payments@mbsagators.com',
    description: 'Billing, payment plans, refund requests',
  },
  {
    icon: '⚾',
    department: 'Baseball Division',
    email: 'baseball@mbsagators.com',
    description: 'All baseball-specific questions',
  },
] as const

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/mbsagators',
    Icon: FacebookIcon,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mbsagators',
    Icon: InstagramIcon,
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/mbsagators',
    Icon: TwitterIcon,
  },
] as const

type FormStatus = 'idle' | 'loading' | 'success'

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

const emptyForm: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06 },
  }),
}

const inputClass =
  'w-full bg-white border-2 border-[#E5E7EB] px-4 py-3 text-[#0D1B2A] placeholder:text-[#6B7280] focus:outline-none focus:border-[#F4C430] disabled:opacity-60 disabled:cursor-not-allowed'

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>(emptyForm)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [formError, setFormError] = useState<string | null>(null)

  const handleChange = (
    field: keyof ContactFormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (formError) setFormError(null)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)
    setStatus('loading')

    try {
      // Option A: EmailJS (no backend needed)
      // await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);

      // Option B: Firebase Cloud Function
      // await httpsCallable(functions, 'sendContactEmail')(formData);

      // Option C: Placeholder (simulate for now)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setStatus('success')
    } catch {
      setStatus('idle')
      setFormError('Something went wrong. Please email us directly at info@mbsagators.com.')
    }
  }

  const handleReset = () => {
    setFormData(emptyForm)
    setFormError(null)
    setStatus('idle')
  }

  const fieldsDisabled = status === 'loading'

  return (
    <PageLayout overlayNav>
      <main>
        {/* Hero */}
        <section
          className="relative min-h-[55vh] md:min-h-[60vh] flex items-end nav-offset-top"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 0 100%)' }}
          aria-label="Contact hero"
        >
          <img
            src={HERO_IMAGE}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            decoding="async"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(7, 15, 24, 0.82)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 md:pb-20 w-full">
            <motion.p
              className="inline-block bg-[#F4C430] text-[#0D1B2A] font-display font-bold text-xs uppercase tracking-widest px-4 py-2 mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              📍 Monroeville, Western PA
            </motion.p>

            <motion.h1
              className="font-display font-bold uppercase leading-none text-white"
              style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              Get In{' '}
              <span className="text-[#F4C430]">Touch</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-white/90 text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
            >
              Have a question about registration, tournaments, coaching, or sponsorship? We&apos;re
              here to help.
            </motion.p>
          </div>
        </section>

        {/* Split panel */}
        <section
          className="bg-[#F5F0E8] px-6 py-16 -mt-1"
          aria-label="Contact form and directory"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0D1B2A] uppercase mb-3">
                Send Us a Message
              </h2>
              <p className="text-[#6B7280] mb-8">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              {status === 'success' ? (
                <motion.div
                  className="bg-white border-2 border-[#E5E7EB] p-8 md:p-10 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                >
                  <CheckCircle2
                    className="w-16 h-16 text-[#F4C430] mx-auto mb-6"
                    aria-hidden="true"
                  />
                  <h3 className="font-display font-bold text-2xl text-[#0D1B2A] uppercase mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-[#6B7280] mb-8 leading-relaxed">
                    Thanks for reaching out. We typically respond within 24–48 hours. Check your
                    inbox for a confirmation.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-block w-full sm:w-auto px-8 py-3 border-2 border-[#F4C430] text-[#0D1B2A] font-display font-bold uppercase text-sm tracking-wide hover:bg-[#F4C430] transition-colors focus-ring"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-display font-bold text-xs uppercase text-[#0D1B2A] mb-2 tracking-wide"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      disabled={fieldsDisabled}
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-display font-bold text-xs uppercase text-[#0D1B2A] mb-2 tracking-wide"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      disabled={fieldsDisabled}
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block font-display font-bold text-xs uppercase text-[#0D1B2A] mb-2 tracking-wide"
                    >
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      required
                      disabled={fieldsDisabled}
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      className={`${inputClass} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>
                      {SUBJECT_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block font-display font-bold text-xs uppercase text-[#0D1B2A] mb-2 tracking-wide"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      disabled={fieldsDisabled}
                      placeholder="How can we help?"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className={`${inputClass} min-h-36 resize-y`}
                    />
                  </div>

                  {formError && (
                    <p className="text-sm text-red-700 bg-red-50 border-2 border-red-200 px-4 py-3" role="alert">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={fieldsDisabled}
                    className="w-full flex items-center justify-center gap-2 bg-[#F4C430] text-[#0D1B2A] font-display font-bold uppercase tracking-wide py-4 hover:bg-[#FAE07A] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 focus-ring"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                        Sending...
                      </>
                    ) : (
                      'Send Message →'
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Department directory */}
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0D1B2A] uppercase mb-3">
                Contact Directory
              </h2>
              <p className="text-[#6B7280] mb-8">Reach the right person directly.</p>

              <ul className="space-y-3">
                {DEPARTMENTS.map((dept, index) => (
                  <motion.li
                    key={dept.email}
                    variants={fadeUp}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <div className="group flex gap-4 bg-white px-4 py-3 border-l-4 border-transparent hover:border-[#F4C430] hover:shadow-md transition-all duration-150">
                      <span className="text-2xl shrink-0 leading-none pt-0.5" aria-hidden="true">
                        {dept.icon}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display font-bold text-xs uppercase text-[#0D1B2A] tracking-wide">
                          {dept.department}
                        </h3>
                        <p className="text-[#6B7280] text-xs mt-1 leading-snug">
                          {dept.description}
                        </p>
                        <a
                          href={`mailto:${dept.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-sm text-[#F4C430] font-semibold hover:underline focus-ring"
                        >
                          {dept.email}
                        </a>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Social bar */}
        <section
          className="bg-[#0D1B2A] py-10 px-6 text-center"
          aria-label="Social media"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white uppercase mb-3">
            Follow the Gators
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Stay up to date with game results, announcements, and highlights.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-2xl mx-auto">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 border-2 border-white/20 text-white px-6 py-3 font-display font-bold uppercase text-sm tracking-wide hover:border-[#F4C430] hover:text-[#F4C430] transition-colors focus-ring"
              >
                <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
