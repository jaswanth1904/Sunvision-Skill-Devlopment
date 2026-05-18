"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { API_ROUTES } from "@/lib/config";

// Custom Social Icons
const Facebook = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const Instagram = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);
const Youtube = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.42 5.58a2.78 2.78 0 0 0 1.94 2c1.71.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.42-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>
);
const Linkedin = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);
const WhatsApp = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
);

export function Footer() {
  const [footerSettings, setFooterSettings] = useState({ address: "", phone: "", email: "" });

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await fetch(API_ROUTES.SETTINGS.FOOTER);
        if (!response.ok) throw new Error("Failed to fetch footer");
        const data = await response.json();
        setFooterSettings(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFooter();
  }, []);

  const companyLinks = [
    { name: "About Sunvision", href: "/#about" },
    { name: "Our Courses", href: "/#courses" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Gallery", href: "/#resources" },
    { name: "Placement Success", href: "/#training" },
    { name: "Contact Us", href: "/#contact" },
  ];

  const socialLinks = [
    { Icon: Facebook, href: "#", color: "hover:text-[#1877F2]" },
    { Icon: Instagram, href: "#", color: "hover:text-[#E4405F]" },
    { Icon: Youtube, href: "#", color: "hover:text-[#FF0000]" },
    { Icon: Linkedin, href: "#", color: "hover:text-[#0A66C2]" },
    { Icon: WhatsApp, href: "https://wa.me/919703054999", color: "hover:text-[#25D366]" },
  ];

  return (
    <footer className="bg-[#0F172A] text-gray-400 pt-24 pb-12 overflow-hidden relative">
      {/* Decorative background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 pb-12 md:pb-16 border-b border-gray-800">

          {/* Left Side: Logo & Links */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Brand Column */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white p-2 rounded-xl inline-block">
                <Image 
                  src="https://sunvisionsociety.com/uploads/1596723247_logo.png" 
                  alt="SunVision Society" 
                  width={200} 
                  height={40} 
                  style={{ height: "40px", width: "auto" }}
                  priority
                />
              </div>
              <p className="text-sm leading-relaxed">
                Dedicated to excellence in skill development and career training.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, i) => (
                  <Link key={i} href={social.href} className={`text-gray-500 transition-colors ${social.color}`}>
                    <social.Icon size={20} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Resources</h3>
              <ul className="space-y-4">
                {companyLinks.slice(0, 3).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm hover:text-white transition-colors flex items-center group">
                      <ChevronRight size={14} className="mr-1 text-gray-600 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Company</h3>
              <ul className="space-y-4">
                {companyLinks.slice(3).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm hover:text-white transition-colors flex items-center group">
                      <ChevronRight size={14} className="mr-1 text-gray-600 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: CTA & Contact */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
                Shape Your Future.
              </h2>
              <p className="text-sm text-gray-500 mb-6 max-w-md">
                Enter your email to receive updates on new courses and training schedules.
              </p>

              {/* Newsletter Input */}
              <div className="relative max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-4 px-5 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button className="absolute right-2 top-2 bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-lg transition-all flex items-center justify-center">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Contact Quick Info */}
            <div className="pt-6 border-t border-gray-800 space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-blue-500" />
                <span className="text-sm text-gray-300">{footerSettings.address || "Dilsukhnagar, Hyderabad, TG"}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-green-500" />
                <span className="text-sm text-gray-300">{footerSettings.phone || "+91 97030 54999"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} Sunvision Society. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
