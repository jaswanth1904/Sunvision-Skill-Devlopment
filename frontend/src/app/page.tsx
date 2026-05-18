import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutUs } from "@/components/AboutUs";
import { LiveCounter } from "@/components/LiveCounter";
import { CourseGrid } from "@/components/CourseGrid";

import { Testimonials } from "@/components/Testimonials";
import { CompanyLogos } from "@/components/CompanyLogos";
import { Gallery } from "@/components/Gallery";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <Hero />
      <AboutUs />
      <LiveCounter />
      <CourseGrid />

      <Testimonials />
      <CompanyLogos />
      <Gallery />
      <ContactForm />

      {/* Footer */}
      <Footer />
    </main>
  );
}
