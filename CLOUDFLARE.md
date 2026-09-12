# Cloudflare — quodex.app

This Worker is the macOS landing at **https://quodex.app/**.

The Windows landing is a separate Worker in [hxbib/quodex-windows-website](https://github.com/hxbib/quodex-windows-website) on **https://quodex.app/windows**.

Push to `main` deploys once this repo is connected in Cloudflare.

## Connect Git (once)

1. [Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages) → open the Worker that already serves `quodex.app`, or **Create** → **Workers** → **Import a repository**.
2. Authorize GitHub. Select **hxbib/quodex-website**, branch `main`.
3. Build command: `npm ci && npm run build`
4. Deploy command: `npx wrangler deploy --config dist/server/wrangler.json --name quodex`
5. Node.js: **22**
6. Save. The first build publishes.

If Cloudflare already has a Worker for this domain under another name, use that name in the deploy command instead of `quodex`.

## Domain (once)

Worker → **Settings** → **Domains & Routes** → **Add** → **Custom Domain**: `quodex.app`

Do **not** add a catch-all `*quodex.app` route. Apex is this hostname only. `www` 301s to apex. `/windows*` is the Windows Worker.

Leave OpenAI/Codex site-creator hosting disconnected after Git deploys succeed, so this GitHub repo is the only origin.

## Zone settings

Same list as [quodex-windows-website/CLOUDFLARE.md](https://github.com/hxbib/quodex-windows-website/blob/main/CLOUDFLARE.md): Full (strict) TLS, Always HTTPS, TLS 1.2+, HSTS preload, HTTP/3, Brotli, Early Hints, Rocket Loader off, Auto Minify off, cache TTL respect origin, WAF managed rules on, DNSSEC, CAA, AI crawlers allowed.

`www.quodex.app` 301s to `https://quodex.app` with path and query preserved.
