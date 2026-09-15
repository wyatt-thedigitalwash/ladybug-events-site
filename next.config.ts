import type { NextConfig } from "next";

type Redirect = {
  source: string;
  destination: string;
  permanent: true;
  has?: { type: "host"; value: string }[];
};

/*
  Old Wix site (www.kdbugs.com) paths mapped to their closest page on the
  rebuild, from the old sitemap.xml, its child sitemaps and the home page nav.

  Each entry emits the bare and trailing-slash source. Next's built-in
  trailing-slash redirect runs ahead of these and already strips the slash, so
  the slash entry is a guard in case `trailingSlash` is ever turned on.

  Specific paths come before the wildcard for their family, since the first
  match wins. Request query strings are passed through automatically.
*/
const legacyPaths: [from: string, to: string][] = [
  // Pages
  ["/about-2", "/community"], // "Faith Focus CDC: Food Pantry Operations"
  ["/blank-1", "/about"], // "About Us"
  ["/blank-2", "/"], // "Ladybug Services", an overview of every offering
  ["/packages", "/events"], // A 4-hour venue rental deal
  ["/portfolio", "/events"], // "Venue Pictures"
  ["/book-online", "/contact"], // Wix Bookings service list
  ["/event-list", "/community"], // "Upcoming Events at The Venue"
  ["/event-space-venue-plantcity", "/contact"], // "Contact Us"
  ["/search", "/"], // Wix site search, no counterpart

  // Wix Bookings service pages
  ["/service-page/ceremonies-elegant-celebrations", "/weddings"],
  ["/service-page/venue-rental", "/events"],
  ["/service-page/led-sign-advertisement", "/events"], // LED sign add-on lives on Events
  ["/service-page/community-partners", "/community"],
  ["/service-page/space-for-fitness-classes", "/contact/event"],
  ["/service-page/:slug*", "/events"],

  // Wix Bookings calendars, where a visitor went to book, so they land on a form
  ["/booking-calendar/venue-rental", "/contact/event"],
  ["/booking-calendar/led-sign-advertisement", "/contact/event"],
  ["/booking-calendar/space-for-fitness-classes", "/contact/event"],
  ["/booking-calendar/community-partners", "/contact"],
  ["/booking-calendar/:slug*", "/contact"],

  // Wix Events. Bingo pages open the Bingo RSVP, which the community page
  // reads from ?event=.
  ["/event-details/b-i-n-g-o-palooza", "/community?event=Bingo"],
  ["/event-details/b-i-n-g-o-palooza-2025-03-31-17-30", "/community?event=Bingo"],
  ["/event-details/b-i-n-g-o-palooza-2025-04-07-17-30", "/community?event=Bingo"],
  ["/event-details/b-i-n-g-o-palooza-2025-04-07-17-30-1", "/community?event=Bingo"],
  ["/event-details/b-i-n-g-o-palooza-2025-04-14-17-30", "/community?event=Bingo"],
  ["/event-details/b-i-n-g-o-palooza-2025-04-21-17-30", "/community?event=Bingo"],
  ["/event-details/ffcdc-b-i-n-g-o-mondays", "/community?event=Bingo"],
  ["/event-details/ffcdc-food-pantry-b-i-n-g-o", "/community?event=Bingo"],
  ["/event-details/your-next-event", "/events"], // "Reserve a space for your event"
  ["/event-details/open-house", "/contact"], // "Come see the venue"
  ["/event-details/:slug*", "/community"], // Past one-off community events

  // Wix Portfolio galleries
  ["/portfolio-collections/:path*", "/events"],
];

const legacyRedirects: Redirect[] = legacyPaths.flatMap(([from, to]) => [
  { source: from, destination: to, permanent: true },
  { source: `${from}/`, destination: to, permanent: true },
]);

const nextConfig: NextConfig = {
  // Drops "X-Powered-By: Next.js", which tells a scanner what to probe for.
  poweredByHeader: false,
  async redirects() {
    return [
      /*
        www to apex, since siteUrl is https://kdbugs.com and the old site
        lived on www. Setting the redirect on the Vercel domain is preferred,
        since it answers before the app runs. This is the fallback if that is
        not set.
      */
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.kdbugs.com" }],
        destination: "https://kdbugs.com/:path*",
        permanent: true,
      },
      ...legacyRedirects,
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      /*
        Long cache for files served straight from /public: photos, logos,
        favicons and the share image. /_next/static is already immutable by
        default and cannot be overridden. This rule only adds Cache-Control, so
        the security headers above still apply to these files.

        These filenames carry no content hash. Replacing a file under the same
        name will not reach returning visitors for up to a year, so give a
        changed asset a new filename. site.webmanifest and HTML are
        deliberately not matched.
      */
      {
        source: "/:path*.:ext(jpg|JPG|jpeg|JPEG|png|PNG|webp|avif|gif|svg|ico|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
