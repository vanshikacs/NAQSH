import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NAQSH — Har Dhaage Ki Kahani",
  description:
    "NAQSH is a provenance and trust platform for Indian crafts, textiles and artisan-made products. AI-verified certificates, artisan stories, cooperative earnings transparency.",
  keywords: ["chikankari", "Lucknow", "handmade", "authenticity", "artisan", "heritage", "provenance", "Banarasi"],
  authors: [{ name: "NAQSH" }],
  openGraph: {
    title: "NAQSH — Har Dhaage Ki Kahani",
    description: "Every stitch leaves a trace.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FBF7F1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap"
        />
      </head>
      <body className="bg-ivory min-h-screen font-body antialiased" suppressHydrationWarning>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}