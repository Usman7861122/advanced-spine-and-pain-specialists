# Advanced Spine and Pain Specialists , Website

Built with **Astro** + **React** (islands) + **Tailwind CSS v4** + **Framer Motion**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
npm run preview  # preview the build
npm run check    # type-check .astro files
```

## Folder structure

```
├── public/               # static files served as-is (images, fonts, robots.txt)
├── src/
│   ├── assets/           # images processed by Astro (<Image />)
│   ├── components/
│   │   ├── ui/           # small building blocks (Button, Container)
│   │   ├── sections/     # page sections (Hero, ...)
│   │   ├── react/        # React islands (Framer Motion lives here)
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── data/             # site info, nav links, content data
│   ├── layouts/          # BaseLayout.astro (head, header, footer)
│   ├── lib/              # helpers (cn, motion variants)
│   ├── pages/            # file-based routes (index, about, services, contact, 404)
│   └── styles/global.css # Tailwind import + design tokens (@theme)
├── astro.config.mjs
├── tsconfig.json         # path aliases: @/, @components/, @layouts/, @lib/, @data/, @styles/
└── package.json
```

## Images

All photos live in `public/images/` and are referenced from `src/data/site.ts` → `images`.
Swap a photo by changing the path there. For automatic resizing/WebP later, move them to
`src/assets/` and use Astro's `<Image />` from `astro:assets`.

## Design system

- **Colors** (`src/styles/global.css` → `@theme`): `ink` navy (#0b1d42) and `ink-soft` (#163472) from the advspine.org logo, `porcelain` background, `gold` token = the brand blue accent (#2f66d6; token name kept from the template), `slate` body text.
- **Fonts:** Cormorant Garamond (display) + DM Sans (body), loaded from Google Fonts in `BaseLayout.astro`.
- **Utilities:** `container-x`, `section-y`, `eyebrow`, `display`, `gold-rule`.
- **Signature element:** `SpineRail.tsx` , the vertical dot rail on the left of the home page (desktop only).
- **Sections** live in `src/components/sections/` and are composed in `src/pages/index.astro`.
  Each section has an `id` matching `homeSections` in `site.ts`; dark sections carry `data-dark`.

## Rules of thumb

- Use `.astro` components by default (zero JS). Use React (`src/components/react/`) only when you need
  interactivity or Framer Motion, and add a `client:*` directive (`client:visible`, `client:load`).
- Colors, fonts and spacing tokens live in `src/styles/global.css` under `@theme`.
- Site-wide text (name, phone, nav) lives in `src/data/site.ts`.
- Shared animation variants live in `src/lib/motion.ts`.
