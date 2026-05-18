"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_ROUTES } from "@/lib/config";

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(API_ROUTES.COURSES);
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses for navbar:", err);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return (
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isHomePage ? "bg-transparent text-white" : "bg-[var(--color-brand-blue)] text-white shadow-md"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Image 
              src="https://sunvisionsociety.com/uploads/1596723247_logo.png" 
              alt="SunVision Society" 
              width={200} 
              height={40} 
              style={{ height: "40px", width: "auto" }}
              priority
            />
        </div>
      </nav>
    );
  }

  const shouldShowBackground = isScrolled || !isHomePage;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
    { 
      name: "Courses", 
      href: "/#courses",
      dropdown: courses.map(course => ({ name: course.title, href: `/courses/${course.slug}` }))
    },
    { name: "Achievements", href: "/#achievements" },
    { name: "Contact", href: "/#contact" },
    { name: "Admin", href: "/admin/login" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        shouldShowBackground 
          ? "bg-white/95 backdrop-blur-md shadow-sm text-gray-900 border-b border-gray-200 py-2" 
          : "bg-transparent text-gray-900 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="https://sunvisionsociety.com/uploads/1596723247_logo.png" 
                alt="SunVision Logo" 
                width={160} 
                height={50} 
                className="transition-transform hover:scale-105 w-32 md:w-48" 
                style={{ height: "auto", width: "auto" }} 
                priority 
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group py-2"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="relative group hover:text-blue-200 transition-colors text-sm font-medium"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>

                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 mt-1 z-50"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-6 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[var(--color-brand-blue)] transition-colors font-medium"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-900 hover:text-orange-500 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 md:hidden bg-white"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <Image 
                  src="https://sunvisionsociety.com/uploads/1596723247_logo.png" 
                  alt="Logo" 
                  width={120} 
                  height={30} 
                  style={{ height: "auto", width: "auto" }}
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-900"
                >
                  <X size={28} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-6 px-6">
                <div className="flex flex-col space-y-6">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      <Link
                        href={link.href}
                        className="text-2xl font-black text-gray-900 hover:text-[var(--color-brand-blue)] transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                      {link.dropdown && (
                        <div className="mt-4 ml-4 flex flex-col space-y-3 border-l-2 border-gray-100 pl-4">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="text-gray-500 hover:text-[var(--color-brand-blue)] font-medium"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 border-t border-gray-100">
                <Link
                  href="/admin/login"
                  className="block w-full py-4 bg-[var(--color-brand-blue)] text-white text-center rounded-2xl font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Portal
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
