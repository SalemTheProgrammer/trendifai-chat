import { siteMetadata } from './metadata';

export default function manifest() {
  return {
    name: siteMetadata.title,
    short_name: 'AI Automation',
    description: siteMetadata.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0A051E',
    theme_color: '#7C3AED',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      // Add more icon sizes
    ],
  };
} 