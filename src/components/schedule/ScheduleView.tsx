'use client';

import { useState } from 'react';
import type { ScheduleEvent, Room, ConventionDay } from '@/types';
import { getEventsByDay } from '@/lib/schedule-helpers';
import EventCard from './EventCard';
import { cn } from '@/lib/utils';

const days: { value: ConventionDay; label: string; date: string }[] = [
  { value: 'saturday', label: 'Saturday', date: 'June 14' },
  { value: 'sunday', label: 'Sunday', date: 'June 15' },
];

interface Props {
  events: ScheduleEvent[];
  rooms: Room[];
}

export default function ScheduleView({ events, rooms }: Props) {
  const [activeDay, setActiveDay] = useState<ConventionDay>('saturday');
  const [activeRoom, setActiveRoom] = useState<string>('all');

  const dayEvents = getEventsByDay(activeDay);
  const filtered =
    activeRoom === 'all'
      ? dayEvents
      : dayEvents.filter(e => e.roomId === activeRoom);

  const roomsWithEvents = rooms.filter(r =>
    events.some(e => e.roomId === r.id),
  );

  return (
    <div>
      {/* Day tabs */}
      <div className="flex gap-2 mb-6">
        {days.map(day => (
          <button
            key={day.value}
            onClick={() => setActiveDay(day.value)}
            className={cn(
              'px-5 py-2.5 rounded font-display text-xs tracking-widest uppercase transition-colors',
              activeDay === day.value
                ? 'bg-[var(--color-crimson-700)] text-white'
                : 'border border-[var(--border)] text-[var(--color-hellmouth-200)] hover:border-[var(--color-crimson-700)]',
            )}
          >
            {day.label}
            <span className="block text-[0.65rem] opacity-70 normal-case font-sans tracking-normal">
              {day.date}
            </span>
          </button>
        ))}
      </div>

      {/* Room filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveRoom('all')}
          className={cn(
            'px-3 py-1 rounded text-xs transition-colors',
            activeRoom === 'all'
              ? 'bg-[var(--color-hellmouth-600)] text-white'
              : 'border border-[var(--border)] text-[var(--color-moon-200)] hover:border-[var(--color-hellmouth-600)]',
          )}
        >
          All Rooms
        </button>
        {roomsWithEvents.map(room => (
          <button
            key={room.id}
            onClick={() => setActiveRoom(room.id)}
            className={cn(
              'px-3 py-1 rounded text-xs transition-colors',
              activeRoom === room.id
                ? 'bg-[var(--color-hellmouth-600)] text-white'
                : 'border border-[var(--border)] text-[var(--color-moon-200)] hover:border-[var(--color-hellmouth-600)]',
            )}
          >
            {room.shortName}
          </button>
        ))}
      </div>

      {/* Events */}
      {filtered.length === 0 ? (
        <p className="text-[var(--color-moon-400)] text-sm py-8 text-center">
          No events for this selection.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(event => (
            <EventCard
              key={event.id}
              event={event}
              room={rooms.find(r => r.id === event.roomId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
