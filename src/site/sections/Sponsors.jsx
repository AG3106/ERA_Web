import { motion } from 'motion/react';
import { sponsorData } from '../../constants';
import { links } from '../data/links';
import { Arrow, Reveal, SectionHeading } from '../components/motion';

const Sponsors = () => (
  <section id="sponsors" className="relative bg-ink py-24 sm:py-32">
    <div className="container-site">
      <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
        <SectionHeading num="05" kicker="Partners" title="Our sponsors" className="flex-1">
          Our sponsors back our research, competitions and student-led engineering. Their support lets us
          design, build and deploy autonomous robots, and represent IIT Kanpur on international stages.
        </SectionHeading>
        <Reveal delay={0.2} className="flex shrink-0 flex-wrap gap-2">
          <a href={links.brochure} target="_blank" rel="noopener noreferrer" className="btn-volt">
            Brochure <Arrow />
          </a>
          <a href={links.pitchDeck} target="_blank" rel="noopener noreferrer" className="btn-line text-chalk">
            Pitch deck <Arrow />
          </a>
        </Reveal>
      </div>
    </div>

    <div className="container-site mt-16">
      <motion.ul
        className="grid grid-cols-2 border-l-2 border-t-2 border-chalk/15 lg:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ staggerChildren: 0.06 }}
      >
        {sponsorData.map((s) => (
          <motion.li
            key={s.id}
            className="border-b-2 border-r-2 border-chalk/15"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }}
          >
            <a
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-52 flex-col justify-between overflow-hidden p-5 sm:h-60 sm:p-6"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-volt transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
              <span className="label relative flex justify-between text-chalk/50 transition-colors group-hover:text-ink">
                {s.name}
                <Arrow className="h-3.5 w-3.5" />
              </span>
              <img
                src={s.logo}
                alt={s.name}
                loading="lazy"
                className="relative mx-auto max-h-16 max-w-[65%] object-contain transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-75 group-hover:brightness-0 sm:max-h-20"
              />
              <p className="relative line-clamp-3 text-xs leading-relaxed text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:delay-150">
                {s.description}
              </p>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  </section>
);

export default Sponsors;
