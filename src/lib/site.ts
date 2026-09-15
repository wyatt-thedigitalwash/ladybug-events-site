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
  Call booking, handled by Calendly rather than built here.

  A booking system owns availability, double-booking prevention, timezones,
  reschedules, cancellations, reminders and calendar sync. Getting any one of
  those wrong means a call is missed or double-booked, and the owners could
  not change their own hours without a code change.

  Calls are meant to follow an inquiry, so the owners have the date, guest
  count and package in hand before they pick up. The booking page says so.

  Everything keyed off this link stays hidden while it is empty, so there is
  never a dead "Schedule a Call" link on the site.
*/
export const callBooking = {
  calendlyUrl: "https://calendly.com/events-kdbugs/30min?primary_color=df8cff",
};

export function isCallBookingEnabled(): boolean {
  return callBooking.calendlyUrl.trim().length > 0;
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

export const communityEvents = [
  {
    name: "Bingo",
    cadence: "Every Monday",
    time: "5:30 PM",
    rsvpRequired: true,
  },
  {
    name: "Free Workout Class",
    cadence: "1st and 3rd Saturday",
    time: "11:00 AM",
    rsvpRequired: true,
  },
  {
    name: "Food Pantry",
    cadence: "1st and 3rd Saturday",
    time: "9:00-11:00 AM",
    rsvpRequired: false,
  },
] as const;

/*
  A baby shower held at the venue, client-supplied. The first photographs we
  have of a private event in the hall, which is what the Events page sells, so
  they outrank the workout class there: this is the celebration a visitor is
  actually picturing.

  One landscape and three portraits. Grouped by orientation when laid out, the
  same rule the other galleries follow.
*/
export const babyShowerPhotos = {
  room: {
    src: "/events/babyshower/233.jpeg",
    alt: "The indoor hall laid out with cloth-covered tables and folding chairs, guests seated throughout during a baby shower",
    width: 800,
    height: 600,
  },
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
    addOns: ["Professional bar service, TB Mixology recommended"],
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

// The client's own words, from the About copy and the wedding package sheet.
export const venueAmenities = [
  "Ample on-site parking",
  "Audiovisual equipment",
  "Comfortable seating",
  "Customizable layouts",
  "Kitchen area access",
  "Surround sound with Bluetooth",
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
