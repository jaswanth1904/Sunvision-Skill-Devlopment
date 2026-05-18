"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export function CourseCard({ title, description, image, link }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col group border-0 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl">
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
             <Link 
              href={link}
              className="text-white font-bold flex items-center group/btn"
            >
              Explore Course <BookOpen className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[var(--color-brand-blue)] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
            Free Training
          </div>
        </div>
        <CardHeader className="pt-8 px-8 pb-4">
          <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-[var(--color-brand-blue)] transition-colors duration-300">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8 flex-grow">
          <CardDescription className="text-base text-gray-600 leading-relaxed line-clamp-3">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter className="px-8 pb-8 pt-0">
          <Link 
            href={link}
            className="w-full py-4 text-center rounded-2xl bg-gray-50 text-gray-900 font-bold hover:bg-[var(--color-brand-blue)] hover:text-white transition-all duration-300 flex items-center justify-center border border-gray-100"
          >
            Learn More
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
