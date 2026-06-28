import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2 } from 'lucide-react'
import type { Sponsor } from '../../lib/types'

interface SortableSponsorCardProps {
  sponsor: Sponsor
  onToggle?: (active: boolean) => void
  onDelete: () => void
}

const tierColors = {
  gold: 'bg-gold/20 text-gold-dark border-gold',
  silver: 'bg-gray-100 text-gray-700 border-gray-300',
  bronze: 'bg-orange-100 text-orange-800 border-orange-300',
}

export function SortableSponsorCard({ sponsor, onDelete }: SortableSponsorCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: sponsor.id,
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
      className="flex items-center gap-4 bg-white border border-gray-200 rounded-sm p-3 shadow-sm"
    >
      <button
        type="button"
        className="p-1 cursor-grab active:cursor-grabbing text-gray-400"
        aria-label="Drag to reorder"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-5 h-5" />
      </button>
      <img
        src={sponsor.logoUrl}
        alt={sponsor.name}
        className="w-14 h-14 object-contain bg-gray-50 rounded-sm shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-navy text-sm truncate">{sponsor.name}</p>
        {sponsor.websiteUrl && (
          <p className="text-xs text-gray-400 truncate">{sponsor.websiteUrl}</p>
        )}
      </div>
      <span
        className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full border ${tierColors[sponsor.tier]}`}
      >
        {sponsor.tier}
      </span>
      <button
        type="button"
        onClick={onDelete}
        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
        aria-label={`Delete ${sponsor.name}`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}
