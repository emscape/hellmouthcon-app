'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer({ target }: { target: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft(target));
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!timeLeft) return null;

  const past = new Date(target).getTime() < Date.now();
  if (past) {
    return (
      <p className="text-[var(--color-crimson-400)] font-display tracking-widest text-lg uppercase">
        The Hellmouth is Open
      </p>
    );
  }

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-4">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <span className="font-display text-3xl md:text-4xl text-[var(--color-crimson-400)] tabular-nums w-16 text-center">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-[var(--color-moon-400)] text-xs tracking-widest uppercase mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
