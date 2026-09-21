# realsocial.me

Static site. No build step. Styled to the RealSocial brand sheet
(maroon band, Fraunces / Zalando Sans Expanded / Arimo, terracotta accent).

## Structure
- `/`                → index.html (landing page)
- `/privacy/`        → privacy/index.html
- `/privacy-policy/` → redirects to `/privacy/`
- `404.html`         → not-found page

All asset and page links are **relative**, so the site works unchanged at a
project URL (`f22labs.github.io/realsocial-landing/`) or at an apex domain.
Keep them relative.

## Before deploying
In `privacy/index.html`, replace the two highlighted placeholders:
- `CONTACT_EMAIL` (appears twice in the Contact section)
- the ZIP code "770" in the Company definition

Then remove the `todo` class from those spots.

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
