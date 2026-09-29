import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface Props {
  src: string;
  alt: string;
  className?: string;
  /** How far the image drifts (px) over the full scroll of its container. */
  drift?: number;
  /** Object position for the image, e.g. "center 20%". */
  position?: string;
}

/**
 * Full-bleed image that scrolls back slower than the page (parallax).
 * Use as an island: <ParallaxImage client:load ... />
 */
export default function ParallaxImage({ src, alt, className, drift = 160, position = 'center 30%' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : drift]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);

  return (
    <div ref={ref} className={className} aria-hidden="false">
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale, objectPosition: position }}
        className="h-full w-full object-cover will-change-transform"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
}
