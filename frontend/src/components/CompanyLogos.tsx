"use client";

import { useState, useEffect } from "react";
import { API_ROUTES } from "@/lib/config";

export function CompanyLogos() {
  const [partners, setPartners] = useState<any[]>([]);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const defaultCompanies = [
    { name: "DMart", color: "text-green-600", font: "font-serif italic" },
    { name: "airtel", color: "text-red-500", font: "font-sans font-black tracking-tighter" },
    { name: "MedPlus+", color: "text-red-600", font: "font-sans font-extrabold rounded-md border-2 border-red-600 px-2 py-1" },
    { name: "Apollo Hospitals", color: "text-blue-500", font: "font-serif font-bold" },
    { name: "Reliance", color: "text-blue-600", font: "font-serif font-bold" },
    { name: "HDFC Bank", color: "text-blue-800", font: "font-sans font-black" },
    { name: "ICICI Bank", color: "text-orange-600", font: "font-serif font-bold" },
  ];

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(API_ROUTES.PARTNERS);
        if (!response.ok) throw new Error("Failed to fetch partners");
        const data = await response.json();
        
        const mapped = data.map((p: any) => {
          const matched = defaultCompanies.find(dc => dc.name.toLowerCase() === p.name.toLowerCase());
          return {
            ...p,
            color: matched ? matched.color : "text-gray-500",
            font: matched ? matched.font : "font-sans font-bold",
            image: p.image && p.image.includes("photo-1611162617474-5b21e879e113") ? "" : p.image
          };
        });
        
        setPartners(mapped);
      } catch (err) {
        console.error("Failed to fetch partners:", err);
      }
    };
    fetchPartners();
  }, []);

  const companiesToUse = partners.length > 0 ? partners : defaultCompanies;

  // Duplicate the array for a seamless infinite loop
  const logos = [...companiesToUse, ...companiesToUse];

  return (
    <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          Our Top Placement Partners
        </p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex items-center space-x-16 whitespace-nowrap group-hover:[animation-play-state:paused]">
          {logos.map((company, index) => (
            <div 
              key={index} 
              className={`text-3xl mx-8 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer ${company.color || ''} ${company.font || ''}`}
            >
              {company.image && !failedImages.includes(company.name) ? (
                <img 
                  src={company.image} 
                  alt={company.name} 
                  className="h-12 w-auto object-contain" 
                  onError={() => setFailedImages((prev) => [...prev, company.name])}
                />
              ) : (
                company.name
              )}
            </div>
          ))}
        </div>
        
        {/* Second identical div for absolute continuous flow without gap */}
        <div className="absolute top-0 animate-marquee2 flex items-center space-x-16 whitespace-nowrap group-hover:[animation-play-state:paused]">
          {logos.map((company, index) => (
            <div 
              key={`dup-${index}`} 
              className={`text-3xl mx-8 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer ${company.color || ''} ${company.font || ''}`}
            >
              {company.image && !failedImages.includes(company.name) ? (
                <img 
                  src={company.image} 
                  alt={company.name} 
                  className="h-12 w-auto object-contain" 
                  onError={() => setFailedImages((prev) => [...prev, company.name])}
                />
              ) : (
                company.name
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
