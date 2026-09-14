import type { Metadata } from "next";

/*
  The admin area is the owners' private list, so it is kept out of search
  entirely. It is also excluded from sitemap.ts and disallowed in robots.ts;
  this is the header that actually stops a crawler that arrived by a link.
*/
export const metadata: Metadata = {
  title: "Submissions",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return children;
}
