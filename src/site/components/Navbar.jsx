import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import logo from '../../assets/logo.png';
import { navItems, socials } from '../data/links';
import { scrollToTarget, useLenis } from './SmoothScroll';

const NavItem = ({ item, active, onNavigate, className, children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const lenis = useLenis();

  if (item.to) {
    return (
      <Link to={item.to} onClick={onNavigate} className={className} aria-current={active ? 'page' : undefined}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={`/#${item.hash}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onNavigate?.();
        if (pathname === '/') scrollToTarget(lenis, item.hash);
        else navigate(`/#${item.hash}`);
      }}
    >
      {children}
    </a>
  );
};

const Navbar = () => {
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    setScrolled(y > 24);
  });

  useEffect(() => setOpen(false), [pathname]);

  const lenis = useLenis();
  useEffect(() => {
    if (open) lenis.current?.stop();
    else lenis.current?.start();
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open, lenis]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden && !open ? '-110%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className={`transition-colors duration-300 ${
            scrolled || open ? 'bg-ink/95 backdrop-blur-sm' : 'bg-transparent'
          }`}
        >
          <div className="container-site flex h-16 items-center justify-between gap-6 sm:h-[72px]">
            <Link to="/" aria-label="ERA home" className="flex items-center gap-3">
              <img src={logo} alt="ERA" className="h-6 w-auto sm:h-7" />
              <span className="label hidden border-l border-chalk/30 pl-3 text-chalk/70 lg:inline">IIT Kanpur</span>
            </Link>

            <ul className="hidden items-center md:flex">
              {navItems.map((item) => {
                const active = item.to === pathname;
                return (
                  <li key={item.label} className="relative">
                    <NavItem
                      item={item}
                      active={active}
                      className={`label relative block px-3 py-6 transition-colors lg:px-4 ${
                        active ? 'text-volt' : 'text-chalk/75 hover:text-chalk'
                      }`}
                    >
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="nav-bar"
                          className="absolute inset-x-3 bottom-3 h-[3px] bg-volt lg:inset-x-4"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                    </NavItem>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <NavItem item={{ hash: 'contact' }} className="btn-volt hidden !py-2.5 md:inline-flex">
                Contact
              </NavItem>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className="relative grid h-11 w-11 place-items-center bg-volt text-ink md:hidden"
              >
                <motion.span
                  className="absolute h-[2px] w-5 bg-ink"
                  animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                />
                <motion.span
                  className="absolute h-[2px] w-5 bg-ink"
                  animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="tech fixed inset-0 z-40 flex flex-col justify-between px-6 pb-10 pt-24 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-col">
              {[...navItems, { label: 'Contact', hash: 'contact' }].map((item, i) => (
                <motion.li
                  key={item.label}
                  className="border-b border-chalk/20"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.2 + i * 0.05 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                  <NavItem
                    item={item}
                    active={item.to === pathname}
                    onNavigate={() => setOpen(false)}
                    className={`display flex items-center justify-between py-2 text-5xl ${
                      item.to === pathname ? 'text-volt' : 'text-chalk'
                    }`}
                  >
                    {item.label}
                    <span className="label text-chalk/60">{String(i + 1).padStart(2, '0')}</span>
                  </NavItem>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="label flex flex-wrap gap-x-5 gap-y-2 text-chalk/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
            >
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-volt">
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
