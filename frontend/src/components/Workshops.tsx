"use client";

import { motion } from "framer-motion";
import { Clock, MonitorSmartphone, Download, Info, Mail } from "lucide-react";
import Link from "next/link";

const workshops = [
  {
    title: "IOT and Beyond",
    description: "IOT and beyond focuses on this digital revolution that engaging in digital technology and investment.",
    duration: "18 Hours",
    mode: "Online / Offline",
  },
  {
    title: "AI/ML on Embedded Systems",
    description: "With embedded AI/ML devices have the ability to run AI/ML models at the device level and then directly use the results to perform an appropriate task or action.",
    duration: "17 Hours",
    mode: "Online / Offline",
  },
  {
    title: "Make your own Alexa",
    description: "Not everyone can afford that amount of money just for a speaker. There is one thing you can do; You can build your own Alexa for free.",
    duration: "8 Hours",
    mode: "Online / Offline",
  }
];

export function Workshops() {
  return (
    <section className="py-24 bg-white" id="workshops">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">Special Programs</span>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Workshops
          </h2>
          <div className="mt-4 h-1 w-24 bg-linear-to-r from-orange-400 to-yellow-400 mx-auto rounded"></div>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Organising a workshop can be an exciting way to strengthen your relationship with current clients, establish new relationships and further develop yourself in your area of business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workshops.map((workshop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col group"
            >
              <div className="h-2 bg-linear-to-r from-teal-400 to-blue-500"></div>
              
              <div className="p-8 flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {workshop.title}
                </h3>
                <p className="text-gray-600 mb-6 min-h-[80px]">
                  {workshop.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-gray-700 font-medium">
                    <Clock className="w-5 h-5 text-orange-500 mr-3" />
                    <span>Duration: {workshop.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-700 font-medium">
                    <MonitorSmartphone className="w-5 h-5 text-teal-500 mr-3" />
                    <span>Course Mode: {workshop.mode}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 grid grid-cols-3 gap-2">
                <Link 
                  href="#contact" 
                  className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-blue-100 text-gray-600 hover:text-blue-700 transition-colors"
                  title="Contact Us"
                >
                  <Mail className="w-5 h-5 mb-1" />
                  <span className="text-[10px] font-bold uppercase">Contact</span>
                </Link>
                
                <Link 
                  href="#" 
                  className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-teal-100 text-gray-600 hover:text-teal-700 transition-colors"
                  title="Know More"
                >
                  <Info className="w-5 h-5 mb-1" />
                  <span className="text-[10px] font-bold uppercase">Know More</span>
                </Link>
                
                <Link 
                  href="#" 
                  className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-orange-100 text-gray-600 hover:text-orange-700 transition-colors"
                  title="Download Brochure"
                >
                  <Download className="w-5 h-5 mb-1" />
                  <span className="text-[10px] font-bold uppercase">Brochure</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
