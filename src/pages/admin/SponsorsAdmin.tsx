import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useEffect, useMemo, useState } from 'react'
import { AdminErrorBoundary } from '../../components/admin/AdminErrorBoundary'
import { SlideOver } from '../../components/admin/SlideOver'
import { SortableSponsorCard } from '../../components/admin/SortableSponsorCard'
import {
  createSponsor,
  deleteSponsor,
  listSponsors,
  reorderSponsors,
} from '../../lib/firestore/sponsors'
import type { Sponsor } from '../../lib/types'

type TierFilter = 'all' | Sponsor['tier']

export function SponsorsAdmin() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)
  const [tierFilter, setTierFilter] = useState<TierFilter>('all')
  const [panelOpen, setPanelOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    logoUrl: '',
    websiteUrl: '',
    tier: 'gold' as Sponsor['tier'],
  })
  const [saving, setSaving] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const filtered = useMemo(
    () => (tierFilter === 'all' ? sponsors : sponsors.filter((s) => s.tier === tierFilter)),
    [sponsors, tierFilter],
  )

  const load = async () => {
    setLoading(true)
    try {
      setSponsors(await listSponsors())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = sponsors.findIndex((s) => s.id === active.id)
    const newIndex = sponsors.findIndex((s) => s.id === over.id)
    const reordered = arrayMove(sponsors, oldIndex, newIndex)
    setSponsors(reordered)
    try {
      await reorderSponsors(reordered)
    } catch {
      await load()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this sponsor?')) return
    await deleteSponsor(id)
    setSponsors((prev) => prev.filter((s) => s.id !== id))
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.logoUrl.trim()) return
    setSaving(true)
    try {
      await createSponsor({
        name: form.name.trim(),
        logoUrl: form.logoUrl.trim(),
        websiteUrl: form.websiteUrl.trim() || undefined,
        tier: form.tier,
        order: sponsors.length,
      })
      setForm({ name: '', logoUrl: '', websiteUrl: '', tier: 'gold' })
      setPanelOpen(false)
      await load()
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminErrorBoundary title="Sponsors error">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {(['all', 'gold', 'silver', 'bronze'] as TierFilter[]).map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => setTierFilter(tier)}
                className={`px-3 py-1.5 text-xs font-bold uppercase rounded-full border transition-colors ${
                  tierFilter === tier
                    ? 'bg-navy text-white border-navy'
                    : 'bg-white text-navy border-gray-200 hover:border-gold'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            className="px-4 py-2 bg-gold text-navy font-display font-bold uppercase text-sm rounded-sm"
          >
            Add sponsor
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={filtered.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {filtered.map((sponsor) => (
                  <SortableSponsorCard
                    key={sponsor.id}
                    sponsor={sponsor}
                    onDelete={() => handleDelete(sponsor.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <SlideOver open={panelOpen} title="Add sponsor" onClose={() => setPanelOpen(false)}>
        <form onSubmit={handleCreate} className="space-y-4">
          {(['name', 'logoUrl', 'websiteUrl'] as const).map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-navy mb-1 capitalize">
                {field === 'logoUrl' ? 'Logo URL' : field === 'websiteUrl' ? 'Website URL' : 'Name'}
              </label>
              <input
                value={form[field]}
                onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                required={field !== 'websiteUrl'}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Tier</label>
            <select
              value={form.tier}
              onChange={(e) =>
                setForm((f) => ({ ...f, tier: e.target.value as Sponsor['tier'] }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-sm"
            >
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="bronze">Bronze</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-gold text-navy font-bold uppercase text-sm rounded-sm disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Add sponsor'}
          </button>
        </form>
      </SlideOver>
    </AdminErrorBoundary>
  )
}
