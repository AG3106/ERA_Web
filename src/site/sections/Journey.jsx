import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { achievements } from '../../constants';
import { PitchLines, Reveal, SectionHeading } from '../components/motion';

const categoryStyle = {
  Founding: 'bg-volt text-ink',
  Competition: 'bg-flare text-ink',
  Research: 'bg-ink text-chalk',
  Publication: 'bg-ink text-chalk',
  Next: 'bg-[#8b7bff] text-ink',
};

export const Ball = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden>
    <circle cx="50" cy="50" r="47" fill="#f3f0e6" stroke="#0d110e" strokeWidth="4" />
    <path d="M50 30 L68 43 L61 64 L39 64 L32 43 Z" fill="#0d110e" />
    <path d="M50 30 V5 M68 43 L91 35 M61 64 L75 86 M39 64 L25 86 M32 43 L9 35" stroke="#0d110e" strokeWidth="4" />
    <path d="M40 5 L50 12 L60 5 M84 22 L91 35 L96 50 M85 80 L75 86 L64 94 M36 94 L25 86 L15 80 M4 50 L9 35 L16 22" stroke="#0d110e" strokeWidth="4" fill="none" />
  </svg>
);

// A punched match ticket. The perforation sits at 132px, where the notches are.
const Ticket = ({ item, index }) => (
  <motion.article
    className="ticket group flex h-full flex-col bg-chalk text-ink"
    style={{ '--notch': '132px' }}
    whileHover={{ y: -8, rotate: index % 2 ? 1 : -1 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    <div className="flex h-[132px] flex-col justify-between p-6 pb-4">
      <div className="flex items-center justify-between">
        <span className={`label px-2 py-1 ${categoryStyle[item.category] ?? 'bg-ink text-chalk'}`}>{item.category}</span>
        <span className="label text-ink/50">No. {String(index + 1).padStart(3, '0')}</span>
      </div>
      <p className="display text-7xl leading-none">{item.year}</p>
    </div>
    <div className="mx-5 border-t-2 border-dashed border-ink/30" />
    <div className="flex flex-1 flex-col p-6 pt-5">
      <h3 className="display text-3xl leading-[0.9]">{item.title}</h3>
      <p className="label mt-2 text-turf">{item.location}</p>
      <p className="mt-4 text-sm leading-relaxed text-ink/75">{item.description}</p>
    </div>
  </motion.article>
);

// The journey runs through three eras, each with its own backdrop.
const nextChapter = {
  year: '2026→',
  category: 'Next',
  title: 'Robot learning',
  location: 'IIT Kanpur',
  description:
    'Vision-language-action models for robot manipulation: robots that pick up new skills from data and follow instructions.',
};

const eras = [
  {
    id: 'robomaster',
    name: 'DJI RoboMaster',
    span: '2018 – 2022',
    blurb: 'Autonomous shooting robots in the RoboMaster AI Challenge arena.',
    bg: 'arena',
    bgMobile: 'arena',
    accent: 'text-[#ff6b6b]',
    items: achievements.filter((a) => Number(a.year) < 2023),
  },
  {
    id: 'robocup',
    name: 'RoboCup MSL',
    span: '2023 – 2026',
    blurb: 'Fully autonomous robot football in the Middle Size League.',
    bg: 'turf',
    bgMobile: 'turf-v',
    accent: 'text-volt',
    items: achievements.filter((a) => Number(a.year) >= 2023),
  },
  {
    id: 'learning',
    name: 'Robot learning',
    span: '2026 →',
    blurb: 'VLA models for robot manipulation.',
    bg: 'lab',
    bgMobile: 'lab',
    accent: 'text-[#a99bff]',
    items: [nextChapter],
  },
]; // TODO: merge robot learning with acheivements

// Numbering stays continuous across eras.
const numbered = (() => {
  let n = 0;
  return eras.map((era) => era.items.map((item) => ({ item, index: n++ })));
})();

const EraCard = ({ era }) => (
  <div className="flex h-full flex-col justify-end border-l-2 border-chalk/30 pb-2 pl-6 text-chalk">
    <p className={`label ${era.accent}`}>{era.span}</p>
    <p className="display mt-3 text-5xl leading-[0.9]">{era.name}</p>
    <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-chalk/70">{era.blurb}</p>
  </div>
);

// Faint era artwork layered over each backdrop.
const ArenaLines = ({ className = '' }) => (
  <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className={`pointer-events-none ${className}`} fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
    <path d="M140 60 H860 L940 140 V460 L860 540 H140 L60 460 V140 Z" />
    <rect x="80" y="240" width="90" height="120" />
    <rect x="830" y="240" width="90" height="120" />
    <path d="M470 270 h60 v60 h-60 Z M380 150 h80 v40 h-80 Z M540 410 h80 v40 h-80 Z" />
  </svg>
);

const LabLines = ({ className = '' }) => (
  <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className={`pointer-events-none ${className}`} fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
    {/* A two-link arm reaching along a sampled trajectory */}
    <path d="M120 560 H260" />
    <path d="M190 560 L260 380 L470 300" strokeWidth="10" strokeLinecap="round" />
    <circle cx="260" cy="380" r="14" />
    <path d="M470 300 l30 -22 M470 300 l30 22" strokeWidth="6" strokeLinecap="round" />
    <path d="M520 300 C 620 220, 720 200, 860 250" strokeDasharray="4 14" strokeLinecap="round" />
    {[560, 640, 720, 800].map((cx, i) => (
      <circle key={cx} cx={cx} cy={[262, 226, 214, 230][i]} r="6" fill="currentColor" />
    ))}
  </svg>
);

const Wheel = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden>
    <circle cx="50" cy="50" r="46" fill="#1b1f25" stroke="#f3f0e6" strokeWidth="4" />
    {[0, 45, 90, 135].map((a) => (
      <rect key={a} x="44" y="8" width="12" height="26" rx="5" fill="#f3f0e6" transform={`rotate(${a} 50 50) rotate(45 50 21)`} />
    ))}
    {[180, 225, 270, 315].map((a) => (
      <rect key={a} x="44" y="8" width="12" height="26" rx="5" fill="#f3f0e6" transform={`rotate(${a} 50 50) rotate(45 50 21)`} />
    ))}
    <circle cx="50" cy="50" r="10" fill="#ff5a1f" />
  </svg>
);

const Node = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden>
    <rect x="18" y="18" width="64" height="64" rx="10" fill="#1a1633" stroke="#a99bff" strokeWidth="4" />
    <path d="M18 34 H4 M18 50 H4 M18 66 H4 M82 34 H96 M82 50 H96 M82 66 H96 M34 18 V4 M50 18 V4 M66 18 V4 M34 82 V96 M50 82 V96 M66 82 V96" stroke="#a99bff" strokeWidth="4" />
    <circle cx="50" cy="50" r="12" fill="#a99bff" />
  </svg>
);

const HorizontalTrack = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const eraRefs = useRef([]);
  const [distance, setDistance] = useState(0);
  const [vw, setVw] = useState(1200);
  // Scroll progress at which each era's marker comes into view.
  const [starts, setStarts] = useState([0, 0.4, 0.9]);

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const w = window.innerWidth;
      const d = Math.max(0, trackRef.current.scrollWidth - w);
      setVw(w);
      setDistance(d);
      if (d > 0) {
        setStarts(
          eraRefs.current.map((el) => Math.min(0.92, Math.max(0.05, (el.offsetLeft - w * 0.75) / d))),
        );
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.0005 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const markerX = useTransform(smooth, [0, 1], [24, vw - 72]);
  const markerRotate = useTransform(smooth, [0, 1], [0, 1080]);

  const fade = 0.04;
  const cupIn = useTransform(smooth, [starts[1] - fade, starts[1] + fade], [0, 1]);
  const labIn = useTransform(smooth, [starts[2] - fade, starts[2] + fade], [0, 1]);
  const masterShown = useTransform(cupIn, (v) => 1 - v);
  const cupShown = useTransform([cupIn, labIn], ([c, l]) => Math.max(0, c - l));
  const shown = [masterShown, cupShown, labIn];

  return (
    <div ref={sectionRef} className="relative hidden md:block" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="arena sticky top-0 flex h-screen flex-col justify-center overflow-hidden text-chalk">
        <ArenaLines className="absolute inset-0 h-full w-full text-chalk/10" />
        <motion.div className="turf absolute inset-0" style={{ opacity: cupIn }}>
          <PitchLines variant="center" className="absolute inset-0 h-full w-full text-chalk/15" />
        </motion.div>
        <motion.div className="lab absolute inset-0" style={{ opacity: labIn }}>
          <LabLines className="absolute inset-0 h-full w-full text-[#a99bff]/20" />
        </motion.div>

        <div className="container-site relative mb-10">
          <SectionHeading num="02" kicker="Year by year" title="The journey" size="text-[clamp(3.4rem,8vw,7.5rem)]" />
          <div className="label absolute bottom-3 right-5 sm:right-8 lg:right-12">
            {eras.map((era, i) => (
              <motion.span key={era.id} className={`absolute bottom-0 right-0 whitespace-nowrap ${era.accent}`} style={{ opacity: shown[i] }}>
                Era {String(i + 1).padStart(2, '0')} · {era.name}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="relative">
          <motion.ol ref={trackRef} className="relative flex w-max gap-8 pl-[max(1.25rem,calc((100vw-1400px)/2+3rem))] pr-[12vw]" style={{ x }}>
            {eras.map((era, e) => [
              <li key={era.id} ref={(el) => (eraRefs.current[e] = el)} className="w-[260px] shrink-0">
                <EraCard era={era} />
              </li>,
              ...numbered[e].map(({ item, index }) => (
                <li key={`${item.year}-${item.title}`} className="w-[320px] shrink-0">
                  <Ticket item={item} index={index} />
                </li>
              )),
            ])}
          </motion.ol>
        </div>

        {/* Track line with a marker that changes with the era: wheel, ball, then a chip */}
        <div className="relative mt-10 h-12">
          <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-chalk/70" />
          <motion.div className="absolute top-0 h-12 w-12" style={{ x: markerX, rotate: markerRotate }}>
            {[Wheel, Ball, Node].map((Icon, i) => (
              <motion.div key={i} className="absolute inset-0" style={{ opacity: shown[i] }}>
                <Icon className="h-full w-full drop-shadow-[0_6px_6px_rgba(0,0,0,0.4)]" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const VerticalList = () => (
  <div className="relative text-chalk md:hidden">
    <div className="arena pt-24">
      <div className="container-site">
        <SectionHeading num="02" kicker="Year by year" title="The journey" />
      </div>
    </div>
    {eras.map((era, e) => (
      <div key={era.id} className={`${era.bgMobile} relative overflow-hidden ${e === 0 ? 'pt-12' : 'pt-16'} ${e === eras.length - 1 ? 'pb-24' : 'pb-16'}`}>
        <div className="container-site">
          <Reveal className="mb-8">
            <EraCard era={era} />
          </Reveal>
          <ol className="space-y-6">
            {numbered[e].map(({ item, index }) => (
              <Reveal as="li" key={`${item.year}-${item.title}`}>
                <Ticket item={item} index={index} />
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    ))}
  </div>
);

const Journey = () => (
  <section id="journey" className="relative">
    <HorizontalTrack />
    <VerticalList />
  </section>
);

export default Journey;
