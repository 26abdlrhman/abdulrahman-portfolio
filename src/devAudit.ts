// Local-only, opt-in performance telemetry for browser QA. Excluded by production tree-shaking.
if (location.search.includes("audit")) {
  const metrics: {
    lcp: number;
    cls: number;
    frameTimes: number[];
    resources?: number;
    transferKB?: number;
    overflow?: boolean;
  } = { lcp: 0, cls: 0, frameTimes: [] };
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) metrics.lcp = Math.round(e.startTime);
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries() as (PerformanceEntry & {
        hadRecentInput: boolean;
        value: number;
      })[])
        if (!e.hadRecentInput) metrics.cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
  } catch {}
  let prev = 0;
  function frame(t: number) {
    if (prev) metrics.frameTimes.push(t - prev);
    prev = t;
    if (metrics.frameTimes.length < 120) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  setTimeout(() => {
    const r = performance.getEntriesByType(
      "resource",
    ) as PerformanceResourceTiming[];
    metrics.resources = r.length;
    metrics.transferKB = Math.round(
      r.reduce((s, e) => s + e.transferSize, 0) / 1024,
    );
    metrics.overflow = document.documentElement.scrollWidth > innerWidth;
    const el = document.createElement("output");
    el.id = "qa-metrics";
    el.hidden = true;
    el.textContent = JSON.stringify({
      ...metrics,
      frameTimes: undefined,
      medianFrameMs: metrics.frameTimes.sort((a, b) => a - b)[
        Math.floor(metrics.frameTimes.length / 2)
      ],
    });
    document.body.append(el);
  }, 5000);
}

export {};
