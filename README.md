# realsocial.me

Static site. No build step. Styled to the RealSocial brand sheet
(maroon band, Fraunces / Arimo, terracotta accent).

## Structure
- `/`                → index.html (landing page)
- `/privacy/`        → privacy/index.html
- `/privacy-policy/` → redirects to `/privacy/`
- `/terms/`          → terms/index.html
- `/data-deletion/`  → data-deletion/index.html (Meta's User Data Deletion URL)
- `404.html`         → not-found page

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
