import { motion } from 'framer-motion'
import type { BoardMember } from '../../lib/boardMembers'

interface BoardMemberCardProps {
  member: BoardMember
  index?: number
}

export function BoardMemberCard({ member, index = 0 }: BoardMemberCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
      className="flex flex-col overflow-hidden bg-white shadow-md"
    >
      <div className="h-[296px] overflow-hidden bg-navy-light/20">
        <img
          src={member.photoUrl}
          alt={`${member.name}, ${member.role}`}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>
      <div className="bg-gold px-5 py-6 text-center flex flex-col gap-2 min-h-[140px]">
        <h3 className="font-display font-bold text-2xl md:text-[2rem] leading-tight text-navy uppercase tracking-tight">
          {member.name}
        </h3>
        <p className="font-sans font-medium text-lg text-navy/90">{member.role}</p>
        <a
          href={`mailto:${member.email}`}
          className="font-sans font-medium text-base text-navy hover:text-navy-light transition-colors focus-ring rounded break-all"
        >
          {member.email}
        </a>
      </div>
    </motion.article>
  )
}
