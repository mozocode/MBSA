import { PRACTICE_CALENDAR_EMBED } from '../../lib/practiceScheduleContent'

interface PracticeCalendarEmbedProps {
  title?: string
  className?: string
}

export function PracticeCalendarEmbed({
  title = 'MBSA practice schedule',
  className = 'min-h-[500px] md:min-h-[650px]',
}: PracticeCalendarEmbedProps) {
  return (
    <div className="bg-white rounded-sm border border-[#CFCFDA] overflow-hidden shadow-sm">
      <iframe
        src={PRACTICE_CALENDAR_EMBED}
        title={title}
        className={`w-full border-0 ${className}`}
        loading="lazy"
      />
    </div>
  )
}
