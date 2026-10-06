import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { research } from '../../constants';
import { Arrow, Reveal, SectionHeading } from '../components/motion';

export const researchIntro =
  'We publish what we learn building robots: conference papers, technical posters and symposium submissions on autonomous systems, human–robot interaction, multi-agent robotics and decision-making.';

export const ResearchList = () => {
  const [open, setOpen] = useState(null);
  return (
    <div className="border-y-4 border-ink">
      <div className="label hidden grid-cols-[100px_1fr_200px_56px] gap-6 border-b-2 border-ink py-3 text-ink/60 sm:grid">
        <span>Year</span>
        <span>Title</span>
        <span>Type</span>
        <span />
      </div>
      <ul>
        {research.map((r, i) => {
          const isOpen = open === r.id;
          return (
            <Reveal as="li" key={r.id} delay={i * 0.06} y={20} className="border-b-2 border-ink last:border-b-0">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : r.id)}
                aria-expanded={isOpen}
                className={`group relative grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 overflow-hidden px-2 py-6 text-left transition-colors duration-300 sm:grid-cols-[100px_1fr_200px_56px] sm:gap-6 sm:py-7 ${
                  isOpen ? 'bg-ink text-chalk' : 'hover:bg-ink hover:text-chalk'
                }`}
              >
                <span className="label order-first col-span-2 text-flare sm:col-span-1">{r.year}</span>
                <span className="display text-4xl transition-transform duration-300 group-hover:translate-x-2 sm:text-6xl">
                  {r.title}
                </span>
                <span className="label hidden opacity-70 sm:block">{r.type}</span>
                <motion.span
                  className="display grid h-12 w-12 place-items-center border-2 border-current text-3xl"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden bg-ink text-chalk"
                  >
                    <div className="grid gap-6 px-2 pb-8 sm:grid-cols-[100px_1fr_200px_56px]">
                      <span className="hidden sm:block" />
                      <div>
                        <p className="label text-volt sm:hidden">{r.type}</p>
                        <p className="mt-2 max-w-2xl text-lg leading-relaxed text-chalk/85 sm:mt-0">{r.description}</p>
                        <a href={r.link} target="_blank" rel="noopener noreferrer" className="btn-volt mt-6">
                          Read publication <Arrow />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
};

const Research = () => (
  <section id="research" className="paper relative py-24 sm:py-32">
    <div className="container-site">
      <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading num="04" kicker="Research" title="On paper" className="flex-1">
          {researchIntro}
        </SectionHeading>
        <Reveal delay={0.2}>
          <Link to="/research" className="btn-ink shrink-0">
            Research page <Arrow />
          </Link>
        </Reveal>
      </div>
      <ResearchList />
    </div>
  </section>
);

export default Research;
