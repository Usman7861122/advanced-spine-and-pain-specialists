import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '@lib/utils';

interface Testimonial {
  name: string;
  treatment: string;
  quote: string;
}

interface Props {
  items: Testimonial[];
  /** Auto-advance interval in ms. 0 disables. */
  interval?: number;
  image?: string;
  imageAlt?: string;
}

export default function Testimonials({ items, interval = 7000, image, imageAlt = '' }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const current = items[index];

  useEffect(() => {
    if (!interval || paused || reduce) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % items.length), interval);
    return () => window.clearInterval(t);
  }, [interval, paused, reduce, items.length]);

  const go = (i: number) => setIndex((i + items.length) % items.length);

  return (
    <div
      className="grid gap-12 lg:grid-cols-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Photo */}
      {image && (
        <div className="lg:col-span-4">
          <div className="aspect-[4/3] overflow-hidden rounded-sm bg-bone lg:aspect-[4/5]">
            <img src={image} alt={imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover object-[40%_center]" />
          </div>
        </div>
      )}

      {/* Quote */}
      <div className={cn(image ? 'lg:col-span-5' : 'lg:col-span-8')} aria-live="polite">
        <span aria-hidden="true" className="display block text-[6rem] leading-[0.6] text-gold">
          “
        </span>
        <div className="relative min-h-[14rem] md:min-h-[12rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="display text-display-sm text-ink md:text-[1.9rem] leading-[1.25]">
                {current.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="h-px w-8 bg-gold" aria-hidden="true" />
                <span className="text-[0.95rem] font-medium text-ink">{current.name}</span>
                <span className="text-[0.85rem] text-mist">{current.treatment}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className={cn('flex flex-col justify-between lg:border-l lg:border-line lg:pl-12', image ? 'lg:col-span-3' : 'lg:col-span-4')}>
        <ol className="space-y-3">
          {items.map((t, i) => (
            <li key={t.name}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === index ? 'true' : undefined}
                className={cn(
                  'flex min-h-11 w-full items-center gap-4 text-left transition-colors',
                  i === index ? 'text-ink' : 'text-mist hover:text-slate',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'h-2 w-2 shrink-0 rounded-full border transition-colors',
                    i === index ? 'border-gold bg-gold' : 'border-line bg-transparent',
                  )}
                />
                <span className="text-[0.9rem] font-medium">{t.name}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous testimonial"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-gold hover:text-gold"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M14 8H3M7 3 2 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next testimonial"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-gold hover:text-gold"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
