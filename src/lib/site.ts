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
