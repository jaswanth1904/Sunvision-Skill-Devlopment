"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, FileText, HelpCircle, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

// Custom Social Icons since they are missing in this lucide-react version
const Facebook = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Instagram = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const Youtube = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.42 5.58a2.78 2.78 0 0 0 1.94 2c1.71.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.42-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
);
const Linkedin = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export function FloatingActions() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const socialLinks = [
    { icon: Linkedin, href: "#", color: "bg-[#0077b5]", name: "LinkedIn" },
    { icon: Facebook, href: "#", color: "bg-[#1877f2]", name: "Facebook" },
    { icon: Instagram, href: "#", color: "bg-linear-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]", name: "Instagram" },
    { icon: Youtube, href: "#", color: "bg-[#ff0000]", name: "YouTube" },
  ];

  const actionButtons = [
    { icon: FileText, text: "Apply Online", color: "bg-slate-700", href: "#contact" },
    { icon: HelpCircle, text: "Quick Enquiry", color: "bg-orange-500", href: "#contact" },
    { icon: MessageCircle, text: "Chat with us", color: "bg-[#25d366]", href: "https://wa.me/919703054999" },
  ];

  return (
    <>
      {/* Side Social Bar */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col space-y-2 pr-2">
        {socialLinks.map((social, i) => (
          <motion.a
            key={i}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            whileHover={{ x: -10 }}
            className={`${social.color} p-3 rounded-full text-white shadow-lg flex items-center justify-center transition-transform hover:scale-110`}
            title={social.name}
          >
            <social.icon size={20} />
          </motion.a>
        ))}
      </div>
    </>
  );
}
