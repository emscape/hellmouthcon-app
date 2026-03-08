import type { Room } from '@/types';

// All GPS coordinates confirmed on-site.
// Bldg B is split at the midline between its north (vendor hall) and south (autograph) halves.
// Bldg A polygon is shared by both rooms inside it (Little Theater + Photo Studio).

// Bldg B midline interpolation (t=0.5 on each vertical edge):
const blgBMidW: [number, number] = [
  (33.82953639154701 + 33.82924586154599) / 2,
  (-118.32118817230042 + -118.32156639629012) / 2,
]; // [33.82939, -118.32138]
const blgBMidE: [number, number] = [
  (33.82936430551749 + 33.82895209346322) / 2,
  (-118.32085773112705 + -118.32126483367746) / 2,
]; // [33.82916, -118.32106]

export const rooms: Room[] = [
  {
    id: 'main-auditorium',
    name: 'Main Auditorium',
    shortName: 'Auditorium',
    description: 'Bldg C — Main stage panels, Q&As with cast, and opening/closing ceremonies. VIP front rows reserved.',
    capacity: 800,
    floor: 'ground',
    svgPathId: 'room-auditorium',
    color: 'bg-rose-900',
    entranceCoords: [33.82991083508827, -118.32061733996542],
    polygonCoords: [
      [33.83012341631142, -118.32076486011805],
      [33.82983272526931, -118.32036491909408],
      [33.82967710270245, -118.32056745443718],
      [33.83001779774448, -118.32090669320493],
    ],
  },
  {
    id: 'sunnydale-mall',
    name: 'Sunnydale Mall',
    shortName: 'Vendor Hall',
    description: 'Bldg B (Main Gym) north half — Artist alley, merchandise, vendor booths, concessions, and Fandom Charities merch.',
    floor: 'ground',
    svgPathId: 'room-vendor-hall',
    color: 'bg-amber-900',
    entranceCoords: [33.82944, -118.32112],
    polygonCoords: [
      [33.82953639154701, -118.32118817230042],
      [33.82936430551749, -118.32085773112705],
      blgBMidE,
      blgBMidW,
    ],
  },
  {
    id: 'autograph-alley',
    name: 'Autograph Alley',
    shortName: 'Autographs',
    description: 'Bldg B (Main Gym) south half — Guest autograph signing sessions.',
    floor: 'ground',
    svgPathId: 'room-autograph',
    color: 'bg-pink-900',
    entranceCoords: [33.82919, -118.32132],
    polygonCoords: [
      blgBMidW,
      blgBMidE,
      [33.82895209346322, -118.32126483367746],
      [33.82924586154599, -118.32156639629012],
    ],
  },
  {
    id: 'panel-room-a',
    name: 'Annex-Café',
    shortName: 'Annex',
    description: 'Bldg D — Fan Experiences, specialty tableaux, and intimate ticketed interactions with guests.',
    floor: 'ground',
    svgPathId: 'room-panel-a',
    color: 'bg-indigo-900',
    entranceCoords: [33.82810, -118.31952],
    polygonCoords: [
      [33.828535062109516, -118.31977474844602],
      [33.828527669453514, -118.31931434849898],
      [33.8276722707506,   -118.31926453370644],
      [33.82764893540865,  -118.31944722203754],
    ],
  },
  {
    id: 'panel-room-b',
    name: 'Little Theater',
    shortName: 'Little Theater',
    description: 'Bldg A (2nd floor) — Panel Room 2, workshops, and smaller programming. Elevator and stair access.',
    capacity: 150,
    floor: 'second',
    svgPathId: 'room-panel-b',
    color: 'bg-indigo-800',
    entranceCoords: [33.83049472281359, -118.3215552028273],
    polygonCoords: [
      [33.831018578780224, -118.32137581161213],
      [33.83070320663068,  -118.32104001548036],
      [33.83047409487107,  -118.32152836929043],
      [33.83071699650046,  -118.32178387206015],
    ],
  },
  {
    id: 'photo-op-room',
    name: 'Photo Studio',
    shortName: 'Photo Ops',
    description: 'Bldg A — Professional photo opportunities with guests.',
    floor: 'ground',
    svgPathId: 'room-photo-op',
    color: 'bg-violet-900',
    entranceCoords: [33.83071788600666, -118.32156615196538],
    // Shares Bldg A footprint with Little Theater
    polygonCoords: [
      [33.831018578780224, -118.32137581161213],
      [33.83070320663068,  -118.32104001548036],
      [33.83047409487107,  -118.32152836929043],
      [33.83071699650046,  -118.32178387206015],
    ],
  },
  {
    id: 'registration',
    name: 'Registration',
    shortName: 'Registration',
    description: 'Bldg A lobby — Badge pickup, info desk, and lost & found.',
    floor: 'ground',
    svgPathId: 'room-registration',
    color: 'bg-blue-900',
    entranceCoords: [33.83085813057013, -118.32118847170871],
  },
  {
    id: 'school-courtyard',
    name: 'School Courtyard',
    shortName: 'Courtyard',
    description: 'Outdoor courtyard between Bldg A and the Main Gym — general gathering space.',
    floor: 'ground',
    svgPathId: 'room-school-courtyard',
    color: 'bg-emerald-800',
  },
  {
    id: 'outdoor-courtyard',
    name: 'Zone A — Double Meat Palace',
    shortName: 'Zone A',
    description: 'Outdoor area near Watson Ave — Food trucks and tables.',
    floor: 'ground',
    svgPathId: 'room-courtyard',
    color: 'bg-emerald-900',
    entranceCoords: [33.82958827018494, -118.32163080550671],
    // Zone A is an open outdoor area — marker only, no polygon
  },
];
