import { Navbar } from "@/components/Navbar";
import { CourseGrid } from "@/components/CourseGrid";

export default function CoursesPage() {
  return (
    <main className="min-h-screen flex flex-col pt-20">
      <Navbar />
      <CourseGrid />
      
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>We offer a wide range of courses to jumpstart your career.</p>
        </div>
      </section>
    </main>
  );
}
