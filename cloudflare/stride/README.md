# runwithstride.app

The Stride landing page, served by a Cloudflare Worker on runwithstride.app.

The page itself is `public/stride/index.html` (and `public/stride/img/`), so
jacobreed.dev/stride keeps working from the same file. Edit it there; both
sites pick up the change on their next deploy.

## What the Worker does

- `/` serves the landing page; `/stride/img/*` serves the images.
- `/privacy`, `/support` (and their `/stride/...` forms) redirect to
  jacobreed.dev/stride/privacy and /support, which App Store Connect links to.
- `/stride` redirects to `/`; `www.` redirects to the bare domain.
- Any other path redirects to `/`.

## Deploying

Cloudflare Workers Builds deploys on every push to `master`:
Workers & Pages → the `runwithstride` Worker → Settings → Build, with
root directory `cloudflare/stride` and deploy command `npx wrangler@4 deploy`.
The two custom domains in `wrangler.jsonc` are attached on deploy.

By hand: `npm run stride:deploy` (asks you to log in to Cloudflare the first time).
Preview locally: `npm run stride:dev`.
