import { useEffect, useState } from 'react'
import { AdminErrorBoundary } from '../../components/admin/AdminErrorBoundary'
import { AnnouncementPageSelector } from '../../components/admin/AnnouncementPageSelector'
import { AdminToggle } from '../../components/admin/AdminToggle'
import { SlideOver } from '../../components/admin/SlideOver'
import { formatAnnouncementPages } from '../../lib/announcementPages'
import {
  createAnnouncement,
  deleteAnnouncement,
  listAnnouncements,
  updateAnnouncement,
} from '../../lib/firestore/announcements'
import type { Announcement, AnnouncementPageScope } from '../../lib/types'

type FormState = {
  text: string
  link: string
  pages: AnnouncementPageScope
}

const emptyForm = (): FormState => ({
  text: '',
  link: '',
  pages: 'all',
})

export function AnnouncementsAdmin() {
  const [items, setItems] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [panelOpen, setPanelOpen] = useState(false)
  const [editing, setEditing] = useState<Announcement | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm())
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

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm())
    setPanelOpen(true)
  }

  const openEdit = (item: Announcement) => {
    setEditing(item)
    setForm({
      text: item.text,
      link: item.link ?? '',
      pages: item.pages ?? 'all',
    })
    setPanelOpen(true)
  }

  const closePanel = () => {
    setPanelOpen(false)
    setEditing(null)
    setForm(emptyForm())
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.text.trim()) return
    if (form.pages !== 'all' && form.pages.length === 0) return

    setSaving(true)
    try {
      const payload = {
        text: form.text.trim(),
        link: form.link.trim() || undefined,
        pages: form.pages,
      }
      if (editing) {
        await updateAnnouncement(editing.id, payload)
      } else {
        await createAnnouncement({ ...payload, active: true })
      }
      closePanel()
      await load()
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminErrorBoundary title="Announcements error">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Manage the gold banner at the top of the site. Choose which pages each announcement
          appears on, or show it on all pages.
        </p>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={openCreate}
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
                <th className="px-4 py-3">Pages</th>
                <th className="px-4 py-3">Link</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-gray-500">
                    Loading…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-gray-500">
                    No announcements yet. Add one to show the top banner on your site.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 font-medium text-navy max-w-xs truncate">
                      {item.text}
                    </td>
                    <td className="px-4 py-3 text-gray-600 max-w-[180px] text-xs leading-snug">
                      {formatAnnouncementPages(item.pages)}
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
                    <td className="px-4 py-3 space-x-3 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => openEdit(item)}
                        className="text-navy hover:underline text-xs font-semibold"
                      >
                        Edit
                      </button>
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

      <SlideOver
        open={panelOpen}
        title={editing ? 'Edit announcement' : 'Add announcement'}
        onClose={closePanel}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Text</label>
            <input
              value={form.text}
              onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Link (optional)</label>
            <input
              value={form.link}
              onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
              type="url"
              placeholder="https://"
              className="w-full px-3 py-2 border border-gray-300 rounded-sm"
            />
          </div>
          <AnnouncementPageSelector
            value={form.pages}
            onChange={(pages) => setForm((f) => ({ ...f, pages }))}
          />
          <button
            type="submit"
            disabled={saving || (form.pages !== 'all' && form.pages.length === 0)}
            className="px-4 py-2 bg-gold text-navy font-bold uppercase text-sm rounded-sm disabled:opacity-50"
          >
            {saving ? 'Saving…' : editing ? 'Save changes' : 'Create'}
          </button>
        </form>
      </SlideOver>
    </AdminErrorBoundary>
  )
}
