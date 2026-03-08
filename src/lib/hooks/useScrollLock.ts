import { useEffect, useMemo } from 'react';

interface UseScrollLockOptions {
  /**
   * The element whose scrolling should be locked.
   * Defaults to document.body.
   */
  target?: HTMLElement;
}

/**
 * useScrollLock
 *
 * Locks scrolling on the specified element (default: document.body)
 * by setting its overflow to "hidden".
 *
 * @param lock - whether scrolling should be locked
 * @param options - optional settings
 */
export function useScrollLock(lock: boolean, options?: UseScrollLockOptions): void {
  // Memoize the target element to avoid referencing document during SSR.
  const target = useMemo(() => {
    if (typeof document === 'undefined') {
      return null;
    }
    return options?.target || document.body;
  }, [options?.target]);

  useEffect(() => {
    // If we're not locking or if no target exists (e.g. SSR), do nothing.
    if (!lock || !target) return;

    // Save the original inline styles so we can restore them later.
    const originalOverflow = target.style.overflow;
    const originalPaddingRight = target.style.paddingRight;

    // Lock scrolling by hiding overflow.
    target.style.overflow = 'hidden';

    // Cleanup: restore the original styles.
    return () => {
      target.style.overflow = originalOverflow;
      target.style.paddingRight = originalPaddingRight;
    };
  }, [lock, target]);
}

