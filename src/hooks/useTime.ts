// src/hooks/useTime.ts

import { useSyncExternalStore } from 'react';
import timeStore from '../utils/timeStore';

/**
 * Custom hook to get the current time using useSyncExternalStore.
 * @returns The current Date object.
 */
export default function useTime(): Date {
  return useSyncExternalStore(
    timeStore.subscribe.bind(timeStore),    // Subscription function
    timeStore.getSnapshot.bind(timeStore),  // Function to get the current time
    timeStore.getServerSnapshot.bind(timeStore) // Optional: Function to get server snapshot
  );
}