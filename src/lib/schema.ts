/**
 * schema.org structured data (JSON-LD) for treatment and condition pages.
 * Tells search engines what the page is about and which local clinic offers it,
 * with the address of every office. Helps "near me" and "in Spring, TX" searches.
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
