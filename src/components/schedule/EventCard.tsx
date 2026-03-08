'use client';

import Link from 'next/link';
import { Bookmark, BookmarkCheck, Ticket, Crown } from 'lucide-react';
import type { ScheduleEvent, Room } from '@/types';
import { categoryLabel, categoryColors, formatTimeRange, cn } from '@/lib/utils';
import { useMySchedule } from '@/hooks/useMySchedule';

interface Props {
  event: ScheduleEvent;
  room?: Room;
}

export default function EventCard({ event, room }: Props) {
  const { isSaved, toggleSaved } = useMySchedule();
  const saved = isSaved(event.id);

  return (
    <div
      className={cn(
        'flex gap-4 p-4 rounded-lg border transition-colors',
        event.vipOnly
          ? 'border-[var(--color-gold-700)] bg-[var(--color-hellmouth-800)]'
          : 'border-[var(--border)] bg-[var(--card)]',
      )}
    >
      {/* Time column */}
      <div className="w-24 shrink-0 text-xs text-[var(--color-moon-400)] pt-0.5 tabular-nums">
        {formatTimeRange(event.startTime, event.endTime)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span
            className={cn(
              'text-xs px-2 py-0.5 rounded-full font-medium',
              categoryColors[event.category],
            )}
          >
            {categoryLabel[event.category]}
          </span>
          {event.vipOnly && (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[var(--color-gold-700)] text-[var(--color-gold-100)]">
              <Crown size={10} /> VIP
            </span>
          )}
          {event.requiresTicket && (
            <span className="flex items-center gap-1 text-xs text-[var(--color-moon-400)]">
              <Ticket size={11} /> Ticket required
            </span>
          )}
        </div>

        <Link
          href={`/schedule/${event.id}`}
          className="block font-semibold text-[var(--color-hellmouth-50)] hover:text-[var(--color-crimson-300)] transition-colors mb-1 leading-snug"
        >
          {event.title}
        </Link>

        {room && (
          <p className="text-xs text-[var(--color-moon-400)]">{room.name}</p>
        )}
      </div>

      {/* Bookmark */}
      <button
        onClick={() => toggleSaved(event.id)}
        aria-label={saved ? `Remove ${event.title} from My Schedule` : `Save ${event.title} to My Schedule`}
        className="shrink-0 p-1 text-[var(--color-moon-400)] hover:text-[var(--color-crimson-400)] transition-colors"
      >
        {saved ? (
          <BookmarkCheck size={18} className="text-[var(--color-crimson-400)]" />
        ) : (
          <Bookmark size={18} />
        )}
      </button>
    </div>
  );
}
