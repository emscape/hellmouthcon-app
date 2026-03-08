'use client';

import Link from 'next/link';
import { Bookmark, Calendar } from 'lucide-react';
import { useMySchedule } from '@/hooks/useMySchedule';
import { events } from '@/data/events';
import { rooms } from '@/data/rooms';
import { categoryLabel, categoryColors, formatTimeRange, cn } from '@/lib/utils';

export default function MySchedulePage() {
  const { savedIds, isHydrated, toggleSaved, clearAll } = useMySchedule();

  const savedEvents = events
    .filter(e => savedIds.has(e.id))
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const saturday = savedEvents.filter(e => e.day === 'saturday');
  const sunday = savedEvents.filter(e => e.day === 'sunday');

  if (!isHydrated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 rounded-lg bg-[var(--color-hellmouth-800)]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display text-3xl text-[var(--color-hellmouth-50)]">
          My Schedule
        </h1>
        {savedIds.size > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-[var(--color-moon-400)] hover:text-[var(--color-crimson-400)] transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      <p className="text-[var(--color-moon-200)] text-sm mb-10">
        {savedIds.size} event{savedIds.size !== 1 ? 's' : ''} saved
      </p>

      {savedIds.size === 0 ? (
        <div className="text-center py-16 border border-dashed border-[var(--border)] rounded-lg">
          <Bookmark size={32} className="text-[var(--color-moon-600)] mx-auto mb-4" />
          <p className="text-[var(--color-moon-400)] mb-6">
            You haven&apos;t saved any events yet.
          </p>
          <Link
            href="/schedule"
            className="flex items-center gap-2 text-sm text-[var(--color-crimson-400)] hover:text-[var(--color-crimson-300)] transition-colors justify-center"
          >
            <Calendar size={15} />
            Browse the Schedule
          </Link>
        </div>
      ) : (
        <div className="space-y-10">
          {saturday.length > 0 && (
            <DaySection
              label="Saturday, June 13"
              events={saturday}
              onRemove={toggleSaved}
            />
          )}
          {sunday.length > 0 && (
            <DaySection
              label="Sunday, June 14"
              events={sunday}
              onRemove={toggleSaved}
            />
          )}
        </div>
      )}
    </div>
  );
}

function DaySection({
  label,
  events: dayEvents,
  onRemove,
}: {
  label: string;
  events: typeof events;
  onRemove: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-xs tracking-widest uppercase text-[var(--color-moon-400)] mb-4">
        {label}
      </h2>
      <div className="flex flex-col gap-3">
        {dayEvents.map(event => {
          const room = rooms.find(r => r.id === event.roomId);
          return (
            <div
              key={event.id}
              className="flex gap-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--card)]"
            >
              <div className="w-24 shrink-0 text-xs text-[var(--color-moon-400)] pt-0.5 tabular-nums">
                {formatTimeRange(event.startTime, event.endTime)}
              </div>
              <div className="flex-1 min-w-0">
                <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium mb-1 inline-block', categoryColors[event.category])}>
                  {categoryLabel[event.category]}
                </span>
                <Link
                  href={`/schedule/${event.id}`}
                  className="block font-semibold text-sm text-[var(--color-hellmouth-50)] hover:text-[var(--color-crimson-300)] transition-colors leading-snug"
                >
                  {event.title}
                </Link>
                {room && (
                  <p className="text-xs text-[var(--color-moon-400)] mt-0.5">{room.name}</p>
                )}
              </div>
              <button
                onClick={() => onRemove(event.id)}
                aria-label={`Remove ${event.title} from My Schedule`}
                className="shrink-0 p-1 text-[var(--color-crimson-400)] hover:text-[var(--color-crimson-300)] transition-colors"
              >
                <Bookmark size={17} fill="currentColor" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
