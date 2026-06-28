export function FullPageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div
        className="w-10 h-10 border-4 border-navy/20 border-t-gold rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  )
}
