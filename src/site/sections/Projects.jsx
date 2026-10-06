import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { projects } from '../../constants';
import { Arrow, Reveal, SectionHeading, SplitText } from '../components/motion';
import { useLenis } from '../components/SmoothScroll';

export const projectIntro =
  'Before RoboCup MSL, we worked on many self-initiated and government-funded projects, and took part in international competitions and conferences that shaped who we are today.';

const useIsDesktop = () => {
  const query = '(min-width: 1024px)';
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return matches;
};

// One slice of the progress bar under the strip; fills while its robot is on show.
const Segment = ({ progress, index, total, active, onClick, name }) => {
  const fill = useTransform(progress, (v) => Math.min(1, Math.max(0, v * total - index)));
  return (
    <button type="button" onClick={onClick} className="group flex-1 text-left" aria-label={`Show ${name}`}>
      <span className="relative block h-[3px] overflow-hidden bg-chalk/15">
        <motion.span className="absolute inset-0 origin-left bg-volt" style={{ scaleX: fill }} />
      </span>
      <span className={`label mt-3 block truncate transition-colors ${active ? 'text-volt' : 'text-chalk/40 group-hover:text-chalk'}`}>
        {String(index + 1).padStart(2, '0')} {name}
      </span>
    </button>
  );
};

// Home: on desktop the strip pins while you scroll and each robot takes its turn
// in the wide panel. On smaller screens it's a tap-to-expand stack.
export const ProjectAccordion = () => {
  const desktop = useIsDesktop();
  const lenis = useLenis();
  const total = projects.length;
  const [active, setActive] = useState(projects[0]?.id);
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const { scrollYProgress: enter } = useScroll({ target: trackRef, offset: ['start end', 'start start'] });
  const clipPath = useTransform(enter, [0, 1], ['inset(14% 10% 14% 10%)', 'inset(0% 0% 0% 0%)']);
  const scale = useTransform(enter, [0, 1], [0.9, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!desktop) return;
    const next = projects[Math.min(total - 1, Math.floor(v * total))].id;
    setActive((cur) => (cur === next ? cur : next));
  });

  // On desktop the scroll position owns the active robot, so picking one scrolls to it.
  const show = (i) => {
    if (!desktop) {
      setActive(projects[i].id);
      return;
    }
    const el = trackRef.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = top + (el.offsetHeight - window.innerHeight) * ((i + 0.5) / total);
    if (lenis.current) lenis.current.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <div ref={trackRef} className="relative" style={desktop ? { height: `calc(100vh + ${total * 60}vh)` } : undefined}>
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:pt-16">
        <motion.div
          className="flex flex-col gap-3 lg:h-[min(560px,calc(100vh-220px))] lg:flex-row"
          style={{ clipPath, scale }}
        >
          {projects.map((p, i) => {
            const isActive = active === p.id;
            return (
              <motion.button
                type="button"
                key={p.id}
                layout
                onMouseEnter={desktop ? undefined : () => setActive(p.id)}
                onClick={() => show(i)}
                aria-expanded={isActive}
                className="group relative h-[120px] overflow-hidden border-2 border-chalk/15 bg-coal text-left data-[active=true]:border-volt data-[active=true]:h-[380px] lg:h-auto lg:min-w-0 lg:[flex:var(--grow)_1_0%] lg:data-[active=true]:h-auto"
                data-active={isActive}
                style={{ '--grow': isActive ? 5 : 1 }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{
                  type: 'spring',
                  stiffness: 160,
                  damping: 26,
                  opacity: { duration: 0.6, delay: i * 0.08 },
                  y: { duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <motion.img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover"
                  style={{ y: imgY }}
                  animate={{ scale: isActive ? 1 : 1.25, filter: isActive ? 'grayscale(0)' : 'grayscale(0.9)' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <span
                  className={`display absolute left-4 top-4 grid h-12 w-12 place-items-center text-3xl transition-colors ${
                    isActive ? 'bg-volt text-ink' : 'bg-ink/80 text-chalk'
                  }`}
                >
                  {i + 1}
                </span>
                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div
                      key="open"
                      className="absolute inset-x-0 bottom-0 p-6 sm:p-8"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    >
                      <p className="label mb-2 text-volt">Project {String(i + 1).padStart(2, '0')}</p>
                      <h3 className="display text-5xl sm:text-7xl">
                        <SplitText text={p.name} animateOnMount delay={0.25} stagger={0.05} />
                      </h3>
                    </motion.div>
                  ) : (
                    <motion.p
                      key="closed"
                      className="display absolute bottom-5 left-5 text-2xl text-chalk/80 lg:bottom-8 lg:left-1/2 lg:origin-center lg:-translate-x-1/2 lg:-rotate-90 lg:whitespace-nowrap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.2 } }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    >
                      {p.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </motion.div>

        <div className="mt-8 hidden gap-3 lg:flex">
          {projects.map((p, i) => (
            <Segment
              key={p.id}
              progress={scrollYProgress}
              index={i}
              total={total}
              name={p.name}
              active={active === p.id}
              onClick={() => show(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Projects page: full-width cards that stack and shrink as you scroll.
const StackCard = ({ project, index, total, progress }) => {
  const targetScale = 1 - (total - index) * 0.04;
  const range = [index / total, 1];
  const scale = useTransform(progress, range, [1, targetScale]);
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'start start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.4, 1]);

  return (
    <div ref={imgRef} className="sticky top-0 flex h-screen items-center justify-center">
      <motion.article
        className="relative h-[70vh] w-full origin-top overflow-hidden border-2 border-chalk/20 bg-coal"
        style={{ scale, top: `calc(${index * 22}px)` }}
      >
        <motion.img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ scale: imgScale }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-ink/10" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-10">
          <div>
            <p className="label inline-block bg-volt px-2 py-1 text-ink">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
            <h2 className="display mt-3 text-[clamp(3.5rem,10vw,9rem)]">
              {project.name}
            </h2>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export const ProjectStack = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <div ref={ref} className="container-site relative">
      {projects.map((p, i) => (
        <StackCard key={p.id} project={p} index={i} total={projects.length} progress={scrollYProgress} />
      ))}
    </div>
  );
};

const Projects = () => (
  <section id="projects" className="relative bg-ink py-24 sm:py-32">
    <div className="container-site">
      <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading num="03" kicker="Builds" title="Robots we've built">
          {projectIntro}
        </SectionHeading>
        <Reveal delay={0.2}>
          <Link to="/projects" className="btn-volt shrink-0">
            All projects <Arrow />
          </Link>
        </Reveal>
      </div>
      <ProjectAccordion />
    </div>
  </section>
);

export default Projects;
