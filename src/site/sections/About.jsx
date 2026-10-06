import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import dribbler from '../../assets/projects/Dribblerem.png';
import { research, sponsorData } from '../../constants';
import { links } from '../data/links';
import { Arrow, Counter, Reveal, ScrollText, SectionHeading } from '../components/motion';

const disciplines = [
  'Mechanical design',
  'Electronics',
  'Embedded systems',
  'Computer vision',
  'Machine learning',
  'Localisation',
  'Motion planning',
  'Decision-making',
];

const stats = [
  { value: new Date().getFullYear() - 2018, suffix: '+', label: 'Seasons' },
  { value: research.length, label: 'Papers & posters' },
  { value: sponsorData.length, label: 'Sponsors' },
  { value: 1, suffix: 'st', label: 'Indian team in MSL' },
];

const About = () => {
  const figRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: figRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  return (
    <section id="about" className="paper relative overflow-hidden py-24 sm:py-32">
      <div className="container-site">
        <SectionHeading num="01" kicker="The team" title="Who we are" />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <ScrollText
              className="font-sans text-[clamp(1.5rem,2.8vw,2.4rem)] font-medium leading-[1.25] tracking-[-0.015em]"
              text="A multidisciplinary group of undergraduates at IIT Kanpur, building intelligent robots that see, think and act in messy real-world environments."
            />
            <Reveal delay={0.1} className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/75">
              Working closely with faculty, we cover the whole robotics stack. Our work spans research,
              government-funded projects and international competitions. Beyond competing, we want to grow
              a strong autonomous robotics community and help move the field forward in India.
            </Reveal>

            <ul className="mt-10 flex flex-wrap gap-2">
              {disciplines.map((d, i) => (
                <motion.li
                  key={d}
                  className="label border-2 border-ink px-3 py-1.5"
                  initial={{ opacity: 0, y: 12, rotate: i % 2 ? 2 : -2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                  whileHover={{ backgroundColor: '#0d110e', color: '#d8ff3e' }}
                >
                  {d}
                </motion.li>
              ))}
            </ul>

            <Reveal delay={0.2} className="mt-10">
              <a href={links.qualification} target="_blank" rel="noopener noreferrer" className="btn-ink">
                RoboCup MSL 2026 qualification material <Arrow />
              </a>
            </Reveal>
          </div>

          <figure ref={figRef} className="relative">
            <div
              className="relative aspect-[4/5] overflow-hidden border-2 border-ink bg-chalk"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(13,17,14,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(13,17,14,0.08) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            >
              <span className="label absolute left-3 top-3">Fig. 01</span>
              <span className="label absolute right-3 top-3">MSL robot</span>
              {/* Dimension lines */}
              <svg className="absolute inset-x-6 bottom-10 h-4 w-[calc(100%-3rem)]" aria-hidden>
                <line x1="0" y1="8" x2="100%" y2="8" stroke="#0d110e" strokeWidth="1" />
                <line x1="0" y1="0" x2="0" y2="16" stroke="#0d110e" strokeWidth="1" />
                <line x1="100%" y1="0" x2="100%" y2="16" stroke="#0d110e" strokeWidth="1" />
              </svg>
              <motion.img
                src={dribbler}
                alt="CAD render of an ERA RoboCup MSL robot"
                className="absolute inset-0 m-auto h-[78%] w-auto object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)]"
                style={{ y: imgY, rotate: imgRotate }}
                loading="lazy"
              />
            </div>
            <figcaption className="label mt-3 flex justify-between text-ink/70">
              <span>CAD render</span>
              <span>Omni-wheel base</span>
            </figcaption>
          </figure>
        </div>

        {/* Scoreboard */}
        <Reveal className="led mt-20 grid grid-cols-2 border-4 border-ink lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`p-6 sm:p-8 ${i % 2 ? '' : 'border-r-2'} ${i < 2 ? 'border-b-2 lg:border-b-0' : ''} border-chalk/10 lg:border-r-2 lg:last:border-r-0`}
            >
              <p className="display text-7xl text-volt sm:text-8xl">
                <Counter to={s.value} from={s.value <= 1 ? s.value : 0} suffix={s.suffix} />
              </p>
              <p className="label mt-2 text-chalk/70">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default About;
