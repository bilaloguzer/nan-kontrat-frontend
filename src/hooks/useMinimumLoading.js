import { useEffect, useState } from "react";

/**
 * Keeps a loading flag true for at least `minimumMs` after mount,
 * so a fast response does not flash the loading screen.
 * @param {boolean} loading - the real loading state
 * @param {number} [minimumMs=400]
 * @returns {boolean} true while the loader should stay visible
 */
export const useMinimumLoading = (loading, minimumMs = 400) => {
  const [minimumElapsed, setMinimumElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinimumElapsed(true), minimumMs);
    return () => clearTimeout(timer);
  }, [minimumMs]);

  return loading || !minimumElapsed;
};
