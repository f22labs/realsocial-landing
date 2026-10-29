# realsocial.me

Static site. No build step. Styled to the RealSocial brand sheet
(maroon band, Fraunces / Arimo, terracotta accent).

## Structure
- `/`                → index.html (landing page)
- `/privacy/`        → privacy/index.html
- `/privacy-policy/` → redirects to `/privacy/`
- `waitlist.js`      → waitlist form logic (posts to a Google Form)
- `/terms/`          → terms/index.html
- `/data-deletion/`  → data-deletion/index.html (Meta's User Data Deletion URL)
- `404.html`         → not-found page

## Waitlist
The landing page form (`waitlist.js`) posts to a Google Form's `formResponse`
URL. That is write-only: the site can submit rows but cannot read anything,
and no key is in the front end. Responses go to the form's linked Google
Sheet (Responses tab → Link to Sheets), which stays restricted to the team.

The form must be public: Settings → Responses must NOT be restricted to
users in the organization, and must not require sign-in or limit to 1 response.
Field IDs are in `waitlist.js` (`ENTRY`). If you add, delete or recreate a
question, its `entry.NNN` ID changes: open the form, "Get pre-filled link",
and copy the new IDs.

Limits to know: Google's reply is opaque to the browser, so a rejected
submission looks like success (only network errors show the retry message).
Spam protection is a honeypot field plus a minimum fill time, client-side only.

## Brand assets
- `RS-Logo-Pink.png` — the lockup used in the header on every page. Every
  header sits on the maroon band, so this is the only one the site uses.
- `RS-Logo-Red.png`  — same lockup for light backgrounds. Not referenced yet;
  it is here for future white-background surfaces (email, OG image, press).
- `RS-Fav.png` (92x92) and `favicon-32.png` (downscaled from it) — favicons
  and the apple-touch icon.

All asset and page links are **relative**, so the site works unchanged at a
project URL (`f22labs.github.io/realsocial-landing/`) or at an apex domain.
Keep them relative.

## Before deploying
The `privacy/index.html` placeholders are filled in (contact email
`team@realsocial.me`, ZIP 77042). Nothing carries the `todo` class now.

`/data-deletion/` describes app behaviour from REAL-131 that is not built
yet. Confirm that ships before handing the URL to Meta App Review.

## Hosting: GitHub Pages (current)
Served from the `main` branch root. `.nojekyll` disables Jekyll processing.
Because Pages is static-only, `vercel.json`'s `cleanUrls` and redirect are
reproduced by the directory layout above plus a meta-refresh stub at
`/privacy-policy/` — that stub is a client-side hop, not a 301.

To put realsocial.me on Pages: add a `CNAME` file containing `realsocial.me`,
set the domain under Settings → Pages, then point Squarespace DNS at
GitHub's apex IPs (185.199.108–111.153) with `www` as a CNAME to
`f22labs.github.io`.

## Hosting: Vercel (alternative)
`vercel.json` is still valid and gives real 308 redirects and clean URLs.

    npx vercel          # preview
    npx vercel --prod   # production
