import {
  ANNOUNCEMENT_PAGE_OPTIONS,
  type AnnouncementPagePath,
  type AnnouncementPageScope,
} from '../../lib/announcementPages'

interface AnnouncementPageSelectorProps {
  value: AnnouncementPageScope
  onChange: (value: AnnouncementPageScope) => void
}

export function AnnouncementPageSelector({ value, onChange }: AnnouncementPageSelectorProps) {
  const isAll = value === 'all'
  const selected = isAll ? new Set<AnnouncementPagePath>() : new Set(value)

  const toggleAll = (checked: boolean) => {
    onChange(checked ? 'all' : [])
  }

  const togglePage = (path: AnnouncementPagePath, checked: boolean) => {
    if (isAll) {
      onChange(checked ? [path] : [])
      return
    }
    const next = new Set(selected)
    if (checked) next.add(path)
    else next.delete(path)
    onChange(Array.from(next))
  }

  return (
    <fieldset className="space-y-3">
      <legend className="block text-sm font-semibold text-navy mb-2">Show on pages</legend>
      <label className="flex items-center gap-2 text-sm text-navy cursor-pointer">
        <input
          type="checkbox"
          checked={isAll}
          onChange={(e) => toggleAll(e.target.checked)}
          className="rounded border-gray-300 text-gold focus:ring-gold"
        />
        <span className="font-semibold">All pages</span>
      </label>
      {!isAll && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1 max-h-48 overflow-y-auto border border-gray-200 rounded-sm p-3">
          {ANNOUNCEMENT_PAGE_OPTIONS.map((option) => (
            <label key={option.path} className="flex items-center gap-2 text-sm text-navy cursor-pointer">
              <input
                type="checkbox"
                checked={selected.has(option.path)}
                onChange={(e) => togglePage(option.path, e.target.checked)}
                className="rounded border-gray-300 text-gold focus:ring-gold"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}
      {!isAll && selected.size === 0 && (
        <p className="text-xs text-amber-700">Select at least one page, or choose “All pages”.</p>
      )}
    </fieldset>
  )
}
