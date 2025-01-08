import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { MeetingScheduler } from "@/components/contact/MeetingScheduler";
import { ContactDetails } from "@/components/contact/ContactDetails";

export default function ContactPage() {
  return (
    <main className="pt-20">
      <ContactHero />
      <ContactForm />
      <MeetingScheduler />
      <ContactDetails />
    </main>
  );
} 






























