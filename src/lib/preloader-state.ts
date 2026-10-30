/**
 * Single source of truth for "has the intro finished".
 *
 * This deliberately lives in module scope rather than on a DOM attribute or a
 * window event. `<body data-loading>` was rendered by React, so any re-render
 * reset it to "true" — which re-locked scrolling through CSS and made late
 * subscribers read a stale value. A module-level flag survives re-renders,
 * StrictMode's double mount and Fast Refresh.
 */

let done = false;
const subscribers = new Set<() => void>();

export function isPreloaderDone() {
  return done;
}

/** Called once by the preloader. Safe to call again; later calls are ignored. */
export function markPreloaderDone() {
  if (done) return;
  done = true;

  // release the scroll lock the preloader took out
  if (typeof document !== "undefined") {
    document.documentElement.style.overflow = "";
  }

  for (const cb of subscribers) {
    try {
      cb();
    } catch {
      // one bad subscriber must not strand the others
    }
  }
  subscribers.clear();
}

/** Locks native scrolling while the intro plays. */
export function lockScroll() {
  if (typeof document === "undefined" || done) return;
  document.documentElement.style.overflow = "hidden";
}

/**
 * Runs `cb` when the intro is over — immediately if it already is, so nothing
 * can miss the signal by subscribing late.
 */
export function onPreloaderDone(cb: () => void) {
  if (done) {
    cb();
    return () => {};
  }
  subscribers.add(cb);
  return () => {
    subscribers.delete(cb);
  };
}
