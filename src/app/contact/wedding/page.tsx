import PageHero from "@/components/PageHero";
import WeddingInquiryForm from "@/components/WeddingInquiryForm";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, seoPages } from "@/lib/seo";

export const metadata = pageMetadata(seoPages.contactWedding);

export default function WeddingInquiryPage() {
  return (
    <>
      <BreadcrumbJsonLd page={seoPages.contactWedding} />
      <PageHero bug="bottom-right" title="Begin Your Wedding Inquiry" />

      <section
        data-bg="light"
        aria-labelledby="wedding-form-title"
        className="py-20 md:py-24"
      >
        <div className="mx-auto max-w-2xl px-6">
          <div className="rounded-3xl border border-accent/40 bg-background p-10 shadow-sm">
            <h2
              id="wedding-form-title"
              className="text-center text-2xl font-semibold tracking-tight text-foreground"
            >
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
