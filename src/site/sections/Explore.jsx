import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { currentHeads } from '../data/team';
import { learning } from '../../constants';
import { Arrow } from '../components/motion';

const MotionLink = motion.create(Link);

// Home-page gateways to the Team and Learning pages.
const Explore = () => (
  <section className="grid bg-ink md:grid-cols-2">
    <MotionLink
      to="/team"
      className="group relative flex min-h-[600px] gap-10 flex-col justify-between overflow-hidden turf-v p-8 text-chalk sm:p-12"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <div className="flex items-start justify-between">
        <p className="label">Team · 2026–27</p>
        <span className="grid h-12 w-12 place-items-center bg-ink text-chalk transition-transform duration-300 group-hover:rotate-45">
          <Arrow />
        </span>
      </div>

      <div className="relative mx-auto h-64 w-full max-w-sm">
        {currentHeads.map((m, i) => {
          const mid = (currentHeads.length - 1) / 2;
          const offset = i - mid;
          return (
            <motion.div
              key={m.name}
              className="absolute left-1/2 top-0 w-32 origin-bottom border-4 border-chalk bg-chalk shadow-[0_12px_24px_rgba(0,0,0,0.25)] sm:w-36"
              style={{ marginLeft: '-4.5rem', zIndex: 10 - Math.abs(offset) }}
              variants={{
                rest: { rotate: offset * 5, x: offset * 26, y: Math.abs(offset) * 6 },
                hover: { rotate: offset * 11, x: offset * 58, y: Math.abs(offset) * 14 },
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            >
              <img src={m.image} alt="" className="aspect-[4/5] w-full object-cover" />
              <p className="display px-1 py-1 text-center text-lg leading-none text-ink">{m.name.split(' ')[0]}</p>
            </motion.div>
          );
        })}
      </div>

      <div>
        <h3 className="display text-[clamp(3.5rem,7vw,6.5rem)]">Meet the team</h3>
        <p className="mt-3 max-w-md text-chalk/80">
          Heads, senior and junior members, and the people who led ERA before us.
        </p>
      </div>
    </MotionLink>

    <MotionLink
      to="/learning"
      className="group relative flex min-h-[600px] gap-6 flex-col justify-between overflow-hidden bg-volt p-8 text-ink sm:p-12"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Faint blueprint grid and an arm's reach envelope behind the roadmap */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            'linear-gradient(#0a0f1d 1px, transparent 1px), linear-gradient(90deg, #0a0f1d 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 70% 55%, #000 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 70% 55%, #000 30%, transparent 85%)',
        }}
      />
      <svg
        aria-hidden
        viewBox="0 0 480 480"
        fill="none"
        stroke="currentColor"
        className="pointer-events-none absolute -bottom-28 -right-28 h-[480px] w-[480px] text-ink/20 transition-transform duration-700 group-hover:-rotate-6"
      >
        <circle cx="480" cy="480" r="150" strokeWidth="2" />
        <circle cx="480" cy="480" r="270" strokeWidth="2" strokeDasharray="6 10" />
        <circle cx="480" cy="480" r="390" strokeWidth="2" />
        <path d="M480 480 L330 350 L352 190" strokeWidth="4" strokeLinejoin="round" />
        <path d="M352 190 l-18 -26 M352 190 l20 -24" strokeWidth="4" strokeLinecap="round" />
        <circle cx="480" cy="480" r="12" fill="currentColor" stroke="none" />
        <circle cx="330" cy="350" r="9" fill="currentColor" stroke="none" />
      </svg>

      <div className="relative flex items-start justify-between">
        <p className="label">Learning resources</p>
        <span className="grid h-12 w-12 place-items-center bg-ink text-chalk transition-transform duration-300 group-hover:rotate-45">
          <Arrow />
        </span>
      </div>

      {/* The five modules as a roadmap: tiles joined by a track */}
      <ol className="relative w-full max-w-md">
        <span aria-hidden className="absolute bottom-6 left-6 top-6 w-0.5 -translate-x-1/2 bg-ink/30" />
        {learning.map((l, i) => (
          <motion.li
            key={l.name}
            className="relative flex items-center gap-4 py-1"
            variants={{ rest: { x: 0 }, hover: { x: 14 } }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.04 }}
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center bg-ink">
              <img src={l.icon} alt="" className="h-7 w-7 object-contain" />
            </span>
            <span className="min-w-0">
              <span className="label block text-ink/60">Module {String(i + 1).padStart(2, '0')}</span>
              <span className="display block text-2xl leading-none sm:text-[1.7rem]">{l.name}</span>
            </span>
          </motion.li>
        ))}
      </ol>

      <div className="relative">
        <h3 className="display text-[clamp(3.5rem,7vw,6.5rem)]">Learn with ERA</h3>
        <p className="mt-3 max-w-md text-ink/80">
          Five drills, from hardware to decision algorithms, to start your robotics journey.
        </p>
      </div>
    </MotionLink>
  </section>
);

export default Explore;
