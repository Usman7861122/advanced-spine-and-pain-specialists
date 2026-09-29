/**
 * Site-wide scroll animation (no dependencies).
 *
 * Content inside page sections gently rises and fades in as it scrolls into view,
 * one item after another. Photos unfold from a soft zoom. Works on every page
 * automatically, so new sections get it for free.
 *
 * - Skips the home hero and anything inside a React island (those animate themselves).
 * - Only hides things that are below the fold when the page loads, so nothing flashes.
 * - Does nothing when the visitor prefers reduced motion, or when JavaScript is off.
 * - Add `data-no-reveal` to any element to opt it (and its children) out.
 */

const TEXT = [
  '.eyebrow',
  'h2',
  'h3',
  'p',
  'blockquote',
  'figure',
  'form',
  'details',
  'address',
  'li',
  '.display',
  'a[class*="rounded-full"]', // buttons
  '[data-reveal]',
].join(',');

const MEDIA = 'img, video, iframe';

const STEP_MS = 70; // delay between items that appear together
const MAX_STEPS = 6;

let io: IntersectionObserver | null = null;

function skip(el: Element) {
  return Boolean(
    el.closest('astro-island, #hero, [data-no-reveal], header, .mobile-cta, .band-bg') ||
      el.parentElement?.closest('.sr, .sr-media'), // an ancestor already animates
  );
}

function init() {
  io?.disconnect();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const main = document.querySelector('main');
  if (!main) return;
  const fold = window.innerHeight * 0.92;

  io = new IntersectionObserver(
    (entries) => {
      // Stagger the items that enter together, in page order.
      const entering = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
      entering.forEach((e, i) => {
        const el = e.target as HTMLElement;
        el.style.transitionDelay = `${Math.min(i, MAX_STEPS) * STEP_MS}ms`;
        el.classList.add('is-in');
        io?.unobserve(el);
        // When finished, remove the animation classes so hover effects and the
        // element's own transforms work exactly as before.
        window.setTimeout(() => {
          el.style.transitionDelay = '';
          el.classList.remove('sr', 'sr-media', 'is-in');
        }, 1500 + MAX_STEPS * STEP_MS);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  const watch = (el: Element, cls: 'sr' | 'sr-media') => {
    if (el.classList.contains('sr') || el.classList.contains('sr-media') || skip(el)) return;
    // Only animate what the visitor hasn't seen yet.
    if (el.getBoundingClientRect().top < fold) return;
    el.classList.add(cls);
    io!.observe(el);
  };

  // Media first, so a photo animates as one piece rather than with its caption split off.
  main.querySelectorAll(MEDIA).forEach((el) => {
    // Animate the photo's frame if it has one (keeps rounded corners and overlays together).
    const frame = el.parentElement?.matches('.img-zoom, [class*="aspect-"], picture') ? el.parentElement : el;
    if (frame && !frame.closest('a.cell, .band')) watch(frame, 'sr-media');
  });
  main.querySelectorAll(TEXT).forEach((el) => watch(el, 'sr'));
}

// Astro's page-load event fires on the first visit and after every page change.
document.addEventListener('astro:page-load', init);
