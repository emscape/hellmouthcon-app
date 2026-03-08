'use client';

import { useState, useRef, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
  label: string;
}

interface Shape {
  name: string;
  points: Point[];
}

const VIEWBOX_W = 890;
const VIEWBOX_H = 500;

export default function CalibratePage() {
  const [shapes, setShapes] = useState<Shape[]>([{ name: 'room-1', points: [] }]);
  const [activeShape, setActiveShape] = useState(0);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const getSvgCoords = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const scaleX = VIEWBOX_W / rect.width;
    const scaleY = VIEWBOX_H / rect.height;
    return {
      x: Math.round((e.clientX - rect.left) * scaleX),
      y: Math.round((e.clientY - rect.top) * scaleY),
    };
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const coords = getSvgCoords(e);
      if (!coords) return;
      const label = String.fromCharCode(65 + shapes[activeShape].points.length);
      setShapes(prev =>
        prev.map((s, i) =>
          i === activeShape ? { ...s, points: [...s.points, { ...coords, label }] } : s,
        ),
      );
    },
    [activeShape, getSvgCoords, shapes],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const coords = getSvgCoords(e);
      setCursor(coords);
    },
    [getSvgCoords],
  );

  const addShape = () => {
    const name = `room-${shapes.length + 1}`;
    setShapes(prev => [...prev, { name, points: [] }]);
    setActiveShape(shapes.length);
  };

  const removeLastPoint = () => {
    setShapes(prev =>
      prev.map((s, i) =>
        i === activeShape ? { ...s, points: s.points.slice(0, -1) } : s,
      ),
    );
  };

  const clearShape = () => {
    setShapes(prev => prev.map((s, i) => (i === activeShape ? { ...s, points: [] } : s)));
  };

  const toPath = (points: Point[]) => {
    if (points.length === 0) return '';
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  };

  const activePoints = shapes[activeShape]?.points ?? [];

  return (
    <div className="min-h-screen bg-[var(--color-hellmouth-950)] text-[var(--color-hellmouth-50)] p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-xl mb-1">SVG Overlay Calibration Tool</h1>
        <p className="text-xs text-[var(--color-moon-400)] mb-4">
          Click on the map image to place corner points for each building overlay. Copy the
          generated path strings into{' '}
          <code className="text-[var(--color-crimson-400)]">VenueMap.tsx</code>.
        </p>

        <div className="flex gap-4 flex-wrap mb-3">
          {/* Shape tabs */}
          <div className="flex gap-1 flex-wrap">
            {shapes.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveShape(i)}
                className={`px-3 py-1 text-xs rounded border transition-colors ${
                  i === activeShape
                    ? 'border-[var(--color-crimson-500)] text-white bg-[var(--color-crimson-900)]'
                    : 'border-[var(--border)] text-[var(--color-moon-300)] hover:border-[var(--color-crimson-700)]'
                }`}
              >
                {s.name} ({s.points.length}pts)
              </button>
            ))}
            <button
              onClick={addShape}
              className="px-3 py-1 text-xs rounded border border-dashed border-[var(--border)] text-[var(--color-moon-400)] hover:border-[var(--color-crimson-700)]"
            >
              + Add shape
            </button>
          </div>

          {/* Controls */}
          <div className="flex gap-2 ml-auto">
            <button
              onClick={removeLastPoint}
              disabled={activePoints.length === 0}
              className="px-3 py-1 text-xs rounded border border-[var(--border)] text-[var(--color-moon-300)] hover:border-[var(--color-crimson-700)] disabled:opacity-30"
            >
              Undo point
            </button>
            <button
              onClick={clearShape}
              disabled={activePoints.length === 0}
              className="px-3 py-1 text-xs rounded border border-[var(--border)] text-[var(--color-moon-300)] hover:border-[var(--color-crimson-700)] disabled:opacity-30"
            >
              Clear shape
            </button>
          </div>
        </div>

        {/* Rename active shape */}
        <div className="flex items-center gap-2 mb-3">
          <label className="text-xs text-[var(--color-moon-400)]">Shape name:</label>
          <input
            value={shapes[activeShape]?.name ?? ''}
            onChange={e =>
              setShapes(prev => prev.map((s, i) => (i === activeShape ? { ...s, name: e.target.value } : s)))
            }
            className="text-xs bg-[var(--color-hellmouth-900)] border border-[var(--border)] rounded px-2 py-1 text-white w-40"
          />
          <span className="text-xs text-[var(--color-moon-600)]">
            (use the svgPathId from rooms.ts, e.g. room-auditorium)
          </span>
        </div>

        {/* SVG Map */}
        <div className="relative rounded-lg border border-[var(--border)] overflow-hidden mb-4 cursor-crosshair">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
            className="w-full h-auto"
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setCursor(null)}
          >
            <image
              href="/venue-map.png"
              x="0"
              y="0"
              width={VIEWBOX_W}
              height={VIEWBOX_H}
              preserveAspectRatio="xMidYMid meet"
            />

            {/* All completed shapes (dimmed) */}
            {shapes.map((s, i) => {
              if (i === activeShape || s.points.length < 2) return null;
              return (
                <path
                  key={i}
                  d={toPath(s.points)}
                  fill="rgba(100,100,200,0.15)"
                  stroke="#6464c8"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                />
              );
            })}

            {/* Active shape polygon */}
            {activePoints.length >= 2 && (
              <path
                d={toPath(activePoints)}
                fill="rgba(232,48,80,0.2)"
                stroke="#e83050"
                strokeWidth="1.5"
              />
            )}

            {/* Active shape points */}
            {activePoints.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={5} fill="#e83050" stroke="white" strokeWidth={1.5} />
                <text
                  x={p.x + 7}
                  y={p.y - 4}
                  fontSize={10}
                  fill="white"
                  fontFamily="monospace"
                  style={{ textShadow: '0 1px 2px black' }}
                >
                  {p.label} ({p.x},{p.y})
                </text>
              </g>
            ))}

            {/* Preview line from last point to cursor */}
            {cursor && activePoints.length > 0 && (
              <line
                x1={activePoints[activePoints.length - 1].x}
                y1={activePoints[activePoints.length - 1].y}
                x2={cursor.x}
                y2={cursor.y}
                stroke="#e8305060"
                strokeWidth={1}
                strokeDasharray="4 3"
              />
            )}
          </svg>
        </div>

        {/* Cursor coords */}
        <p className="text-xs text-[var(--color-moon-500)] mb-4 font-mono">
          {cursor ? `cursor: x=${cursor.x} y=${cursor.y}` : 'Move mouse over map'}
        </p>

        {/* Generated output */}
        <div className="space-y-3">
          <h2 className="text-sm font-display text-[var(--color-moon-200)]">
            Generated paths — paste into <code className="text-[var(--color-crimson-400)]">VenueMap.tsx</code>
          </h2>
          <pre className="text-xs bg-[var(--color-hellmouth-900)] border border-[var(--border)] rounded p-4 overflow-x-auto text-[var(--color-moon-200)] whitespace-pre-wrap">
            {shapes
              .filter(s => s.points.length >= 2)
              .map(s => `'${s.name}': '${toPath(s.points)}',`)
              .join('\n') || '// Click points on the map to generate paths'}
          </pre>

          {/* Per-shape point list */}
          {shapes[activeShape]?.points.length > 0 && (
            <div>
              <h3 className="text-xs text-[var(--color-moon-400)] mb-1 font-display uppercase tracking-widest">
                Active shape points
              </h3>
              <pre className="text-xs bg-[var(--color-hellmouth-900)] border border-[var(--border)] rounded p-3 font-mono text-[var(--color-moon-300)]">
                {activePoints.map(p => `  ${p.label}: (${p.x}, ${p.y})`).join('\n')}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
