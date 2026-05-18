"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { API_ROUTES } from "@/lib/config";

export function AboutUs() {
  const [aboutSettings, setAboutSettings] = useState({ text: "", image: "", pinpoints: [] });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch(API_ROUTES.SETTINGS.ABOUT);
        if (!response.ok) throw new Error("Failed to fetch about settings");
        const data = await response.json();
        setAboutSettings(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAbout();
  }, []);

  return (
    <section className="py-24 soft-gradient" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50">
              <Image
                src={aboutSettings.image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"}
                alt="Students collaborating"
                width={800}
                height={600}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                style={{ width: "100%", height: "auto" }}
                unoptimized
              />
              <div className="absolute inset-0 bg-linear-to-tr from-[var(--color-brand-blue)]/20 to-transparent" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <span className="text-blue-600 font-bold tracking-widest uppercase text-xs bg-blue-50 px-3 py-1 rounded-full border border-blue-100">About Sunvision Society</span>
              <h2 className="mt-6 text-4xl font-extrabold text-gray-900 sm:text-5xl leading-tight">
                Best DDUGKY Centre in <span className="text-gradient">Telangana & Andhra Pradesh</span>
              </h2>
              <div className="mt-6 h-1.5 w-24 bg-linear-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                {aboutSettings.text || "Sunvision Skill Development portrays an indispensable role in generating employability of rural unemployed youth and sustainability in organizations. We bridge the gap between academic learning and professional skills."}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-blue-50 shadow-sm">
                  <h4 className="text-[#007AFF] font-bold uppercase text-xs tracking-widest mb-3">Our Vision</h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    To provide at least one job for every household in the organized sector and provision of quality accredited academic programs.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-orange-50 shadow-sm">
                  <h4 className="text-orange-500 font-bold uppercase text-xs tracking-widest mb-3">Our Mission</h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    Empowering rural youth through specialized skilling and ensuring successful placements in high-growth industries.
                  </p>
                </div>
              </div>
            </div>

            <ul className="space-y-3 mt-6">
              {(aboutSettings.pinpoints.length > 0 ? aboutSettings.pinpoints : [
                "Quality training by certified professionals",
                "Guaranteed placement assistance",
                "Specialized focus on IT/ITES, Retail, and Telecom"
              ]).map((item: string, i: number) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>


          </motion.div>

        </div>
      </div>
    </section>
  );
}
