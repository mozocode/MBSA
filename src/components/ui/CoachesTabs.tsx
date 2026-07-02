import { useState } from 'react'
import {
  clearanceLinks,
  clearancePaidRequirements,
  clearanceSteps,
  clearanceVolunteerRequirements,
  coachVideos,
  coachesTabs,
  leagueRulesResources,
  playerDevelopmentResources,
  videoTrainingResources,
  type CoachesTabId,
  weeklyAwardsFormUrl,
  weeklyAwardsImage,
  weeklyAwardsParagraphs,
} from '../../lib/coachesContent'
import { CoachResourceCard } from './CoachResourceCard'
import { CoachVideoCard } from './CoachVideoCard'
import { GoldButton } from './GoldButton'

export function CoachesTabs() {
  const [activeTab, setActiveTab] = useState<CoachesTabId>('development')
  const coachingVideos = coachVideos.filter((v) => v.category === 'coaching')
  const drillVideos = coachVideos.filter((v) => v.category === 'drills')

  return (
    <div>
      <div
        className="flex flex-wrap gap-2 border-b border-navy/15 mb-8"
        role="tablist"
        aria-label="Coaches resources"
      >
        {coachesTabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`coaches-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`coaches-panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 md:px-4 py-3 font-display font-bold uppercase text-xs md:text-sm tracking-wide transition-colors focus-ring rounded-t-sm ${
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

      {activeTab === 'development' && (
        <div
          id="coaches-panel-development"
          role="tabpanel"
          aria-labelledby="coaches-tab-development"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-navy uppercase mb-6">
            Player Development
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {playerDevelopmentResources.map((resource, index) => (
              <CoachResourceCard key={resource.id} resource={resource} index={index} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'rules' && (
        <div id="coaches-panel-rules" role="tabpanel" aria-labelledby="coaches-tab-rules">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-navy uppercase mb-6">
            League Rules
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leagueRulesResources.map((resource, index) => (
              <CoachResourceCard key={resource.id} resource={resource} index={index} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'clearance' && (
        <div
          id="coaches-panel-clearance"
          role="tabpanel"
          aria-labelledby="coaches-tab-clearance"
          className="max-w-3xl space-y-6 text-navy/85"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-navy uppercase">
            Clearance Information
          </h2>

          <p className="leading-relaxed">
            The following is a guideline of requirements for each category:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-sm border border-navy/10 p-5 shadow-sm">
              <h3 className="font-display font-bold text-lg text-navy uppercase mb-3">
                Volunteers
              </h3>
              <ul className="space-y-2 list-disc list-inside text-sm md:text-base">
                {clearanceVolunteerRequirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-sm border border-navy/10 p-5 shadow-sm">
              <h3 className="font-display font-bold text-lg text-navy uppercase mb-3">
                Paid Staff
              </h3>
              <ul className="space-y-2 list-disc list-inside text-sm md:text-base">
                {clearancePaidRequirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="leading-relaxed">
            The Pennsylvania Child Protective Services Law changed effective January 1, 2015. The
            change no longer permits organizations like the Monroeville Baseball & Softball
            Association (MBSA) to conduct background checks through a third party provider. All
            background checks must be completed using the provider designated by Pennsylvania as
            per the requirements of the law. This is now a centralized system and ALL clearances
            can be obtained online at the sites listed below.
          </p>

          <p className="leading-relaxed">
            Individuals seeking clearances fall into two categories: paid and volunteer. Each
            classification has its own set of required clearances.
          </p>

          <div className="flex flex-wrap gap-3">
            {clearanceLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-navy text-white text-sm font-semibold rounded-sm hover:bg-gold hover:text-navy transition-colors focus-ring"
              >
                {link.label}
              </a>
            ))}
          </div>

          <h3 className="font-display font-bold text-xl text-navy uppercase pt-4">
            Follow the directions (in depth)
          </h3>

          {clearanceSteps.map((step, index) => (
            <div key={step.title} className="space-y-3">
              <h4 className="font-display font-bold text-lg text-navy">
                {index + 1}. {step.title}
              </h4>
              <a
                href={step.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold font-semibold underline decoration-gold/60 hover:text-navy transition-colors break-all"
              >
                {step.href}
              </a>
              {step.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="leading-relaxed text-sm md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'video' && (
        <div id="coaches-panel-video" role="tabpanel" aria-labelledby="coaches-tab-video">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-navy uppercase mb-6">
            Video Training
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {videoTrainingResources.map((resource, index) => (
              <CoachResourceCard key={resource.id} resource={resource} index={index} />
            ))}
          </div>

          <h3 className="font-display font-bold text-xl text-navy uppercase mb-4">Coaching</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {coachingVideos.map((video, index) => (
              <CoachVideoCard key={video.id} video={video} index={index} />
            ))}
          </div>

          <h3 className="font-display font-bold text-xl text-navy uppercase mb-4">Drills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drillVideos.map((video, index) => (
              <CoachVideoCard key={video.id} video={video} index={index} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'awards' && (
        <div
          id="coaches-panel-awards"
          role="tabpanel"
          aria-labelledby="coaches-tab-awards"
          className="max-w-3xl"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-navy uppercase mb-6">
            MBSA Weekly Awards
          </h2>

          <img
            src={weeklyAwardsImage}
            alt="MBSA weekly player awards flyer"
            className="w-full max-w-md mx-auto mb-8 rounded-sm shadow-md"
            loading="lazy"
          />

          <div className="space-y-4 text-navy/85 mb-8">
            {weeklyAwardsParagraphs.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <GoldButton href={weeklyAwardsFormUrl}>Submit Weekly Awards</GoldButton>
        </div>
      )}
    </div>
  )
}
