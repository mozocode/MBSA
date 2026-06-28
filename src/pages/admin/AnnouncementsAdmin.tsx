import { useEffect, useState } from 'react'
import { AdminErrorBoundary } from '../../components/admin/AdminErrorBoundary'
import { AdminToggle } from '../../components/admin/AdminToggle'
import { SlideOver } from '../../components/admin/SlideOver'
import {
  createAnnouncement,
  deleteAnnouncement,
  listAnnouncements,
  updateAnnouncement,
} from '../../lib/firestore/announcements'
import type { Announcement } from '../../lib/types'

export function AnnouncementsAdmin() {
  const [items, setItems] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [panelOpen, setPanelOpen] = useState(false)
  const [text, setText] = useState('')
  const [link, setLink] = useState('')
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      setItems(await listAnnouncements())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleToggle = async (item: Announcement, active: boolean) => {
    setItems((prev) => prev.map((a) => (a.id === item.id ? { ...a, active } : a)))
    try {
      await updateAnnouncement(item.id, { active })
    } catch {
      setItems((prev) => prev.map((a) => (a.id === item.id ? { ...a, active: !active } : a)))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this announcement?')) return
    await deleteAnnouncement(id)
    setItems((prev) => prev.filter((a) => a.id !== id))
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    setSaving(true)
    try {
      await createAnnouncement({ text: text.trim(), link: link.trim() || undefined, active: true })
      setText('')
      setLink('')
      setPanelOpen(false)
      await load()
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminErrorBoundary title="Announcements error">
      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            className="px-4 py-2 bg-gold text-navy font-display font-bold uppercase text-sm rounded-sm hover:bg-gold-light"
          >
            Add announcement
          </button>
        </div>

        <div className="bg-white rounded-sm border border-gray-200 overflow-x-auto shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Text</th>
                <th className="px-4 py-3">Link</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-gray-500">
                    Loading…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-gray-500">
                    No announcements yet.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 font-medium text-navy max-w-xs truncate">
                      {item.text}
                    </td>
                    <td className="px-4 py-3 text-gray-500 max-w-[120px] truncate">
                      {item.link ?? '—'}
                    </td>
                    <td className="px-4 py-3">
                      <AdminToggle
                        checked={item.active}
                        onChange={(v) => handleToggle(item, v)}
                        label={`Toggle ${item.text}`}
                      />
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {item.createdAt?.toDate?.().toLocaleDateString?.() ?? '—'}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:underline text-xs font-semibold"
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

      <SlideOver open={panelOpen} title="Add announcement" onClose={() => setPanelOpen(false)}>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Text</label>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Link (optional)</label>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              type="url"
              placeholder="https://"
              className="w-full px-3 py-2 border border-gray-300 rounded-sm"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-gold text-navy font-bold uppercase text-sm rounded-sm disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Create'}
          </button>
        </form>
      </SlideOver>
    </AdminErrorBoundary>
  )
}
