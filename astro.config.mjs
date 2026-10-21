// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Old website (PatientPop) addresses that Google still has, sent to the matching new page.
 * The old site used /services/... for conditions too, so those go to /conditions/....
 */
const oldConditionSlugs = [
  'back-pain', 'neck-pain', 'sciatica', 'herniated-disc', 'spinal-stenosis', 'compression-fractures',
  'neuropathy', 'crps-type-1', 'crps-type-2', 'carpal-tunnel-syndrome', 'arthritis', 'joint-pain',
  'sacroiliac-joint-pain', 'migraines', 'headaches', 'facial-pain', 'atypical-chest-pain',
  'abdominal-pain', 'pelvic-pain', 'post-surgical-pain',
];

const redirects = {
  '/contactus': '/contact/',
  '/location/tx/spring': '/locations/the-woodlands/',
  '/location/tx/liberty': '/locations/liberty/',
  '/provider/andrew-khoury-md': '/about/',
  '/provider/amy-jones': '/about/',
  '/contents/conditions': '/conditions/',
  '/contents/treatments': '/services/',
  '/blog/archive': '/blog/',
  '/our-terms': '/privacy/',
  ...Object.fromEntries(oldConditionSlugs.map((s) => [`/services/${s}`, `/conditions/${s}/`])),
};

// https://astro.build/config
export default defineConfig({
  site: 'https://www.advspine.org',
  // The live server always uses a slash at the end (/about/), so every link and canonical does too.
  trailingSlash: 'always',
  redirects,
  integrations: [
    react(),
    sitemap({
      // Leave redirect pages and the 404 page out of the sitemap.
      filter: (page) => !Object.keys(redirects).some((from) => page === `https://www.advspine.org${from}/`) && !page.includes('/404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
