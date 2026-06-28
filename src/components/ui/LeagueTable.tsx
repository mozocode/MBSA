interface LeagueRow {
  league: string
  ages: string
}

interface LeagueTableProps {
  title: string
  rows: LeagueRow[]
}

export function LeagueTable({ title, rows }: LeagueTableProps) {
  return (
    <div className="flex-1 min-w-0">
      <h3 className="font-display font-bold text-2xl md:text-3xl text-white uppercase mb-4">{title}</h3>
      <div className="overflow-hidden rounded-sm border border-white/10">
        <div className="grid grid-cols-2 bg-gold text-navy font-display font-bold uppercase text-sm">
          <div className="px-4 py-3">League</div>
          <div className="px-4 py-3">Ages</div>
        </div>
        {rows.map((row, index) => (
          <div
            key={`${row.league}-${index}`}
            className={`grid grid-cols-2 text-sm ${
              index % 2 === 0 ? 'bg-navy-light/80 text-white' : 'bg-navy/80 text-white/90'
            }`}
          >
            <div className="px-4 py-3 font-medium">{row.league}</div>
            <div className="px-4 py-3">{row.ages}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
