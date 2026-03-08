import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, MapPin, Ticket, Crown } from 'lucide-react';
import { events } from '@/data/events';
import { rooms, guests as allGuests } from '@/data';
import { categoryLabel, categoryColors, formatTimeRange, cn } from '@/lib/utils';
import SaveButton from '@/components/schedule/SaveButton';

export function generateStaticParams() {
  return events.map(e => ({ eventId: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ eventId: string }>;
}): Promise<Metadata> {
  const { eventId } = await params;
  const event = events.find(e => e.id === eventId);
  return {
    title: event ? `${event.title} — HellmouthCon 2026` : 'Event — HellmouthCon 2026',
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const event = events.find(e => e.id === eventId);
  if (!event) notFound();

  const room = rooms.find(r => r.id === event.roomId);
  const eventGuests = (event.guestIds ?? [])
    .map(id => allGuests.find(g => g.id === id))
    .filter(Boolean);

  const dayLabel = event.day === 'saturday' ? 'Saturday, June 13' : 'Sunday, June 14';

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link
        href="/schedule"
        className="flex items-center gap-1.5 text-sm text-[var(--color-moon-400)] hover:text-[var(--color-crimson-300)] transition-colors mb-8"
      >
        <ArrowLeft size={15} /> Back to Schedule
      </Link>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', categoryColors[event.category])}>
          {categoryLabel[event.category]}
        </span>
        {event.vipOnly && (
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[var(--color-gold-700)] text-[var(--color-gold-100)]">
            <Crown size={10} /> VIP Only
          </span>
        )}
        {event.requiresTicket && (
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--color-moon-200)]">
            <Ticket size={10} /> Ticket Required
          </span>
        )}
      </div>

      <h1 className="font-display text-3xl text-[var(--color-hellmouth-50)] mb-6 leading-tight">
        {event.title}
      </h1>

      <div className="flex flex-col gap-3 mb-6 text-sm text-[var(--color-moon-200)]">
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-[var(--color-moon-400)] shrink-0" />
          {dayLabel} · {formatTimeRange(event.startTime, event.endTime)}
        </div>
        {room && (
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-[var(--color-moon-400)] shrink-0" />
            {room.name}
          </div>
        )}
      </div>

      <p className="text-[var(--color-hellmouth-200)] leading-relaxed mb-8">
        {event.description}
      </p>

      <SaveButton eventId={event.id} eventTitle={event.title} />

      {eventGuests.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-sm tracking-widest uppercase text-[var(--color-moon-200)] mb-4">
            Featuring
          </h2>
          <div className="flex flex-col gap-3">
            {eventGuests.map(guest => (
              guest && (
                <Link
                  key={guest.id}
                  href={`/guests/${guest.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--color-crimson-700)] transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-hellmouth-50)]">{guest.name}</p>
                    <p className="text-xs text-[var(--color-moon-400)]">{guest.role}</p>
                  </div>
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
