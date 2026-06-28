import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CONTACT_EMAIL } from '../../lib/contactContent'
import { GoldButton } from './GoldButton'

const contactSchema = z.object({
  name: z.string().trim().optional(),
  email: z.string().trim().email('Please enter a valid email address'),
  message: z.string().trim().min(1, 'Please enter a message'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  })

  const onSubmit = (values: ContactFormValues) => {
    const subject = encodeURIComponent(
      values.name ? `MBSA Contact from ${values.name}` : 'MBSA Website Contact',
    )
    const body = encodeURIComponent(
      `Name: ${values.name || 'Not provided'}\nEmail: ${values.email}\n\n${values.message}`,
    )

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      aria-label="Contact form"
      noValidate
    >
      <div>
        <label htmlFor="contact-name" className="block text-sm font-semibold text-navy mb-1.5">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder="Name"
          className="w-full px-4 py-2.5 bg-white border border-navy/20 rounded-sm text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          {...register('name')}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-semibold text-navy mb-1.5">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2.5 bg-white border border-navy/20 rounded-sm text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          {...register('email')}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-navy mb-1.5">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={6}
          placeholder="Message"
          className="w-full px-4 py-2.5 bg-white border border-navy/20 rounded-sm text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-y min-h-[140px]"
          {...register('message')}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <GoldButton type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        Send
      </GoldButton>

      {submitted && (
        <p className="text-sm text-navy/70" role="status">
          Your email app should open with your message addressed to {CONTACT_EMAIL}.
        </p>
      )}
    </form>
  )
}
