import type { Metadata } from "next";
import {
  business,
  communityEvents,
  eventPackages,
  eventPricing,
  siteUrl,
  weddingPackages,
} from "@/lib/site";

/*
  Search and social metadata, plus the structured data behind it.

  Titles follow "[Page Name] | The Ladybug Venue, Plant City, FL". The suffix
  lives here once: layout.tsx turns it into the title template, and the Open
  Graph and Twitter titles are built from it too, since Next does not apply the
  page title template to either of those.
*/
export const siteLocation = "Plant City, FL";
export const titleSuffix = `${business.name}, ${siteLocation}`;
export const titleTemplate = `%s | ${titleSuffix}`;

export const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${business.name}, an event venue in Plant City, Florida`,
};

// Lets every Service schema point at the one LocalBusiness node by reference.
export const businessId = `${siteUrl}/#business`;

export function absoluteUrl(path: string): string {
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

export type SeoPage = {
  name: string;
  path: string;
  description: string;
  parent?: SeoPage;
};

/*
  Every public page. Descriptions run 150 to 160 characters and name the
  service and the location. Admin is deliberately absent: it is noindex and
  gets no canonical, breadcrumb or service data.
*/
const home: SeoPage = {
  name: "Wedding and Event Venue",
  path: "/",
  description:
    "Family-run wedding and event venue in Plant City, FL. Chapel, hall and outdoor deck for weddings, baptisms and private parties, plus free community events.",
};

const contact: SeoPage = {
  name: "Contact",
  path: "/contact",
  description:
    "Contact The Ladybug Venue in Plant City, FL. Send a wedding or private event inquiry and we will follow up with availability, pricing and the next steps.",
};

export const seoPages = {
  home,
  weddings: {
    name: "Weddings",
    path: "/weddings",
    description:
      "Wedding venue in Plant City, FL. Venue-only rental from $1,650 or an all-inclusive package from $3,000, with a chapel and outdoor deck for 30 to 100 guests.",
  },
  events: {
    name: "Private Events",
    path: "/events",
    description:
      "Private event venue rental in Plant City, FL for birthdays, baby showers and family celebrations. Indoor hall from $500, or indoor plus outdoor from $775.",
  },
  baptisms: {
    name: "Baptisms",
    path: "/baptisms",
    description:
      "Baptism venue in Plant City, FL with a tiled immersion pool, a chapel for the service and a hall for the reception in one building. Rentals start at $500.",
  },
  community: {
    name: "Community Events",
    path: "/community",
    description:
      "Free community events at The Ladybug Venue in Plant City, FL: bingo every Monday, workout classes and a food pantry on the 1st and 3rd Saturday of each month.",
  },
  about: {
    name: "About Us",
    path: "/about",
    description:
      "Meet the sisters behind The Ladybug Venue, a family-run event space in Plant City, FL hosting weddings, private events, baptisms and free community programs.",
  },
  contact,
  contactWedding: {
    name: "Wedding Inquiry",
    path: "/contact/wedding",
    parent: contact,
    description:
      "Start a wedding inquiry with The Ladybug Venue in Plant City, FL. Share your date, guest count and package and we will follow up with a quote and a tour.",
  },
  contactEvent: {
    name: "Event Inquiry",
    path: "/contact/event",
    parent: contact,
    description:
      "Start a private event inquiry with The Ladybug Venue in Plant City, FL for a birthday, baby shower or baptism, and we will confirm availability and pricing.",
  },
  contactVendor: {
    name: "Vendor Partnerships",
    path: "/contact/vendor",
    parent: contact,
    description:
      "Photographers, florists, bands, caterers and other event pros: tell The Ladybug Venue in Plant City, FL about your business and explore a partnership.",
  },
  contactTour: {
    name: "Schedule a Tour",
    path: "/contact/tour",
    parent: contact,
    description:
      "Schedule a tour of The Ladybug Venue in Plant City, FL. See the chapel, hall, deck and yard in person before booking your wedding or private event.",
  },
} satisfies Record<string, SeoPage>;

export function fullTitle(page: SeoPage): string {
  return `${page.name} | ${titleSuffix}`;
}

/*
  Title, description, canonical, Open Graph and Twitter for one page.

  Metadata merges shallowly, so the openGraph and twitter objects here replace
  the layout's rather than extending them; that is why the image and site name
  are repeated.
*/
export function pageMetadata(page: SeoPage): Metadata {
  const title = fullTitle(page);
  const url = absoluteUrl(page.path);

  return {
    // The home page is the root segment, where the layout's own template does
    // not apply, so it takes the finished title instead.
    title: page.path === "/" ? { absolute: title } : page.name,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: business.name,
      locale: "en_US",
      url,
      title,
      description: page.description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images: [ogImage.url],
    },
  };
}

/* ---------------------------------------------------------------- JSON-LD */

type Schema = Record<string, unknown>;

/*
  Rooftop coordinates for 603 Elnor Street, from the OpenStreetMap building
  footprint. The US Census geocoder places the same address about 60m away on
  the street centreline, which confirms the match.
*/
const geo = { latitude: 28.00976, longitude: -82.16309 };

const areaServed = {
  "@type": "City",
  name: "Plant City",
  containedInPlace: { "@type": "State", name: "Florida" },
};

const priceFormat = new Intl.NumberFormat("en-US");

// "+1-813-776-5111", from the same tel: link the site already dials.
function internationalPhone(): string {
  const d = business.phoneHref.replace(/\D/g, "");
  return `+${d.slice(0, 1)}-${d.slice(1, 4)}-${d.slice(4, 7)}-${d.slice(7)}`;
}

/*
  The cheapest rental to the most expensive package, both starting prices, so
  the range moves if either price in site.ts does.
*/
function priceRange(): string {
  const low = Math.min(eventPricing.indoorOnly, eventPricing.indoorAndOutdoor);
  const high = Math.max(...weddingPackages.map((pkg) => pkg.startingPrice));
  return `$${priceFormat.format(low)}-$${priceFormat.format(high)}`;
}

/*
  Typed as both LocalBusiness and EventVenue. EventVenue is the precise
  description, but in schema.org it is a Place, not a business, so on its own
  it cannot carry a telephone, price range or opening details. LocalBusiness
  is what search engines read for a local listing. Pairing them keeps both.

  No email: none is published on the site, per SITE.md.
*/
export function localBusinessSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EventVenue"],
    "@id": businessId,
    name: business.name,
    description: seoPages.home.description,
    url: siteUrl,
    telephone: internationalPhone(),
    image: absoluteUrl(ogImage.url),
    logo: absoluteUrl("/brand/ladybug-group-logo.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", ...geo },
    areaServed,
    priceRange: priceRange(),
    sameAs: [business.linktree],
  };
}

function startingOffer(name: string, price: number): Schema {
  return {
    "@type": "Offer",
    name,
    priceCurrency: "USD",
    // Prices on the site are starting points, not fixed quotes.
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: price,
      priceCurrency: "USD",
    },
  };
}

const rentalOffers = eventPackages.map((pkg) => startingOffer(pkg.name, pkg.price));

const services = {
  weddings: {
    name: "Wedding Venue Rental",
    serviceType: "Wedding venue",
    offers: weddingPackages.map((pkg) =>
      startingOffer(pkg.name, pkg.startingPrice),
    ),
  },
  events: {
    name: "Private Event Venue Rental",
    serviceType: "Event venue rental",
    offers: rentalOffers,
  },
  // A baptism books as a private event rental, at the same prices.
  baptisms: {
    name: "Baptism Venue Rental",
    serviceType: "Baptism venue",
    offers: rentalOffers,
  },
  community: {
    name: "Free Community Programming",
    serviceType: "Community events",
    offers: communityEvents.map((event) => ({
      "@type": "Offer",
      name: event.name,
      price: 0,
      priceCurrency: "USD",
    })),
  },
} as const;

export type ServiceKey = keyof typeof services;

export function serviceSchema(key: ServiceKey): Schema {
  const service = services[key];
  const page = seoPages[key];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.serviceType,
    description: page.description,
    url: absoluteUrl(page.path),
    provider: { "@id": businessId },
    areaServed,
    offers: service.offers,
  };
}

// Home > [Parent] > Page, following each page's parent up to the root.
export function breadcrumbSchema(page: SeoPage): Schema {
  const trail: SeoPage[] = [];
  for (let p: SeoPage | undefined = page; p; p = p.parent) trail.unshift(p);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      ...trail.map((p, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: p.name,
        item: absoluteUrl(p.path),
      })),
    ],
  };
}
