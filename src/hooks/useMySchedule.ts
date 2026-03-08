'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'hellmouthcon-2026-my-schedule';

export function useMySchedule() {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedIds(new Set(JSON.parse(stored) as string[]));
      }
    } catch {
      // localStorage unavailable — fail silently
    }
    setIsHydrated(true);
  }, []);

  // Cross-tab sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setSavedIds(new Set(JSON.parse(e.newValue) as string[]));
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleSaved = useCallback((eventId: string) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const isSaved = useCallback(
    (eventId: string) => savedIds.has(eventId),
    [savedIds],
  );

  const clearAll = useCallback(() => {
    setSavedIds(new Set());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { savedIds, toggleSaved, isSaved, isHydrated, clearAll };
}
