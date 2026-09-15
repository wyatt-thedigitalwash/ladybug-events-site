import { MetadataRoute } from 'next';
import { isCallBookingEnabled, siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl;
  const routes = [
    { path: '', priority: 1.0 },
    { path: '/weddings', priority: 0.9 },
    { path: '/events', priority: 0.9 },
    { path: '/baptisms', priority: 0.7 },
    { path: '/community', priority: 0.8 },
    { path: '/about', priority: 0.6 },
    { path: '/contact', priority: 0.8 },
    { path: '/contact/wedding', priority: 0.7 },
    { path: '/contact/event', priority: 0.7 },
    // Only submitted once it can actually take a booking. Listing a page that
    // just says "coming soon" invites Google to index it as the answer for
    // "ladybug venue call".
    ...(isCallBookingEnabled()
      ? [{ path: '/contact/call', priority: 0.8 }]
      : []),
  ];

  return routes.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: 'weekly' as const,
    priority,
    lastModified: new Date(),
  }));
}
