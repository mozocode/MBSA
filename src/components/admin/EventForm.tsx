import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ALL_EVENT_TYPES, EVENT_TYPE_COLORS, EVENT_TYPE_LABELS, colorForType } from '../../lib/eventColors'
import type { EventType, SiteEvent } from '../../lib/types'
import { AdminToggle } from './AdminToggle'

const schema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    type: z.enum([
      'tournament',
      'registration',
      'tryout',
      'meeting',
      'practice',
      'other',
    ]),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    allDay: z.boolean(),
    location: z.string().optional(),
    description: z.string().optional(),
    registrationUrl: z.string().url().optional().or(z.literal('')),
    active: z.boolean(),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: 'End must be after start',
    path: ['endDate'],
  })

export type EventFormValues = z.infer<typeof schema>

interface EventFormProps {
  initial?: SiteEvent | null
  defaultStart?: Date
  onSubmit: (values: EventFormValues) => Promise<void>
  onCancel: () => void
}

function toLocalInput(date: Date, allDay: boolean): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  const y = date.getFullYear()
  const m = pad(date.getMonth() + 1)
  const d = pad(date.getDate())
  if (allDay) return `${y}-${m}-${d}T00:00`
  const h = pad(date.getHours())
  const min = pad(date.getMinutes())
  return `${y}-${m}-${d}T${h}:${min}`
}

function eventToDefaults(event: SiteEvent): EventFormValues {
  return {
    title: event.title,
    type: event.type,
    startDate: toLocalInput(event.startDate.toDate(), event.allDay),
    endDate: toLocalInput(event.endDate.toDate(), event.allDay),
    allDay: event.allDay,
    location: event.location ?? '',
    description: event.description ?? '',
    registrationUrl: event.registrationUrl ?? '',
    active: event.active,
  }
}

export function EventForm({ initial, defaultStart, onSubmit, onCancel }: EventFormProps) {
  const start = defaultStart ?? new Date()
  const end = new Date(start.getTime() + 60 * 60 * 1000)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initial
      ? eventToDefaults(initial)
      : {
          title: '',
          type: 'other',
          startDate: toLocalInput(start, false),
          endDate: toLocalInput(end, false),
          allDay: false,
          location: '',
          description: '',
          registrationUrl: '',
          active: true,
        },
  })

  const allDay = watch('allDay')
  const type = watch('type') as EventType

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label className="block text-sm font-semibold text-navy mb-1">Title</label>
        <input
          {...register('title')}
          className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gold focus:border-transparent"
        />
        {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1">Event type</label>
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: colorForType(type) }}
            aria-hidden
          />
          <select
            {...register('type')}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gold"
          >
            {ALL_EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {EVENT_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <AdminToggle
          checked={allDay}
          onChange={(v) => setValue('allDay', v)}
          label="All-day event"
        />
        <span className="text-sm text-navy">All-day event</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1">Start</label>
          <input
            type={allDay ? 'date' : 'datetime-local'}
            {...register('startDate')}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gold"
          />
          {errors.startDate && (
            <p className="text-red-600 text-xs mt-1">{errors.startDate.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1">End</label>
          <input
            type={allDay ? 'date' : 'datetime-local'}
            {...register('endDate')}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gold"
          />
          {errors.endDate && (
            <p className="text-red-600 text-xs mt-1">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1">Location</label>
        <input
          {...register('location')}
          className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gold"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1">Description</label>
        <textarea
          rows={4}
          {...register('description')}
          className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gold"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1">Registration URL</label>
        <input
          type="url"
          {...register('registrationUrl')}
          placeholder="https://"
          className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gold"
        />
        {errors.registrationUrl && (
          <p className="text-red-600 text-xs mt-1">{errors.registrationUrl.message}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <AdminToggle
          checked={watch('active')}
          onChange={(v) => setValue('active', v)}
          label="Active"
        />
        <span className="text-sm text-navy">Active (visible on public calendar)</span>
      </div>

      <p className="text-xs text-gray-500">
        Preview color:{' '}
        <span style={{ color: EVENT_TYPE_COLORS[type] }}>{EVENT_TYPE_LABELS[type]}</span>
      </p>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 bg-gold text-navy font-display font-bold uppercase text-sm rounded-sm hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Saving…' : initial ? 'Save changes' : 'Create event'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 border border-navy/20 text-navy font-semibold text-sm rounded-sm hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export function formValuesToEventInput(values: EventFormValues) {
  const parseDate = (v: string, allDay: boolean) => {
    if (allDay && v.length === 10) return new Date(`${v}T00:00:00`)
    return new Date(v)
  }
  return {
    title: values.title.trim(),
    type: values.type,
    startDate: parseDate(values.startDate, values.allDay),
    endDate: parseDate(values.endDate, values.allDay),
    allDay: values.allDay,
    location: values.location?.trim() || undefined,
    description: values.description?.trim() || undefined,
    registrationUrl: values.registrationUrl?.trim() || undefined,
    active: values.active,
    color: colorForType(values.type),
  }
}
