import { Navbar } from "@/components/Navbar";
import { AboutUs } from "@/components/AboutUs";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen flex flex-col pt-20">
      <Navbar />
      <AboutUs />
      
      {/* Additional About Content could go here */}
      <section className="py-12 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>This is the dedicated About Us page for Sunvision Society.</p>
        </div>
      </section>
    </main>
  );
}
