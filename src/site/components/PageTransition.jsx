import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { scrollToTarget, useLenis } from './SmoothScroll';
import Footer from './Footer';

const ease = [0.76, 0, 0.24, 1];

// Wraps each route: a curtain wipes up on enter, content fades on exit.
const PageTransition = ({ children }) => {
  const { hash } = useLocation();
  const lenis = useLenis();

  const mounted = useRef(false);

  useEffect(() => {
    const id = hash.replace('#', '');
    const firstRun = !mounted.current;
    mounted.current = true;
    if (firstRun) scrollToTarget(lenis, null, { immediate: true });
    if (!id) return undefined;
    // On a fresh page, wait for the section to lay out before scrolling to it.
    const t = setTimeout(() => scrollToTarget(lenis, id), firstRun ? 450 : 0);
    return () => clearTimeout(t);
  }, [hash, lenis]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[80] origin-top bg-volt"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.7, ease, delay: 0.05 } }}
        exit={{ scaleY: 0 }}
      />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.25 } }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        {children}
        <Footer />
      </motion.main>
    </>
  );
};

export default PageTransition;
