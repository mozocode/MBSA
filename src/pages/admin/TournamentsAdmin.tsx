import { Timestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { AdminErrorBoundary } from '../../components/admin/AdminErrorBoundary'
import { RegistrationFieldsEditor } from '../../components/admin/RegistrationFieldsEditor'
import { SlideOver } from '../../components/admin/SlideOver'
import { TournamentStatusBadge } from '../../components/admin/TournamentStatusBadge'
import { slugify, sanitizeRegistrationFields, combinedSportAgeFields, splitSportAgeFields } from '../../lib/registrationFields'
import { resolveTournamentArtwork, resolveTournamentSlug } from '../../lib/productUtils'
import {
  createTournament,
  deleteTournament,
  listTournaments,
  updateTournament,
} from '../../lib/firestore/tournaments'
import type { Tournament } from '../../lib/types'

const emptyForm = (): Omit<Tournament, 'id'> => ({
  name: '',
  shortName: '',
  slug: '',
  dateStart: Timestamp.now(),
  dateEnd: Timestamp.now(),
  dateLabel: '',
  sport: '',
  ages: '',
  level: '',
  price: 450,
  artworkUrl: '',
  registrationFields: combinedSportAgeFields(),
  paymentRequired: true,
  status: 'upcoming',
  order: 0,
})

export function TournamentsAdmin() {
  const [items, setItems] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)
  const [panelOpen, setPanelOpen] = useState(false)
  const [editing, setEditing] = useState<Tournament | null>(null)
  const [form, setForm] = useState(emptyForm())
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      setItems(await listTournaments())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({ ...emptyForm(), order: items.length })
    setPanelOpen(true)
  }

  const openEdit = (t: Tournament) => {
    setEditing(t)
    setForm({
      ...t,
      registrationFields: t.registrationFields ?? [],
      paymentRequired: t.paymentRequired ?? t.price > 0,
      slug: t.slug || slugify(t.shortName || t.name),
    })
    setPanelOpen(true)
  }

  const handleStatusChange = async (t: Tournament, status: Tournament['status']) => {
    setItems((prev) => prev.map((x) => (x.id === t.id ? { ...x, status } : x)))
    try {
      await updateTournament(t.id, { status })
    } catch {
      setItems((prev) => prev.map((x) => (x.id === t.id ? { ...x, status: t.status } : x)))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this tournament?')) return
    await deleteTournament(id)
    setItems((prev) => prev.filter((t) => t.id !== id))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        slug: form.slug.trim() || slugify(form.shortName || form.name),
        registrationFields: sanitizeRegistrationFields(form.registrationFields).map((f, i) => ({
          ...f,
          order: i,
        })),
      }
      if (editing) {
        await updateTournament(editing.id, payload)
      } else {
        await createTournament(payload)
      }
      setPanelOpen(false)
      await load()
    } finally {
      setSaving(false)
    }
  }

  const setField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
  }

  return (
    <AdminErrorBoundary title="Tournaments error">
      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={openCreate}
            className="px-4 py-2 bg-gold text-navy font-display font-bold uppercase text-sm rounded-sm"
          >
            Add tournament
          </button>
        </div>

        <div className="bg-white rounded-sm border border-gray-200 overflow-x-auto shadow-sm">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Art</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Dates</th>
                <th className="px-4 py-3">Fields</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-6 text-gray-500">
                    Loading…
                  </td>
                </tr>
              ) : (
                items.map((t) => {
                  const slug = resolveTournamentSlug(t)
                  const artworkSrc = resolveTournamentArtwork(slug, t.artworkUrl)

                  return (
                  <tr key={t.id}>
                    <td className="px-4 py-3">
                      {artworkSrc ? (
                        <img
                          src={artworkSrc}
                          alt=""
                          className="w-12 h-12 object-cover rounded-sm bg-cream"
                        />
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-navy">{t.name}</td>
                    <td className="px-4 py-3 text-gray-600 font-mono text-xs">
                      {t.slug ? (
                        <a
                          href={`/register/${t.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold-dark hover:underline"
                        >
                          {t.slug}
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{t.dateLabel}</td>
                    <td className="px-4 py-3 text-gray-600">{t.registrationFields?.length ?? 0}</td>
                    <td className="px-4 py-3">${t.price}</td>
                    <td className="px-4 py-3">
                      <select
                        value={t.status}
                        onChange={(e) =>
                          handleStatusChange(t, e.target.value as Tournament['status'])
                        }
                        className="text-xs border border-gray-200 rounded-sm px-2 py-1"
                      >
                        <option value="open">open</option>
                        <option value="closed">closed</option>
                        <option value="upcoming">upcoming</option>
                      </select>
                      <div className="mt-1">
                        <TournamentStatusBadge status={t.status} />
                      </div>
                    </td>
                    <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => openEdit(t)}
                        className="text-navy font-semibold text-xs hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(t.id)}
                        className="text-red-600 font-semibold text-xs hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SlideOver
        open={panelOpen}
        title={editing ? 'Edit tournament' : 'Add tournament'}
        onClose={() => setPanelOpen(false)}
      >
        <form onSubmit={handleSave} className="space-y-4">
          {(
            [
              ['name', 'Name'],
              ['shortName', 'Short name'],
              ['slug', 'URL slug (register page)'],
              ['dateLabel', 'Date label'],
              ['sport', 'Sport'],
              ['ages', 'Ages'],
              ['level', 'Level'],
              ['artworkUrl', 'Artwork URL'],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-navy mb-1">{label}</label>
              <input
                value={form[key] as string}
                onChange={(e) => setField(key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
              />
              {key === 'slug' && (
                <p className="text-xs text-gray-500 mt-1">
                  Public page: /register/{form.slug || slugify(form.shortName || form.name) || '…'}
                </p>
              )}
            </div>
          ))}
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Price ($)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setField('price', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => setField('status', e.target.value as Tournament['status'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
            >
              <option value="open">open</option>
              <option value="closed">closed</option>
              <option value="upcoming">upcoming</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setField('registrationFields', combinedSportAgeFields())}
              className="text-xs px-2 py-1 border border-gray-300 rounded-sm hover:bg-gray-50"
            >
              Load Summer Slam fields
            </button>
            <button
              type="button"
              onClick={() => setField('registrationFields', splitSportAgeFields())}
              className="text-xs px-2 py-1 border border-gray-300 rounded-sm hover:bg-gray-50"
            >
              Load Beach Bash fields
            </button>
          </div>

          <RegistrationFieldsEditor
            fields={form.registrationFields}
            onChange={(fields) => setField('registrationFields', fields)}
          />

          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-gold text-navy font-bold uppercase text-sm rounded-sm disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </form>
      </SlideOver>
    </AdminErrorBoundary>
  )
}
