"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function EnhanceSkills() {
  return (
    <section className="py-24 bg-linear-to-b from-white to-blue-50 overflow-hidden relative">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 left-0 -mt-20 -ml-20 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
              <Sparkles className="w-4 h-4 mr-2" /> Student Development
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              ENHANCE YOUR SKILLS WITH <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-yellow-500">BEST COURSES</span>
            </h2>
            
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                To flourish interpersonal and intrapersonal skills and can build up confidence levels by improving low self-esteem to high self-esteemed individuals.
              </p>
              <p>
                We value your efforts by providing pre-eminent courses which modifies your learning skills to become an optimistic person in life. Never think about what others think. Always think about what your ‘self’ thinks and proposes.
              </p>
              <p className="font-medium text-gray-800 border-l-4 border-orange-400 pl-4">
                Prefer your inclined and passionate course to enhance your professional career and be a teetotaller, and we appreciate workaholics.
              </p>
            </div>
            
            <div className="pt-4">
              <Link
                href="/courses"
                className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-full bg-linear-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                alt="Students developing skills" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="glass px-6 py-3 rounded-xl border border-white/20 text-white font-semibold">
                  Building Confidence & Careers
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
