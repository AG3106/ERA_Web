import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import hero2560 from '../../assets/optimized/hero-2560.jpg';
import hero1280 from '../../assets/optimized/hero-1280.jpg';
import { links } from '../data/links';
import { Arrow, Marquee, SplitText, easeOut } from '../components/motion';
import { scrollToTarget, useLenis } from '../components/SmoothScroll';

// Achievements pulled from src/constants, shown on the LED ticker.
const ticker = [
  '1st Indian team to qualify for RoboCup MSL',
  'Gold · Inter IIT Tech Meet 14.0',
  '3rd overall · DJI RoboMaster AI Challenge 2022',
  'Top 5 technical proposal · ICRA 2022',
  '3rd overall · DJI RoboMaster 2019',
  'Papers at IEEE RO-MAN & IEEE/SICE SII',
];

const Hero = () => {
  const ref = useRef(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <section ref={ref} id="home" className="relative flex h-[100svh] min-h-[680px] flex-col overflow-hidden bg-ink">
      <div className="relative flex-1 overflow-hidden">
        <motion.img
          src={hero2560}
          srcSet={`${hero1280} 1280w, ${hero2560} 2560w`}
          sizes="100vw"
          alt="ERA's three RoboCup MSL robots and a football in front of a goal on turf at night"
          className="absolute inset-0 h-full w-full object-cover object-[50%_40%]"
          style={{ scale: imgScale, y: imgY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          fetchpriority="high"
        />
        {/* Floodlight flare on load */}
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,230,0.4),transparent_55%)] mix-blend-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5] }}
          transition={{ duration: 2.2, delay: 0.6, times: [0, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/90" />

        <motion.div className="container-site relative flex h-full flex-col justify-end pb-8 sm:pb-12" style={{ y: textY }}>
          <motion.a
            href={links.qualification}
            target="_blank"
            rel="noopener noreferrer"
            className="group mb-6 flex w-fit items-stretch font-mono text-[11px] uppercase tracking-[0.12em] sm:text-xs"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6, ease: easeOut }}
          >
            <span className="flex items-center gap-2 bg-flare px-3 py-2 font-semibold text-ink">
              <span className="blink h-2 w-2 rounded-full bg-ink" /> Live
            </span>
            <span className="flex items-center gap-2 bg-ink/85 px-3 py-2 text-chalk group-hover:text-volt">
              RoboCup MSL 2026 · Submission sent 28/02/26 <Arrow className="h-3 w-3" />
            </span>
          </motion.a>

          <h1 className="display text-[clamp(3.4rem,9vw,10rem)] text-chalk">
            <SplitText text="Robots that" animateOnMount delay={0.9} stagger={0.07} />
            <br />
            <span className="text-volt">
              <SplitText text="think and act" animateOnMount delay={1.1} stagger={0.07} />
            </span>{' '}
            <span className="relative inline-block">
              <SplitText text="on their own." animateOnMount delay={1.25} stagger={0.07} />
              <svg
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-3 w-full text-flare sm:h-5"
                aria-hidden
              >
                <motion.path
                  d="M4 14 C 80 4, 200 4, 296 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.9, duration: 0.7, ease: easeOut }}
                />
              </svg>
            </span>
          </h1>

          <motion.div
            className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8, ease: easeOut }}
          >
            <p className="max-w-xl text-base leading-relaxed text-chalk/85 sm:text-lg">
              ERA (Équipe de Robotique Autonome) is IIT Kanpur&rsquo;s student team building fully autonomous
              robots, from DJI RoboMaster and the RoboCup Middle Size League to robot learning for manipulation.
            </p>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Link to="/projects" className="btn-volt">
                Meet the robots <Arrow />
              </Link>
              <button type="button" onClick={() => scrollToTarget(lenis, 'about')} className="btn-line text-chalk">
                Our story
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="led relative z-10 border-y-2 border-black py-3"
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        transition={{ delay: 1.8, duration: 0.6, ease: easeOut }}
      >
        <Marquee duration={40}>
          {ticker.map((t) => (
            <span key={t} className="flex items-center gap-6 pr-6 font-mono text-sm font-medium uppercase tracking-[0.1em] text-volt">
              {t}
              <span className="text-flare">●</span>
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
};

export default Hero;
