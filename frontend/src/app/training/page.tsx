import { Navbar } from "@/components/Navbar";
import { Training } from "@/components/Training";

export default function TrainingPage() {
  return (
    <main className="min-h-screen flex flex-col pt-20">
      <Navbar />
      <Training />
      
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>Explore our wide range of training programs and career opportunities.</p>
        </div>
      </section>
    </main>
  );
}
