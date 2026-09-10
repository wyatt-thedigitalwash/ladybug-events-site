import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { aboutCopy } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the sisters behind The Ladybug Venue, a family-run event space in Plant City, FL.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero bug="left" title="A Family-Run Venue" />

      <section data-bg="light" className="py-20 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:items-start">
          {/* The copy runs to four full paragraphs, so the photo follows it down
              the page instead of sitting above a column of empty space. */}
          <div className="overflow-hidden rounded-2xl md:sticky md:top-28">
            <Image
              src="/owners/LadybugEvents_Owners.JPG"
              alt="The four sisters who run the venue, standing together in winter coats beside a mountain lake"
              width={1600}
              height={1200}
              sizes="(min-width: 768px) 40vw, 90vw"
              className="h-auto w-full"
            />
          </div>

          <div className="space-y-5">
            {aboutCopy.paragraphs.map((paragraph, index) => (
              <p key={index} className="leading-7 text-foreground/85">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
