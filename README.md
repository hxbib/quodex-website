# Quodex Website

The official landing page for [Quodex](https://github.com/hxbib/Quodex), a lightweight macOS menu-bar app for viewing usage limits and banked resets across multiple ChatGPT accounts.

## Requirements

- Node.js 22.13 or later
- npm

## Local development

```bash
npm ci
npm run dev
```

## Verification

```bash
npm run check
npm audit --omit=dev
```

## Cloudflare deployment

Build the production Worker, then deploy it under your own Worker name:

```bash
npm run build
npx wrangler deploy --config dist/server/wrangler.json --name <worker-name>
```

The production site is available at [quodex.app](https://quodex.app).

## Cloudflare (Git → live)

Connect this repository in the Cloudflare dashboard so a push to `main` updates https://quodex.app/.

- Build command: `npm ci && npm run build`
- Deploy command: `npx wrangler deploy --config dist/server/wrangler.json --name quodex-website`
- Custom domain: `quodex.app` (not a catch-all `/*` route)

The Windows page is a different repo and Worker: https://quodex.app/windows

See [CLOUDFLARE.md](CLOUDFLARE.md).


## License

Released under the MIT License. Quodex is an independent project and is not affiliated with or endorsed by OpenAI.
