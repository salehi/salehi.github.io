# salehi.github.io

Personal site: https://salehi.github.io. Built with [Astro](https://astro.build) as a static site with almost no JavaScript.

## Develop

Everything runs in Docker. The host only needs `docker`, `git` and `make`.

```sh
make install   # npm ci in node:22-alpine
make dev       # http://localhost:4321
make build     # production build into dist/
make pdf       # optional: render /cv into a PDF (Playwright image); the site serves resume.pdf
make shots     # screenshots (mobile/desktop, light/dark) into shots/
make og        # regenerate public/og.png
```

## Edit content

| What | Where |
|---|---|
| Favorite projects (order + descriptions) | `src/data/favorites.ts` |
| Résumé page | `src/data/cv.ts` (kept in sync with `resume.md`) |
| Résumé PDF (download) | `resume.pdf`, copied to `/salehi-cv.pdf` on build |
| Links, email, nav | `src/data/site.ts` |
| Blog posts | `src/content/writing/*.md` (the Writing link appears once one exists) |

The repository list comes from the GitHub API at build time, with
`src/data/repos.snapshot.json` as an offline fallback. Pushing to `master`
deploys through GitHub Actions (or run it manually from the Actions tab).
