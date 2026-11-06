# salehi.github.io

Personal site: https://salehi.github.io. Built with [Astro](https://astro.build) as a static site with almost no JavaScript.

## Edit content

All content comes from two files in the repo root:

| What | Where |
|---|---|
| Everything on the page | `resume.md` (parsed at build time by `src/lib/resume.ts`) |
| Downloadable PDF | `resume.pdf` (served at `/resume.pdf`) |

`resume.md` structure: `# Name`, a `**headline**` line, a `·`-separated contact
line, then `## Sections`. Inside a section, `### Role | Company` starts a job
(followed by a `**Type · Dates**` line), `- **Term:** a, b, c` becomes a card of
chips, `- **Term:** sentence.` becomes a text card, and plain `-` lines are bullets.

## Develop

Everything runs in Docker. The host only needs `docker`, `git` and `make`.

```sh
make install   # npm ci in node:22-alpine
make dev       # http://localhost:4321
make build     # production build into dist/
make shots     # screenshots (mobile/desktop, light/dark) into shots/
make og        # regenerate public/og.png from resume.md
```

Pushing to `master` deploys through GitHub Actions.
