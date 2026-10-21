/**
 * schema.org structured data (JSON-LD) for treatment and condition pages.
 * Tells search engines what the page is about and which local clinic offers it,
 * with the address of every office. Helps "near me" and "in The Woodlands, TX" searches.
 */
import { site } from '@data/site';

interface Loc {
  name: string;
  line1: string;
  line2: string;
  hoursSummary: string;
}

const clinic = (l: Loc) => ({
  '@type': 'MedicalClinic',
  name: `${site.name} – ${l.name}, TX`,
  telephone: site.phone,
  email: site.email,
  medicalSpecialty: 'PainMedicine',
  address: {
    '@type': 'PostalAddress',
    streetAddress: l.line1,
    addressLocality: l.name,
    addressRegion: 'TX',
    postalCode: l.line2.match(/\d{5}/)?.[0],
    addressCountry: 'US',
  },
});

export function medicalPageSchema(opts: {
  name: string;
  description: string;
  url: string;
  kind: 'MedicalProcedure' | 'MedicalCondition';
  locations: Loc[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    about: { '@type': opts.kind, name: opts.name },
    provider: opts.locations.map(clinic),
    areaServed: opts.locations.map((l) => ({ '@type': 'City', name: `${l.name}, TX` })),
  };
}

/**
 * Site-wide structured data for the practice (added to every page by BaseLayout).
 * One organization with both offices, their hours, and Dr. Khoury.
 */
export function organizationSchema(opts: {
  siteUrl: string;
  locations: (Loc & { slug: string; hours: { day: string; hours: string }[] })[];
}) {
  const base = opts.siteUrl.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    '@id': `${base}/#organization`,
    name: site.name,
    url: `${base}/`,
    logo: `${base}/images/logo.png`,
    image: `${base}/images/og-image.jpg`,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    medicalSpecialty: 'PainMedicine',
    sameAs: Object.values(site.social).filter(Boolean),
    founder: {
      '@type': 'Physician',
      name: 'Andrew M. Khoury, MD',
      url: `${base}/about/#khoury`,
      medicalSpecialty: ['Anesthesia', 'PainMedicine'],
    },
    department: opts.locations.map((l) => ({
      ...clinic(l),
      '@id': `${base}/locations/${l.slug}/#clinic`,
      url: `${base}/locations/${l.slug}/`,
      image: `${base}/images/og-image.jpg`,
      openingHoursSpecification: l.hours
        .filter((h) => h.hours !== 'Closed')
        .map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.day, opens: '08:00', closes: '17:00' })),
    })),
  };
}

/** "Back pain" → "Back Pain", "CRPS type 1 (reflex ...)" → "CRPS Type 1" (for page titles). */
export const titleCase = (t: string) =>
  t
    .replace(/\s*\(.*\)\s*/, ' ')
    .trim()
    .split(' ')
    .map((w) => (w === w.toUpperCase() ? w : w[0].toUpperCase() + w.slice(1)))
    .join(' ');

/** Google shows about 155 characters: first sentence + where + phone, shortened if needed. */
export function metaDescription(text: string, places: string, phone: string) {
  const first = text.match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? text;
  const options = [
    `${first} Treated by Dr. Khoury in ${places}. Call ${phone}.`,
    `${first} Dr. Khoury, ${places}. Call ${phone}.`,
    `${first} Dr. Khoury, ${places}.`,
  ];
  return options.find((o) => o.length <= 160) ?? first;
}
