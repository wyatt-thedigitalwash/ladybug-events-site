import Image from "next/image";
import HiddenLadybug from "@/components/motifs/HiddenLadybug";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import ShellSpots from "@/components/motifs/ShellSpots";
import { weddingGuestRange, weddingPackages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Weddings",
  description:
    "Intimate weddings in Plant City, FL. Venue-only rental starting at $1,650 and all-inclusive packages starting at $3,000, for 30 to 100 guests.",
};

const priceFormat = new Intl.NumberFormat("en-US");

export default function WeddingsPage() {
  return (
    <>
      <PageHero
        bug="bottom-right"
        title="Your Wedding Day, Your Way"
        description={`Intimate weddings for ${weddingGuestRange}, indoors and out. Rent the venue on its own, or let us handle the essentials with an all-inclusive package.`}
      />

      <section data-bg="light" className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {weddingPackages.map((pkg, i) => (
              <div
                key={pkg.name}
                className="flex flex-col overflow-hidden rounded-3xl border border-foreground/15 bg-background"
              >
                {/* The name and the price share a shell surface, so the number
                    a visitor is scanning for sits on its own ground. Same
                    curved underside and markings as the offering cards. */}
                <div className="shell-band relative bg-tint px-8 pt-8 pb-12 md:px-10 md:pt-10 md:pb-14">
                  <ShellSpots variant={i} clearOfText />
                  <h2 className="relative text-2xl font-semibold text-foreground">
                    {pkg.name}
                  </h2>
                  <p className="relative mt-5 text-sm text-foreground/85">
                    Starting at
                  </p>
                  <p className="relative text-4xl font-semibold tabular-nums text-foreground">
                    ${priceFormat.format(pkg.startingPrice)}
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-8 pt-6 md:p-10 md:pt-7">
                <dl className="space-y-2.5 text-base">
                  <div className="flex gap-3">
                    <dt className="w-32 shrink-0 text-foreground/85">Guests</dt>
                    <dd className="font-medium text-foreground">{pkg.guests}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-32 shrink-0 text-foreground/85">
                      Venue access
                    </dt>
                    <dd className="font-medium tabular-nums text-foreground">
                      {pkg.access}
                    </dd>
                  </div>
                </dl>

                <p className="mt-6 text-base leading-7 text-foreground/85">
                  {pkg.summary}
                </p>

                <p className="mt-8 text-base font-semibold text-foreground">
                  What&apos;s included
                </p>
                <ul className="mt-4 space-y-3">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-6">
                      <Check
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-secondary-accent"
                      />
                      <span className="text-foreground/85">{item}</span>
                    </li>
                  ))}
                </ul>

                {pkg.addOns.length > 0 && (
                  <p className="mt-auto pt-8 text-sm text-foreground/85">
                    Add on: {pkg.addOns.join(", ")}.
                  </p>
                )}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 rounded-2xl border border-dashed border-foreground/20 px-6 py-5 text-center text-sm leading-6 text-foreground/85">
            Both packages include the indoor chapel and the outdoor space, from
            8:00 AM until 11:00 PM. Prices are starting points and depend on
            your date and guest count.
          </p>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
            {[
              {
                src: "/venue/Ladybug_Chapel.jpg",
                alt: "Inside the chapel, with wooden pews lined with white flowers leading to a cross at the front",
              },
              {
                src: "/venue/Ladybug_Outdoor_Deck.jpg",
                alt: "The outdoor deck at dusk, strung with warm string lights along a hedge",
              },
            ].map((photo) => (
              <li
                key={photo.src}
                className="relative aspect-[4/3] overflow-hidden rounded-3xl"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 45vw, 90vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-bg="light" className="relative pb-20 md:pb-24">
        <HiddenLadybug at="left" />
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-3xl bg-tint p-8 text-center md:p-10">
            <h2 className="text-2xl font-semibold text-foreground">
              Why Choose an All-Inclusive Wedding?
            </h2>
            <p className="mt-4 text-base leading-7 text-foreground/85">
              Our team handles the essentials so you can focus on celebrating.
              With trusted vendors and a beautiful venue already coordinated,
              planning is simple and seamless.
            </p>
          </div>

          <p className="mt-8 text-center text-sm leading-6 text-foreground/85">
            Our officiant is non-denominational, though ceremonies held in the
            chapel itself follow a Christian format. Reach out with any
            questions about ceremony options.
          </p>
        </div>
      </section>

      <CtaBand
        title="Come See the Space"
        href="/contact/wedding"
        cta="Inquire About Your Wedding"
      >
        Send us your date and guest count and we&apos;ll follow up with
        availability, a quote, and a tour time.
      </CtaBand>
    </>
  );
}
