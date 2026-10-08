import PageHero from "@/components/PageHero";
import VendorInquiryForm from "@/components/VendorInquiryForm";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, seoPages } from "@/lib/seo";

export const metadata = pageMetadata(seoPages.contactVendor);

export default function VendorInquiryPage() {
  return (
    <>
      <BreadcrumbJsonLd page={seoPages.contactVendor} />
      <PageHero
        bug="top-right"
        title="Partner With Us"
        description="Photographers, florists, bands, caterers and other event pros: tell us about your business and we'll be in touch about working together."
      />

      <section
        data-bg="light"
        aria-label="Vendor inquiry form"
        className="py-20 md:py-24"
      >
        <div className="mx-auto max-w-2xl px-6">
          <div className="rounded-2xl border border-foreground/10 bg-background p-8">
            <VendorInquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
