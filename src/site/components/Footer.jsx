import { Link } from 'react-router-dom';
import { links, socials } from '../data/links';
import { Arrow } from './motion';
import goalEnd from '../assets/footer-goal-end.svg';

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
      <img
        src={goalEnd}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden h-full md:block"
      />
      <div className="container-site relative grid grid-cols-2 gap-x-6 gap-y-12 py-16 sm:py-20 md:grid-cols-[1.5fr_1fr_1fr] md:gap-x-12">
        <div className="col-span-2 md:col-span-1">
          <p className="display text-6xl text-chalk sm:text-7xl">
            Keep
            <br />
            <span className="text-volt">building.</span>
          </p>
          <a href={`mailto:${links.email}`} className="mt-[14px] inline-flex items-center gap-2 border-b-2 border-volt pb-1 pt-[18px] font-mono text-sm text-chalk hover:text-volt">
            {links.email} <Arrow className="h-3.5 w-3.5" />
          </a>
        </div>
        <div>
          <p className="label mb-5 text-volt">Explore</p>
          <ul className="space-y-1 sm:space-y-2">
            {explore.map(([label, to]) => (
              <li key={label}>
                <Link to={to} className="display inline-block py-1 text-2xl text-chalk transition-colors hover:text-volt sm:py-0 sm:text-3xl">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-5 text-volt">Follow</p>
          <ul className="space-y-1 sm:space-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="display inline-block py-1 text-2xl text-chalk transition-colors hover:text-volt sm:py-0 sm:text-3xl"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    <div className="container-site label flex flex-col gap-2 border-t border-chalk/15 py-5 text-chalk/60 sm:flex-row sm:justify-between">
      <span>© {new Date().getFullYear()} Équipe de Robotique Autonome · IIT Kanpur</span>
      <span>Kanpur, Uttar Pradesh, India</span>
    </div>
  </footer>
);

export default Footer;
