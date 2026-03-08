import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { guests } from '@/data/guests';
import { getGuestEvents } from '@/lib/schedule-helpers';
import { rooms } from '@/data/rooms';
import { categoryLabel, categoryColors, formatTimeRange, cn } from '@/lib/utils';

export function generateStaticParams() {
  return guests.map(g => ({ guestId: g.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ guestId: string }>;
}): Promise<Metadata> {
  const { guestId } = await params;
  const guest = guests.find(g => g.id === guestId);
  return {
    title: guest ? `${guest.name} — HellmouthCon 2026` : 'Guest — HellmouthCon 2026',
  };
}

export default async function GuestDetailPage({
  params,
}: {
  params: Promise<{ guestId: string }>;
}) {
  const { guestId } = await params;
  const guest = guests.find(g => g.id === guestId);
  if (!guest) notFound();

  const guestEvents = getGuestEvents(guest.id);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link
        href="/guests"
        className="flex items-center gap-1.5 text-sm text-[var(--color-moon-400)] hover:text-[var(--color-crimson-300)] transition-colors mb-8"
      >
        <ArrowLeft size={15} /> Back to Guests
      </Link>

      <div className="flex gap-6 mb-8">
        <div className="w-24 h-24 rounded-lg bg-[var(--color-hellmouth-700)] flex items-center justify-center shrink-0 text-4xl text-[var(--color-hellmouth-500)]">
          {guest.name.charAt(0)}
        </div>
        <div>
          <h1 className="font-display text-3xl text-[var(--color-hellmouth-50)] mb-1">
            {guest.name}
          </h1>
          <p className="text-[var(--color-crimson-400)] mb-3">{guest.role}</p>
          {guest.socialLinks && (
            <div className="flex gap-3 text-xs">
              {guest.socialLinks.twitter && (
                <a href={guest.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                  className="text-[var(--color-moon-400)] hover:text-[var(--color-crimson-300)] transition-colors">
                  Twitter
                </a>
              )}
              {guest.socialLinks.instagram && (
                <a href={guest.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                  className="text-[var(--color-moon-400)] hover:text-[var(--color-crimson-300)] transition-colors">
                  Instagram
                </a>
              )}
              {guest.socialLinks.website && (
                <a href={guest.socialLinks.website} target="_blank" rel="noopener noreferrer"
                  className="text-[var(--color-moon-400)] hover:text-[var(--color-crimson-300)] transition-colors">
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="text-[var(--color-hellmouth-200)] leading-relaxed mb-10">
        {guest.bio}
      </p>

      {guestEvents.length > 0 && (
        <div>
          <h2 className="font-display text-sm tracking-widest uppercase text-[var(--color-moon-200)] mb-4">
            Appearing At
          </h2>
          <div className="flex flex-col gap-3">
            {guestEvents.map(event => {
              const room = rooms.find(r => r.id === event.roomId);
              return (
                <Link
                  key={event.id}
                  href={`/schedule/${event.id}`}
                  className="flex gap-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--color-crimson-700)] transition-colors"
                >
                  <div className="text-xs text-[var(--color-moon-400)] w-24 shrink-0 pt-0.5 tabular-nums">
                    {formatTimeRange(event.startTime, event.endTime)}
                  </div>
                  <div>
                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium mb-1 inline-block', categoryColors[event.category])}>
                      {categoryLabel[event.category]}
                    </span>
                    <p className="text-sm font-semibold text-[var(--color-hellmouth-50)]">{event.title}</p>
                    {room && <p className="text-xs text-[var(--color-moon-400)] mt-0.5">{room.name}</p>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
