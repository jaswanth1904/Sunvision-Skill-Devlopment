"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, TrendingUp } from "lucide-react";

const trainingFeatures = [
  {
    title: "Certified Training Team",
    description: "Our technically sound faculties share an ocean of knowledge with excellent teaching strategies and certified expertise.",
    icon: Users,
  },
  {
    title: "Domain Courses",
    description: "Specialized training in CRM and Multi-skill technician roles, certifying trainees in high-demand management streams.",
    icon: Briefcase,
  },
  {
    title: "Soft Skills Development",
    description: "We focus on communication, teamwork, and leadership skills to ensure candidates are completely corporate-ready.",
    icon: Users,
  },
  {
    title: "Career Orientation",
    description: "Career planning and placement is our major key role. We provide employment in IT, BPOs, and MNCs.",
    icon: TrendingUp,
  }
];

export function Training() {
  return (
    <section className="py-24 bg-gray-50" id="training">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Training & Placements</span>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Empowering Through Skilling
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Our comprehensive training programs ensure 100% employment opportunities for rural youth.
          </p>
          <div className="mt-4 h-1 w-24 bg-[var(--color-brand-blue)] mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainingFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 relative group hover:-translate-y-2"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl" />
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform shadow-lg shadow-blue-200">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-24 max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
            Classroom Training Schedules
          </h2>
          <div className="overflow-x-auto rounded-xl shadow-md border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#2c2c2c] text-white">
                  <th className="py-4 px-6 font-bold">Course</th>
                  <th className="py-4 px-6 font-bold">Location</th>
                  <th className="py-4 px-6 font-bold text-center">Register</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-gray-100 hover:bg-orange-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-orange-500">Digital Literacy (MS Office)</td>
                  <td className="py-4 px-6 text-gray-800 font-medium">Hyderabad</td>
                  <td className="py-4 px-6 text-center">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded transition-colors text-sm">
                      Register
                    </button>
                  </td>
                </tr>
                <tr className="bg-[#fff9f0] border-b border-gray-100 hover:bg-orange-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-orange-500">Retail Management</td>
                  <td className="py-4 px-6 text-gray-800 font-medium">Hyderabad</td>
                  <td className="py-4 px-6 text-center">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded transition-colors text-sm">
                      Register
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-orange-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-orange-500">IT & Soft Skills</td>
                  <td className="py-4 px-6 text-gray-800 font-medium">Hyderabad</td>
                  <td className="py-4 px-6 text-center">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded transition-colors text-sm">
                      Register
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
