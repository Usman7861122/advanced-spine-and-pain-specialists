import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface Img {
  src: string;
  alt: string;
}
interface Props {
  images: Img[];
  className?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Horizontal strip of photos: the hovered one widens, the others narrow.
 * Click opens a lightbox with prev / next. Stacks vertically on phones.
 */
export default function ExpandableGallery({ images, className = '' }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const flexFor = (i: number) => (hovered === null ? 1 : hovered === i ? 2.4 : 0.6);
  const next = () => setSelected((s) => (s === null ? s : (s + 1) % images.length));
  const prev = () => setSelected((s) => (s === null ? s : (s - 1 + images.length) % images.length));

  // Keyboard: Esc closes, arrows move.
  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <div className={className}>
      <div className="flex h-auto w-full flex-col gap-2 md:h-[30rem] md:flex-row" onMouseLeave={() => setHovered(null)}>
        {images.map((img, i) => (
          <motion.button
            key={img.src}
            type="button"
            aria-label={`Open photo: ${img.alt}`}
            className="group relative h-44 cursor-pointer overflow-hidden rounded-sm bg-bone md:h-auto"
            style={{ flex: 1 }}
            animate={{ flex: reduce ? 1 : flexFor(i) }}
            transition={{ duration: 0.6, ease }}
            onMouseEnter={() => setHovered(i)}
            onFocus={() => setHovered(i)}
            onClick={() => setSelected(i)}
          >
            <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 bg-ink"
              initial={{ opacity: 0.35 }}
              animate={{ opacity: hovered === i ? 0 : hovered === null ? 0.25 : 0.5 }}
              transition={{ duration: 0.4 }}
            />
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-left text-[0.8rem] uppercase tracking-[0.18em] text-white"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: hovered === i ? 1 : 0, y: hovered === i ? 0 : 8 }}
              transition={{ duration: 0.4, ease }}
            >
              {img.alt}
            </motion.span>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold-light hover:text-gold-light"
              onClick={() => setSelected(null)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold-light hover:text-gold-light md:left-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold-light hover:text-gold-light md:right-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={selected}
                  src={images[selected].src}
                  alt={images[selected].alt}
                  className="mx-auto max-h-[82vh] w-auto max-w-full rounded-sm object-contain"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, ease }}
                />
              </AnimatePresence>
              <p className="mt-4 flex items-center justify-between text-[0.8rem] uppercase tracking-[0.18em] text-white/70">
                <span>{images[selected].alt}</span>
                <span className="tabular-nums">
                  {selected + 1} / {images.length}
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
