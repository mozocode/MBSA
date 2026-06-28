import { CheckCircle2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageLayout } from '../components/layout/PageLayout'
import { type CardFormValues } from '../components/ui/AuthorizeNetCardForm'
import {
  AuthorizeNetPaymentFields,
  emptyCardValues,
} from '../components/ui/AuthorizeNetPaymentFields'
import {
  DynamicRegistrationForm,
  validateRegistrationFields,
} from '../components/ui/DynamicRegistrationForm'
import { isAuthorizeNetConfigured, tokenizeCard, type AcceptOpaqueData } from '../lib/authorizeNet'
import { fallbackTournaments } from '../lib/fallbackData'
import { getProductBySlug } from '../lib/firestore/products'
import { getTournamentBySlug } from '../lib/firestore/tournaments'
import { processPayment } from '../lib/payments'
import { getPlatformConfig } from '../lib/platformConfig'
import { formatPrice, tournamentRegisterPath } from '../lib/productUtils'
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

function enrichRegisterable(item: Registerable, slug: string): Registerable {
  const fb = fallbackTournaments.find((t) => t.slug === slug)
  if (!fb) return item
  return {
    ...item,
    artworkUrl: item.artworkUrl || fb.artworkUrl,
    registrationFields: item.registrationFields.length ? item.registrationFields : fb.registrationFields,
    dateLabel: item.dateLabel || fb.dateLabel,
    sport: item.sport || fb.sport,
    ages: item.ages || fb.ages,
    level: item.level || fb.level,
    name: item.name || fb.name,
    price: item.price ?? fb.price,
    paymentRequired: item.paymentRequired ?? fb.paymentRequired,
  }
}

function fallbackBySlug(slug: string): Registerable | null {
  const t = fallbackTournaments.find((x) => x.slug === slug)
  if (!t) {
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
  return enrichRegisterable(
    {
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
    },
    slug,
  )
}

function tournamentToRegisterable(t: Tournament): Registerable {
  return enrichRegisterable(
    {
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
    },
    t.slug,
  )
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

function fieldValueByLabel(fields: RegistrationField[], values: Record<string, string>, label: string) {
  const field = fields.find((f) => f.label === label)
  return field ? values[field.id]?.trim() : undefined
}

function RelatedProducts({ currentSlug }: { currentSlug: string }) {
  const related = fallbackTournaments.filter((t) => t.slug !== currentSlug).slice(0, 4)
  if (related.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="font-display font-bold text-xl text-navy uppercase mb-6">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {related.map((t) => (
          <Link
            key={t.slug}
            to={tournamentRegisterPath(t)}
            className="bg-white border border-gray-200 hover:border-gold transition-colors overflow-hidden group"
          >
            <div className="aspect-square bg-navy p-3 flex items-center justify-center">
              <img
                src={t.artworkUrl}
                alt=""
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <p className="p-3 text-sm font-semibold text-navy leading-snug">{t.shortName}</p>
            <p className="px-3 pb-3 text-sm font-bold text-navy">${t.price}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function ProductRegister() {
  const { slug = '' } = useParams()
  const [item, setItem] = useState<Registerable | null>(null)
  const [loading, setLoading] = useState(true)
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({})
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [customAmount, setCustomAmount] = useState('')
  const [cardValues, setCardValues] = useState<CardFormValues>(emptyCardValues())
  const [paymentsConfigured, setPaymentsConfigured] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [complete, setComplete] = useState<{ orderId: string; transactionId: string } | null>(null)

  useEffect(() => {
    getPlatformConfig()
      .then(() => isAuthorizeNetConfigured())
      .then(setPaymentsConfigured)
      .catch(() => setPaymentsConfigured(false))
  }, [])

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
  const showPaymentFields = paymentsConfigured && item?.paymentRequired && amount > 0

  const handleFieldChange = (fieldId: string, value: string) => {
    setFieldValues((v) => ({ ...v, [fieldId]: value }))
    setFieldErrors((e) => {
      const next = { ...e }
      delete next[fieldId]
      return next
    })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!item) return

    setSubmitError(null)
    const errors = validateRegistrationFields(item.registrationFields, fieldValues)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    if (item.paymentRequired && amount <= 0 && item.allowCustomAmount) {
      setSubmitError('Enter a valid amount.')
      return
    }

    setSubmitting(true)
    try {
      const labeledResponses: Record<string, string> = {}
      for (const field of item.registrationFields) {
        if (fieldValues[field.id]) {
          labeledResponses[field.label] = fieldValues[field.id]
        }
      }

      let opaqueData: AcceptOpaqueData | undefined
      if (showPaymentFields) {
        opaqueData = await tokenizeCard({
          cardNumber: cardValues.cardNumber,
          expMonth: cardValues.expMonth,
          expYear: cardValues.expYear,
          cvv: cardValues.cvv,
          zip: cardValues.zip,
          fullName: cardValues.nameOnCard,
        })
      }

      const emailField = item.registrationFields.find((f) => f.type === 'email')
      const payerEmail = emailField
        ? fieldValues[emailField.id]
        : fieldValueByLabel(item.registrationFields, fieldValues, 'Coach Name')

      const payerName =
        cardValues.nameOnCard ||
        fieldValueByLabel(item.registrationFields, fieldValues, 'Coach Name') ||
        fieldValueByLabel(item.registrationFields, fieldValues, 'Your Name')

      const result = await processPayment({
        opaqueData,
        amount: item.paymentRequired ? amount : 0,
        productType: item.productType,
        productId: item.id,
        productSlug: item.slug,
        productName: item.name,
        fieldResponses: labeledResponses,
        payerEmail: payerEmail || undefined,
        payerName: payerName || undefined,
      })

      setComplete(result)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setSubmitting(false)
    }
  }

  const submitLabel =
    item?.productType === 'donation'
      ? 'Donate'
      : showPaymentFields
        ? `Pay ${formatPrice(amount)} & Register`
        : 'Add to cart'

  if (loading) {
    return (
      <PageLayout overlayNav>
        <main className="py-24 text-center text-navy bg-cream min-h-screen">Loading…</main>
      </PageLayout>
    )
  }

  if (!item) {
    return (
      <PageLayout overlayNav>
        <main className="py-24 text-center bg-cream min-h-screen">
          <h1 className="font-display text-2xl text-navy mb-4">Product not found</h1>
          <Link to="/" className="text-gold font-semibold hover:underline">
            Return home
          </Link>
        </main>
      </PageLayout>
    )
  }

  if (complete) {
    const isPending = complete.transactionId === 'PENDING'
    return (
      <PageLayout overlayNav>
        <main className="py-24 bg-cream min-h-screen">
          <div className="max-w-lg mx-auto px-4 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="font-display text-2xl text-navy mb-2">Registration complete</h1>
            <p className="text-gray-600 mb-4">
              Thank you for registering for {item.name}.
              {isPending ? (
                <> Your registration is saved — payment will be collected once online checkout is enabled.</>
              ) : (
                <> Confirmation: <strong>{complete.transactionId}</strong></>
              )}
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
      <main className="bg-cream min-h-screen py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gold-dark font-display font-bold uppercase tracking-wide text-sm mb-6">
            MBSA Product
          </p>

          <div className="flex flex-col md:flex-row md:gap-12 items-start">
            {/* Artwork — sticky on desktop while the form scrolls */}
            <div className="w-full md:w-[45%] shrink-0 md:sticky md:top-24 md:self-start bg-navy flex items-center justify-center p-6 md:p-10 min-h-[280px]">
              {item.artworkUrl ? (
                <div className="bg-white w-full aspect-square flex items-center justify-center p-6 md:p-8">
                  <img
                    src={item.artworkUrl}
                    alt={`${item.name} artwork`}
                    className="w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="text-white/40 font-display text-lg uppercase">MBSA</div>
              )}
            </div>

            {/* Product details + registration form */}
            <div className="flex-1 min-w-0 bg-white shadow-md p-6 md:p-10 md:shadow-none">
              <h1 className="font-display font-bold text-xl md:text-2xl text-navy uppercase leading-tight mb-3">
                  {item.name}
              </h1>

              <p className="text-2xl font-bold text-navy mb-4">
                  {item.allowCustomAmount ? 'Choose amount' : formatPrice(item.price)}
              </p>

              <div className="space-y-1 text-navy mb-6 pb-6 border-b border-gray-200">
                  {item.dateLabel && <p>{item.dateLabel}</p>}
                  {item.sport && <p>{item.sport}</p>}
                  {item.ages && <p>Ages {item.ages}</p>}
                  {item.level && <p>Level: {item.level}</p>}
                  {item.description && <p className="text-gray-600 pt-2">{item.description}</p>}
              </div>

              {isClosed ? (
                <p className="text-red-600 font-semibold">Registration is closed for this event.</p>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4" noValidate>
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

                    {showPaymentFields && (
                      <AuthorizeNetPaymentFields
                        values={cardValues}
                        onChange={setCardValues}
                        amount={amount}
                      />
                    )}

                    {!paymentsConfigured && item.paymentRequired && amount > 0 && (
                      <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-sm px-3 py-2">
                        Online payment is coming soon. You can submit your registration now — our
                        team will follow up for payment.
                      </p>
                    )}

                    {submitError && <p className="text-red-600 text-sm">{submitError}</p>}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full md:w-auto px-8 py-3.5 bg-gold text-navy font-display font-bold uppercase tracking-wide text-sm hover:bg-gold-light transition-colors disabled:opacity-50 focus-ring"
                    >
                      {submitting ? 'Processing…' : submitLabel}
                    </button>
                  </form>
              )}
            </div>
          </div>

          {item.productType === 'tournament' && <RelatedProducts currentSlug={item.slug} />}
        </div>
      </main>
    </PageLayout>
  )
}
