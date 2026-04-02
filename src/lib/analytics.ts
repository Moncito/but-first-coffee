// Analytics utility — lightweight event tracking
// Replace the implementation with your preferred analytics provider
// (Google Analytics, Mixpanel, PostHog, Plausible, etc.)

type AnalyticsEvent = {
  name: string;
  properties?: Record<string, string | number | boolean>;
};

const isDev = process.env.NODE_ENV === "development";

export function trackEvent({ name, properties }: AnalyticsEvent) {
  if (isDev) {
    console.log(`[Analytics] ${name}`, properties ?? "");
  }

  // ── Replace with your provider ──
  // Example: Google Analytics 4
  // if (typeof window !== "undefined" && window.gtag) {
  //   window.gtag("event", name, properties);
  // }

  // Example: PostHog
  // if (typeof window !== "undefined" && window.posthog) {
  //   window.posthog.capture(name, properties);
  // }
}

// Pre-defined event helpers
export const analytics = {
  introCompleted: () =>
    trackEvent({ name: "intro_completed" }),

  beatViewed: (beat: number, title: string) =>
    trackEvent({ name: "beat_viewed", properties: { beat, title } }),

  scrollDepth: (percent: number) =>
    trackEvent({ name: "scroll_depth", properties: { percent } }),

  ctaHover: () =>
    trackEvent({ name: "cta_hover" }),

  ctaClick: () =>
    trackEvent({ name: "cta_click" }),

  newsletterSubscribe: () =>
    trackEvent({ name: "newsletter_subscribe" }),

  testimonialEngaged: (name: string) =>
    trackEvent({ name: "testimonial_engaged", properties: { testimonial: name } }),

  soundToggled: (enabled: boolean) =>
    trackEvent({ name: "sound_toggled", properties: { enabled } }),

  shopNowClick: () =>
    trackEvent({ name: "shop_now_click" }),
};
