import { Navbar } from "@/components/Navbar";
import { CourseGrid } from "@/components/CourseGrid";

export default function ResourcesPage() {
  return (
    <main className="min-h-screen flex flex-col pt-20">
      <Navbar />
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-8">Our Resources</h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                Access various study materials, course details, and educational resources.
            </p>
        </div>
      </div>
      <CourseGrid />
    </main>
  );
}
