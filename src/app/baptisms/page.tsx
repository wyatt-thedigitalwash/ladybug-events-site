import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import HiddenLadybug from "@/components/motifs/HiddenLadybug";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { eventPricing, venueAmenities } from "@/lib/site";
import { pageMetadata, seoPages } from "@/lib/seo";

export const metadata = pageMetadata(seoPages.baptisms);

const steps = [
  {
    title: "The baptism",
    body: "The pool sits a few steps from the chapel, so the baptism itself and the service around it happen in the same building.",
  },
  {
    title: "The reception",
    body: "Move straight into the hall afterwards. No second location, no driving between the two, no gap in the day for guests to fill.",
  },
  {
    title: "The setup",
    body: "Tell us your guest count and we'll help you land on the right layout, indoor on its own or indoor plus the outdoor deck.",
  },
];

export default function BaptismsPage() {
  return (
    <>
      <ServiceJsonLd service="baptisms" />
      <BreadcrumbJsonLd page={seoPages.baptisms} />
      <PageHero
        bug="right"
        title="A Space to Celebrate the Occasion"
        description="Whether it's an intimate gathering or a larger celebration with family and friends, our venue can host your baptism reception."
      />

      <section
        data-bg="light"
        aria-labelledby="chapel-title"
        className="pb-20 md:pb-24"
      >
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/venue/Ladybug_Chapel.jpg"
              alt="Inside the chapel, with wooden pews lined with white flowers leading to a cross at the front"
              fill
              // First thing under the hero and the largest element in the
              // first viewport, so it is the LCP.
              preload
              fetchPriority="high"
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2
              id="chapel-title"
              className="text-3xl font-semibold tracking-tight text-foreground"
            >
              A Chapel and a Hall, in One Place
            </h2>
            <p className="mt-4 text-base leading-7 text-foreground/85">
              Most families booking a baptism are solving the same problem
              twice: somewhere for the service, then somewhere else for everyone
              to eat afterwards. Both are here, a few steps apart.
            </p>
            <p className="mt-4 text-base leading-7 text-foreground/85">
              Ceremonies held in the chapel follow a Christian format. If you
              have questions about how yours would run, ask us and we&apos;ll
              talk it through.
            </p>
          </div>
        </div>
      </section>

      <section
        data-bg="light"
        aria-labelledby="pool-title"
        className="pb-20 md:pb-24"
      >
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <h2
              id="pool-title"
              className="text-3xl font-semibold tracking-tight text-foreground"
            >
              The Baptismal Pool
            </h2>
            <p className="mt-4 text-base leading-7 text-foreground/85">
              A tiled immersion pool with steps down into the water, set
              against a painted mural. It means the baptism itself happens
              here, not somewhere else before everyone drives over.
            </p>
            <p className="mt-4 text-base leading-7 text-foreground/85">
              Tell us what your ceremony needs and we&apos;ll walk you through
              how the pool is prepared and what to bring.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl">
            <Image
              src="/venue/LadybugEvents_Venue_BaptismPool.JPG"
              alt="The tiled baptismal pool, with steps leading down into it and a painted mural of water, a dove and a palm tree on the wall behind"
              width={960}
              height={1440}
              sizes="(min-width: 768px) 24rem, 90vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section
        data-bg="light"
        aria-labelledby="day-title"
        className="relative pb-20 md:pb-24"
      >
        <HiddenLadybug at="bottom-right" />
        <div className="mx-auto max-w-5xl px-6">
          <h2
            id="day-title"
            className="text-center text-3xl font-semibold tracking-tight text-foreground"
          >
            How the Day Works
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-8">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-3xl border border-foreground/15 bg-background p-8"
              >
                <h3 className="text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-foreground/85">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        data-bg="light"
        aria-labelledby="cost-title"
        className="pb-20 md:pb-24"
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl bg-tint p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 id="cost-title" className="text-2xl font-semibold text-foreground">
                  What It Costs
                </h2>
                <p className="mt-3 text-base leading-7 text-foreground/85">
                  A baptism books as a private event rental, so the pricing is
                  the same. Indoor from{" "}
                  <span className="font-semibold tabular-nums">
                    ${eventPricing.indoorOnly}
                  </span>
                  , indoor plus the outdoor deck from{" "}
                  <span className="font-semibold tabular-nums">
                    ${eventPricing.indoorAndOutdoor}
                  </span>
                  .
                </p>
                <Link
                  href="/events"
                  className="tap-target relative mt-5 inline-block text-sm font-semibold text-secondary-accent hover:text-ladybug"
                >
                  See what each rental includes &rarr;
                </Link>
              </div>
              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {venueAmenities.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-6">
                    <Check
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-secondary-accent"
                    />
                    <span className="text-foreground/85">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand href="/contact/event" cta="Inquire About Your Baptism">
        Reach out with your date and guest count and we&apos;ll help you find
        the right setup, indoor or indoor plus outdoor, for your celebration.
      </CtaBand>
    </>
  );
}
