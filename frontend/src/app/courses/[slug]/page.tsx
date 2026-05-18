import { Navbar } from "@/components/Navbar";
import { CourseDetail } from "@/components/CourseDetail";
import { notFound } from "next/navigation";
import { API_BASE_URL } from "@/lib/config";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  let course;
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${slug}`, { cache: 'no-store' });
    if (!response.ok) {
      notFound();
    }
    course = await response.json();
  } catch (err) {
    console.error("Failed to fetch course:", err);
    notFound();
  }

  return (
    <CourseDetail 
      title={course.title}
      description={course.description}
      image={course.image}
      modules={course.highlights} // Using highlights as modules for consistency
      expectations={[
        "Hands-on Practical Training",
        "Industry-recognized Certification",
        "Placement Assistance",
        "Expert Faculty Support"
      ]}
      schemeBenefits={[
        "Free Training for Rural Youth",
        "Job Opportunity Assistance",
        "Personalized Mentorship",
        "Advanced Study Material"
      ]}
      outcomes={course.outcomes}
      detailedContent={course.description + " This course is designed to provide comprehensive knowledge and practical skills required in the modern industry."}
      quiz={course.quiz}
    />
  );
}
