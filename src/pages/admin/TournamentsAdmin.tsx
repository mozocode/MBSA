import { Timestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { AdminErrorBoundary } from '../../components/admin/AdminErrorBoundary'
import { SlideOver } from '../../components/admin/SlideOver'
import { TournamentStatusBadge } from '../../components/admin/TournamentStatusBadge'
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
  dateStart: Timestamp.now(),
  dateEnd: Timestamp.now(),
  dateLabel: '',
  sport: '',
  ages: '',
  level: '',
  price: 0,
  artworkUrl: '',
  registrationUrl: '',
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
    setForm({ ...t })
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
      if (editing) {
        await updateTournament(editing.id, form)
      } else {
        await createTournament(form)
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
          <table className="w-full text-sm min-w-[800px]">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Art</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Dates</th>
                <th className="px-4 py-3">Sport</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-gray-500">
                    Loading…
                  </td>
                </tr>
              ) : (
                items.map((t) => (
                  <tr key={t.id}>
                    <td className="px-4 py-3">
                      {t.artworkUrl ? (
                        <img src={t.artworkUrl} alt="" className="w-12 h-12 object-cover rounded-sm" />
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-navy">{t.name}</td>
                    <td className="px-4 py-3 text-gray-600">{t.dateLabel}</td>
                    <td className="px-4 py-3 text-gray-600">{t.sport}</td>
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
                ))
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
        <form onSubmit={handleSave} className="space-y-3">
          {(
            [
              ['name', 'Name'],
              ['shortName', 'Short name'],
              ['dateLabel', 'Date label'],
              ['sport', 'Sport'],
              ['ages', 'Ages'],
              ['level', 'Level'],
              ['artworkUrl', 'Artwork URL'],
              ['registrationUrl', 'Registration URL'],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-navy mb-1">{label}</label>
              <input
                value={form[key] as string}
                onChange={(e) => setField(key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Price</label>
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
