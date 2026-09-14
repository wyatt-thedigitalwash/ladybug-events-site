import { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The owners' submission list. Also noindex via the route's metadata,
      // which is what actually stops a crawler that follows a link to it.
      disallow: '/admin',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
