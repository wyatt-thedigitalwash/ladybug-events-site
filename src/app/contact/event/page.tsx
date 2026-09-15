import PageHero from "@/components/PageHero";
import EventInquiryForm from "@/components/EventInquiryForm";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, seoPages } from "@/lib/seo";

export const metadata = pageMetadata(seoPages.contactEvent);

export default function EventInquiryPage() {
  return (
    <>
      <BreadcrumbJsonLd page={seoPages.contactEvent} />
      <PageHero bug="bottom-left" title="Tell Us About Your Event" />

      <section
        data-bg="light"
        aria-label="Event inquiry form"
        className="py-20 md:py-24"
      >
        <div className="mx-auto max-w-2xl px-6">
          <div className="rounded-2xl border border-foreground/10 bg-background p-8">
            <EventInquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
