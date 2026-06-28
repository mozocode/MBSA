import type { Tournament } from '../../lib/types'

const styles: Record<Tournament['status'], string> = {
  open: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-600',
  upcoming: 'bg-blue-100 text-blue-800',
}

export function TournamentStatusBadge({ status }: { status: Tournament['status'] }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold uppercase ${styles[status]}`}>
      {status}
    </span>
  )
}
