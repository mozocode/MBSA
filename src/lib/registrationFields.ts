import type { RegistrationField, RegistrationFieldType } from './types'

export const FIELD_TYPE_LABELS: Record<RegistrationFieldType, string> = {
  text: 'Short text',
  textarea: 'Long text',
  select: 'Dropdown',
  phone: 'Phone',
  email: 'Email',
}

export function createField(
  partial: Pick<RegistrationField, 'label' | 'type'> &
    Partial<Omit<RegistrationField, 'label' | 'type'>>,
): RegistrationField {
  const field: RegistrationField = {
    id: partial.id ?? crypto.randomUUID(),
    required: partial.required ?? false,
    order: partial.order ?? 0,
    label: partial.label,
    type: partial.type,
  }
  if (partial.options && partial.options.length > 0) {
    field.options = partial.options
  }
  return field
}

/** Strip undefined values so Firestore accepts the payload. */
export function sanitizeRegistrationFields(fields: RegistrationField[]): RegistrationField[] {
  return fields.map(({ options, ...rest }) => {
    const out: RegistrationField = { ...rest }
    if (options && options.length > 0) out.options = options
    return out
  })
}

const COMBINED_SPORT_AGE_OPTIONS = [
  'Softball 7u',
  'Softball 8u',
  'Softball 9u',
  'Softball 10u',
  'Softball 11u',
  'Softball 12u',
  'Softball 13u',
  'Softball 14u',
  'Baseball 7u',
  'Baseball 8u',
  'Baseball 9u',
  'Baseball 10u',
  'Baseball 11u',
  'Baseball 12u',
  'Baseball 13u',
  'Baseball 14u',
]

const AGE_OPTIONS = ['7u', '8u', '9u', '10u', '11u', '12u', '13u', '14u']

/** Summer Slam style — single Sport & Age Group dropdown */
export function combinedSportAgeFields(): RegistrationField[] {
  return [
    createField({
      label: 'Sport and Age Group',
      type: 'select',
      required: true,
      options: COMBINED_SPORT_AGE_OPTIONS,
      order: 0,
    }),
    createField({ label: 'Team Name', type: 'text', required: true, order: 1 }),
    createField({ label: 'Coach Name', type: 'text', required: true, order: 2 }),
    createField({ label: 'Coach Phone Number', type: 'phone', required: true, order: 3 }),
    createField({
      label: 'Team Roster (with birth dates)',
      type: 'textarea',
      required: true,
      order: 4,
    }),
    createField({
      label: 'Special Request (granted in the order received, NOT guaranteed)',
      type: 'textarea',
      required: false,
      order: 5,
    }),
  ]
}

/** Beach Bash / Pumpkin Smash style — separate Sport + Age Group */
export function splitSportAgeFields(): RegistrationField[] {
  return [
    createField({
      label: 'Sport',
      type: 'select',
      required: true,
      options: ['Softball', 'Baseball'],
      order: 0,
    }),
    createField({
      label: 'Age Group',
      type: 'select',
      required: true,
      options: AGE_OPTIONS,
      order: 1,
    }),
    createField({ label: 'Team Name', type: 'text', required: true, order: 2 }),
    createField({ label: 'Coach Name', type: 'text', required: true, order: 3 }),
    createField({ label: 'Coach Phone Number', type: 'phone', required: true, order: 4 }),
    createField({
      label: 'Team Roster (with birth dates)',
      type: 'textarea',
      required: true,
      order: 5,
    }),
    createField({
      label: 'Special Request (granted in the order received, NOT guaranteed)',
      type: 'textarea',
      required: false,
      order: 6,
    }),
  ]
}

export function sortFields(fields: RegistrationField[]): RegistrationField[] {
  return [...fields].sort((a, b) => a.order - b.order)
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
