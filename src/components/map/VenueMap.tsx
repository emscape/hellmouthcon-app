'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Room } from '@/types';
import { cn } from '@/lib/utils';

interface Props {
  rooms: Room[];
}

// Overlay paths traced via /calibrate over the official venue-map.png.
// viewBox matches the image at 890×500.
// If building overlays drift after the image is updated, re-run /calibrate.
const roomPaths: Record<string, string> = {
  // Bldg A — Little Theater (2nd floor, upper strip)
  'room-panel-b':     'M 634 245 L 634 260 L 678 258 L 677 243 Z',
  // Bldg A — Photo Studio (ground floor, right strip)
  'room-photo-op':    'M 677 245 L 679 286 L 688 288 L 687 248 Z',
  // Registration (Bldg A lobby area)
  'room-registration':'M 626 288 L 629 311 L 686 310 L 687 289 Z',
  // Bldg D — Annex-Café
  'room-panel-a':     'M 155 141 L 134 168 L 232 260 L 288 216 L 271 204 L 243 228 Z',
  // Bldg B south — Autograph Alley
  'room-autograph':   'M 459 135 L 460 158 L 512 156 L 514 135 Z',
  // Bldg B north — Sunnydale Mall (vendor hall)
  'room-vendor-hall': 'M 461 156 L 513 157 L 514 187 L 459 187 Z',
  // Bldg C — Main Auditorium
  'room-auditorium':  'M 473 252 L 534 252 L 535 275 L 474 276 Z',
  // School courtyard (outdoor area near Bldg A)
  'room-school-courtyard': 'M 638 259 L 637 285 L 677 287 L 674 260 Z',
  // Zone A — Double Meat Palace (outdoor food trucks)
  'room-courtyard':   'M 532 127 L 531 165 L 576 161 L 569 132 Z',
};

// Active fill colors (shown at 50% opacity over the image)
const roomFillsActive: Record<string, string> = {
  'room-panel-b':     '#3730a3',
  'room-photo-op':    '#5b21b6',
  'room-registration':'#1e40af',
  'room-panel-a':     '#1e3a8a',
  'room-autograph':        '#9f1239',
  'room-vendor-hall':      '#92400e',
  'room-auditorium':       '#991b1b',
  'room-school-courtyard': '#065f46',
  'room-courtyard':        '#14532d',
};

export default function VenueMap({ rooms }: Props) {
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  const activeRoom = activeRoomId
    ? rooms.find(r => r.id === activeRoomId)
    : null;

  return (
    <div>
      <div className="relative rounded-lg border border-[var(--border)] overflow-hidden">
        <svg
          viewBox="0 0 890 500"
          className="w-full h-auto"
          role="img"
          aria-label="HellmouthCon venue map of Torrance High School"
        >
          {/* Official venue map as background */}
          <image
            href="/venue-map.png"
            x="0"
            y="0"
            width="890"
            height="500"
            preserveAspectRatio="xMidYMid meet"
          />

          {/* Clickable building overlays */}
          {rooms.map(room => {
            const path = roomPaths[room.svgPathId];
            if (!path) return null;

            const isActive = activeRoomId === room.id;

            return (
              <path
                key={room.id}
                d={path}
                fill={roomFillsActive[room.svgPathId] ?? '#7f1d1d'}
                fillOpacity={isActive ? 0.5 : 0.15}
                stroke={isActive ? '#e83050' : '#e8305080'}
                strokeWidth={isActive ? 2.5 : 1.5}
                strokeDasharray={isActive ? undefined : '5 3'}
                className="cursor-pointer transition-all duration-150"
                onClick={() =>
                  setActiveRoomId(prev => (prev === room.id ? null : room.id))
                }
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveRoomId(prev => (prev === room.id ? null : room.id));
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={room.name}
                aria-pressed={isActive}
              />
            );
          })}
        </svg>
      </div>

      {/* Room detail card */}
      {activeRoom && (
        <div className="mt-4 p-5 rounded-lg border border-[var(--color-crimson-700)] bg-[var(--card)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-lg text-[var(--color-hellmouth-50)] mb-1">
                {activeRoom.name}
              </h2>
              <p className="text-sm text-[var(--color-hellmouth-200)] mb-3">
                {activeRoom.description}
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-[var(--color-moon-400)]">
                {activeRoom.capacity && (
                  <span>Capacity: ~{activeRoom.capacity}</span>
                )}
                <span className="capitalize">{activeRoom.floor} floor</span>
              </div>
            </div>
            <Link
              href={`/schedule?room=${activeRoom.id}`}
              className="shrink-0 text-xs text-[var(--color-crimson-400)] hover:text-[var(--color-crimson-300)] transition-colors whitespace-nowrap"
            >
              View events →
            </Link>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6">
        <p className="text-xs text-[var(--color-moon-400)] mb-3 font-display tracking-widest uppercase">
          Rooms
        </p>
        <div className="flex flex-wrap gap-3">
          {rooms.map(room => (
            <button
              key={room.id}
              onClick={() =>
                setActiveRoomId(prev => (prev === room.id ? null : room.id))
              }
              className={cn(
                'flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-colors',
                activeRoomId === room.id
                  ? 'border-[var(--color-crimson-600)] text-[var(--color-hellmouth-50)]'
                  : 'border-[var(--border)] text-[var(--color-moon-200)] hover:border-[var(--color-crimson-700)]',
              )}
            >
              <span className={cn('w-2 h-2 rounded-full', room.color)} />
              {room.shortName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
