import { CreditCard, Lock } from 'lucide-react'
import type { CardFormValues } from './AuthorizeNetCardForm'

interface AuthorizeNetPaymentFieldsProps {
  values: CardFormValues
  onChange: (values: CardFormValues) => void
  amount: number
}

export function AuthorizeNetPaymentFields({ values, onChange, amount }: AuthorizeNetPaymentFieldsProps) {
  const set = (key: keyof CardFormValues, value: string) => {
    onChange({ ...values, [key]: value })
  }

  return (
    <div className="space-y-4 border-t border-gray-200 pt-6">
      <div className="flex items-center gap-2 text-navy">
        <CreditCard className="w-5 h-5 text-gold" aria-hidden />
        <h3 className="font-display font-bold uppercase">Payment</h3>
        <span className="ml-auto font-bold">${amount.toFixed(2)}</span>
      </div>

      <p className="text-xs text-gray-500 flex items-center gap-1">
        <Lock className="w-3 h-3" aria-hidden />
        Secured by Authorize.net. Card details are never stored on our servers.
      </p>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1">Name on card</label>
        <input
          value={values.nameOnCard}
          onChange={(e) => set('nameOnCard', e.target.value)}
          required
          autoComplete="cc-name"
          className="w-full px-3 py-2 border border-gray-300 rounded-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1">Card number</label>
        <input
          value={values.cardNumber}
          onChange={(e) => set('cardNumber', e.target.value)}
          required
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="4111 1111 1111 1111"
          className="w-full px-3 py-2 border border-gray-300 rounded-sm"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1">Exp. month</label>
          <input
            value={values.expMonth}
            onChange={(e) => set('expMonth', e.target.value)}
            required
            placeholder="MM"
            maxLength={2}
            autoComplete="cc-exp-month"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1">Exp. year</label>
          <input
            value={values.expYear}
            onChange={(e) => set('expYear', e.target.value)}
            required
            placeholder="YY"
            maxLength={4}
            autoComplete="cc-exp-year"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1">CVV</label>
          <input
            value={values.cvv}
            onChange={(e) => set('cvv', e.target.value)}
            required
            maxLength={4}
            autoComplete="cc-csc"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1">Billing ZIP</label>
        <input
          value={values.zip}
          onChange={(e) => set('zip', e.target.value)}
          required
          autoComplete="postal-code"
          className="w-full px-3 py-2 border border-gray-300 rounded-sm"
        />
      </div>
    </div>
  )
}

export const emptyCardValues = (): CardFormValues => ({
  cardNumber: '',
  expMonth: '',
  expYear: '',
  cvv: '',
  zip: '',
  nameOnCard: '',
})
