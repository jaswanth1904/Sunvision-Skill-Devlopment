import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Sunvision Society | Free Skill Training & Job Placement",
  description: "Sunvision Society empowers rural youth with free professional skill training and guaranteed job placements in IT, Retail, Telecom, and Electronics sectors.",
  keywords: ["Skill Training", "Free Education", "Job Placement", "Rural Youth Empowerment", "DDUGKY", "Sunvision Society"],
  authors: [{ name: "Sunvision Society" }],
  openGraph: {
    title: "Sunvision Society | Free Skill Training & Job Placement",
    description: "Empowering rural youth through specialized skilling and ensuring successful placements in high-growth industries.",
    url: "https://sunvisionsociety.com",
    siteName: "Sunvision Society",
    images: [
      {
        url: "https://sunvisionsociety.com/uploads/1596723247_logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunvision Society | Free Skill Training",
    description: "Free professional skill training and guaranteed job placements for rural area students.",
    images: ["https://sunvisionsociety.com/uploads/1596723247_logo.png"],
  },
};

import { FloatingActions } from "@/components/FloatingActions";

import { PageLoader } from "@/components/PageLoader";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased font-sans`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col relative">
        <Suspense fallback={null}>
          <PageLoader />
        </Suspense>
        {children}
        <FloatingActions />

      </body>
    </html>
  );
}
