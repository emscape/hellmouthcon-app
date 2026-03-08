import { events } from '@/data/events';
import { rooms } from '@/data/rooms';
import type { ConventionDay, ScheduleEvent, Room } from '@/types';

export function getEventsByDay(day: ConventionDay): ScheduleEvent[] {
  return events
    .filter(e => e.day === day)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function getEventsByRoom(roomId: string): ScheduleEvent[] {
  return events
    .filter(e => e.roomId === roomId)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function getGuestEvents(guestId: string): ScheduleEvent[] {
  return events.filter(e => e.guestIds?.includes(guestId));
}

export function getEventById(id: string): ScheduleEvent | undefined {
  return events.find(e => e.id === id);
}

export function getRoomById(id: string): Room | undefined {
  return rooms.find(r => r.id === id);
}

export function getCurrentAndNextEvents(roomId: string): {
  current: ScheduleEvent | null;
  next: ScheduleEvent | null;
} {
  const now = new Date();
  const roomEvents = getEventsByRoom(roomId);
  const current =
    roomEvents.find(
      e => new Date(e.startTime) <= now && new Date(e.endTime) > now,
    ) ?? null;
  const next =
    roomEvents.find(e => new Date(e.startTime) > now) ?? null;
  return { current, next };
}

export function groupEventsByTime(
  eventsToGroup: ScheduleEvent[],
): Map<string, ScheduleEvent[]> {
  const map = new Map<string, ScheduleEvent[]>();
  for (const event of eventsToGroup) {
    const key = event.startTime;
    const existing = map.get(key) ?? [];
    map.set(key, [...existing, event]);
  }
  return map;
}
