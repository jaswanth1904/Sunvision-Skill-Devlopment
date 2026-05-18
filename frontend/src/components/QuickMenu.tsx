"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const quickLinks = [
  { name: "MS Office", href: "/courses/ms-office" },
  { name: "Diploma in Hardware", href: "/courses/hardware" },
  { name: "Diploma in Networking", href: "/courses/networking" },
  { name: "Tally ERP9", href: "/courses/tally" },
  { name: "AutoCAD", href: "/courses/autocad" },
  { name: "Web Developing", href: "/courses/web-development" },
];

export function QuickMenu() {
  const pathname = usePathname();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
      <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Quick Menu</h3>
      <ul className="space-y-2">
        {quickLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${isActive
                    ? "bg-blue-50 text-[var(--color-brand-blue)] font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[var(--color-brand-blue)]"
                  }`}
              >
                {link.name}
                {isActive && <ChevronRight className="h-4 w-4" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
