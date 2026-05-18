"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Clock, Award, Star } from "lucide-react";
import { API_ROUTES } from "@/lib/config";
import { CourseCard } from "./CourseCard";

export function CourseGrid() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(API_ROUTES.COURSES);
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        const mappedCourses = data.map((course: any) => ({
          ...course,
          link: `/courses/${course.slug}`,
        }));
        setCourses(mappedCourses);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchCourses();
  }, []);
  return (
    <section className="py-12 md:py-24 bg-gray-50" id="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Training Programs in <span className="text-[#007AFF]">Key Sectors</span>
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Specialized skill development in IT/ITES, Retail, Telecom, and Electronics sectors for 100% employability.
          </p>
          <div className="mt-2 h-1 w-24 bg-[var(--color-brand-blue)] mx-auto rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              description={course.description}
              image={course.image}
              link={course.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
