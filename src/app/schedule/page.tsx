import type { Metadata } from 'next';
import { events } from '@/data/events';
import { rooms } from '@/data/rooms';
import ScheduleView from '@/components/schedule/ScheduleView';

export const metadata: Metadata = {
  title: 'Schedule — HellmouthCon 2026',
  description: 'Full programming schedule for HellmouthCon 2026.',
};

export default function SchedulePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl text-[var(--color-hellmouth-50)] mb-2">
        Schedule
      </h1>
      <p className="text-[var(--color-moon-200)] mb-2 text-sm">
        June 13–14, 2026 · Torrance High School · All times Pacific
      </p>
      <div className="mb-8 rounded-md border border-[var(--color-hellmouth-700)] bg-[var(--color-hellmouth-950)] px-4 py-3 text-sm text-[var(--color-hellmouth-200)]">
        <strong>Note:</strong> The schedule below is from HellmouthCon 2025 and is shown for reference only. The 2026 schedule is coming soon!
      </div>
      <ScheduleView events={events} rooms={rooms} />
    </div>
  );
}
