"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { API_ROUTES } from "@/lib/config";

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(API_ROUTES.TESTIMONIALS);
        if (!response.ok) throw new Error("Failed to fetch testimonials");
        const data = await response.json();
        setTestimonials(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTestimonials();
  }, []);

  // Auto-timer for sliding testimonials
  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) {
    return (
      <section className="py-24 bg-[var(--color-brand-blue)] text-white text-center" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl">Loading feedback...</p>
        </div>
      </section>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-[var(--color-brand-blue)] relative overflow-hidden" id="testimonials">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Our Feedback
          </h2>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
            Hear from our successful students who have transformed their careers through our programs.
          </p>
          <div className="mt-4 h-1 w-24 bg-white/30 mx-auto rounded"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Slider Controls */}
          <button
            onClick={prevSlide}
            aria-label="Previous Testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-12 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-12 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all shadow-lg"
          >
            <ChevronRight size={24} />
          </button>

          {/* Testimonial Cards */}
          <div className="overflow-hidden px-4 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white rounded-none border-l-8 border-orange-400 p-8 md:p-12 shadow-2xl relative"
              >
                <Quote className="absolute top-8 right-8 h-16 w-16 text-orange-100 rotate-180" />

                <p className="text-gray-700 text-xl italic mb-8 relative z-10 leading-relaxed font-medium">
                  &quot;{testimonials[currentIndex].text}&quot;
                </p>

                <div className="flex items-center">
                  <div className="h-14 w-14 rounded-full bg-linear-to-tr from-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-gray-900 font-extrabold text-lg uppercase tracking-wide">{testimonials[currentIndex].name}</h4>
                    <p className="text-sm font-semibold text-orange-500 uppercase">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-orange-400 w-8' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
