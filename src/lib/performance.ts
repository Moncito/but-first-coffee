/**
 * Performance Optimization Utilities
 * Helps with lazy loading, code splitting, and component performance
 */

// Intersection Observer options for lazy loading
export const lazyLoadOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: "50px",
  threshold: 0.01,
};

// Dynamic import helper for code splitting
export const dynamicImport = async (importFunc: () => Promise<unknown>) => {
  try {
    return await importFunc();
  } catch (error) {
    console.error("Dynamic import failed:", error);
    throw error;
  }
};

// Debounce function for scroll and resize events
export const debounce = (func: (...args: unknown[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle function for high-frequency events
export const throttle = (func: (...args: unknown[]) => void, limit: number) => {
  let inThrottle: boolean;
  return (...args: unknown[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// Request idle callback polyfill
export const requestIdleCallback =
  typeof window !== "undefined" && "requestIdleCallback" in window
    ? window.requestIdleCallback
    : (callback: IdleRequestCallback) => setTimeout(callback as TimerHandler, 1);

// Cancel idle callback polyfill
export const cancelIdleCallback =
  typeof window !== "undefined" && "cancelIdleCallback" in window
    ? window.cancelIdleCallback
    : clearTimeout;

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Check network connection quality
export const getConnectionSpeed = (): "4g" | "3g" | "2g" | "slow-2g" | "unknown" => {
  if (typeof navigator === "undefined") return "unknown";
  const connection = (navigator as unknown as { connection?: { effectiveType?: string } }).connection;
  return (connection?.effectiveType || "unknown") as "4g" | "3g" | "2g" | "slow-2g" | "unknown";
};

// Preload image
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Batch preload multiple images
export const preloadImages = (srcs: string[]): Promise<void[]> => {
  return Promise.all(srcs.map(preloadImage));
};

// Web Vitals metrics tracking
export const trackWebVitals = () => {
  if (typeof window === "undefined") return;

  // Largest Contentful Paint (LCP)
  if ("PerformanceObserver" in window) {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as unknown as { renderTime?: number; loadTime?: number };
        console.log("LCP:", lastEntry.renderTime || lastEntry.loadTime);
      });
      observer.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (e) {
      console.error("LCP observation failed:", e);
    }
  }

  // First Input Delay (FID)
  if ("PerformanceObserver" in window) {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          const typedEntry = entry as unknown as { processingDuration?: number };
          console.log("FID:", typedEntry.processingDuration);
        });
      });
      observer.observe({ entryTypes: ["first-input"] });
    } catch (e) {
      console.error("FID observation failed:", e);
    }
  }
};

// Memory optimization: clear unused resources
export const cleanupMemory = () => {
  if (typeof window === "undefined") return;

  // Clear service worker cache if needed
  if ("caches" in window) {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        caches.open(cacheName).then((cache) => {
          cache.keys().then(() => {
            // You can implement custom logic to remove old cache entries
          });
        });
      });
    });
  }
};

