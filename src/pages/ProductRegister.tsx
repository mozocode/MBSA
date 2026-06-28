import { CheckCircle2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageLayout } from '../components/layout/PageLayout'
import {
  AuthorizeNetCardForm,
  type CardFormValues,
} from '../components/ui/AuthorizeNetCardForm'
import {
  DynamicRegistrationForm,
  validateRegistrationFields,
} from '../components/ui/DynamicRegistrationForm'
import { tokenizeCard, type AcceptOpaqueData } from '../lib/authorizeNet'
import { getProductBySlug } from '../lib/firestore/products'
import { getTournamentBySlug } from '../lib/firestore/tournaments'
import { fallbackTournaments } from '../lib/fallbackData'
import { processPayment } from '../lib/payments'
import { formatPrice } from '../lib/productUtils'
import type { Product, ProductType, RegistrationField, Tournament } from '../lib/types'

type Registerable = {
  id: string
  slug: string
  name: string
  price: number
  paymentRequired: boolean
  registrationFields: RegistrationField[]
  productType: ProductType
  status?: Tournament['status']
  dateLabel?: string
  sport?: string
  ages?: string
  level?: string
  artworkUrl?: string
  description?: string
  allowCustomAmount?: boolean
}

function fallbackBySlug(slug: string): Registerable | null {
  const t = fallbackTournaments.find((x) => x.slug === slug)
  if (t) {
    return {
      id: t.id,
      slug: t.slug,
      name: t.name,
      price: t.price,
      paymentRequired: t.paymentRequired,
      registrationFields: t.registrationFields,
      productType: 'tournament',
      status: t.status,
      dateLabel: t.dateLabel,
      sport: t.sport,
      ages: t.ages,
      level: t.level,
      artworkUrl: t.artworkUrl,
    }
  }
  if (slug === 'donate') {
    return {
      id: 'donate',
      slug: 'donate',
      name: 'MBSA Donation',
      price: 0,
      paymentRequired: true,
      allowCustomAmount: true,
      productType: 'donation',
      description: 'Support Monroeville Baseball & Softball Association programs.',
      registrationFields: [
        { id: 'donor-name', label: 'Your Name', type: 'text', required: true, order: 0 },
        { id: 'donor-email', label: 'Email', type: 'email', required: true, order: 1 },
        {
          id: 'donor-message',
          label: 'Message (optional)',
          type: 'textarea',
          required: false,
          order: 2,
        },
      ],
    }
  }
  return null
}

function tournamentToRegisterable(t: Tournament): Registerable {
  return {
    id: t.id,
    slug: t.slug,
    name: t.name,
    price: t.price,
    paymentRequired: t.paymentRequired ?? t.price > 0,
    registrationFields: t.registrationFields ?? [],
    productType: 'tournament',
    status: t.status,
    dateLabel: t.dateLabel,
    sport: t.sport,
    ages: t.ages,
    level: t.level,
    artworkUrl: t.artworkUrl,
  }
}

function productToRegisterable(p: Product): Registerable {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    paymentRequired: p.price > 0 || Boolean(p.allowCustomAmount),
    registrationFields: p.registrationFields ?? [],
    productType: p.type,
    artworkUrl: p.artworkUrl,
    description: p.description,
    allowCustomAmount: p.allowCustomAmount,
  }
}

export function ProductRegister() {
  const { slug = '' } = useParams()
  const [item, setItem] = useState<Registerable | null>(null)
  const [loading, setLoading] = useState(true)
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({})
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [customAmount, setCustomAmount] = useState('')
  const [complete, setComplete] = useState<{ orderId: string; transactionId: string } | null>(
    null,
  )

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        const [tournament, product] = await Promise.all([
          getTournamentBySlug(slug),
          getProductBySlug(slug),
        ])
        if (cancelled) return
        if (tournament) setItem(tournamentToRegisterable(tournament))
        else if (product) setItem(productToRegisterable(product))
        else setItem(fallbackBySlug(slug))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [slug])

  const amount = useMemo(() => {
    if (!item) return 0
    if (item.allowCustomAmount) {
      const n = parseFloat(customAmount)
      return Number.isFinite(n) && n > 0 ? n : 0
    }
    return item.price
  }, [item, customAmount])

  const isClosed = item?.productType === 'tournament' && item.status === 'closed'

  const handleFieldChange = (fieldId: string, value: string) => {
    setFieldValues((v) => ({ ...v, [fieldId]: value }))
    setFieldErrors((e) => {
      const next = { ...e }
      delete next[fieldId]
      return next
    })
  }

  const handlePayment = async (card: CardFormValues) => {
    if (!item) return

    const errors = validateRegistrationFields(item.registrationFields, fieldValues)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      throw new Error('Please complete all required registration fields.')
    }

    if (item.paymentRequired && amount <= 0) {
      throw new Error('Enter a valid payment amount.')
    }

    const labeledResponses: Record<string, string> = {}
    for (const field of item.registrationFields) {
      if (fieldValues[field.id]) {
        labeledResponses[field.label] = fieldValues[field.id]
      }
    }

    let opaqueData: AcceptOpaqueData | undefined
    if (item.paymentRequired && amount > 0) {
      opaqueData = await tokenizeCard({
        cardNumber: card.cardNumber,
        expMonth: card.expMonth,
        expYear: card.expYear,
        cvv: card.cvv,
        zip: card.zip,
        fullName: card.nameOnCard,
      })
    }

    const emailField = item.registrationFields.find((f) => f.type === 'email')
    const payerEmail = emailField ? fieldValues[emailField.id] : undefined

    const result = await processPayment({
      opaqueData,
      amount,
      productType: item.productType,
      productId: item.id,
      productSlug: item.slug,
      productName: item.name,
      fieldResponses: labeledResponses,
      payerEmail: payerEmail || undefined,
      payerName: card.nameOnCard,
    })

    setComplete(result)
  }

  if (loading) {
    return (
      <PageLayout>
        <main className="py-24 text-center text-navy">Loading…</main>
      </PageLayout>
    )
  }

  if (!item) {
    return (
      <PageLayout>
        <main className="py-24 text-center">
          <h1 className="font-display text-2xl text-navy mb-4">Product not found</h1>
          <Link to="/" className="text-gold font-semibold hover:underline">
            Return home
          </Link>
        </main>
      </PageLayout>
    )
  }

  if (complete) {
    return (
      <PageLayout>
        <main className="py-24">
          <div className="max-w-lg mx-auto px-4 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="font-display text-2xl text-navy mb-2">Registration complete</h1>
            <p className="text-gray-600 mb-4">
              Thank you for registering for {item.name}. Your confirmation number is{' '}
              <strong>{complete.transactionId}</strong>.
            </p>
            <Link to="/" className="text-gold font-semibold hover:underline">
              Return home
            </Link>
          </div>
        </main>
      </PageLayout>
    )
  }

  return (
    <PageLayout overlayNav>
      <main className="bg-cream min-h-screen">
        <div className="bg-navy text-white py-10">
          <div className="max-w-2xl mx-auto px-4">
            <p className="text-gold text-sm font-display uppercase tracking-wide mb-1">MBSA Product</p>
            <h1 className="font-display font-bold text-2xl md:text-3xl">{item.name}</h1>
          </div>
        </div>

        <section className="py-12">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white shadow-md border-l-4 border-gold overflow-hidden">
              {item.artworkUrl && (
                <div className="bg-navy p-6 flex justify-center">
                  <img
                    src={item.artworkUrl}
                    alt=""
                    className="max-h-48 object-contain"
                  />
                </div>
              )}
              <div className="p-6 md:p-8 space-y-4">
                <h1 className="font-display font-bold text-2xl text-navy">{item.name}</h1>
                <p className="text-2xl font-bold text-navy">
                  {item.allowCustomAmount ? 'Choose amount' : formatPrice(item.price)}
                </p>

                {item.dateLabel && <p className="text-navy">{item.dateLabel}</p>}
                {item.sport && <p className="text-navy">{item.sport}</p>}
                {item.ages && <p className="text-navy">Ages {item.ages}</p>}
                {item.level && <p className="text-navy">Level: {item.level}</p>}
                {item.description && <p className="text-gray-600">{item.description}</p>}

                {isClosed ? (
                  <p className="text-red-600 font-semibold">Registration is closed for this event.</p>
                ) : (
                  <>
                    {item.allowCustomAmount && (
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-1">
                          Donation amount ($)
                        </label>
                        <input
                          type="number"
                          min="1"
                          step="0.01"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-sm"
                          required
                        />
                      </div>
                    )}

                    <DynamicRegistrationForm
                      fields={item.registrationFields}
                      values={fieldValues}
                      onChange={handleFieldChange}
                      errors={fieldErrors}
                    />

                    {item.paymentRequired && (
                      <AuthorizeNetCardForm
                        amount={amount}
                        onSubmit={handlePayment}
                        submitLabel={
                          item.productType === 'donation'
                            ? 'Donate with Authorize.net'
                            : 'Pay & Complete Registration'
                        }
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
