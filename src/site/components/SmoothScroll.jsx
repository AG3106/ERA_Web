import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext({ current: null });

export const useLenis = () => useContext(LenisContext);

// Scrolls to `#id` (with an offset for the fixed navbar) or to the top.
export const scrollToTarget = (lenisRef, hash, { immediate = false } = {}) => {
  const lenis = lenisRef.current;
  const el = hash ? document.getElementById(hash) : null;
  if (hash && !el) return false;
  const target = el ?? 0;
  if (lenis) {
    // Lenis caches the scroll limit; refresh it in case the page just changed.
    lenis.resize();
    lenis.scrollTo(target, { offset: el ? -72 : 0, immediate, force: true });
  }
  else if (el) el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
  else window.scrollTo(0, 0);
  return true;
};

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisRef.current = lenis;
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
};

export default SmoothScroll;
