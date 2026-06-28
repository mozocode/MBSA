export function RouteFallback() {
  return (
    <div
      className="min-h-[50vh] flex items-center justify-center bg-cream"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="h-10 w-10 border-4 border-gold border-t-navy animate-spin" aria-hidden="true" />
    </div>
  )
}
