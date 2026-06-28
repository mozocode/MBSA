import { X } from 'lucide-react'
import type { ReactNode } from 'react'

interface SlideOverProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export function SlideOver({ open, title, onClose, children }: SlideOverProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close panel"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white h-full shadow-xl overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <h2 className="font-display font-bold text-xl text-navy uppercase">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-navy/60 hover:text-navy focus-ring rounded"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
