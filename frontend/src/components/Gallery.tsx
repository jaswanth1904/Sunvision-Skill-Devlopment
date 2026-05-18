"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { galleryImages as fallbackImages } from "@/data/gallery";
import { API_ROUTES, API_BASE_URL } from "@/lib/config";

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<any[]>(fallbackImages);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(API_ROUTES.GALLERY);
        if (response.ok) {
          const data = await response.json();
          const formattedData = data.map((img: any) => ({
            src: `${API_BASE_URL}${img.src}`,
            alt: img.alt
          }));
          setImages([...fallbackImages, ...formattedData]);
        }
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
      }
    };

    fetchGallery();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, [images]);

  return (
    <section className="py-24 bg-white" id="resources">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Events Gallery
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Take a look at some of the memorable moments from our training programs and events.
          </p>
          <div className="mt-2 h-1 w-24 bg-[var(--color-brand-blue)] mx-auto rounded"></div>
        </div>

        {/* Auto Slider */}
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={images[currentIndex]?.src}
                alt={images[currentIndex]?.alt}
                width={800}
                height={500}
                className="max-w-full max-h-full object-contain mx-auto"
                style={{ width: "auto", height: "auto" }}
                unoptimized
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 text-white">
                <p className="text-lg font-bold">{images[currentIndex]?.alt}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? 'bg-blue-600 w-5' : 'bg-slate-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Left/Right Arrows */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-slate-700 w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:shadow-lg transition-all"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-slate-700 w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:shadow-lg transition-all"
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
