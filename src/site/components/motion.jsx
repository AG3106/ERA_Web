import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

export const easeOut = [0.22, 1, 0.36, 1];

// Fades and lifts children into view once.
export const Reveal = ({ children, delay = 0, y = 32, className, as = 'div', ...rest }) => {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay, ease: easeOut }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Splits text into words that slide up from a clipped line.
export const SplitText = ({ text, className, delay = 0, stagger = 0.05, animateOnMount = false }) => {
  const words = text.split(' ');
  const trigger = animateOnMount
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } };
  return (
    <motion.span
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', rotate: 4 },
              show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: easeOut } },
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

// Paragraph whose words brighten as it scrolls through the viewport.
export const ScrollText = ({ text, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
};

// Section heading: numbered rule, then a big condensed title.
export const SectionHeading = ({ num, kicker, title, children, className = '', size = 'text-[clamp(3.4rem,10vw,9.5rem)]' }) => (
  <div className={className}>
    <Reveal y={0} className="label mb-6 flex items-center gap-4 opacity-80">
      <span>{num}</span>
      <motion.span
        className="h-[2px] flex-1 origin-left bg-current"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: easeOut }}
      />
      <span>{kicker}</span>
    </Reveal>
    <h2 className={`display ${size}`}>
      <SplitText text={title} stagger={0.06} />
    </h2>
    {children && (
      <Reveal delay={0.15} className="mt-6 max-w-2xl text-lg leading-relaxed opacity-80">
        {children}
      </Reveal>
    )}
  </div>
);

// Chalk pitch markings that draw themselves when scrolled into view.
export const PitchLines = ({ className = '', variant = 'box' }) => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { delay: i * 0.25, duration: 1.6, ease: easeOut }, opacity: { delay: i * 0.25, duration: 0.2 } },
    }),
  };
  const shapes =
    variant === 'center'
      ? [
          <motion.line key="l" x1="500" y1="0" x2="500" y2="600" custom={0} variants={draw} />,
          <motion.circle key="c" cx="500" cy="300" r="150" custom={1} variants={draw} />,
          <motion.circle key="d" cx="500" cy="300" r="5" fill="currentColor" custom={2} variants={draw} />,
        ]
      : [
          <motion.path key="b" d="M1000 90 H760 V510 H1000" custom={0} variants={draw} />,
          <motion.path key="s" d="M1000 200 H900 V400 H1000" custom={1} variants={draw} />,
          <motion.path key="a" d="M760 220 A120 120 0 0 0 760 380" custom={2} variants={draw} />,
          <motion.circle key="p" cx="840" cy="300" r="5" fill="currentColor" custom={3} variants={draw} />,
        ];
  return (
    <motion.svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className={`pointer-events-none ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {shapes}
    </motion.svg>
  );
};

// Infinite horizontal loop. Content is duplicated so the -50% shift is seamless.
export const Marquee = ({ children, duration = 30, reverse = false, className = '' }) => (
  <div className={`flex overflow-hidden ${className}`}>
    <motion.div
      className="flex shrink-0 items-center"
      animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
      transition={{ duration, ease: 'linear', repeat: Infinity }}
    >
      <div className="flex shrink-0 items-center">{children}</div>
      <div className="flex shrink-0 items-center" aria-hidden>
        {children}
      </div>
    </motion.div>
  </div>
);

export const Counter = ({ to, from = 0, suffix = '', duration = 1.8 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const [value, setValue] = useState(from);
  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(from, to, {
      duration,
      ease: easeOut,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, from, to, duration]);
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
};

// Card that tilts toward the pointer.
export const TiltCard = ({ children, className, max = 8, ...rest }) => {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  return (
    <motion.div
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

// Button that drifts toward the cursor.
export const Magnetic = ({ children, strength = 0.3, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });
  return (
    <motion.div
      className={`inline-block ${className ?? ''}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

export const Arrow = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
    <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Header used at the top of sub-pages: a photo, or the engineering grid.
export const PageHeader = ({ kicker, title, children, image }) => (
  <section className={`relative overflow-hidden pb-16 pt-36 sm:pb-24 sm:pt-44 ${image ? 'bg-ink' : 'tech'}`}>
    {image ? (
      <>
        <motion.img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[50%_60%]"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: easeOut }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/45 to-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" />
      </>
    ) : null}
    <div className="container-site relative">
      <motion.p
        className="label mb-6 flex items-center gap-3 text-volt"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <span className="h-2 w-2 bg-volt" />
        {kicker}
      </motion.p>
      <h1 className="display text-[clamp(4rem,15vw,13rem)] text-chalk">
        <SplitText text={title} animateOnMount delay={0.45} stagger={0.08} />
      </h1>
      {children && (
        <motion.div
          className="mt-8 max-w-2xl text-lg leading-relaxed text-chalk/85"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: easeOut }}
        >
          {children}
        </motion.div>
      )}
    </div>
  </section>
);
