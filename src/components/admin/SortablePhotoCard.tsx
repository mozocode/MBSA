import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2 } from 'lucide-react'
import { AdminToggle } from './AdminToggle'
import type { GalleryPhoto } from '../../lib/types'

interface SortablePhotoCardProps {
  photo: GalleryPhoto
  onToggle: (active: boolean) => void
  onDelete: () => void
}

export function SortablePhotoCard({ photo, onToggle, onDelete }: SortablePhotoCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: photo.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm"
    >
      <div className="aspect-square bg-gray-100 relative">
        <img src={photo.imageUrl} alt={photo.caption ?? ''} className="w-full h-full object-cover" />
        <button
          type="button"
          className="absolute top-2 left-2 p-1.5 bg-white/90 rounded-sm cursor-grab active:cursor-grabbing shadow"
          aria-label="Drag to reorder"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4 text-navy" />
        </button>
      </div>
      <div className="p-3 flex items-center justify-between gap-2">
        <p className="text-xs text-navy truncate flex-1">{photo.caption ?? 'No caption'}</p>
        <AdminToggle
          checked={photo.active}
          onChange={onToggle}
          label={`Toggle ${photo.caption ?? photo.id}`}
        />
        <button
          type="button"
          onClick={onDelete}
          className="p-1 text-red-600 hover:bg-red-50 rounded"
          aria-label="Delete photo"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
