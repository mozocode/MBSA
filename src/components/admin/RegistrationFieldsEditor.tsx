import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  FIELD_TYPE_LABELS,
  createField,
  sortFields,
} from '../../lib/registrationFields'
import type { RegistrationField, RegistrationFieldType } from '../../lib/types'

interface RegistrationFieldsEditorProps {
  fields: RegistrationField[]
  onChange: (fields: RegistrationField[]) => void
}

function SortableFieldRow({
  field,
  onUpdate,
  onRemove,
}: {
  field: RegistrationField
  onUpdate: (field: RegistrationField) => void
  onRemove: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.id,
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
      className="border border-gray-200 rounded-sm p-3 bg-gray-50 space-y-2"
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          className="mt-2 text-gray-400 hover:text-navy cursor-grab"
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <div className="flex-1 space-y-2">
          <input
            value={field.label}
            onChange={(e) => onUpdate({ ...field, label: e.target.value })}
            placeholder="Field label"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
          />
          <div className="flex flex-wrap gap-2">
            <select
              value={field.type}
              onChange={(e) =>
                onUpdate({
                  ...field,
                  type: e.target.value as RegistrationFieldType,
                  options: e.target.value === 'select' ? field.options ?? [''] : undefined,
                })
              }
              className="px-2 py-1.5 border border-gray-300 rounded-sm text-sm"
            >
              {(Object.keys(FIELD_TYPE_LABELS) as RegistrationFieldType[]).map((t) => (
                <option key={t} value={t}>
                  {FIELD_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
            <label className="inline-flex items-center gap-1.5 text-sm text-navy">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => onUpdate({ ...field, required: e.target.checked })}
              />
              Required
            </label>
          </div>
          {field.type === 'select' && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Options (one per line)
              </label>
              <textarea
                rows={3}
                value={(field.options ?? []).join('\n')}
                onChange={(e) =>
                  onUpdate({
                    ...field,
                    options: e.target.value
                      .split('\n')
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm font-mono"
              />
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="mt-2 text-red-600 hover:text-red-800"
          aria-label="Remove field"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export function RegistrationFieldsEditor({ fields, onChange }: RegistrationFieldsEditorProps) {
  const [newLabel, setNewLabel] = useState('')
  const [newType, setNewType] = useState<RegistrationFieldType>('text')

  const sorted = sortFields(fields)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = sorted.findIndex((f) => f.id === active.id)
    const newIndex = sorted.findIndex((f) => f.id === over.id)
    const reordered = arrayMove(sorted, oldIndex, newIndex).map((f, i) => ({ ...f, order: i }))
    onChange(reordered)
  }

  const addField = () => {
    if (!newLabel.trim()) return
    const next = createField({
      label: newLabel.trim(),
      type: newType,
      required: newType !== 'textarea',
      order: fields.length,
      options: newType === 'select' ? ['Option 1'] : undefined,
    })
    onChange([...fields, next])
    setNewLabel('')
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Registration fields shown on the public product page. Drag to reorder, or remove fields you
        do not need.
      </p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sorted.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {sorted.map((field) => (
              <SortableFieldRow
                key={field.id}
                field={field}
                onUpdate={(updated) =>
                  onChange(fields.map((f) => (f.id === updated.id ? updated : f)))
                }
                onRemove={() => onChange(fields.filter((f) => f.id !== field.id))}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {sorted.length === 0 && (
        <p className="text-sm text-gray-500 italic">No registration fields yet.</p>
      )}

      <div className="border-t border-gray-200 pt-3 space-y-2">
        <p className="text-sm font-semibold text-navy">Add field</p>
        <div className="flex flex-wrap gap-2">
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Field label"
            className="flex-1 min-w-[160px] px-3 py-2 border border-gray-300 rounded-sm text-sm"
          />
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as RegistrationFieldType)}
            className="px-2 py-2 border border-gray-300 rounded-sm text-sm"
          >
            {(Object.keys(FIELD_TYPE_LABELS) as RegistrationFieldType[]).map((t) => (
              <option key={t} value={t}>
                {FIELD_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={addField}
            className="inline-flex items-center gap-1 px-3 py-2 bg-navy text-white text-sm font-semibold rounded-sm hover:bg-navy-light"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
