// Full-page screenshots of key routes: mobile + desktop, light + dark.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { serve } from './serve.mjs';

const routes = (process.env.ROUTES ?? '/,/projects/,/cv/,/writing/,/nope').split(',');
const sizes = { mobile: { width: 390, height: 844 }, desktop: { width: 1440, height: 900 } };
await mkdir('shots', { recursive: true });
const srv = await serve();
const browser = await chromium.launch();
for (const scheme of ['dark', 'light']) {
  for (const [label, viewport] of Object.entries(sizes)) {
    const ctx = await browser.newContext({ viewport, colorScheme: scheme, reducedMotion: 'reduce', deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    for (const r of routes) {
      await page.goto(srv.url + r, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      const name = (r.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home');
      await page.screenshot({ path: `shots/${name}-${label}-${scheme}.png`, fullPage: true });
      console.log(`${name.padEnd(10)} ${label.padEnd(8)} ${scheme.padEnd(6)} overflowX=${overflow}`);
    }
    await ctx.close();
  }
}
await browser.close();
srv.close();
