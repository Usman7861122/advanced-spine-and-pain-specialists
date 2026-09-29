import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { cn } from '@lib/utils';

interface Item {
  title: string;
  text: string;
}
interface Props {
  items: Item[];
}

const icons = [
  // expertise (star)
  'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z',
  // technology (screen)
  'M3 5h18v12H3zM8 21h8M12 17v4M7 9h4M7 13h7',
  // care (heart)
  'M12 20s-7-4.4-7-9.5A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.5C19 15.6 12 20 12 20z',
];

/**
 * "Why choose us" list with a vertical line through the icons that fills gold on scroll.
 * Each icon circle fills gold when the line reaches it.
 */
export default function WhyChooseList({ items }: Props) {
  const ref = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.45'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const lineScale = useTransform(progress, [0, 1], [0, 1]);

  const [reached, setReached] = useState<boolean[]>(() => items.map(() => !!reduce));
  useEffect(() => {
    if (reduce) return;
    return progress.on('change', (v) => {
      const list = ref.current;
      if (!list) return;
      const filled = v * list.getBoundingClientRect().height;
      const dots = Array.from(list.querySelectorAll<HTMLElement>('[data-dot]'));
      const next = dots.map((d) => d.offsetTop + d.offsetHeight / 2 <= filled + 1);
      setReached((prev) => (prev.some((p, i) => p !== next[i]) ? next : prev));
    });
  }, [progress, reduce]);

  return (
    <ul ref={ref} className="relative">
      {/* Track + fill run through the centre of the icon column */}
      <span aria-hidden="true" className="absolute left-[1.375rem] top-6 bottom-6 w-px bg-line" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reduce ? 1 : lineScale }}
        className="absolute left-[1.375rem] top-6 bottom-6 w-px origin-top bg-gold"
      />

      {items.map((w, i) => {
        const on = reached[i];
        return (
          <li key={w.title} className="group relative grid gap-5 py-9 sm:grid-cols-[3rem_1fr] sm:gap-8">
            <span
              data-dot
              aria-hidden="true"
              className={cn(
                'relative z-10 flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500',
                on
                  ? 'border-gold bg-gold text-white shadow-[0_0_0_8px_rgba(47,102,214,0.14)]'
                  : 'border-line bg-porcelain text-gold',
              )}
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={icons[i % icons.length]} />
              </svg>
            </span>
            <div>
              <h3
                className={cn(
                  'display text-[1.75rem] leading-tight transition-all duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-1',
                  on ? 'text-ink' : 'text-slate/70',
                )}
              >
                {w.title}
              </h3>
              <p className={cn('mt-3 leading-relaxed transition-colors duration-500', on ? 'text-slate' : 'text-mist')}>
                {w.text}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
