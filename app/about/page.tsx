import { AboutHero } from "@/components/about/AboutHero";
import { AboutVision } from "@/components/about/AboutVision";
import { AboutApproach } from "@/components/about/AboutApproach";
import { AboutPartnerships } from "@/components/about/AboutPartnerships";
import { AboutCTA } from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutVision />
      <AboutApproach />
      <AboutPartnerships />
      <AboutCTA />
    </>
  );
}