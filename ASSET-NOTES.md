# Asset provenance

## Portrait

Final asset: `public/assets/portrait.webp`.

Created with the built-in imagegen tool, using the user's supplied `IMG_0841.JPG` and `IMG_1138.jpg` as identity references. Original files were not changed. The output has real alpha transparency; converted to WebP with cwebp quality 88, retaining alpha. The cube is separate HTML/CSS, not part of the portrait. Identity match should be reviewed by the user.

Final prompt:

> Use case: identity-preserve / background-extraction. Create an editorial full-body transparent cutout of the EXACT same young man in the two reference images for his personal developer portfolio. Preserve his actual clean-shaven youthful face, facial proportions, dark wavy voluminous center-parted hair, natural skin and identity. He is 160cm tall, maintain compact natural proportions. He is seated casually on an INVISIBLE cube (we will build the seat separately in HTML), torso mostly facing camera, head slightly turned toward camera, relaxed confident subtle smile, hands resting naturally on thighs. Black plain oversized short-sleeve T-shirt, charcoal relaxed trousers, off-white minimal sneakers. Entire body including shoes in frame. Seat plane about halfway down image. Studio photograph, soft natural key light and very subtle mint rim light. Genuinely transparent background. No cube, no chair, no scene, no floor, no props, no lettering, no border. Match the reference face faithfully; do not add beard or change identity. Crisp hair edge and high photographic detail.

## Rive character

- Title: Cute cat
- Author: cuiyateng
- Source: https://rive.app/marketplace/12890-24389-cute-cat/
- License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (as displayed by the original marketplace page, checked 2026-10-19).
- User-provided file `12890-24389-cute-cat.riv`, copied without modifying the .riv data.
- The website adds CSS presentation, a greeting, and interaction with the original State Machine 1 boolean inputs 嘴巴 (mouth) and 强度 (intensity).
- Visible attribution and source link appear directly below the character.
- The supplied asset uses legacy state-machine inputs. They are supported by the pinned Rive runtime; upgrading to a future major release may require converting the asset to data binding. Runtime package versions are locked in package-lock.json.

## Fonts

Manrope and Noto Sans Arabic, SIL Open Font License. License copies in `public/licenses/`. Self-hosted from Fontsource packages.

## NABD interface screenshots

`nabd-admin.webp` and `nabd-issuer.webp`: captured from the user's original Flask/Jinja dashboard and issuance templates, rendered in an isolated Flask preview with synthetic context. Original CSS, fonts, logo and issuance presentation JavaScript are retained. All names, counts and identifiers shown are demo data. No original database, credentials, upload directory or live integration was loaded. Integration scripts were excluded and network connections/form submissions blocked in the preview. Converted to WebP quality 90.

Case-study claims were checked against administration `tp_puller.py` and the issuance `supabase_client.py`, `syncer.py`, document routes and templates. The page distinguishes policy/production transfer to administration from agent-status checks by issuance. It claims no measured business outcomes or release status.

## Luna Store product images

`luna-cover.webp`, `luna-shop-v.webp`, `luna-checkout-v.webp`, `luna-invoice-paid.webp`, `luna-invoice-pending.webp`, `luna-payment-failed.webp`, `luna-admin-v.webp`: real screenshots of the Luna Store interface itself, captured with headless Chromium (Playwright, 1280×860 @2x) from a local isolated run of the project's own Flask app and Jinja templates. Captured pages: home, shop, product, cart, checkout (including the payment-methods block), the invoice in its confirmed and pending states, the payment-failed page, and the admin dashboard/products/orders. `luna-cover.webp` is the home page exactly as it appears when the site is opened; `luna-checkout-v.webp` is the checkout viewport with the payment-methods block in view.

The isolated run used a **local PostgreSQL database seeded with synthetic demo data** (demo products, customers, order numbers `LUNA-2026…`); the project's production Supabase `DATABASE_URL` was never read or contacted, and no real payment session was created (empty MyPay credentials, sandbox flag). The only change made for capture was `SESSION_COOKIE_SECURE = False` in a temporary copy so session cookies work over local HTTP; the original `app.py` is untouched (verified: it still has `= True`). Screenshots are labeled in the page as "واجهة أصلية · بيانات تجريبية" (original interface · demo data).

`luna-arvea.jpg`, `luna-neutrogena.jpg`, `luna-johnsons.jpg`, `luna-glycerine.jpg`: product photos copied from the Luna Store project's `images/` folder, resized to 520px wide and re-encoded to JPEG (quality 82) with macOS `sips`; used to seed the demo catalog shown inside the captured shop screenshots. Original files unchanged; sizes reduced from ~1.5–2MB each to ~55–100KB.

Luna Store case-study claims (the six-step payment journey, token comparison on return, HMAC-SHA256 webhook verification, no card data stored, guest cart by session, three-state invoice) were checked directly against the project's `app.py` (MyPay.ly helpers, `/checkout`, `/mypay/callback`, `/mypay/webhook`, `/invoice`) and `templates/checkout.html`. Advertised payment methods (bank cards, Edfali, Yasser Pay, Sahari Pay, Masrvi Pay) are those rendered by the original checkout UI; the actual set presented at payment time comes from MyPay.ly's hosted page.

## Cafe Management System claims

Case-study claims (POS with four payment endings, shifts, debts, expenses/reports, Flutter app on the same SQLite database, seven-day trial and remotely activated licensing) were checked against the project's `app.py`, `FullServer.py`, `Server/server/Server.py`, `Server/client/Client.py`, `data/MobileAppServer.py` and the Flutter `Mobile App/cafe_management_system/` sources. /cafe cover and gallery screenshots (`cafe-cover.webp`, `cafe-debts-v.webp`, `cafe-reports-v.webp`, `cafe-expenses-v.webp`): real screenshots Captured with headless Chromium from a local isolated run of the project's own Flask app (`app.py`, port 1111) inside a temporary copy of the project. A synthetic demo database was seeded in that temporary copy for capture (demo products, amounts, and generic Arabic names); the original project's own `data/database.db` was never used, and a real customer name found in `data/customer.json` was removed from the temporary copy before capture. The Windows-only launcher (`manger.exe` via `subprocess.CREATE_NEW_CONSOLE`) fails harmlessly on macOS and does not affect the captured web UI. No customer data, device identifiers or license status values are shown.

Two spacing fixes were applied to the original project's `templates/dashboard.html` at the user's request before the cover was recaptured: (1) the active-shift banner gained an explicit `gap-3` between the badge and the start-time block (Bootstrap's physical `me-3` placed the margin on the outer side under RTL, leaving the badge touching the time text), and (2) the products card header gained `gap-3`/`flex-wrap` and the `ms-3` on the barcode group was removed for the same RTL reason, so the barcode icon no longer touches the section title or the search field. No logic, routes, data or other templates were changed; the rest of the original project directory remains unmodified.
