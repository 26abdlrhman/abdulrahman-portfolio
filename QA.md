# Verification — 2026-10-19

- TypeScript strict checking and Vite static build.
- Real browser review of the homepage and independent NABD route.
- Arabic RTL and English LTR switching, including remembered language after reload.
- Responsive browser iframe checks at widths 360px and 390px; no document horizontal overflow in the measured states. This is responsive browser testing, not a physical-phone test.
- Desktop review at the in-app browser viewport, plus wide responsive layout.
- Mobile navigation opens, navigates and closes.
- Scroll scene progresses from scattered nodes to connected, aligned nodes; observed steps 1, 2 and 5 while scrolling. Normal scrolling is not intercepted.
- Reduced-motion toggle changes the document mode and removes the pinned scroll sequence in favor of all steps visible.
- Rive loads locally. Greeting activates the mouth state; hide and restore work. A legacy-input deprecation warning is expected from the supplied older asset; it is not a runtime failure.
- Contact form checked with synthetic local data: validation fields, successful text-file download, and an explicit message that nothing was sent.
- A stable, warm-cache local development run at 390px measured LCP 552ms, CLS 0, median animation-frame interval about 16.8ms. This is a local diagnostic, not a Lighthouse score or a guarantee for mobile networks/physical devices. The earlier font/layout shift found during development was fixed by early language initialization and font preload.
- Main production JS approximately 123KB gzip; Rive JS approximately 80KB gzip is lazy-loaded, plus its local ~2MB WASM only when the contact section approaches the viewport. Portrait WebP approximately 124KB.

Remaining content dependencies: actual email and WhatsApp, actual NABD screenshots/status/technology/outcomes, owner's review of the processed portrait.
