/*
  Canonical site URL, apex rather than www. Used by the sitemap, robots.txt and
  metadataBase, so all three cannot drift apart.
*/
export const siteUrl = "https://kdbugs.com";

export const business = {
  name: "The Ladybug Venue",
  address: {
    street: "603 Elnor Street",
    city: "Plant City",
    state: "FL",
    zip: "33563",
  },
  phone: "(813) 776-5111",
  phoneHref: "tel:18137765111",
  linktree: "https://linktr.ee/ladybugvenue",
};

/*
  Tour booking, handled by Calendly rather than built here.

  A booking system owns availability, double-booking prevention, timezones,
  reschedules, cancellations, reminders and calendar sync. Getting any one of
  those wrong means a tour is missed or double-booked, and the owners could
  not change their own hours without a code change.

  Tours are meant to follow an inquiry, so the owners have the date, guest
  count and package in hand before the visit. The booking page says so.

  Everything keyed off this link stays hidden while it is empty, so there is
  never a dead "Schedule a Tour" link on the site.
*/
export const tourBooking = {
  calendlyUrl: "https://calendly.com/events-kdbugs/30min?primary_color=df8cff",
};

export function isTourBookingEnabled(): boolean {
  return tourBooking.calendlyUrl.trim().length > 0;
}

/*
  Where every form submission is emailed.

  kdbugs.com is not verified in Resend and is not going to be. It does not need
  to be: verification governs the SENDING domain, not the recipient. Mail goes
  out from thedigitalwash.com, which is verified, so it can be delivered to any
  address. See LADYBUG_FROM_EMAIL in .env.example.

  Currently info@ only, per the client. events@kdbugs.com can be added here
  whenever they want it; nothing technical is stopping it.

  LADYBUG_NOTIFY_EMAIL overrides this per environment, which is how a preview
  deploy avoids mailing the owners.
*/
export const notifyRecipients = ["info@kdbugs.com"] as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/weddings", label: "Weddings" },
  { href: "/events", label: "Events" },
  { href: "/baptisms", label: "Baptisms" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/*
  `schedule` is the machine-readable form of `cadence`, and the RSVP form builds
  its list of dates from it (src/lib/community-dates.ts). Change the two
  together. `weeks` limits a weekday to those occurrences in the month, so
  [1, 3] is the 1st and 3rd; leave it out for every week.
*/
export const communityEvents = [
  {
    name: "Bingo",
    cadence: "Every Monday",
    time: "5:30 PM",
    schedule: { weekday: 1 },
    rsvpRequired: true,
  },
  {
    name: "Free Workout Class",
    cadence: "1st and 3rd Saturday",
    time: "11:00 AM",
    schedule: { weekday: 6, weeks: [1, 3] },
    rsvpRequired: true,
  },
  {
    name: "Food Pantry",
    cadence: "1st and 3rd Saturday",
    time: "9:00-11:00 AM",
    schedule: { weekday: 6, weeks: [1, 3] },
    rsvpRequired: false,
    // Run by FFCDC, which keeps its own pantry listing on Vivery.
    link: {
      href: "https://sites.vivery.com/faith-focus-community-development-corp/plant-city-fl/23446",
      label: "Pantry details",
    },
  },
] as const;

/*
  The nonprofit behind the community events. It has no website of its own; the
  client pointed us at its Vivery listing (the old vivery.org address 301s to
  vivery.com).
*/
export const ffcdc = {
  name: "Faith Focus Community Development Corp.",
  href: "https://sites.vivery.com/faith-focus-community-development-corp/plant-city-fl/23446",
} as const;

/*
  A baby shower held at the venue, client-supplied. The first photographs we
  have of a private event in the hall, which is what the Events page sells, so
  they outrank the workout class there: this is the celebration a visitor is
  actually picturing.

  Three portraits, all 3:4. There was a landscape of the whole room leading
  them, removed at the client's request: they felt it looked messy.
*/
export const babyShowerPhotos = {
  backdrop: {
    src: "/events/babyshower/231.jpeg",
    alt: "A baby shower backdrop in the hall, with a pink and white balloon garland around an arch reading Oh Baby and stacked letter blocks beside it",
    width: 600,
    height: 800,
  },
  guests: {
    src: "/events/babyshower/232.jpeg",
    alt: "Guests gathered together in the hall during a baby shower, with the decorated backdrop behind them",
    width: 720,
    height: 960,
  },
  game: {
    src: "/events/babyshower/235.jpeg",
    alt: "Guests playing a blindfolded party game around a small table, with wrapped gifts stacked behind them",
    width: 600,
    height: 800,
  },
} as const;

/*
  Venue photography for the Events page "The Spaces" gallery, the rooms
  empty. Dimensions are the files' real pixel sizes, which lets
  Next reserve the right space before each one loads.
*/
export const venuePhotos = [
  {
    src: "/events/LadybugEvents_Deck.JPG",
    alt: "The outdoor deck in daylight, beside the venue building and bordered by a hedge",
    width: 1440,
    height: 960,
  },
  {
    src: "/events/LadybugEvents_Kitchen.JPG",
    alt: "The venue kitchen, with white cabinets, a wall oven, a range and a refrigerator",
    width: 960,
    height: 1440,
  },
  {
    src: "/events/LadybugEvents_Yard.JPG",
    alt: "The fenced back yard, with mown grass and mature trees along the fence line",
    width: 1440,
    height: 960,
  },
  {
    src: "/events/LadybugEvents_KitchenWindow.JPG",
    alt: "A serving window between the hall and the kitchen, with a long white counter",
    width: 960,
    height: 1440,
  },
  {
    src: "/venue/Ladybug_Outdoor_Deck.jpg",
    alt: "The outdoor deck at dusk, strung with warm string lights along the hedge",
    width: 1920,
    height: 1280,
  },
  {
    src: "/events/LadybugEvents_YardMulch.JPG",
    alt: "A shaded corner of the yard with a small bistro table on red mulch",
    width: 1440,
    height: 960,
  },
] as const;

/*
  A '70s-themed 70th birthday in the hall, from the photographer's gallery the
  client shared (Anthony Carter Photography). Six of sixteen: most of the set
  is guests posed at the same backdrop, so these are the cake, the two widest
  groups and three portraits in different costumes.
*/
export const seventiethPhotos = {
  wide: [
    {
      src: "/events/70birthday/2AC06646.jpg",
      alt: "Two guests in a brown shirt and a blue shirt standing beside the cake table, with a tiered cake and a vase of flowers",
      width: 1440,
      height: 960,
    },
    {
      src: "/events/70birthday/dsc09630.jpg",
      alt: "Four guests in '70s outfits posing together in front of a gold-draped Happy 70th Birthday backdrop",
      width: 1280,
      height: 855,
    },
    {
      src: "/events/70birthday/dsc09682.jpg",
      alt: "A group of guests in '70s-style afros and outfits smiling in front of the birthday backdrop",
      width: 1280,
      height: 855,
    },
  ],
  tall: [
    {
      src: "/events/70birthday/dsc09600.jpg",
      alt: "Two guests in a patterned shirt and a red top striking a pose at the Happy 70th Birthday backdrop",
      width: 721,
      height: 1080,
    },
    {
      src: "/events/70birthday/dsc09664.jpg",
      alt: "Three guests in fringe, bell bottoms and a tie-dye shirt posing at the birthday backdrop",
      width: 855,
      height: 1280,
    },
    {
      src: "/events/70birthday/dsc09640.jpg",
      alt: "A guest in a brown suit and hat speaking into a microphone in front of the birthday backdrop",
      width: 855,
      height: 1280,
    },
  ],
} as const;

/*
  An 80th birthday with an Elvis performer, client-supplied. Both frames are
  the same shape, so they sit as a pair.
*/
export const eightiethPhotos = [
  {
    src: "/events/elvis/elvis-performer.jpg",
    alt: "An Elvis performer in a white and blue jumpsuit singing into a microphone in the hall, beside a 1946 birthday poster",
    width: 462,
    height: 560,
  },
  {
    src: "/events/elvis/80th-birthday-table.jpg",
    alt: "A red-draped gift table under an 80th Birthday banner, with red, black and white balloons around it",
    width: 960,
    height: 1166,
  },
] as const;

/*
  Photos from the free workout class, the only set we have of the venue with
  people in it. Shared because two pages make different arguments from the same
  five frames: Events uses them to show the hall takes any layout, Community
  uses them to show the class itself. Dimensions are the files' real pixel
  sizes so Next can reserve the right space before each one loads.
*/
export const workoutPhotos = {
  hall: {
    src: "/workouts/IMG_1277.JPG",
    alt: "A class standing in rows across the open indoor hall, with the kitchen serving window behind them",
    width: 1920,
    height: 1280,
  },
  deck: {
    src: "/workouts/IMG_1269.JPG",
    alt: "A fitness class spread out across the outdoor deck under the string lights, with the fenced yard behind them",
    width: 1920,
    height: 1280,
  },
  backdrop: {
    src: "/workouts/IMG_1286.JPG",
    alt: "Class members gathered in front of the backdrop while the instructor leads from the front",
    width: 1920,
    height: 1280,
  },
  group: {
    src: "/workouts/ee8f9613-a18e-46f6-a46b-f9f0a7d62b68.jpg",
    alt: "The whole class posing together in front of a branded backdrop at the end of a session",
    width: 825,
    height: 1240,
  },
  instructor: {
    src: "/workouts/IMG_1276.JPG",
    alt: "An instructor speaking into a microphone in front of the venue's branded backdrop",
    width: 1280,
    height: 1920,
  },
} as const;

/*
  Wedding packages, from the client's "Small Weddings" one-sheet.
  Prices are starting points, not fixed quotes.
*/
export const weddingPackages = [
  {
    name: "Venue-Only Rental",
    startingPrice: 1650,
    guests: "Up to 100 guests",
    access: "8:00 AM to 11:00 PM",
    summary:
      "The indoor and outdoor spaces are yours for the day. Bring the vendors you already want to work with.",
    includes: [
      "Indoor and outdoor venue access",
      "Flexible set up and decorating",
      "Bring your own vendors",
    ],
    addOns: [],
  },
  {
    name: "All-Inclusive Package",
    startingPrice: 3000,
    guests: "50 to 70 guests",
    access: "8:00 AM to 11:00 PM",
    summary:
      "The essentials are already booked and coordinated, so the planning is mostly done before you start.",
    includes: [
      "Catering, flatware, serveware, and kitchen access",
      "Photographer",
      "Non-denominational Christian officiant",
      "Surround sound with Bluetooth connectivity",
    ],
    addOns: ["Professional bar service"],
  },
] as const;

export const weddingGuestRange = "30 to 100 guests";

export const eventPricing = {
  indoorOnly: 500,
  indoorAndOutdoor: 775,
};

/*
  Private event rentals. Both prices are client-confirmed. Guest counts and
  access hours are deliberately absent: the only figures we have for those come
  from the wedding one-sheet and have not been confirmed for private events.
*/
export const eventPackages = [
  {
    name: "Indoor Only",
    price: eventPricing.indoorOnly,
    summary:
      "The indoor hall on its own, laid out however suits your celebration.",
    includes: [
      "The indoor hall",
      "Customizable layout",
      "Kitchen area access",
    ],
  },
  {
    name: "Indoor & Outdoor",
    price: eventPricing.indoorAndOutdoor,
    summary:
      "Adds the outdoor deck and yard, so your guests can move between the two.",
    includes: [
      "Everything in the indoor rental",
      "The outdoor deck and yard",
      "String lighting after dark",
    ],
  },
] as const;

// The client's own lists, from their 2026-09 round of revisions.
export const venueAmenities = [
  "Ample on-site parking",
  "Tables + chairs",
  "ADA restrooms",
  "Kitchen access",
  "Customizable layouts",
] as const;

// Catering through bartender added in the 2026-10 round; the client expects to
// add more vendors as they make connections.
export const venueAddOns = [
  "AV equipment",
  "Outdoor LED signage",
  "Catering supplies",
  "Catering",
  "Photography",
  "Floral arrangements",
  "Wedding planner",
  "Bartender",
] as const;

// What the vendor partnership form offers. Validated against server-side too.
export const vendorCategories = [
  "Photographer",
  "Videographer",
  "Florist",
  "Band or DJ",
  "Caterer",
  "Baker",
  "Bartender",
  "Decor or Rentals",
  "Hair and Makeup",
  "Officiant",
  "Other",
] as const;

export const eventTypes = [
  "Birthday parties",
  "Baby showers",
  "Baptism receptions",
  "Corporate gatherings",
  "Community events",
] as const;

export const ledSignRental = {
  price: 75,
  description:
    "LED sign rental for the front of the venue, running from 3 days before your event through the event's close.",
  photo: {
    src: "/events/LEDLight.jpg",
    alt: "The venue's roadside sign on black posts, with The Ladybug Group Event Space logo above a blank message board, facing the street",
    width: 1440,
    height: 1080,
  },
};

export const aboutCopy = {
  heading: "About Us",
  paragraphs: [
    "Welcome to The Ladybug Venue, where we bring your events to life! We are passionate about providing a welcoming and affordable event space that caters to a variety of needs. Whether you're hosting a birthday party, corporate gathering, or a community event, our venue offers the perfect setting to make your occasion special.",
    "At The Ladybug Venue, we understand the challenges of hosting events at home, from space constraints to parking limitations. That's why we've created a spacious and versatile venue designed to accommodate your needs with ease. Our location features ample parking, ensuring that your guests have a hassle-free experience from the moment they arrive.",
    "Our facility is equipped with a range of amenities to enhance your event, including state-of-the-art audiovisual equipment, comfortable seating, and customizable layouts. We pride ourselves on offering a space where you can celebrate without the stress of logistics, allowing you to focus on creating memorable moments.",
    "We're committed to providing exceptional service and value, making high-quality event spaces accessible to everyone. Come visit us and see how The Ladybug Venue can be the perfect backdrop for your next gathering. Let us help you turn your vision into reality, without the constraints of hosting at home or breaking the bank.",
  ],
};
