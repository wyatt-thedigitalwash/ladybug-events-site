import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkipLink, { MAIN_CONTENT_ID } from "@/components/SkipLink";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { business, siteUrl } from "@/lib/site";
import { fullTitle, ogImage, seoPages, titleTemplate } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Without this, Next cannot resolve relative URLs in metadata to absolute
  // ones, which is what social previews and canonical tags need.
  metadataBase: new URL(siteUrl),
  // "[Page Name] | The Ladybug Venue, Plant City, FL". Pages set only their
  // name; see src/lib/seo.ts. The default is what an untitled route falls back
  // to, such as the 404 page.
  title: {
    default: fullTitle(seoPages.home),
    template: titleTemplate,
  },
  description: seoPages.home.description,
  // Admin overrides this with noindex in its own layout.
  robots: { index: true, follow: true },
  // Branding assets live in /public. There is deliberately no app/favicon.ico:
  // a file there would override these icons.
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "16x16 32x32 48x48" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  // Metadata merges shallowly: a page that sets its own openGraph or twitter
  // object must repeat these images or its share preview loses them.
  // pageMetadata() in src/lib/seo.ts does that for every public page.
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_US",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage.url],
  },
};

export const viewport: Viewport = {
  // Matches the solid navbar, which sits on the site background.
  themeColor: "#fefefe",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SkipLink />
        <LocalBusinessJsonLd />
        <Navbar />
        <main id={MAIN_CONTENT_ID} className="flex-1 bg-background">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
