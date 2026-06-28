export const FAQ_HERO =
  'https://mbsagators.com/wp-content/uploads/2024/01/IMG_3485-scaled.jpeg'

export const FAQ_INTRO_HEADING =
  'MBSA offers baseball and softball at the following levels.'

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
    note: '(Your player\u2019s age group is dependent on their age on April 30, 2024.)',
    items: [
      'Instructional (Tee-Ball) \u2014 for all players 6 and under',
      'Coach Pitch \u2014 ages 7-8',
      'Mustang \u2014 ages 9-10 (kid pitch)',
      'Bronco \u2014 ages 11-12',
      'Pony \u2014 ages 13-14',
    ],
    paragraphs: [
      'We will attempt to offer Colt baseball (ages 15-16), but interest has been minimal in recent years.',
    ],
  },
  {
    id: 'softball',
    title: 'Softball',
    note: '(Your player\u2019s age group is dependent on their age on September 1st 2023.)',
    items: ['6U (!!NEW PROGRAM!!)', '8U (coach pitch)', '10U (kid pitch)', '12U', '14U'],
  },
  {
    id: 'playing-up',
    title: 'Playing Up',
    paragraphs: [
      '\u201CPlaying Up\u201D in Softball or Baseball is allowed after the following criteria are met:',
    ],
    bullets: [
      'Email request sent asking that the player be moved up.',
      'Evaluation of the player by a MBSA Board member or delegate.',
      'Board issued approval.',
    ],
    paragraphsAfterBullets: [
      'It is incredibly important that MBSA evaluates the players safety, attentiveness, and skill level in these situations. We understand that families may want siblings to play together, or skills may be advanced for a particular age group, however, if the MBSA Board/Evaluators believe the player is not ready for movement for any reason we must ask for understanding on this issue. The last thing we want is for an injury to occur to anyone associated with our league.',
    ],
  },
]

export const faqRegistrationIntro = {
  title: 'Registration',
  paragraphs: [
    'Registration fees are $75 per child for both baseball AND softball. For families with multiple players, the second, third, etc. sibling will receive a $10 discount.',
  ],
  registerUrl: 'https://leagues.bluesombrero.com/default.aspx?portalid=9011',
}

export const faqRegistrationQuestions: FaqQuestion[] = [
  {
    question: 'What does registration cover?',
    paragraphs: [
      'The fee includes a hat, shirt and baseball or softball pants. It does NOT include equipment; your player will need a helmet, a bat and a glove to play at a minimum. If equipment is needed please reach out to Monroevillebaseballassociation@gmail.com to have a member of the MBSA Executive Board reach out to you.',
      'As usual, we plan on having our Dick\u2019s Sporting Goods discount weekend in mid-March, when MBSA families will receive 20% off their purchase with a coupon we provide. We will notify you on what weekend specifically in the near future BUT please utilize this coupon to purchase equipment for any age level.',
    ],
  },
  {
    question: 'When does registration close?',
    paragraphs: [
      '2024 Spring Registration has closed. We are attempting to start the season earlier this year to allow the kids to play more games. For this to happen, having families register by the deadline is extremely important. A late fee of $10.00 will be applied for anyone that registers after this date.',
    ],
  },
  {
    question: 'When do practices begin?',
    paragraphs: [
      'We are targeting mid-March for practices to begin at various Monroeville Parks (though not Monroeville Park West, which will be closed until April 1). We have spoken to the municipality and they are open to working with us on this schedule.',
    ],
  },
  {
    question: 'How many practices will my team have?',
    paragraphs: [
      'A lot of that depends on the coach\u2019s schedule. Traditionally coaches usually practices once or twice a week until games begin. Practices can become sporadic at that point, and will be at the discretion of the coach.',
    ],
  },
  {
    question: 'Will my player\u2019s practices be on the same day/time throughout the season?',
    paragraphs: [
      'Again, it depends on the coach\u2019s schedule. We give our coaches a wide berth in terms of scheduling so they can organize it in a way that best fits their schedule.',
    ],
  },
  {
    question: 'When does the season start?',
    paragraphs: [
      'We are hopeful that if we start practicing earlier, we can start playing earlier. We have a tentative start date of Saturday, April 27th however, some games may start as early as week or two before to accommodate more games for our players! To do this, we need interested players registered in time.',
      'Softball: The schedule might be a bit different for softball, which plays in the Eastern Fast Pitch League against organizations like Norwin, Plum, White Oak, PT, etc., though we are optimistic if we have multiple teams in each division we can begin playing some in-house games early.',
    ],
  },
  {
    question: 'How long does the season run?',
    paragraphs: [
      'We will play games through mid-June, with a baseball \u201Cchampionship night\u201D likely scheduled for the week of June 10th and June 17th. This could change based on the volume of teams we have. MBSA would recommend families plan around these playoff weeks as they WILL NOT be moved or modified once a final schedule is determined.',
      'Eastern Fast Pitch determines their playoff schedule on their own and we will notify those families as soon as we know more information.',
    ],
  },
  {
    question: 'Can I volunteer? If so, how do I volunteer?',
    paragraphs: [
      'Yes, and it\u2019s easy. Just fill out the appropriate information when you register. MBSA is constantly on the lookout for new coaches, assistant coaches, team moms, etc. You will also receive a FREE registration if you commit and are selected to becoming a head coach!',
    ],
  },
]
