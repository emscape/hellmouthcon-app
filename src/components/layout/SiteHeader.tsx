'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMySchedule } from '@/hooks/useMySchedule';

const navLinks = [
  { href: '/schedule', label: 'Schedule' },
  { href: '/guests', label: 'Guests' },
  { href: '/map', label: 'Map' },
  { href: '/info', label: 'Info' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { savedIds, isHydrated } = useMySchedule();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--color-hellmouth-900)]/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-lg font-semibold text-[var(--color-crimson-400)] hover:text-[var(--color-crimson-300)] transition-colors tracking-widest uppercase"
        >
          HellmouthCon
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm tracking-wide transition-colors hover:text-[var(--color-crimson-300)]',
                pathname === link.href
                  ? 'text-[var(--color-crimson-400)]'
                  : 'text-[var(--color-hellmouth-200)]',
              )}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/my-schedule"
            className={cn(
              'flex items-center gap-1.5 text-sm tracking-wide transition-colors hover:text-[var(--color-crimson-300)]',
              pathname === '/my-schedule'
                ? 'text-[var(--color-crimson-400)]'
                : 'text-[var(--color-hellmouth-200)]',
            )}
          >
            <Bookmark size={15} />
            My Schedule
            {isHydrated && savedIds.size > 0 && (
              <span className="ml-1 bg-[var(--color-crimson-600)] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {savedIds.size}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-[var(--color-hellmouth-200)]"
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-[var(--border)] bg-[var(--color-hellmouth-900)] px-4 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'text-sm tracking-wide transition-colors',
                pathname === link.href
                  ? 'text-[var(--color-crimson-400)]'
                  : 'text-[var(--color-hellmouth-200)]',
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/my-schedule"
            onClick={() => setMobileOpen(false)}
            className={cn(
              'flex items-center gap-1.5 text-sm tracking-wide transition-colors',
              pathname === '/my-schedule'
                ? 'text-[var(--color-crimson-400)]'
                : 'text-[var(--color-hellmouth-200)]',
            )}
          >
            <Bookmark size={15} />
            My Schedule
            {isHydrated && savedIds.size > 0 && (
              <span className="bg-[var(--color-crimson-600)] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {savedIds.size}
              </span>
            )}
          </Link>
        </nav>
      )}
    </header>
  );
}
