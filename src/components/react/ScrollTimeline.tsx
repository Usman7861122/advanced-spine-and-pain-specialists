import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { cn } from '@lib/utils';

export interface TimelineItem {
  label: string;
  title: string;
  text?: string;
}

interface Props {
  items: TimelineItem[];
  /** "light" for dark backgrounds. */
  tone?: 'dark' | 'light';
  /** Show "01 / " style numbering before the label. */
  numbered?: boolean;
}

/**
 * Vertical timeline whose line fills with gold as the reader scrolls,
 * lighting each dot when the fill reaches it.
 */
export default function ScrollTimeline({ items, tone = 'dark', numbered = true }: Props) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const light = tone === 'light';

  // Progress of the list through the viewport: 0 when its top hits 75% down, 1 when its bottom hits 45%.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.45'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const lineScale = useTransform(progress, [0, 1], [0, 1]);

  // Track which dots the fill has passed.
  const [reached, setReached] = useState<boolean[]>(() => items.map(() => !!reduce));
  useEffect(() => {
    if (reduce) return;
    const unsub = progress.on('change', (v) => {
      const list = ref.current;
      if (!list) return;
      const total = list.getBoundingClientRect().height;
      const filled = v * total;
      const dots = Array.from(list.querySelectorAll<HTMLElement>('[data-dot]'));
      const next = dots.map((d) => d.offsetTop + 6 <= filled + 1);
      setReached((prev) => (prev.some((p, i) => p !== next[i]) ? next : prev));
    });
    return () => unsub();
  }, [progress, reduce]);

  return (
    <ol ref={ref} className="relative pl-8 md:pl-10">
      {/* Track */}
      <span aria-hidden="true" className={cn('absolute left-0 top-2 bottom-2 w-px', light ? 'bg-white/15' : 'bg-line')} />
      {/* Fill */}
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reduce ? 1 : lineScale }}
        className="absolute left-0 top-2 bottom-2 w-px origin-top bg-gold"
      />

      {items.map((it, i) => {
        const on = reached[i];
        return (
          <li key={it.label + i} className="relative pb-10 last:pb-0">
            <span
              data-dot
              aria-hidden="true"
              className={cn(
                'absolute -left-[calc(2rem+5px)] top-2 h-2.5 w-2.5 rounded-full border transition-all duration-500 md:-left-[calc(2.5rem+5px)]',
                on
                  ? 'scale-125 border-gold bg-gold shadow-[0_0_0_6px_rgba(47,102,214,0.18)]'
                  : light
                    ? 'border-white/40 bg-ink'
                    : 'border-gold bg-porcelain',
              )}
            />
            <p className={cn('eyebrow transition-colors duration-500', on ? (light ? 'text-gold-light' : 'text-gold') : light ? 'text-white/40' : 'text-mist')}>
              {numbered && (
                <>
                  <span className="tabular-nums">0{i + 1}</span>
                  <span className={cn('mx-2', light ? 'text-white/20' : 'text-line')}>/</span>
                </>
              )}
              {it.label}
            </p>
            <p
              className={cn(
                'display mt-2 text-[1.5rem] leading-snug transition-colors duration-500 md:text-[1.7rem]',
                on ? (light ? 'text-white' : 'text-ink') : light ? 'text-white/55' : 'text-slate/70',
              )}
            >
              {it.title}
            </p>
            {it.text && (
              <p className={cn('mt-2 max-w-lg leading-relaxed transition-colors duration-500', on ? (light ? 'text-white/75' : 'text-slate') : light ? 'text-white/40' : 'text-mist')}>
                {it.text}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
