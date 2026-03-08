'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Room } from '@/types';
import { cn } from '@/lib/utils';

interface Props {
  rooms: Room[];
}

// Polygon fill colors per room (semi-transparent for map overlay)
const polygonColors: Record<string, string> = {
  'main-auditorium':  '#7f1d1d',
  'sunnydale-mall':   '#78350f',
  'panel-room-a':     '#3730a3',
  'panel-room-b':     '#3730a3',
  'autograph-alley':  '#881337',
  'photo-op-room':    '#5b21b6',
  'outdoor-courtyard':'#14532d',
};

const polygonActiveColors: Record<string, string> = {
  'main-auditorium':  '#ef4444',
  'sunnydale-mall':   '#f59e0b',
  'panel-room-a':     '#818cf8',
  'panel-room-b':     '#818cf8',
  'autograph-alley':  '#fb7185',
  'photo-op-room':    '#a78bfa',
  'outdoor-courtyard':'#34d399',
};

type GeolocationStatus = 'idle' | 'requesting' | 'active' | 'denied' | 'unavailable';

export default function CampusMap({ rooms }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<import('leaflet').Map | null>(null);
  const polygonRefs = useRef<Map<string, import('leaflet').Polygon>>(new Map());
  const markerRefs = useRef<Map<string, import('leaflet').Marker>>(new Map());
  const userMarkerRef = useRef<import('leaflet').CircleMarker | null>(null);
  const directionLineRef = useRef<import('leaflet').Polyline | null>(null);

  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [geoStatus, setGeoStatus] = useState<GeolocationStatus>('idle');
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const activeRoom = activeRoomId ? rooms.find(r => r.id === activeRoomId) : null;

  // Initialize Leaflet map once
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    let cancelled = false;

    import('leaflet').then(L => {
      if (cancelled || !mapRef.current || leafletMapRef.current) return;

      // Start with a temporary center; fitBounds() below overrides this once
      // polygons are added. All GPS data is now confirmed on-site.
      const map = L.map(mapRef.current, {
        center: [33.82991083508827, -118.32061733996542],
        zoom: 17,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 20,
      }).addTo(map);

      leafletMapRef.current = map;
      setIsMapReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Add room polygons and markers after map is ready
  useEffect(() => {
    if (!isMapReady || !leafletMapRef.current) return;

    import('leaflet').then(L => {
      const map = leafletMapRef.current!;

      const allLatLngs: [number, number][] = [];

      rooms.forEach(room => {
        if (!room.entranceCoords) return;

        const labelIcon = L.divIcon({
          className: '',
          html: `<div style="
            background: rgba(255,252,255,0.93);
            border: 1px solid #6b0030;
            border-radius: 4px;
            padding: 2px 7px;
            color: #1a0025;
            font-size: 10px;
            font-family: serif;
            font-weight: 600;
            white-space: nowrap;
            pointer-events: none;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          ">${room.shortName}</div>`,
          iconAnchor: [0, 0],
        });

        if (room.polygonCoords) {
          const fillColor = polygonColors[room.id] ?? '#4a0030';
          const polygon = L.polygon(room.polygonCoords, {
            color: '#e83050',
            weight: 1.5,
            fillColor,
            fillOpacity: 0.5,
            interactive: true,
          }).addTo(map);
          polygon.on('click', () => {
            setActiveRoomId(prev => (prev === room.id ? null : room.id));
          });
          polygonRefs.current.set(room.id, polygon);
          room.polygonCoords.forEach(c => allLatLngs.push(c));
        }

        const marker = L.marker(room.entranceCoords, { icon: labelIcon, interactive: true })
          .addTo(map);
        marker.on('click', () => {
          setActiveRoomId(prev => (prev === room.id ? null : room.id));
        });
        markerRefs.current.set(room.id, marker);
        allLatLngs.push(room.entranceCoords);
      });

      // Fit the map to show all confirmed buildings
      if (allLatLngs.length > 0) {
        map.fitBounds(L.latLngBounds(allLatLngs), { padding: [32, 32] });
      }
    });

    // Cleanup on unmount
    return () => {
      polygonRefs.current.forEach(p => p.remove());
      markerRefs.current.forEach(m => m.remove());
      polygonRefs.current.clear();
      markerRefs.current.clear();
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapReady]);

  // Update polygon styles when active room changes
  useEffect(() => {
    if (!isMapReady) return;

    polygonRefs.current.forEach((polygon, roomId) => {
      const isActive = roomId === activeRoomId;
      polygon.setStyle({
        color: isActive ? '#f472b6' : '#e83050',
        weight: isActive ? 2.5 : 1.5,
        fillColor: isActive
          ? (polygonActiveColors[roomId] ?? '#7f1d1d')
          : (polygonColors[roomId] ?? '#4a0030'),
        fillOpacity: isActive ? 0.7 : 0.5,
      });
    });

    // Draw direction line from user to active room
    import('leaflet').then(L => {
      const map = leafletMapRef.current;
      if (!map) return;

      if (directionLineRef.current) {
        directionLineRef.current.remove();
        directionLineRef.current = null;
      }

      if (userCoords && activeRoom?.entranceCoords) {
        directionLineRef.current = L.polyline(
          [userCoords, activeRoom.entranceCoords],
          { color: '#e83050', weight: 2, dashArray: '6 4', opacity: 0.8 }
        ).addTo(map);
      }
    });
  }, [activeRoomId, userCoords, activeRoom, isMapReady]);

  // Update user location marker
  useEffect(() => {
    if (!isMapReady || !userCoords) return;

    import('leaflet').then(L => {
      const map = leafletMapRef.current;
      if (!map) return;

      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng(userCoords);
      } else {
        userMarkerRef.current = L.circleMarker(userCoords, {
          radius: 8,
          color: '#fff',
          weight: 2,
          fillColor: '#3b82f6',
          fillOpacity: 1,
        })
          .bindTooltip('You are here', { permanent: false, direction: 'top' })
          .addTo(map);
      }
    });
  }, [userCoords, isMapReady]);

  function requestGeolocation() {
    if (!navigator.geolocation) {
      setGeoStatus('unavailable');
      return;
    }
    setGeoStatus('requesting');

    const watchId = navigator.geolocation.watchPosition(
      pos => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserCoords(coords);
        setGeoStatus('active');
        // Pan to user on first fix
        if (leafletMapRef.current && geoStatus !== 'active') {
          leafletMapRef.current.panTo(coords);
        }
      },
      err => {
        console.warn('Geolocation error:', err);
        setGeoStatus(err.code === 1 ? 'denied' : 'unavailable');
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
    );

    // Store watchId for cleanup via closure — component unmount clears it
    return () => navigator.geolocation.clearWatch(watchId);
  }

  function panToRoom(room: Room) {
    if (room.entranceCoords && leafletMapRef.current) {
      leafletMapRef.current.panTo(room.entranceCoords);
    }
  }

  function getBearing(): number | null {
    if (!userCoords || !activeRoom?.entranceCoords) return null;
    const [lat1, lng1] = userCoords;
    const [lat2, lng2] = activeRoom.entranceCoords;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const y = Math.sin(dLng) * Math.cos((lat2 * Math.PI) / 180);
    const x =
      Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
      Math.sin((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.cos(dLng);
    return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  }

  function getDistance(): string | null {
    if (!userCoords || !activeRoom?.entranceCoords) return null;
    const [lat1, lng1] = userCoords;
    const [lat2, lng2] = activeRoom.entranceCoords;
    const R = 6371000; // metres
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;
    const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const d = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return d < 100 ? `${Math.round(d)} m` : `${(d / 1000).toFixed(2)} km`;
  }

  const bearing = getBearing();
  const distance = getDistance();

  return (
    <div className="space-y-4">
      {/* Controls row */}
      <div className="flex items-center gap-3 flex-wrap">
        {geoStatus === 'idle' && (
          <button
            onClick={requestGeolocation}
            className="flex items-center gap-2 text-xs px-3 py-1.5 rounded border border-[var(--color-crimson-700)] text-[var(--color-crimson-300)] hover:bg-[var(--color-crimson-700)]/20 transition-colors"
          >
            <span className="text-base leading-none">📍</span>
            Show my location
          </button>
        )}
        {geoStatus === 'requesting' && (
          <span className="text-xs text-[var(--color-moon-400)]">Locating…</span>
        )}
        {geoStatus === 'active' && (
          <span className="flex items-center gap-1.5 text-xs text-[var(--color-moon-400)]">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse inline-block" />
            Location active
          </span>
        )}
        {geoStatus === 'denied' && (
          <span className="text-xs text-[var(--color-moon-400)]">
            Location access denied — enable in browser settings to use navigation.
          </span>
        )}
        {geoStatus === 'unavailable' && (
          <span className="text-xs text-[var(--color-moon-400)]">
            Geolocation not available on this device.
          </span>
        )}
        <span className="text-xs text-[var(--color-moon-600)]">Tap a building to select it.</span>
      </div>

      {/* Map container */}
      <div
        className="relative rounded-lg border border-[var(--border)] overflow-hidden"
        style={{ height: '420px' }}
      >
        <div ref={mapRef} style={{ height: '100%', width: '100%', background: '#0d0008' }} />
        {!isMapReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-hellmouth-900)]">
            <span className="text-sm text-[var(--color-moon-400)]">Loading map…</span>
          </div>
        )}
      </div>

      {/* Active room detail + navigation */}
      {activeRoom && (
        <div className="p-5 rounded-lg border border-[var(--color-crimson-700)] bg-[var(--card)]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-lg text-[var(--color-hellmouth-50)] mb-1">
                {activeRoom.name}
              </h2>
              <p className="text-sm text-[var(--color-hellmouth-200)] mb-3">
                {activeRoom.description}
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-[var(--color-moon-400)]">
                {activeRoom.capacity && <span>Capacity: ~{activeRoom.capacity}</span>}
                <span className="capitalize">{activeRoom.floor} floor</span>
              </div>

              {/* Navigation callout */}
              {geoStatus === 'active' && bearing !== null && (
                <div className="mt-4 flex items-center gap-4 p-3 rounded-lg bg-[var(--color-hellmouth-900)] border border-[var(--border)]">
                  {/* Compass arrow */}
                  <div
                    className="shrink-0 text-2xl"
                    style={{ transform: `rotate(${bearing}deg)`, display: 'inline-block' }}
                    aria-label={`Direction: ${Math.round(bearing)}°`}
                  >
                    ↑
                  </div>
                  <div className="text-xs text-[var(--color-moon-200)] space-y-0.5">
                    <p className="font-semibold text-[var(--color-hellmouth-50)]">
                      Head {bearingToCardinal(bearing)}
                    </p>
                    {distance && <p>{distance} away</p>}
                  </div>
                  <button
                    onClick={() => panToRoom(activeRoom)}
                    className="ml-auto shrink-0 text-xs text-[var(--color-crimson-400)] hover:text-[var(--color-crimson-300)] transition-colors"
                  >
                    Center map
                  </button>
                </div>
              )}

              {geoStatus === 'idle' && (
                <button
                  onClick={requestGeolocation}
                  className="mt-3 text-xs text-[var(--color-crimson-400)] hover:text-[var(--color-crimson-300)] transition-colors"
                >
                  Enable location for directions →
                </button>
              )}
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
      <div>
        <p className="text-xs text-[var(--color-moon-400)] mb-3 font-display tracking-widest uppercase">
          Rooms
        </p>
        <div className="flex flex-wrap gap-3">
          {rooms.map(room => (
            <button
              key={room.id}
              onClick={() => {
                setActiveRoomId(prev => (prev === room.id ? null : room.id));
                if (room.id !== activeRoomId) panToRoom(room);
              }}
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

      <p className="text-xs text-[var(--color-moon-600)]">
        Building locations are approximate.{' '}
        <span className="text-[var(--color-moon-500)]">
          Map data © OpenStreetMap contributors.
        </span>
      </p>
    </div>
  );
}

function bearingToCardinal(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}
