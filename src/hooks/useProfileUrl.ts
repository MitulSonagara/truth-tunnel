"use client"

import { useMemo } from 'react';

export function useProfileUrl(username?: string): string | undefined {
  return useMemo(() => {
    // Check if running in a browser
    if (typeof window === 'undefined' || !username) return undefined;

    return `${window.location.protocol}//${window.location.host}/u/${username}`;
  }, [username]);
}
