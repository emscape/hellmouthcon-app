export type EventCategory =
  | 'panel'
  | 'workshop'
  | 'photo-op'
  | 'autograph'
  | 'fan-experience'
  | 'contest'
  | 'meetup'
  | 'vendor'
  | 'mixer';

export type ConventionDay = 'saturday' | 'sunday';

export interface ScheduleEvent {
  id: string;
  title: string;
  description: string;
  day: ConventionDay;
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
  roomId: string;
  category: EventCategory;
  guestIds?: string[];
  requiresTicket?: boolean;
  vipOnly?: boolean;
  tags?: string[];
}

export interface Guest {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  type: 'cast' | 'crew' | 'author' | 'artist' | 'musician' | 'other';
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
}

export interface Room {
  id: string;
  name: string;
  shortName: string;
  description: string;
  capacity?: number;
  floor: 'ground' | 'second';
  svgPathId: string;
  color: string;
  /** GPS coordinates [lat, lng] for the room entrance marker on the campus map.
   *  TODO: Replace placeholder values with real on-site measurements. */
  entranceCoords?: [number, number];
  /** GPS polygon [lat, lng][] outlining the room/building footprint.
   *  TODO: Replace placeholder values with real on-site measurements. */
  polygonCoords?: [number, number][];
}
