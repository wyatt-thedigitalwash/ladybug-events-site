import {
  breadcrumbSchema,
  localBusinessSchema,
  serviceSchema,
  type SeoPage,
  type ServiceKey,
} from "@/lib/seo";

/*
  Structured data as a plain script tag, per the Next.js JSON-LD guide. `<` is
  escaped so a value can never close the tag early. Server components only:
  there is nothing interactive here.

  Pages render these before their first section. The section spacing rule in
  globals.css uses `section + section`, which a script between two sections
  would break.
*/
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

// Global, from the root layout.
export function LocalBusinessJsonLd() {
  return <JsonLd data={localBusinessSchema()} />;
}

export function BreadcrumbJsonLd({ page }: { page: SeoPage }) {
  return <JsonLd data={breadcrumbSchema(page)} />;
}

export function ServiceJsonLd({ service }: { service: ServiceKey }) {
  return <JsonLd data={serviceSchema(service)} />;
}
