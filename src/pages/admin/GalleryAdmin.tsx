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
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { AdminErrorBoundary } from '../../components/admin/AdminErrorBoundary'
import { SlideOver } from '../../components/admin/SlideOver'
import { SortablePhotoCard } from '../../components/admin/SortablePhotoCard'
import {
  createGalleryPhoto,
  deleteGalleryPhoto,
  listGalleryPhotos,
  reorderGalleryPhotos,
  updateGalleryPhoto,
} from '../../lib/firestore/gallery'
import type { GalleryPhoto } from '../../lib/types'

export function GalleryAdmin() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [panelOpen, setPanelOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [saving, setSaving] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const load = async () => {
    setLoading(true)
    try {
      setPhotos(await listGalleryPhotos())
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
    const oldIndex = photos.findIndex((p) => p.id === active.id)
    const newIndex = photos.findIndex((p) => p.id === over.id)
    const reordered = arrayMove(photos, oldIndex, newIndex)
    setPhotos(reordered)
    try {
      await reorderGalleryPhotos(reordered)
    } catch {
      await load()
    }
  }

  const handleToggle = async (photo: GalleryPhoto, active: boolean) => {
    setPhotos((prev) => prev.map((p) => (p.id === photo.id ? { ...p, active } : p)))
    try {
      await updateGalleryPhoto(photo.id, { active })
    } catch {
      setPhotos((prev) => prev.map((p) => (p.id === photo.id ? { ...p, active: !active } : p)))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this photo?')) return
    await deleteGalleryPhoto(id)
    setPhotos((prev) => prev.filter((p) => p.id !== id))
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageUrl.trim()) return
    setSaving(true)
    try {
      await createGalleryPhoto({
        imageUrl: imageUrl.trim(),
        caption: caption.trim() || undefined,
        instagramUrl: instagramUrl.trim() || undefined,
        order: photos.length,
        active: true,
      })
      setImageUrl('')
      setCaption('')
      setInstagramUrl('')
      setPanelOpen(false)
      await load()
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminErrorBoundary title="Gallery error">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Drag photos to reorder</p>
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            className="px-4 py-2 bg-gold text-navy font-display font-bold uppercase text-sm rounded-sm"
          >
            Add photo
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={photos.map((p) => p.id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <SortablePhotoCard
                    key={photo.id}
                    photo={photo}
                    onToggle={(active) => handleToggle(photo, active)}
                    onDelete={() => handleDelete(photo.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <SlideOver open={panelOpen} title="Add photo" onClose={() => setPanelOpen(false)}>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Image URL</label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Caption</label>
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Instagram URL</label>
            <input
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-sm"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-gold text-navy font-bold uppercase text-sm rounded-sm disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Add photo'}
          </button>
        </form>
      </SlideOver>
    </AdminErrorBoundary>
  )
}
