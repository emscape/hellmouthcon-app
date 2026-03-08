import Link from 'next/link';
import { Calendar, Users, Map, Bookmark } from 'lucide-react';
import CountdownTimer from '@/components/home/CountdownTimer';

const quickLinks = [
  {
    href: '/schedule',
    icon: Calendar,
    title: 'Schedule',
    description: 'Browse panels, photo ops, autographs, and more.',
  },
  {
    href: '/guests',
    icon: Users,
    title: 'Guests',
    description: 'Meet the cast, crew, and special guests.',
  },
  {
    href: '/map',
    icon: Map,
    title: 'Venue Map',
    description: 'Find your way around Sunnydale High.',
  },
  {
    href: '/my-schedule',
    icon: Bookmark,
    title: 'My Schedule',
    description: 'Save events and build your personal agenda.',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative px-4 py-20 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-hellmouth-800)_0%,_transparent_70%)] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          <p className="text-[var(--color-crimson-400)] text-sm tracking-[0.3em] uppercase mb-4 font-display">
            Fandom Charities Presents
          </p>
          <h1 className="font-display text-[2.25rem] sm:text-5xl md:text-7xl font-bold text-[var(--color-hellmouth-50)] mb-4 leading-tight">
            HellmouthCon
            <span className="block text-[var(--color-crimson-500)]">2026</span>
          </h1>
          <p className="text-[var(--color-hellmouth-200)] text-lg mb-2">
            A Buffy the Vampire Slayer Fan Convention
          </p>
          <p className="text-[var(--color-moon-200)] mb-10">
            June 13–14, 2026 &nbsp;·&nbsp; Torrance High School &nbsp;·&nbsp; Torrance, CA
          </p>

          <CountdownTimer target="2026-06-13T10:00:00-07:00" />

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.eventeny.com/events/2026-hellmouthcon-on-the-hellmouth-buffy-celebration-at-sunnydale-high-20508/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[var(--color-crimson-600)] hover:bg-[var(--color-crimson-500)] text-white rounded font-semibold transition-colors tracking-wide"
            >
              Buy Tickets
            </a>
            <Link
              href="/schedule"
              className="px-8 py-3 border border-[var(--color-hellmouth-600)] hover:border-[var(--color-crimson-600)] text-[var(--color-hellmouth-100)] rounded font-semibold transition-colors tracking-wide"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map(({ href, icon: Icon, title, description }) => (
            <Link
              key={href}
              href={href}
              className="group block p-6 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--color-crimson-700)] transition-colors"
            >
              <Icon
                size={24}
                className="text-[var(--color-crimson-400)] mb-3 group-hover:text-[var(--color-crimson-300)] transition-colors"
              />
              <h2 className="font-display text-sm tracking-widest uppercase text-[var(--color-hellmouth-50)] mb-1">
                {title}
              </h2>
              <p className="text-xs text-[var(--color-moon-200)] leading-relaxed">
                {description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Charity banner */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="rounded-lg border border-[var(--color-gold-700)] bg-[var(--color-hellmouth-800)] p-8 text-center">
          <p className="font-display text-[var(--color-gold-400)] text-xs tracking-[0.3em] uppercase mb-3">
            Supporting
          </p>
          <h2 className="font-display text-xl text-[var(--color-hellmouth-50)] mb-4">
            Fandom for Good
          </h2>
          <p className="text-[var(--color-hellmouth-200)] text-sm max-w-xl mx-auto mb-6">
            HellmouthCon is 100% volunteer-run. Proceeds benefit{' '}
            <strong className="text-[var(--color-hellmouth-100)]">PanCan</strong> (pancreatic cancer research) and the{' '}
            <strong className="text-[var(--color-hellmouth-100)]">Ron Glass Memorial Scholarship Fund</strong>,
            supporting youth academic excellence through the Al Wooten Jr. Youth Center.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://pancan.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-gold-300)] hover:text-[var(--color-gold-200)] transition-colors underline underline-offset-4"
            >
              Learn about PanCan →
            </a>
            <a
              href="https://alwootenjr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-gold-300)] hover:text-[var(--color-gold-200)] transition-colors underline underline-offset-4"
            >
              Ron Glass Memorial Scholarship →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
