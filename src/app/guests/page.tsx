import type { Metadata } from 'next';
import Link from 'next/link';
import { guests } from '@/data/guests';

export const metadata: Metadata = {
  title: 'Guests — HellmouthCon 2026',
  description: 'Meet the guests of HellmouthCon 2026.',
};

const typeLabel: Record<string, string> = {
  cast: 'Cast',
  crew: 'Crew',
  author: 'Author',
  artist: 'Artist',
  musician: 'Musician',
  other: 'Guest',
};

export default function GuestsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl text-[var(--color-hellmouth-50)] mb-2">
        Guests
      </h1>
      <p className="text-[var(--color-moon-200)] mb-10 text-sm">
        2026 guest announcements coming soon. Check back for updates!
      </p>

      <div className="mb-10 rounded-lg overflow-hidden border border-[var(--border)]">
        <img src="/guests.png" alt="HellmouthCon 2026 guests" className="w-full h-auto" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {guests.map(guest => (
          <Link
            key={guest.id}
            href={`/guests/${guest.id}`}
            className="group block rounded-lg border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:border-[var(--color-crimson-700)] transition-colors"
          >
            {/* Photo placeholder */}
            <div className="aspect-square bg-[var(--color-hellmouth-700)] flex items-center justify-center">
              <span className="text-4xl text-[var(--color-hellmouth-500)]">
                {guest.name.charAt(0)}
              </span>
            </div>
            <div className="p-3">
              <p className="font-semibold text-sm text-[var(--color-hellmouth-50)] group-hover:text-[var(--color-crimson-300)] transition-colors leading-snug mb-0.5">
                {guest.name}
              </p>
              <p className="text-xs text-[var(--color-moon-400)]">{guest.role}</p>
              <span className="mt-2 inline-block text-xs px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--color-moon-400)]">
                {typeLabel[guest.type]}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
