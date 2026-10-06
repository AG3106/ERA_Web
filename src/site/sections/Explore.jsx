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
      className="group relative flex min-h-[600px] gap-10 flex-col justify-between overflow-hidden bg-flare p-8 text-ink sm:p-12"
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
        <p className="mt-3 max-w-md text-ink/80">
          Heads, senior and junior members, and the people who led ERA before us.
        </p>
      </div>
    </MotionLink>

    <MotionLink
      to="/learning"
      className="group relative flex min-h-[600px] gap-10 flex-col justify-between overflow-hidden bg-volt p-8 text-ink sm:p-12"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <div className="flex items-start justify-between">
        <p className="label">Learning resources</p>
        <span className="grid h-12 w-12 place-items-center bg-ink text-chalk transition-transform duration-300 group-hover:rotate-45">
          <Arrow />
        </span>
      </div>

      <ol className="mx-auto grid w-full max-w-sm grid-cols-5 gap-2">
        {learning.map((l, i) => (
          <motion.li
            key={l.name}
            className="grid aspect-square place-items-center bg-ink"
            variants={{ rest: { y: 0 }, hover: { y: i % 2 ? -18 : 18 } }}
            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: i * 0.03 }}
          >
            <img src={l.icon} alt="" className="h-3/5 w-3/5 object-contain" />
          </motion.li>
        ))}
      </ol>

      <div>
        <h3 className="display text-[clamp(3.5rem,7vw,6.5rem)]">Learn with ERA</h3>
        <p className="mt-3 max-w-md text-ink/80">
          Five drills, from hardware to decision algorithms, to start your robotics journey.
        </p>
      </div>
    </MotionLink>
  </section>
);

export default Explore;
