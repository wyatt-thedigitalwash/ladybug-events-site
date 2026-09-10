import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { business } from "@/lib/site";
import LadybugFlying from "./motifs/LadybugFlying";

/*
  Links are grouped by what someone is trying to do rather than mirroring the
  navbar. One flat list of every page made a tall lonely column with a lot of
  dead space beside it.
*/
const columns = [
  {
    heading: "What we host",
    links: [
      { href: "/weddings", label: "Weddings" },
      { href: "/events", label: "Private Events" },
      { href: "/baptisms", label: "Baptisms" },
      { href: "/community", label: "Community Events" },
    ],
  },
  {
    heading: "The venue",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/contact/wedding", label: "Wedding Inquiry" },
      { href: "/contact/event", label: "Event Inquiry" },
    ],
  },
];

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}`,
)}`;

// Light text needs 70% or more on this ground to clear the contrast minimum.
const linkClass =
  "text-sm text-background/80 transition-colors hover:text-background";
const headingClass =
  "text-xs font-semibold uppercase tracking-[0.14em] text-background/70";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-foreground text-background">
      {/* Bottom-left, so it never lands near the CTA band's watermark, which sits
          bottom-right on the section directly above. */}
      <LadybugFlying className="pointer-events-none absolute -bottom-16 -left-16 hidden h-72 w-72 -rotate-[14deg] text-background opacity-[0.05] md:block md:-bottom-20 md:-left-20 md:h-96 md:w-96" />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-12 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Link href="/" aria-label={business.name} className="inline-block">
              <Image
                src="/brand/ladybug-group-logo-light.svg"
                alt=""
                width={5096}
                height={1884}
                className="h-auto w-[190px]"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-background/80">
              A family-run event space in Plant City, open for celebrations and
              for the neighborhood.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="md:col-span-2">
              <h2 className={headingClass}>{col.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="md:col-span-4">
            <h2 className={headingClass}>Visit</h2>
            {/* The address stack and Linktree sit side by side so the button
                uses the empty half of this column instead of hanging below it. */}
            <div className="mt-4 flex flex-wrap items-start justify-between gap-x-8 gap-y-6">
              <address className="space-y-4 not-italic">
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block text-sm leading-6 text-background/80 transition-colors hover:text-background"
                >
                  {business.address.street}
                  <br />
                  {business.address.city}, {business.address.state}{" "}
                  {business.address.zip}
                  <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-background/70 group-hover:text-background">
                    Get directions
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </a>

                {/* The phone is the fastest way to reach a small venue, so it is
                    the one thing in the footer sized to be seen. */}
                <a
                  href={business.phoneHref}
                  className="block font-display text-2xl font-semibold tabular-nums text-background transition-colors hover:text-accent"
                >
                  {business.phone}
                </a>
              </address>

              <a
                href={business.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-background/25 px-4 py-2 text-sm font-semibold text-background/85 transition-colors hover:border-background/60 hover:text-background"
              >
                Linktree
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-background/15 pt-6 text-xs text-background/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {business.name}. All rights
            reserved.
          </p>
          <p>
            {business.address.city}, {business.address.state}
          </p>
        </div>
      </div>
    </footer>
  );
}
