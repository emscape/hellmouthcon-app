import type { Metadata } from 'next';
import { Cinzel, Inter } from 'next/font/google';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';

const cinzel = Cinzel({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HellmouthCon 2026',
  description:
    'HellmouthCon 2026 — A Buffy the Vampire Slayer fan convention at Torrance High School, June 13–14 2026.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'HellmouthCon 2026',
    description:
      'A Buffy the Vampire Slayer fan convention at Sunnydale High, June 13–14 2026.',
    siteName: 'HellmouthCon 2026',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
