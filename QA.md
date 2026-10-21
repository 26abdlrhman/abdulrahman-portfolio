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

## Final revision — 2026-10-20

- Corrected the seat to a coherent cube projection: the front face has equal width and height (200×200px on wide layouts, 175×175px on compact layouts), with shared vertices for the top and side faces.
- Verified 175×175px in the rendered production browser and visually reviewed the new seating composition.
- Production homepage browser console reported no runtime errors in the final smoke check.

## 2026-10-20 — Contact and NABD update
- Production TypeScript/Vite build passed.
- Browser checked Arabic and English case-study content; both original interface screenshots rendered with explicit demo-data disclosure.
- Verified contact DOM targets: mailto:wahj200013@gmail.com and https://wa.me/218927592771. No messages sent.
- No browser console errors observed on updated portfolio routes.
- Responsive CSS added for single-column systems, connection flow, strengths and wrapping contact details; this revision was visually inspected at desktop width, not a physical phone.
- NABD source inspected read-only; isolated screenshot preview used no production DB or integrations. Claims reflect source capabilities, not an end-to-end operational audit of NABD.

## 2026-10-20 — Luna Store and Cafe Management System added
- Added two case-study projects, ordered after NABD: Luna Store (`/luna/`) then Cafe Management System (`/cafe-pos/`). Work section now shows three cards; copy updated from "one project" to "three projects".
- Production TypeScript (`tsc -b`) and Vite build passed. `postbuild.mjs` now generates three static route files plus `404.html`.
- HTTP smoke check on the production preview: `/`, `/nabd/`, `/luna/`, `/cafe-pos/` all returned 200. Confirmed the built JS bundle contains the new Arabic content and the `luna-cover`/`cafe-cover`/`pay-steps` classes.
- Luna Store sources inspected read-only (`app.py`, `templates/checkout.html`, invoice/payment pages). The payment-journey and ease-of-use sections reflect source code (six-step flow, token comparison on return, HMAC-SHA256 webhook, guest cart by session, three-state invoice). Advertised payment methods are those rendered by the original checkout UI.
- Luna product images copied from the project's `images/` folder and compressed (520px, JPEG q82); originals unchanged.
- Cafe Management System sources inspected read-only (`app.py`, `FullServer.py`, `Server/server`, `Server/client`, Flutter app). Features and remote-licensing description reflect source capabilities; no release status or measured outcomes claimed. No customer data or license values shown.
- Luna and Cafe covers were reviewed at desktop width in the production browser; not inspected on a physical phone.

## 2026-10-20 — Real screenshots replace concept covers
- Replaced the hand-built HTML/CSS covers of Luna Store and Cafe with real screenshots of each project's own interface, captured with headless Chromium from isolated local runs (same approach as the NABD previews).
- Luna Store: local PostgreSQL seeded with synthetic demo data (production Supabase `DATABASE_URL` never contacted; no MyPay session created). Only temp-copy change was `SESSION_COOKIE_SECURE = False` for local HTTP capture; original `app.py` verified unchanged. Captured home, shop, product, cart, checkout/payment, invoice (confirmed + pending), payment-failed, and admin pages.
- Cafe: fresh SQLite DB with synthetic demo data; the original `data/database.db` was not used and a real customer name in `data/customer.json` was removed from the temp copy before capture. Original project directory not modified. Captured POS, debts, reports, expenses, shifts.
- Covers and case-study galleries now labeled "واجهة أصلية · بيانات تجريبية" (original interface · demo data); both case pages gained a screenshots section with bilingual captions and a note that all displayed data is synthetic.
- No live demo, trial link or interactive embed was added anywhere: the site only displays static images.
- Verified in the production build (`tsc -b` + `vite build` passed): `/`, `/luna/`, `/cafe-pos/` render the new covers and galleries; screenshots reviewed at desktop width.

## 2026-10-20 — Cafe interface fixes and nabd-style case screenshots

- Fixed two spacing overlaps the user reported in the Cafe POS interface, in the original project's `templates/dashboard.html`: the active-shift badge touched the start-time text, and the barcode icon touched the products-card title and the search field. Root cause: Bootstrap's physical `ms-*`/`me-*` margins land on the wrong side under `dir="rtl"`. Fix: explicit `gap-3` on both flex rows, removal of the misplaced `ms-3`, plus `flex-wrap` on the products header so the row can never collide again.
- Verified in the browser at 1280px with element-box measurements: 16px gap between badge and time block, 16px gap between title and barcode group, all pairwise overlap checks false; then confirmed by zoomed visual review of the recaptured screen. `cafe-cover.webp` was regenerated from the fixed interface. The shift banner and this header exist only in `dashboard.html`; debts/reports/expenses screenshots are unaffected.
- Luna Store cover changed to the home page exactly as it appears when opening the site (per user request); a separate `luna-checkout-v.webp` asset now carries the checkout/payment-methods screenshot for the case page.
- Both case pages' screenshot sections were rebuilt on the nabd `system-showcase` pattern: figure with figcaption (eyebrow, heading, paragraph) and one large framed image with a "تكبير الواجهة ↗" full-size link; Luna's three invoice states are a clickable trio inside one figure. The old `case-gallery` grid CSS was removed; themed frame colors were added (`luna-showcase`, `cafe-showcase`).
- Fixed `screenshot-note`'s `-35px` margin pulling the note into the `connection-flow`/`pay-steps` blocks; the negative margin now applies only after `.system-showcase`.
- Removed 10 unused image assets; `npm run build` (`tsc -b` + vite + postbuild) passed; `/`, `/nabd/`, `/luna/`, `/cafe-pos/` all return 200; home, /luna/ and /cafe-pos/ visually reviewed at desktop width including lazy-loaded images after scroll. Not inspected on a physical phone.


## 2026-10-21 — Consistent project presentation
- Preserved OpenCode's Luna and Cafe additions and original screenshots. Reordered both case studies to match NABD: introduction, problem/solution, two primary screenshots, workflow, strengths, contact.
- Shared cover and screenshot styles across all three projects; adaptive headings fit long Arabic names. Additional screenshots remain in keyboard-accessible native details disclosures.
- Browser inspected all three pages side-by-side in 390px-wide local iframes, including headings, text and first screenshot; this is a layout check, not a physical-device test.
- Checked Arabic/English switching, expanded Luna's extra screens and inspected desktop Cafe. English desktop width 1280px had no horizontal overflow. No console errors observed.
- TypeScript and production build passed, including static /nabd/, /luna/ and /cafe-pos/ routes.
