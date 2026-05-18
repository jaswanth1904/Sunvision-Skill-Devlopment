"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { API_ROUTES } from "@/lib/config";
import { Users, BookOpen, Clock, GraduationCap } from "lucide-react";

function Counter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60); // Assuming 60fps
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

export function LiveCounter() {
  const [stats, setStats] = useState([
    { label: "Students Reached", value: 1200, suffix: "+", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Candidates Trained", value: 200, suffix: "+", icon: BookOpen, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Successful Placements", value: 180, suffix: "+", icon: Clock, color: "text-teal-500", bg: "bg-teal-50" },
    { label: "Expert Trainers", value: 15, suffix: "+", icon: GraduationCap, color: "text-purple-500", bg: "bg-purple-50" },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(API_ROUTES.STATS);
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        if (data.length > 0) {
          const iconMap: Record<string, any> = {
            "Students Reached": Users,
            "Candidates Trained": BookOpen,
            "Successful Placements": Clock,
            "Expert Trainers": GraduationCap,
          };
          
          const mappedStats = data.map((item: any) => ({
            ...item,
            icon: iconMap[item.label] || Users,
          }));
          setStats(mappedStats);
        }
      } catch (err) {
        console.error("Failed to fetch stats, using defaults:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="py-16 bg-white relative z-20 -mt-10" id="achievements">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-4xl font-extrabold text-gray-900 mb-2 flex items-center">
                    <Counter end={stat.value} />
                    <span className={stat.color}>{stat.suffix}</span>
                  </h3>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
