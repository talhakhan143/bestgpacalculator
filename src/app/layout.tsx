import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { OrganizationSchema } from "@/components/seo/JsonLd";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bestgpacalculator.online"),
  title: {
    default: "Best GPA Calculator — Free High School & College GPA Tools",
    template: "%s | BestGPA",
  },
  description:
    "Free GPA calculators for high school and college students. Weighted, unweighted, cumulative, semester, AP, Honors, percentage conversion. Mobile-first, no signup, instant results.",
  keywords: [
    "gpa calculator",
    "best gpa calculator",
    "calculate gpa",
    "weighted gpa calculator",
    "unweighted gpa calculator",
    "high school gpa calculator",
    "college gpa calculator",
    "cumulative gpa calculator",
    "semester gpa calculator",
    "ap gpa calculator",
    "honors gpa calculator",
    "percentage to gpa",
    "gpa goal calculator",
  ],
  openGraph: {
    title: "Best GPA Calculator — Free High School & College GPA Tools",
    description:
      "Free GPA calculators with weighted, unweighted, cumulative, semester, AP, Honors, and percentage conversion. Mobile-first, no signup.",
    type: "website",
    siteName: "BestGPACalculator",
    url: "https://bestgpacalculator.online",
    images: [
      {
        url: "/api/og?title=Best%20GPA%20Calculator&subtitle=Weighted%2C%20AP%2C%20Honors%2C%20college%20%E2%80%94%20free%20%26%20instant&stat=5.0&label=Max%20Scale",
        width: 1200,
        height: 630,
        alt: "Best GPA Calculator — free tools for high school and college",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best GPA Calculator — Free GPA Tools",
    description:
      "Free GPA calculators for high school and college. Weighted, unweighted, cumulative, semester. No signup.",
    images: [
      "/api/og?title=Best%20GPA%20Calculator&subtitle=Free%20GPA%20tools%20for%20students&stat=5.0&label=Max%20Scale",
    ],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "en-GB": "/",
      "en-CA": "/",
      "en-AU": "/",
    },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-slate-900">
        <div className="mesh-bg" aria-hidden="true" />
        <OrganizationSchema />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="relative flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
