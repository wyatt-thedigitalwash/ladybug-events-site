import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EventInquiryForm from "@/components/EventInquiryForm";

export const metadata: Metadata = {
  title: "Event Inquiry",
  description:
    "Start an event inquiry with The Ladybug Venue in Plant City, FL.",
};

export default function EventInquiryPage() {
  return (
    <>
      <PageHero bug="bottom-left" title="Tell Us About Your Event" />

      <section data-bg="light" className="py-20 md:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <div className="rounded-2xl border border-foreground/10 bg-background p-8">
            <EventInquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
