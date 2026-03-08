import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { EventCategory } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Los_Angeles',
  });
}

export function formatTimeRange(start: string, end: string): string {
  return `${formatTime(start)} – ${formatTime(end)}`;
}

export const categoryLabel: Record<EventCategory, string> = {
  panel: 'Panel',
  workshop: 'Workshop',
  'photo-op': 'Photo Op',
  autograph: 'Autograph',
  'fan-experience': 'Fan Experience',
  contest: 'Contest',
  meetup: 'Meetup',
  vendor: 'Vendor Hall',
  mixer: 'Mixer',
};

export const categoryColors: Record<EventCategory, string> = {
  panel: 'bg-indigo-800 text-indigo-100',
  workshop: 'bg-violet-800 text-violet-100',
  'photo-op': 'bg-violet-700 text-violet-100',
  autograph: 'bg-rose-800 text-rose-100',
  'fan-experience': 'bg-red-900 text-red-100',
  contest: 'bg-amber-800 text-amber-100',
  meetup: 'bg-emerald-900 text-emerald-100',
  vendor: 'bg-amber-900 text-amber-100',
  mixer: 'bg-yellow-800 text-yellow-100',
};
