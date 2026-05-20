import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { OrganizationSchema } from "@/components/seo/JsonLd";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon-32.png"],
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
      <head>
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin=""
        />
        {GA_ID ? (
          <link
            rel="preconnect"
            href="https://www.googletagmanager.com"
            crossOrigin=""
          />
        ) : null}
      </head>
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
        {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
      </body>
    </html>
  );
}
