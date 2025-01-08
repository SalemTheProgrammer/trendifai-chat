import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Process } from "@/components/Process";
import { Solutions } from "@/components/Solutions";
import { AIAgents } from "@/components/AIAgents";
import { GetStarted } from "@/components/GetStarted";
import { siteMetadata } from './metadata';
import FuturisticAgent from "@/components/Hero";

export const metadata = {
  title: 'Home',
  description: siteMetadata.description,
};

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Automation Agency',
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    sameAs: [
      'https://twitter.com/yourhandle',
      'https://linkedin.com/company/yourcompany',
      // Add your social media profiles
    ],
    address: {
      '@type': 'PostalAddress',
      // Add your address details
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-XXX-XXX-XXXX',
      contactType: 'customer service'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FuturisticAgent />
      
    </>
  );
}