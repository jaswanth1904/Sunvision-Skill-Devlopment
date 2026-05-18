import { Navbar } from "@/components/Navbar";
import { Gallery } from "@/components/Gallery";

export default function AchievementsPage() {
  return (
    <main className="min-h-screen flex flex-col pt-20">
      <Navbar />
      <div className="py-12 bg-[var(--color-brand-blue)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Our Achievements</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
                Celebrating the success of our students and the impact we've made in rural communities.
            </p>
        </div>
      </div>
      <Gallery />
    </main>
  );
}
