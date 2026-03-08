import type { Metadata } from 'next';
import MapTabs from '@/components/map/MapTabs';
import { rooms } from '@/data/rooms';

export const metadata: Metadata = {
  title: 'Venue Map — HellmouthCon 2026',
  description: 'Navigate Torrance High School (Sunnydale High) during HellmouthCon 2026.',
};

export default function MapPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl text-[var(--color-hellmouth-50)] mb-2">
        Venue Map
      </h1>
      <p className="text-[var(--color-moon-200)] mb-8 text-sm">
        Torrance High School · 2200 W Carson St, Torrance CA · Tap a room for details.
      </p>
      <MapTabs rooms={rooms} />
    </div>
  );
}
