import { Link } from 'react-router-dom';
import { links, socials } from '../data/links';
import { Arrow, Marquee } from './motion';

const explore = [
  ['Projects', '/projects'],
  ['Research', '/research'],
  ['Team', '/team'],
  ['Learning', '/learning'],
  ['Sponsors', '/#sponsors'],
  ['Contact', '/#contact'],
];

const Footer = () => (
  <footer className="relative overflow-hidden bg-ink">
    <div className="tech relative overflow-hidden">
      <div className="container-site relative grid gap-12 py-20 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="display text-6xl text-chalk sm:text-7xl">
            Keep
            <br />
            <span className="text-volt">building.</span>
          </p>
          <a href={`mailto:${links.email}`} className="mt-8 inline-flex items-center gap-2 border-b-2 border-volt pb-1 font-mono text-sm text-chalk hover:text-volt">
            {links.email} <Arrow className="h-3.5 w-3.5" />
          </a>
        </div>
        <div>
          <p className="label mb-5 text-volt">Explore</p>
          <ul className="space-y-2">
            {explore.map(([label, to]) => (
              <li key={label}>
                <Link to={to} className="display text-3xl text-chalk transition-colors hover:text-volt">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-5 text-volt">Follow</p>
          <ul className="space-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="display text-3xl text-chalk transition-colors hover:text-volt"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    <div className="overflow-hidden border-b-2 border-chalk/10 py-6">
      <Marquee duration={25}>
        {['ERA', 'IIT Kanpur', 'Autonomous Robotics'].map((w) => (
          <span key={w} className="display flex items-center gap-[4vw] pr-[4vw] text-[16vw] leading-[0.85] text-volt">
            {w}
            <span className="h-[4vw] w-[4vw] rotate-45 bg-flare" aria-hidden />
          </span>
        ))}
      </Marquee>
    </div>
    <div className="container-site label flex flex-col gap-2 border-t border-chalk/15 py-5 text-chalk/60 sm:flex-row sm:justify-between">
      <span>© {new Date().getFullYear()} Équipe de Robotique Autonome · IIT Kanpur</span>
      <span>Kanpur, Uttar Pradesh, India</span>
    </div>
  </footer>
);

export default Footer;
