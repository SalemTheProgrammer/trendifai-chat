import { siteMetadata } from './metadata';

export default function sitemap() {
  const routes = [
    '',
    '/services',
    '/pricing',
    '/contact',
    // Add any other routes you have
  ].map((route) => ({
    url: `${siteMetadata.siteUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return routes;
} 