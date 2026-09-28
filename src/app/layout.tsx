import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NAQSH — AI verifies the hand. We preserve the story.',
  description:
    'NAQSH is a heritage-tech authenticity and provenance platform for Lucknow chikankari. AI-assisted visual assessment of hand embroidery, artisan story, earnings transparency, and tamper-evident ledger.',
  keywords: ['chikankari', 'Lucknow', 'handmade', 'authenticity', 'artisan', 'heritage', 'provenance'],
  authors: [{ name: 'NAQSH' }],
  openGraph: {
    title: 'NAQSH — AI verifies the hand.',
    description: 'Every stitch leaves a trace.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FBF7F1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-ivory min-h-screen font-body antialiased">
        {children}
      </body>
    </html>
  );
}
