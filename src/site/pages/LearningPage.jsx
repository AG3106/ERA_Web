import { motion } from 'motion/react';
import { learning } from '../../constants';
import { Arrow, PageHeader, Reveal } from '../components/motion';

const LearningPage = () => (
  <>
    <PageHeader kicker="Learning" title="Learn with us">
      Technologies, tutorials and curated resources prepared by the ERA team to help you begin your
      robotics and AI journey. Work through the modules in order, or jump to what you need.
    </PageHeader>
    <section className="paper py-20 sm:py-28">
      <div className="container-site">
      <ol className="border-t-4 border-ink">
        {learning.map((l, i) => (
          <Reveal as="li" key={l.name} y={24} className="border-b-2 border-ink">
            <a
              href={l.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-4 overflow-hidden py-8 sm:grid-cols-[140px_88px_1fr_auto] sm:items-center sm:gap-8 sm:py-10"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              <span className="display relative row-span-2 text-7xl text-ink/20 transition-colors group-hover:text-volt sm:row-span-1 sm:text-9xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <motion.span
                className="relative hidden h-20 w-20 place-items-center bg-ink sm:grid"
                whileHover={{ rotate: -10 }}
              >
                <img src={l.icon} alt="" className="h-12 w-12 object-contain" />
              </motion.span>
              <span className="relative block transition-colors group-hover:text-chalk">
                <span className="label text-turf transition-colors group-hover:text-volt">Module {i + 1}</span>
                <span className="display mt-1 block text-4xl sm:text-6xl">{l.name}</span>
                <span className="mt-3 block max-w-2xl leading-relaxed opacity-75">{l.description}</span>
              </span>
              <span className="btn-ink relative col-start-2 w-fit transition-colors group-hover:bg-volt group-hover:text-ink sm:col-start-auto">
                Open guide <Arrow />
              </span>
            </a>
          </Reveal>
        ))}
      </ol>
      </div>
    </section>
  </>
);

export default LearningPage;
