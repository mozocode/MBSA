import type { FaqListSection, FaqQuestion } from '../../lib/faqContent'

function renderParagraph(text: string, index: number) {
  const emailMatch = text.match(/Monroevillebaseballassociation@gmail\.com/)
  if (emailMatch) {
    const parts = text.split('Monroevillebaseballassociation@gmail.com')
    return (
      <p key={index} className="leading-relaxed">
        {parts[0]}
        <a
          href="mailto:Monroevillebaseballassociation@gmail.com"
          className="text-navy font-semibold underline decoration-gold/60 hover:text-gold transition-colors"
        >
          Monroevillebaseballassociation@gmail.com
        </a>
        {parts[1]}
      </p>
    )
  }

  return (
    <p key={index} className="leading-relaxed">
      {text}
    </p>
  )
}

interface FaqSectionBlockProps {
  section: FaqListSection
}

export function FaqSectionBlock({ section }: FaqSectionBlockProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-display font-bold text-xl md:text-2xl text-navy uppercase">{section.title}</h3>
      {section.note && <p className="text-navy/70 italic">{section.note}</p>}
      {section.items && (
        <ul className="space-y-1 pl-0 list-none">
          {section.items.map((item) => (
            <li key={item} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      )}
      {section.paragraphs?.map((paragraph, index) => renderParagraph(paragraph, index))}
      {section.bullets && (
        <ul className="list-disc pl-5 space-y-1">
          {section.bullets.map((item) => (
            <li key={item} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      )}
      {section.paragraphsAfterBullets?.map((paragraph, index) =>
        renderParagraph(paragraph, index + 100),
      )}
    </div>
  )
}

interface FaqQuestionBlockProps {
  item: FaqQuestion
}

export function FaqQuestionBlock({ item }: FaqQuestionBlockProps) {
  return (
    <div className="space-y-3">
      <h4 className="font-display font-bold text-lg md:text-xl text-navy">{item.question}</h4>
      <div className="space-y-3 text-navy/85">
        {item.paragraphs.map((paragraph, index) => renderParagraph(paragraph, index))}
      </div>
    </div>
  )
}
