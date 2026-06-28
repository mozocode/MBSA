import { motion } from 'framer-motion'
import {
  FAQ_HERO,
  FAQ_INTRO_HEADING,
  faqLeagueSections,
  faqRegistrationIntro,
  faqRegistrationQuestions,
} from '../lib/faqContent'
import { FaqQuestionBlock, FaqSectionBlock } from '../components/ui/FaqContent'
import { GoldButton } from '../components/ui/GoldButton'
import { PageHero } from '../components/ui/PageHero'
import { PageLayout } from '../components/layout/PageLayout'

const DECORATIVE_SHAPE =
  '/media/2023/12/shape-elements-about.png'

export function Faq() {
  return (
    <PageLayout overlayNav>
      <main>
        <PageHero
          title="MBSA"
          titleAccent="FAQ"
          backgroundImage={FAQ_HERO}
          decorativeImage={DECORATIVE_SHAPE}
        />

        <section className="py-12 md:py-16 lg:py-20 bg-cream">
          <div className="max-w-3xl mx-auto px-4">
            <motion.h2
              className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-navy uppercase text-center leading-tight mb-10 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              {FAQ_INTRO_HEADING}
            </motion.h2>

            <motion.div
              className="space-y-8 text-navy/85"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
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

              {faqRegistrationQuestions.map((item) => (
                <FaqQuestionBlock key={item.question} item={item} />
              ))}
            </motion.div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <GoldButton to="/get-started" variant="outline" className="!border-gold !text-navy">
                Get Started
              </GoldButton>
            </motion.div>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
