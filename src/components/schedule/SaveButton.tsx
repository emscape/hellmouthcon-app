'use client';

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useMySchedule } from '@/hooks/useMySchedule';

interface Props {
  eventId: string;
  eventTitle: string;
}

export default function SaveButton({ eventId, eventTitle }: Props) {
  const { isSaved, toggleSaved } = useMySchedule();
  const saved = isSaved(eventId);

  return (
    <button
      onClick={() => toggleSaved(eventId)}
      aria-label={saved ? `Remove ${eventTitle} from My Schedule` : `Add ${eventTitle} to My Schedule`}
      className="flex items-center gap-2 px-5 py-2.5 rounded border border-[var(--border)] text-sm text-[var(--color-hellmouth-200)] hover:border-[var(--color-crimson-600)] hover:text-[var(--color-crimson-300)] transition-colors"
    >
      {saved ? (
        <>
          <BookmarkCheck size={16} className="text-[var(--color-crimson-400)]" />
          Saved to My Schedule
        </>
      ) : (
        <>
          <Bookmark size={16} />
          Add to My Schedule
        </>
      )}
    </button>
  );
}
