import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@lib/utils';

interface Props {
  sections: { id: string; label: string }[];
}

/**
 * Signature element: a thin vertical rail of dots (vertebrae) fixed to the left edge.
 * The dot for the section in view fills gold. Desktop only.
 */
export default function SpineRail({ sections }: Props) {
  const [active, setActive] = useState(sections[0]?.id);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top-third of the viewport
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
          setActive(top.target.id);
          setOnDark(top.target.hasAttribute('data-dark'));
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Page sections"
      className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="relative flex flex-col items-center gap-5">
        <span
          aria-hidden="true"
          className={cn(
            'absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 transition-colors duration-500',
            onDark ? 'bg-white/20' : 'bg-line',
          )}
        />
        {sections.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id} className="relative">
              <a
                href={`#${s.id}`}
                aria-label={s.label}
                aria-current={isActive ? 'location' : undefined}
                className="pointer-events-auto group relative flex h-4 w-4 items-center justify-center"
              >
                <motion.span
                  aria-hidden="true"
                  animate={{ scale: isActive ? 1 : 0.55 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'block h-2.5 w-2.5 rounded-full border transition-colors duration-500',
                    isActive
                      ? 'border-gold bg-gold'
                      : onDark
                        ? 'border-white/50 bg-ink'
                        : 'border-mist bg-porcelain',
                  )}
                />
                <span
                  className={cn(
                    'pointer-events-none absolute left-7 whitespace-nowrap text-[0.7rem] uppercase tracking-[0.2em] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100',
                    onDark ? 'text-white/80' : 'text-slate',
                  )}
                >
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
