import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { nav, services, conditionGroups, featuredConditions, site } from '@data/site';
import { cn } from '@lib/utils';

type HeaderMode = 'transparent' | 'light' | 'solid';
interface Props {
  mode?: HeaderMode;
}

type MegaKey = 'services' | 'conditions';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Header({ mode: initialMode = 'solid' }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState<MegaKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<MegaKey | null>(null);
  const closeTimer = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Persisted across page transitions: follow the new page's header mode.
  const [mode, setMode] = useState<HeaderMode>(initialMode);
  useEffect(() => {
    const sync = () => {
      setMode((document.body.dataset.header as HeaderMode) || 'solid');
      setMega(null);
      setMobileOpen(false);
    };
    document.addEventListener('astro:after-swap', sync);
    return () => document.removeEventListener('astro:after-swap', sync);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMega(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const openMega = (key: MegaKey) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMega(key);
  };
  const keepMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setMega(null), 120);
  };

  const floating = !scrolled && !mega && !mobileOpen;
  const onDark = mode === 'transparent' && floating;
  const onLight = mode === 'light' && floating;
  const textColor = onDark ? 'text-white' : 'text-ink';
  const mutedColor = onDark ? 'text-white/70 hover:text-white' : 'text-slate hover:text-ink';

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300',
        onDark
          ? 'bg-transparent'
          : onLight
            ? 'bg-porcelain/60 backdrop-blur-md'
            : mega
            ? 'bg-porcelain border-b border-line'
            : 'bg-porcelain/92 backdrop-blur-md border-b border-line',
      )}
      onBlur={(e) => {
        if (!headerRef.current?.contains(e.relatedTarget as Node)) setMega(null);
      }}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        {/* Brand */}
        <a href="/" aria-label={site.name} className={cn('flex shrink-0 items-center gap-3 whitespace-nowrap leading-none', textColor)}>
          <svg width="34" height="30" viewBox="0 0 34 30" aria-hidden="true" className="shrink-0">
            <path d="M17 2 32 28H2Z" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
            <path d="M17 13l6.4 11H10.6Z" className={onDark ? 'fill-gold-light' : 'fill-gold'} />
          </svg>
          <span className="flex flex-col">
            <span className="display text-[1.35rem] tracking-tight">Advanced Spine &amp; Pain</span>
            <span className={cn('mt-0.5 text-[0.62rem] font-medium tracking-[0.34em]', onDark ? 'text-gold-light' : 'text-gold')}>
              SPECIALISTS
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Main">
          {nav.map((item) =>
            item.mega ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => openMega(item.mega!)}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className={cn('flex items-center gap-1.5 whitespace-nowrap text-[0.9rem] font-medium transition-colors', mutedColor)}
                  aria-expanded={mega === item.mega}
                  aria-haspopup="true"
                  onClick={() => setMega((v) => (v === item.mega ? null : item.mega!))}
                  onFocus={() => openMega(item.mega!)}
                >
                  {item.label}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    aria-hidden="true"
                    className={cn('transition-transform duration-300', mega === item.mega && 'rotate-180')}
                  >
                    <path d="M1 3.5 5 7l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </button>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className={cn('link-underline whitespace-nowrap text-[0.9rem] font-medium transition-colors', mutedColor)}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        {/* Right actions */}
        <div className="hidden xl:flex shrink-0 items-center gap-6">
          <a
            href={site.phoneHref}
            className={cn('hidden 2xl:block whitespace-nowrap text-[0.9rem] font-medium transition-colors', mutedColor)}
          >
            {site.phone}
          </a>
          <a
            href="/contact"
            className={cn(
              'hover-lift inline-flex h-11 items-center whitespace-nowrap rounded-full px-6 text-[0.85rem] font-medium tracking-wide transition-colors',
              onDark ? 'bg-white text-ink hover:bg-gold-light' : 'bg-ink text-white hover:bg-gold',
            )}
          >
            Request an appointment
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className={cn('lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full', textColor)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
            {mobileOpen ? (
              <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.5" />
            ) : (
              <path d="M2 6h18M2 11h18M2 16h18" stroke="currentColor" strokeWidth="1.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mega menus (desktop) */}
      <AnimatePresence>
        {mega && (
          <motion.div
            key={mega}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease }}
            className="hidden lg:block absolute inset-x-0 top-full border-b border-line bg-porcelain shadow-[0_30px_60px_-30px_rgba(11,29,66,0.25)]"
            onMouseEnter={keepMega}
            onMouseLeave={scheduleClose}
          >
            {mega === 'services' ? <ServicesMega /> : <ConditionsMega />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 top-20 z-40 overflow-y-auto bg-porcelain"
          >
            <nav className="container-x flex flex-col py-6" aria-label="Mobile">
              {nav.map((item) =>
                item.mega ? (
                  <div key={item.label} className="border-b border-line">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-4 text-left display text-2xl text-ink"
                      aria-expanded={mobileSub === item.mega}
                      onClick={() => setMobileSub((v) => (v === item.mega ? null : item.mega!))}
                    >
                      {item.label}
                      <span className="text-gold text-xl leading-none" aria-hidden="true">
                        {mobileSub === item.mega ? '−' : '+'}
                      </span>
                    </button>
                    {mobileSub === item.mega && item.mega === 'services' && (
                      <ul className="pb-4 space-y-1">
                        {services.map((s) => (
                          <li key={s.slug}>
                            <a href={`/services/${s.slug}`} className="block py-2.5 text-[0.95rem] text-slate hover:text-ink">
                              {s.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                    {mobileSub === item.mega && item.mega === 'conditions' && (
                      <div className="pb-4 space-y-5">
                        {conditionGroups.map((g) => (
                          <div key={g.title}>
                            <p className="eyebrow text-gold">{g.title}</p>
                            <ul className="mt-1">
                              {g.items.map((c) => (
                                <li key={c.slug}>
                                  <a
                                    href={`/conditions/${c.slug}`}
                                    className="block py-2 text-[0.95rem] text-slate hover:text-ink"
                                  >
                                    {c.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="border-b border-line py-4 display text-2xl text-ink"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                ),
              )}
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-white"
                >
                  Request an appointment
                </a>
                <a
                  href={site.phoneHref}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-line px-6 text-sm font-medium text-ink"
                >
                  Call {site.phone}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- Mega menu panels ---------- */

function MegaIntro({ eyebrow, title, href, linkLabel }: { eyebrow: string; title: string; href: string; linkLabel: string }) {
  return (
    <div className="col-span-3 border-r border-line pr-10">
      <p className="eyebrow text-gold">{eyebrow}</p>
      <p className="display mt-4 text-[1.9rem] leading-tight text-ink">{title}</p>
      <a href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-gold">
        {linkLabel}
        <Arrow />
      </a>
    </div>
  );
}

function ServicesMega() {
  return (
    <div className="container-x grid grid-cols-12 gap-10 py-10">
      <MegaIntro
        eyebrow="Treatments"
        title="Minimally invasive care for the spine, joints and nerves."
        href="/services"
        linkLabel="View all treatments"
      />
      <ul className="col-span-6 grid grid-cols-2 gap-x-10 gap-y-2">
        {services.map((s, i) => (
          <motion.li
            key={s.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease, delay: 0.05 + i * 0.04 }}
          >
            <a href={`/services/${s.slug}`} className="group block rounded-lg px-3 py-3 -mx-3 transition-colors hover:bg-bone">
              <span className="block text-[0.95rem] font-medium text-ink group-hover:text-gold transition-colors">
                {s.title}
              </span>
              <span className="mt-1 block text-[0.82rem] leading-snug text-mist">{s.short}</span>
            </a>
          </motion.li>
        ))}
      </ul>
      <div className="col-span-3 border-l border-line pl-10">
        <p className="eyebrow text-gold">Common conditions</p>
        <ul className="mt-4 space-y-2">
          {featuredConditions.map((c) => (
            <li key={c.slug}>
              <a href={`/conditions/${c.slug}`} className="text-[0.9rem] text-slate hover:text-ink transition-colors">
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ConditionsMega() {
  // Pair the smaller groups into one column so the panel stays four columns wide.
  const columns: (typeof conditionGroups)[] = [
    [conditionGroups[0]],
    [conditionGroups[1]],
    [conditionGroups[2], conditionGroups[3]],
    [conditionGroups[4], conditionGroups[5]],
  ];
  return (
    <div className="container-x grid grid-cols-12 gap-10 py-10">
      <MegaIntro
        eyebrow="Conditions we treat"
        title="From back pain and sciatica to migraines and neuropathy."
        href="/conditions"
        linkLabel="View all conditions"
      />
      <div className="col-span-9 grid grid-cols-4 gap-x-8">
        {columns.map((col, i) => (
          <motion.div
            key={i}
            className="space-y-7"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease, delay: 0.05 + i * 0.06 }}
          >
            {col.map((g) => (
              <div key={g.title}>
                <p className="eyebrow text-gold">{g.title}</p>
                <ul className="mt-3 space-y-1">
                  {g.items.map((c) => (
                    <li key={c.slug}>
                      <a
                        href={`/conditions/${c.slug}`}
                        className="block rounded px-2 py-1.5 -mx-2 text-[0.88rem] leading-snug text-slate transition-colors hover:bg-bone hover:text-ink"
                      >
                        {c.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
