import { useMemo } from 'react'
import { sortFields } from '../../lib/registrationFields'
import type { RegistrationField } from '../../lib/types'

interface DynamicRegistrationFormProps {
  fields: RegistrationField[]
  values: Record<string, string>
  onChange: (fieldId: string, value: string) => void
  errors?: Record<string, string>
}

export function DynamicRegistrationForm({
  fields,
  values,
  onChange,
  errors = {},
}: DynamicRegistrationFormProps) {
  const sorted = useMemo(() => sortFields(fields), [fields])

  if (sorted.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {sorted.map((field) => {
        const error = errors[field.id]
        const common = 'w-full px-3 py-2 border rounded-sm focus:ring-2 focus:ring-gold focus:border-transparent'
        const border = error ? `${common} border-red-400` : `${common} border-gray-300`

        return (
          <div key={field.id}>
            <label className="block text-sm font-semibold text-navy mb-1">
              {field.label}
              {field.required && <span className="text-red-600 ml-0.5">*</span>}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                rows={4}
                value={values[field.id] ?? ''}
                onChange={(e) => onChange(field.id, e.target.value)}
                className={border}
                required={field.required}
              />
            ) : field.type === 'select' ? (
              <select
                value={values[field.id] ?? ''}
                onChange={(e) => onChange(field.id, e.target.value)}
                className={border}
                required={field.required}
              >
                <option value="">Select…</option>
                {(field.options ?? []).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={
                  field.type === 'email'
                    ? 'email'
                    : field.type === 'phone'
                      ? 'tel'
                      : 'text'
                }
                value={values[field.id] ?? ''}
                onChange={(e) => onChange(field.id, e.target.value)}
                className={border}
                required={field.required}
              />
            )}
            {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
          </div>
        )
      })}
    </div>
  )
}

export function validateRegistrationFields(
  fields: RegistrationField[],
  values: Record<string, string>,
): Record<string, string> {
  const errors: Record<string, string> = {}
  for (const field of sortFields(fields)) {
    const value = (values[field.id] ?? '').trim()
    if (field.required && !value) {
      errors[field.id] = 'This field is required'
    }
    if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors[field.id] = 'Enter a valid email'
    }
  }
  return errors
}
