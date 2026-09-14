import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { business, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  title: {
    default: `${business.name} | Plant City, FL Event Venue`,
    template: `%s | ${business.name}`,
  },
  description:
    "The Ladybug Venue is a family-run event space in Plant City, FL offering wedding packages, private event rentals, and free community programming.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1 bg-background">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
