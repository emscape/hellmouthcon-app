'use client';

import { useState, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { Room } from '@/types';
import VenueMap from './VenueMap';
import { cn } from '@/lib/utils';

// Leaflet requires window — must be dynamically imported with ssr: false
const CampusMap = dynamic(() => import('./CampusMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 rounded-lg border border-[var(--border)] bg-[var(--color-hellmouth-900)]">
      <span className="text-sm text-[var(--color-moon-400)]">Loading map…</span>
    </div>
  ),
});

type Tab = 'schematic' | 'campus';

interface Props {
  rooms: Room[];
}

export default function MapTabs({ rooms }: Props) {
  const [tab, setTab] = useState<Tab>('schematic');

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 mb-6 border-b border-[var(--border)]">
        <TabButton active={tab === 'schematic'} onClick={() => setTab('schematic')}>
          Floor Plan
        </TabButton>
        <TabButton active={tab === 'campus'} onClick={() => setTab('campus')}>
          Campus Map
          <span className="ml-1.5 text-[0.65rem] px-1.5 py-0.5 rounded bg-[var(--color-crimson-700)] text-white">
            GPS
          </span>
        </TabButton>
      </div>

      {tab === 'schematic' && <VenueMap rooms={rooms} />}

      {tab === 'campus' && (
        <div>
          <p className="text-xs text-[var(--color-moon-400)] mb-4">
            Live satellite view with building overlays. Tap a building to get walking directions
            from your location.{' '}
            <span className="text-[var(--color-moon-600)]">
              Building positions are approximate — use real on-site GPS coordinates for precision.
            </span>
          </p>
          <CampusMap rooms={rooms} />
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
        active
          ? 'border-[var(--color-crimson-500)] text-[var(--color-hellmouth-50)]'
          : 'border-transparent text-[var(--color-moon-400)] hover:text-[var(--color-moon-200)] hover:border-[var(--color-crimson-800)]',
      )}
    >
      {children}
    </button>
  );
}
