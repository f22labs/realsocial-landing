# realsocial.me

Static site for Vercel. No build step.

- `/`        → index.html (landing page)
- `/privacy` → privacy.html
- `/privacy-policy` redirects to `/privacy`

## Before deploying
In privacy.html, replace the two highlighted placeholders:
- `CONTACT_EMAIL` (appears twice in the Contact section)
- the ZIP code "770" in the Company definition

Then remove the `todo` class from those spots.

## Deploy
    npx vercel          # preview
    npx vercel --prod   # production

Then add realsocial.me and www.realsocial.me under Project → Settings → Domains
and copy the DNS records Vercel shows into Squarespace's DNS settings.
