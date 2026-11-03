# Everything runs inside Docker. Host needs only docker, git and make.
NODE_IMG := node:22-alpine
PW_IMG   := mcr.microsoft.com/playwright:v1.64.1-noble
NET      := salehi-site
RUN      := docker run --rm --user $(shell id -u):$(shell id -g) \
            -e npm_config_cache=/app/.cache/npm -e npm_config_update_notifier=false \
            -e HOME=/app/.cache/home -e ASTRO_TELEMETRY_DISABLED=1 \
            -e GITHUB_TOKEN -v $(CURDIR):/app -w /app

.PHONY: install dev build check preview pdf shots og sh clean

install:            ## install npm dependencies
	$(RUN) $(NODE_IMG) npm ci || $(RUN) $(NODE_IMG) npm install

dev:                ## dev server on http://localhost:4321
	$(RUN) -it -p 4321:4321 $(NODE_IMG) npm run dev

build:              ## production build into dist/ (set GITHUB_TOKEN for higher API limits)
	$(RUN) $(NODE_IMG) npm run build

check:              ## type and template checks
	$(RUN) $(NODE_IMG) npm run check

preview: build      ## serve dist/ on http://localhost:4321
	$(RUN) -it -p 4321:4321 $(NODE_IMG) npm run preview

pdf:                ## render /cv from dist/ into dist/salehi-cv.pdf and public/
	$(RUN) --ipc=host $(PW_IMG) node scripts/cv-pdf.mjs

shots:              ## screenshots of dist/ (mobile+desktop, light+dark) into shots/
	$(RUN) --ipc=host $(PW_IMG) node scripts/shots.mjs

sh:                 ## shell in the node container
	$(RUN) -it $(NODE_IMG) sh

clean:
	rm -rf dist .astro

og:                 ## regenerate public/og.png (social preview image)
	$(RUN) --ipc=host $(PW_IMG) node scripts/og.mjs
