export const FAQ_HERO =
  '/media/2024/01/IMG_3485-scaled.jpeg'

export const FAQ_INTRO_HEADING =
  'MBSA offers baseball and softball at the following levels.'

export const MBSA_REGISTER_URL =
  'https://leagues.bluesombrero.com/default.aspx?portalid=9011'

export interface FaqListSection {
  id: string
  title: string
  note?: string
  items?: string[]
  paragraphs?: string[]
  bullets?: string[]
  paragraphsAfterBullets?: string[]
}

export interface FaqQuestion {
  question: string
  paragraphs: string[]
}

export const faqLeagueSections: FaqListSection[] = [
  {
    id: 'baseball',
    title: 'Baseball',
    note: '(Your player\u2019s age group is dependent on their age on April 30th of that year.)',
    items: [
      'Instructional (Tee-Ball) \u2014 for all players 6 and under',
      'Coach Pitch \u2014 ages 6-8',
      'Mustang \u2014 ages 9-10 (kid pitch)',
      'Bronco \u2014 ages 11-12',
      'Pony \u2014 ages 13-14',
      'Junior Legion \u2013 ages 13-16',
    ],
  },
  {
    id: 'softball',
    title: 'Softball',
    note: '(Your player\u2019s age group is dependent on their age on September 1st of that year.)',
    items: ['6U \u2013 ages 3-6', '8U \u2013 ages 7-8', '10U \u2013 ages 9-10 (kid pitch)', '12U \u2013 ages 11-12', '14U \u2013 ages 13-14'],
  },
  {
    id: 'playing-up',
    title: 'Playing Up',
    paragraphs: [
      '\u201CPlaying Up\u201D in Softball or Baseball is allowed after the following criteria are met:',
    ],
    bullets: [
      'Email request sent asking that the player be moved up to Josh Plassmeyer, MBSA Executive Commissioner (commissioner@mbsagators.com).',
      'Evaluation of the player by a MBSA Board member, delegate, or feedback from prior coaches.',
      'Board issued approval.',
    ],
    paragraphsAfterBullets: [
      'It is incredibly important that MBSA evaluates the players\u2019 safety, attentiveness, and skill level in these situations. We understand that families may want siblings to play together, or skills may be advanced for a particular age group for particular players, however, if the MBSA Board/Evaluators believe the player is not ready for movement for any reason we must ask for understanding on this issue. The last thing we want is for an injury to occur to anyone associated with our league.',
    ],
  },
]

export const faqRegistrationIntro = {
  title: 'Registration',
  paragraphs: [
    'Registration fees are $100 (Spring) and $75 (Fall) per child for both baseball AND softball. For families with multiple players, the second, third, etc. sibling will receive a $10 discount.',
    'We also offer registration scholarship to families that need support. Please email Josh Plassmeyer at commissioner@mbsagators.com to request a registration scholarship.',
  ],
  registerUrl: MBSA_REGISTER_URL,
}

export const faqRegistrationQuestions: FaqQuestion[] = [
  {
    question: 'What does registration cover?',
    paragraphs: [
      'The fee includes a hat, shirt and baseball or softball pants in the Spring season and a Jersey and hat (if wanted) in the Fall season. It does NOT include equipment; your player will need a helmet, a bat and a glove to play at a minimum. If equipment is needed please reach out to info@mbsagators.com and equipment@mbsagators.com to have a member of the MBSA Executive Board reach out to you.',
      'As usual, we plan on having our Dick\u2019s Sporting Goods and Dunham\u2019s discount weekends where MBSA families could receive 20% off their purchase with a coupon we provide. We will notify you on what weekend those are as soon as we are informed.',
    ],
  },
  {
    question: 'When does registration close?',
    paragraphs: [
      'Spring Registration closes around mid-February each year. Fall Registration closes in mid-August each year. We attempt to start the season early to allow the kids to play more games. For this to happen, having families register by the deadline is extremely important. Late registration can be accepted on a case by case basis. A late fee of $10.00 will be applied for anyone that registers after this date.',
    ],
  },
  {
    question: 'When do practices begin?',
    paragraphs: [
      'We are targeting mid-March (Spring) and mid-August (Fall) for practices to begin at various Monroeville Parks (though not Monroeville Park West, which will be closed until April 1). We have spoken to the municipality and they are open to working with us on this schedule.',
    ],
  },
  {
    question: 'How many practices will my team have?',
    paragraphs: [
      'A lot of that depends on the coach\u2019s schedule. Traditionally coaches usually practice once or twice a week until games begin. Practices can become sporadic at that point, and will be at the discretion of the head coach. Most practices are also around the 5:30 or 6pm start times and last anywhere between 1 and 2 hours. This, again, is up to the head coach of that team.',
    ],
  },
  {
    question: 'Will my player\u2019s practices be on the same day/time throughout the season?',
    paragraphs: [
      'It depends on the coach\u2019s schedule. We give our coaches a wide berth in terms of scheduling so they can organize it in a way that best fits their schedule.',
    ],
  },
  {
    question: 'When does the season start?',
    paragraphs: [
      'We are hopeful that if we start practicing earlier, we can start playing earlier. We have a goal of the 2nd to last Saturday in April for Spring and early September for Fall. However, some games may start as early as week or two before to accommodate more games for our players! To do this, we need interested players registered in time.',
      'Softball: If we do not achieve 4 teams per age group we may enter the division in the local Eastern Fast Pitch league or merge with another local community organization. This may then require some travel to neighboring communities.',
    ],
  },
  {
    question: 'How long does the season run?',
    paragraphs: [
      'We will play games through mid-June, with a \u201Cchampionship night\u201D likely scheduled for the 2nd and 3rd weeks of June. This could change based on the volume of teams we have. MBSA would recommend families plan around these playoff weeks as they WILL NOT be moved or modified once a final schedule is determined.',
      'Eastern Fast Pitch determines their playoff schedule on their own and we will notify those families as soon as we know more information.',
    ],
  },
  {
    question: 'Can I volunteer? If so, how do I volunteer?',
    paragraphs: [
      'Yes, and it\u2019s easy. Just fill out the appropriate information when you register. MBSA is constantly on the lookout for new coaches, assistant coaches, team parents, etc. You will also receive a FREE registration if you commit and are selected to becoming a head coach!',
    ],
  },
]

export const getInvolvedRegistrationQuestions: FaqQuestion[] = faqRegistrationQuestions
