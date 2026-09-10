import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WeddingInquiryForm from "@/components/WeddingInquiryForm";

export const metadata: Metadata = {
  title: "Wedding Inquiry",
  description:
    "Start a wedding inquiry with The Ladybug Venue in Plant City, FL.",
};

export default function WeddingInquiryPage() {
  return (
    <>
      <PageHero bug="bottom-right" title="Begin Your Wedding Inquiry" />

      <section data-bg="light" className="py-20 md:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <div className="rounded-3xl border border-accent/40 bg-background p-10 shadow-sm">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-foreground">
              Tell Us About Your Day
            </h2>
            <div className="mt-8">
              <WeddingInquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
