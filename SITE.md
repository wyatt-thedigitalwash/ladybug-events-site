# ladybug-events Website Reference

## Business Info
- Business Name: The Ladybug Venue (confirmed by client). Note: the About copy client provided uses "The Ladybug Group" in two places instead — treat that as a copy inconsistency to normalize to "The Ladybug Venue" when the About page is written, unless client says otherwise. Legacy domain is kdbugs.com; Linktree handle is `ladybugvenue`.
- Industry: Event venue (weddings, private events, community programming)
- Location: 603 Elnor Street, Plant City, FL 33563
- Phone: (813) 776-5111
- Email: TBD — not provided (client only gave phone)
- Website URL: TBD (new build; legacy site kdbugs.com has no usable content to migrate)
- Google Business Profile: exists (https://share.google/GcWXxuCbT5ZrmLjaJ), but is owned/managed by a friend of the client, not the client directly. Client does not need admin access. Confirm whether the site needs anything from the GBP (map embed, reviews) that would require that friend's cooperation.
- Existing Linktree: https://linktr.ee/ladybugvenue (has an existing RSVP link for community events that "kind of sucks" per client — site should replace it)
- No other social profiles — client confirmed nothing beyond the Linktree should be linked.

## Positioning
LadyBug Events is a family-run event venue (owned and operated by a group of sisters) offering full-venue and budget-friendly all-inclusive wedding packages, private event rentals (birthdays, baby showers, baptisms), and free community programming (bingo, workout classes, food pantry). Differentiator: an affordable, all-inclusive alternative to typical wedding venues, with the option to rent the whole property (indoor + outdoor) or scale down to a small, budget-conscious package with vendors bundled in.

## Brand Voice
(Tone rules, vocabulary preferences, things to avoid — TBD, no source material yet. Client's own notes are casual/informal; final site copy should still follow house style: no em dashes, semantic HTML, etc. per CLAUDE.md.)

## Visual Direction
(2 to 4 specific reference points: brands, magazines, design eras. Anti-patterns to avoid for this specific project. — TBD, not covered in client brain dump.)

## Colors
- Background: #FEFEFE
- Primary Text: #665054 (muted mauve-brown)
- Accent: #BDB069 (gold/olive) — explicitly labeled "accent" by client
- Secondary Accent: #517083 (slate blue)
(Mapping of Primary Text vs. Secondary Accent inferred from the order client gave them — confirm before finalizing if it matters visually.)

## Typography
- Display Font: Playfair Display (Google Fonts) for headings h1-h3 and the navbar logo, loaded via next/font in layout.tsx
- Body Font: TBD — same, pending logo
- Sizing scale for hero, section headers, body: TBD

## Events & Baptisms Content
Events and Baptisms were built out from client-confirmed facts only.
- `eventPackages` carries the two rentals; both prices are client-confirmed. Guest counts and access hours are deliberately absent, since the only figures for those come from the wedding one-sheet and have not been confirmed for private events.
- `venueAmenities` is the client's own wording, taken from the About copy and the wedding package sheet.
- Baptisms uses the chapel photo and routes pricing to the Events page rather than restating it, so there is one place to update.
- Photo usage: chapel on the home hero, Weddings and Baptisms; outdoor deck at dusk on Weddings and in the Events gallery; the five `public/events/` photos in the Events "The Spaces" gallery; the baptismal pool on Baptisms.
- The Events gallery uses CSS columns, not a grid. The photos mix portrait and landscape and this keeps each at its own proportions instead of cropping them all to a shared box.
- The venue has a tiled baptismal immersion pool with a painted mural. This surfaced from a client photo, not from the brief, and it changes what the Baptisms page can claim: the baptism itself can happen on site, not only the reception. Worth confirming with the client whether the pool is in service and what preparation it needs, since the page now says to ask.

## Wedding Pricing
The package name and price sit on a shell surface, the same curved underside and markings as the offering cards, so the number a visitor is scanning for has its own ground. Spots pass `clearOfText` there, which keeps them to the right of the type; the full-width arrangement is built for a band whose only occupant is an icon.
`ShellSpots` holds the arrangements and is shared by `ShellBand` and the wedding header, so the markings stay one design.

From the client's "Small Weddings" one-sheet (Ladybug Event Venue Small Weddings-2.pdf), stored in `weddingPackages` in src/lib/site.ts.
- Venue-Only Rental: from $1,650, up to 100 guests, 8:00 AM to 11:00 PM. Indoor and outdoor access, flexible set up and decorating, bring your own vendors.
- All-Inclusive Package: from $3,000, 50 to 70 guests, same hours. Catering with flatware, serveware and kitchen access; photographer; non-denominational Christian officiant; surround sound with Bluetooth. Professional bar service is an add-on.
- Overall range advertised as 30 to 100 guests. Prices are starting points, not quotes.
- Open question for the client: the one-sheet brands the business as "The Ladybug Group Event Space" while the site uses "The Ladybug Venue". Confirm which is correct before launch.

## Ladybug Motif
Approved 2026-09-09. Two treatments, both inline SVG, no image files.
- Hidden ladybug: one small line-art ladybug in ladybug red tucked into a section's background (`HiddenLadybug`), at a different spot per page. Every page hero has one; the home What We Host and community sections, the weddings closing section and the events pricing section have one too. Hidden below the 768px breakpoint. Keep it sparse and always clear of content.
- No decorative dividers or rules under headings.
- Shell band (`ShellBand`): card header panel in the #F4EEEB tint whose underside curves like a ladybug's back (`.shell-band`), marked with five spots, one of them ladybug red at 50% opacity. Four arrangements rotate across the cards so no two bands are identical; every arrangement keeps the same rules, five spots, sizes 20 to 34, exactly one red, and the red sits in a different quadrant on each card.
- Spot size follows a real ladybug, roughly a fifth of the shell's height. They were a twelfth of it and read as dust rather than markings, and vanished at phone width. Tonal spots sit at 10% since larger spots cover about four times the area.
- Spots run the full width of the band. The medallion is bottom-left, so anything past 68% from the right must keep `top + size` at or under 64 to clear it at every card width. The card icon sits in a white medallion straddling the curve. Used on the four home offering cards. A card using it must be `overflow-hidden` with no padding of its own, and its content needs `pt-14` to clear the medallion.
- Watermark: large outline ladybug at 8% opacity cropped into the bottom-right corner of the tinted CTA band (`CtaBand`).
- Ladybug red #A8463F is reserved for the ladybug motif and for card hover states. Hover borders use `ladybug/50` so they match the red spot exactly; the Learn more link uses full strength for legibility. Never use red for resting-state buttons, links, or body text.
- Set ladybug transparency with an `opacity` class on the element, never an alpha color like `text-foreground/10`. Per-stroke alpha compounds where strokes meet and prints those joints darker than the rest of the drawing.
- CTA band tint is #F4EEEB.
- Every card and tinted block needs an opaque background so the dots do not show through. Use `bg-background`, or the solid tokens `bg-surface-accent`, `bg-surface-slate`, `bg-surface-slate-strong`.
- No dot texture on section backgrounds. It was removed at the client's request; do not reintroduce it. The dots inside the card shell bands are a separate thing and stay.
- Nothing over the home hero photo, and nothing in the footer.

## Events Page Photography
Two galleries, answering different questions.
- "The Spaces" is the rooms empty: hall, kitchen, deck, yard. Three-column masonry on the page ground.
- "The Space in Use" is the venue full of people, from the free workout class. It is the only set showing the hall and deck actually in use, so it carries the point that the room is an open floor rather than a fixed layout. Files live in `public/workouts/`.
- The in-use set is laid out by orientation, not run through the masonry: three landscapes in a row of three, then the two portraits in a row of two held to `max-w-3xl`. Three landscapes and two portraits cannot balance across masonry columns at any ordering, and the shortfall showed as a column of empty space. Matching shapes per row fill evenly and crop nothing, which matters when the subjects are people.
- The portraits are held to a narrower measure because at a third of the page each one stands taller than the whole row above it.
- Both rows sit in fixed-width containers past their breakpoint, so `sizes` names the pixel width rather than a vw fraction. A vw hint understated the box and the optimizer shipped a visibly soft image.
- The section closes with a line linking to the community page, since these are the free workout class and the photos would otherwise raise a question the page does not answer.

## Container Widths
One width per kind of content, so two pages showing the same thing line up.
- Card grids: `max-w-6xl`. Weddings and Events both run the two-up shell-band pricing card, and the Events gallery sits under its own cards, so all three share an edge.
- Prose beside a photo: `max-w-5xl`. Baptisms and Community. A narrower measure reads better when the column is mostly text, and these are not cards.
- Centered notes and single accents: `max-w-3xl`, with the intro line inside them at `max-w-2xl`.
- Home is the exception at `max-w-7xl`, per the client's request for those two sections to run wider than the rest.
- This was wrong until it was caught: Events sat at 5xl for its cards while Weddings sat at 6xl, and the Events gallery was already 6xl, so the photos ran wider than the cards above them on the same page. The pages were built at different times rather than to a rule.

## Event Cards
`EventCard` is the outlined card style: same fill as the page, separated by a border only.
- Border `foreground/15` on the card. No internal dividers; space separates the schedule from the action.
- Hierarchy carries the card since there is no fill: the event name is largest in the display font, then cadence and time read as a label over its value. The time uses `tabular-nums` so times align across the row.
- The card sets `h-full w-full` so it fills its grid column whatever wrapper it sits in.
- The action row keeps a minimum height so a button on one card lines up with a line of text on another.
- Shared by the home community section and the community page, which passes a different action and `headingLevel={2}`.

## Footer
- Links are grouped by intent ("What we host", "The venue") rather than mirroring the navbar. One flat list of every page made a tall lonely column with dead space beside it.
- The phone is the largest element after the logo, in the display font. It is the fastest way to reach a small venue.
- The address links to Google Maps; Linktree is an outlined pill rather than a bare link.
- Carries the light logo and a second ladybug (`LadybugFlying`) at 5%, wings open and drawn as filled shapes with the spots masked out. Deliberately not the outline mark: a solid silhouette holds together better at watermark opacity, and the footer should not read as a repeat of the band above it.
- That watermark sits bottom-left. The CTA band's sits bottom-right on the section directly above, so the two never land near each other.
- No spot texture in the footer; that was removed deliberately.
- Light text needs 70% opacity or more on the #665054 ground to clear the 4.5:1 minimum. Body copy sits at 80%, headings at 70%.

## Dashed Pill
A dashed-outline paragraph used for asides secondary to the page's main job: the cross-links on Contact and Community, and the pricing footnotes on Weddings and Events. It spans the full width of the content it sits under, no max-width of its own. `rounded-2xl border border-dashed border-foreground/20 px-6 py-5 text-center text-sm text-foreground/85`.

## Card Hierarchy
Three weights of card, so the treatment says how important the choice is.
- Shell band plus medallion: home offering cards only. This is the most decorated surface on the site; do not reuse it elsewhere or it stops meaning "what we host".
- Medallion only, no band: the two Contact inquiry cards. Same icon language, lighter, and it keeps them visually distinct from the home Weddings and Events cards, which link to information pages rather than forms.
- Outlined `EventCard`: community events.
All three share the same red hover on the border and link.

## Community RSVP Flow
The community event cards are the RSVP picker; there is no event dropdown.
- Clicking RSVP on a card opens the form in a dialog with that event already set via a hidden field. Same component and same behaviour on the home section and the community page.
- Built on the native `<dialog>` with `showModal()`, which brings focus trapping, Escape to close, an inert background and the top layer with it. Escape, the close button and a backdrop click all dismiss it.
- The dialog needs `m-auto`. Tailwind's reset zeroes the margin browsers rely on to centre a modal, which otherwise pins it to the top-left.
- The form is remounted on each open so a previous submission's message never greets the next visitor.
- Open and close are animated with keyframes keyed off a `data-state` attribute, not CSS transitions with `@starting-style`. The close is sequenced in JS: `requestClose` sets `data-state="closing"`, and `close()` only runs on `animationend` (with a 400ms fallback). Calling `close()` directly removes the element on the first frame and the exit is never seen. Escape is intercepted via `onCancel` so it animates rather than closing instantly.
- `/community?event=<name>` still opens that event's dialog on arrival, for links from elsewhere.
- One form instance for the whole site. `RsvpForm` requires an `event` prop.

## Logo Files
`public/brand/ladybug-group-logo.svg` and `.png`, both transparent, plus `-light` variants for dark grounds.
- The light variant is the same geometry with four fills swapped: wordmark, body, legs and trail to #FEFEFE; script and "Event Space" to #D5E2E8; wing panels to #9DBAC6; spots to #E3D78D.
- The wings get their own tint rather than sharing the script's. On a photo a white body against near-white wings collapsed the insect into a blob.
- Used as the home hero heading, inside the `h1` with the business name as alt text, so the heading still has a readable name for search and screen readers.
- Also the navbar mark. Both variants render stacked and cross-fade with the bar's own colour transition: dark on the solid bar, light while the bar is transparent over the hero.
- Both files had their viewBox trimmed to the artwork. The original canvas was 21% empty at the top and 17% at the bottom, which shrank the mark in any fixed-height box. Aspect is now 2.70, not 1.88.
- Vector-traced from the client's 685x365 PNG, not the designer's original artwork. All 12 ladybug spots and every letterform are reproduced; the only loss is anti-aliased edge softness, which a vector cannot carry.
- Traced in two separate decisions: nearest-palette match for ink versus background, which puts edges at 50% coverage and keeps thin strokes at true weight, then warm versus cool for which ink colour. Deciding both at once recoloured the faint "est: 2021" from brown to teal, because faint brown desaturates toward neutral grey and neutral grey sits nearer teal in plain RGB.
- Accent spot colours are gated to the insect's bounding box. Left global they also matched anti-aliased blends on the dashed trail and the ladybug's legs, printing them olive.
- 35 faint joins are restored explicitly. Nearest-palette classification cuts at 50% ink coverage, but the script's thinnest connecting strokes sit near 35%, so strokes continuous in the original arrive split. The build finds only the pixels that reconnect two separated parts (59 of them) and paints those back. Lowering the threshold or dilating would have fixed it too, at +23% ink across the whole mark instead of +0.8%.
- Each colour mask is Gaussian blurred (radius 4 at 8x) and re-thresholded before tracing. Without it potrace follows the source's pixel grid and the cursive strokes come out visibly lumpy at high zoom.
- Strokes carry about 18% more ink than the source measures. That is not a bug to chase: the source's hairlines are single pixels at partial opacity, and a vector has to render them as solid thin strokes. Every attempt to match the ink mass exactly broke those hairlines into dashes, which is far worse. Topology was checked by counting connected components: source has 10 in the script, and so does the shipped trace.
- The insect is stacked the way the artwork is built: solid body, wing panels over it, spots on top. Each layer's holes are filled rather than unioned with the layer above; unioning pulled the spot discs into the wing outline and left the panel ragged where a disc sat near its edge.
- The insect gets a lighter blur than the rest of the mark. Its features are a few source pixels across and the radius that smooths the long script curves rounds them into blobs. Each colour mask is blurred independently before tracing, which shrinks a small disc while widening the hole cut for it, so layers that merely abut left the page showing through as a white ring around every spot.
- Every spot is one khaki, #BAB055. The apparently green ones are yellow dots four pixels across with the blue wing bleeding into them. Tracing them as two colours produced a muddy olive insect.
- Spots are detected by green beating blue (`g - b > 20`), not by `min(r,g) - b`. The latter collapses on the darker green spots, whose red is low: one scored +11 against a threshold of 30, fell through to the body colour, and left a maroon hole in the lower wing. On `g - b` every spot scores +43 or better while body, wing, legs and antennae all sit at -4 or below. All 14 spots verified present and within 3px of their source positions.
- Colors pulled from the source: brown #5E4449, teal #4A636A, gold #C6BC54, green #9DAA55. Note these differ from the site palette's #665054 and #517083.
- The insect is no longer traced from the logo PNG. At the size it sits in the mark it is only a few dozen pixels across, and every pass at it produced a round upper wing fused to the body and a blocky rectangle for the lower one. The client supplied a large clean rendering of the same bug, and that is traced on its own at 470x460 and dropped into the footprint the old insect occupied, scaled uniformly and centred on the same point. Nothing else in the mark was touched.
- Fitting is uniform scale, not stretch. The reference bug is 1.03 wide to tall and the old insect's footprint was 1.08, so the new one is fitted inside that box rather than filled to it. Filling would have widened the body by 5% to save 20 units of whitespace.
- Its base layer is the whole silhouette, not just the pixels that read dark. Wings and spots paint over it, so no two layers ever meet edge to edge and no white seam can open between them. Layers that abutted were the cause of the white rings and the gap that followed the wing outline.
- The wings are eroded about a pixel and a half, then the spots are unioned back into them. The teal bleeds past the reference's dark rim, but eroding alone bit a notch out of the wing wherever a spot ran up against that rim.
- Only the two largest teal regions are kept. Each antenna tip carries a halo of teal-ish antialiasing that hole-filling turns into a solid disc, which printed a teal ring around both tips.
- Verified by measurement, not by eye: 13 spots in the reference and 13 in the trace, every centroid within 2px, and the two wing areas within 3% and 10%. The remaining spread is the reference's own blur, which nearest-palette sampling reads smaller than the art draws.
- Still to get from the client: the original vector file (.ai, .eps, or .svg) for a truly exact mark, and a light variant, since the dark logo nearly disappears on the brown footer.
- In use in the navbar, the home hero and the footer.

## Logo
Client confirmed they have the final logo but has not sent the file yet. Fonts and Visual Direction are blocked on receiving it.

## Pages
- [ ] Home
- [ ] Weddings (regular full-venue weddings + small all-inclusive package, see Services below)
- [ ] Events (birthdays, baby showers, general private rentals)
- [ ] Baptisms
- [ ] Community Events (bingo, free workout classes, food pantry)
- [ ] About (the sisters who own the venue)
- [ ] Contact / Inquiry (two separate inquiry flows, see CTAs below)
- [ ] (add as needed)

## CTAs
- Primary: Event inquiry form — **two distinct flows**:
  1. Wedding inquiry flow — should feel more upscale/"fancier" (contact info, event date/time, indoor/outdoor/both, tour availability, etc.)
  2. General event inquiry flow — simpler, for birthdays/baby showers/etc. (same core fields, less formal presentation)
- Secondary: RSVP for community events (bingo, workout classes) — needs to notify both owners by email on submission. Food pantry does not require RSVP.

Client's guidance on both the inquiry form and RSVP system: no existing system to match/migrate, "just build this out, and then we will connect down the road" — build a first version now, expect follow-up refinement/integration later rather than trying to nail every detail up front.

## Content Status

### Text Content
- [x] About page group photo: delivered, `public/owners/LadybugEvents_Owners.JPG`, 1600x1200. The four sisters outdoors in winter coats by a lake. Shown at its native 4:3 in the narrower column, which sticks to the top on desktop: the copy runs to four full paragraphs and a fixed photo left a column of empty space beside three of them. Not marked priority, since it sits below the fold and would compete with the hero.
- [x] Business bio / owner bio: client provided full About Us copy (see below) — no individual sister bios exist ("we don't have"), so About page is group photo + group blurb only, not individual profiles
- [ ] Service descriptions: partial, from client brain dump (see Notes below), needs client review/polish
- [ ] Testimonials: none provided
- [x] About page copy: received from client, needs light copyedit (fix "y our" typo, normalize "Ladybug Group" → "Ladybug Venue")
- [ ] Contact form auto-reply: not started

### Visual Content
- [ ] Logo files (final version in /public): client has it, has not sent the file yet
- [ ] Owner portrait: client will only provide ONE photo — the sisters together, no individual portraits
- [ ] Gallery/work photos: venue photos available; workout class photos available; wedding photos NOT allowed to be used per client policy (use venue-only shots for weddings); event (birthday/baby shower) photos: confirmed none, page should stay photo-light; baptism photos: available/uploaded per client
- [ ] Service-specific images: partial, see above
- [ ] OG image: not started

### Business Info Confirmed
- [x] Address confirmed: 603 Elnor Street, Plant City, FL 33563
- [x] Phone number confirmed: (813) 776-5111
- [ ] Email confirmed: not provided
- [ ] Hours confirmed: partial — recurring community event times known (see Notes below). Client's answer to "anything else recurring, or seasonal changes?" was just "Yes" with no detail — needs a follow-up question, don't assume which part they meant.
- [x] Social profiles confirmed: Linktree only (https://linktr.ee/ladybugvenue), client confirmed no other socials to link

### Integrations
- [ ] Resend domain verified: not started
- [ ] Google Analytics installed: N/A yet
- [ ] Google Search Console verified: not started
- [ ] Google Business Profile linked: exists, managed by a friend of the client (not the client). Not linked yet.
- [ ] RSVP capture for Bingo + Workout Classes: needs a form that emails both owners on each submission (replacing current Linktree RSVP link)
- [ ] Event inquiry form: two distinct flows (wedding vs. general event), needs server-side validation per Code Rules
- [ ] LED sign rental add-on ($75, runs 3 days pre-event through event close): needs to be represented somewhere, likely as an add-on within the inquiry flow or a dedicated line item on the Events/Weddings page

### Blocking Items for Launch
- Logo file not yet delivered — also blocks font/typography decisions
- Email address not yet provided
- Hours follow-up: client's "Yes" answer to whether other recurring hours exist or hours change seasonally needs a clarifying re-ask
- GBP is managed by a third party (client's friend), not the client — confirm if the site needs anything from it that requires that person's involvement

### Nice-to-Have (Post-Launch)
- Embedded/automated RSVP system nicer than the current Linktree link (explicitly requested, may be v1 not post-launch, confirm priority with client)

## Notes
- Client's brain dump was informal/unstructured ("brain dump" per client) — treat all pricing and policy details below as needing client confirmation before publishing, not as final copy.
- Weddings: two tiers.
  - Regular weddings: whole venue rental, indoor + outdoor spaces.
  - Small all-inclusive weddings: budget-friendly option, vendors bundled in (servewear, flatware, kitchen area, catering, photographer, officiant), with some add-ons available (e.g. bar service).
  - Officiant is nondenominational, but only Christian ceremonies are permitted in the chapel specifically ("no other gods in the chapel" per client, phrase this carefully/diplomatically in final copy).
  - Bluetooth surround sound available.
  - Bar service available, client recommends TB Mixology as a vendor.
  - IMPORTANT: No photos from actual weddings held at the venue may be used anywhere on the site — use general venue photography only for the Weddings page.
- Events (birthdays, baby showers, etc.): client has no usable photos for this category. Pricing given: $500 indoor only, $775 indoor + outdoor.
- Baptisms: photos available/uploaded from client.
- Community events (recurring, free, RSVP required unless noted):
  - Bingo: Mondays, 5:30 PM, RSVP required.
  - Free workout classes: 1st and 3rd Saturdays of each month, 11:00 AM, RSVP required.
  - Food pantry: 1st and 3rd Saturdays of each month, 9:00-11:00 AM, no RSVP mentioned.
- LED sign rental (out front): $75, runs from 3 days before the event through the event's close.
- About page: venue is owned by a group of sisters. Client is only providing ONE photo (the sisters together, no individual portraits/names). Client declined to write a custom blurb ("just generate one") and instead supplied ready-made About Us copy — see below. Needs light copyedit before publishing (fix "y our" → "your", normalize "The Ladybug Group" to "The Ladybug Venue" for consistency with the confirmed business name).

### About Us copy (client-provided, verbatim except noted typo)
> Welcome to The Ladybug Group where we bring your events to life! We are passionate about providing a welcoming and affordable event space that caters to a variety of needs. Whether you're hosting a birthday party, corporate gathering, or a community event, our venue offers the perfect setting to make your occasion special.
>
> At The Ladybug Group, we understand the challenges of hosting events at home, from space constraints to parking limitations. That's why we've created a spacious and versatile venue designed to accommodate your needs with ease. Our location features ample parking, ensuring that your guests have a hassle-free experience from the moment they arrive.
>
> **Versatility** — Our facility is equipped with a range of amenities to enhance your event, including state-of-the-art audiovisual equipment, comfortable seating, and customizable layouts. We pride ourselves on offering a space where you can celebrate without the stress of logistics, allowing you to focus on creating memorable moments.
>
> We're committed to providing exceptional service and value, making high-quality event spaces accessible to everyone. Come visit us and see how The Ladybug Venue can be the perfect backdrop for your next gathering. Let us help you turn your vision into reality, without the constraints of hosting at home or breaking the bank.

- Legacy site kdbugs.com has no content worth reusing — building from scratch.
- Pricing/policy confirmed accurate by client: Events pricing ($500 indoor / $775 indoor+outdoor), chapel/officiant wording direction, and LED sign rental ($75, 3 days pre-event through close). No specific wedding package pricing given — site should route wedding inquiries to "contact for a quote" rather than publish a price.
