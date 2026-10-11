/**
 * @file src/utils/performance.ts
 * @description Performance optimization utilities, frame timing, and debounce helper.
 */

/**
 * Creates a debounced function that delays invoking func until wait milliseconds.
 *
 * @param func - Function to debounce
 * @param wait - Milliseconds to delay
 * @returns Debounced function with cancel method
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait = 150
): { (...args: Parameters<T>): void; cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, wait);
  };

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}

/**
 * Executes a callback within the next animation frame for smooth UI updates.
 *
 * @param callback - Callback to run on next frame
 * @returns Cleanup function to cancel animation frame
 */
export function scheduleOnNextFrame(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const frameId = requestAnimationFrame(callback);
  return () => cancelAnimationFrame(frameId);
}
