import { useState } from 'react'
import {
  faqLeagueSections,
  faqRegistrationIntro,
  getInvolvedRegistrationQuestions,
} from '../../lib/faqContent'
import { getInvolvedEvents } from '../../lib/getInvolvedEvents'
import {
  getInvolvedTabs,
  type GetInvolvedTabId,
} from '../../lib/getInvolvedContent'
import { FaqQuestionBlock, FaqSectionBlock } from './FaqContent'
import { EventCalendar } from './EventCalendar'
import { PracticeCalendarEmbed } from './PracticeCalendarEmbed'

export function GetInvolvedTabs() {
  const [activeTab, setActiveTab] = useState<GetInvolvedTabId>('faq')

  return (
    <div>
      <div
        className="flex flex-wrap gap-2 border-b border-navy/15 mb-8"
        role="tablist"
        aria-label="Get involved sections"
      >
        {getInvolvedTabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`get-involved-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`get-involved-panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-display font-bold uppercase text-sm md:text-base tracking-wide transition-colors focus-ring rounded-t-sm ${
                isActive
                  ? 'bg-gold text-navy border border-b-0 border-gold -mb-px'
                  : 'text-navy/70 hover:text-navy'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {activeTab === 'faq' && (
        <div
          id="get-involved-panel-faq"
          role="tabpanel"
          aria-labelledby="get-involved-tab-faq"
          className="space-y-8 text-navy/85 max-w-3xl"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-navy uppercase">FAQ</h2>

          {faqLeagueSections.map((section) => (
            <FaqSectionBlock key={section.id} section={section} />
          ))}

          <div className="space-y-3 pt-2">
            <h3 className="font-display font-bold text-xl md:text-2xl text-navy uppercase">
              {faqRegistrationIntro.title}
            </h3>
            {faqRegistrationIntro.paragraphs.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
            <p className="leading-relaxed">
              Register here:{' '}
              <a
                href={faqRegistrationIntro.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy font-semibold underline decoration-gold/60 hover:text-gold transition-colors break-all"
              >
                {faqRegistrationIntro.registerUrl}
              </a>
            </p>
          </div>

          {getInvolvedRegistrationQuestions.map((item) => (
            <FaqQuestionBlock key={item.question} item={item} />
          ))}
        </div>
      )}

      {activeTab === 'schedule' && (
        <div
          id="get-involved-panel-schedule"
          role="tabpanel"
          aria-labelledby="get-involved-tab-schedule"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-navy uppercase mb-8">
            Schedule of Events
          </h2>
          <EventCalendar events={getInvolvedEvents} />
        </div>
      )}

      {activeTab === 'practice' && (
        <div
          id="get-involved-panel-practice"
          role="tabpanel"
          aria-labelledby="get-involved-tab-practice"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-navy uppercase mb-8">
            MBSA Practice Schedule
          </h2>
          <PracticeCalendarEmbed />
        </div>
      )}
    </div>
  )
}
