// Render /cv from dist/ to an A4 PDF (dist/ and public/ copies).
import { chromium } from 'playwright';
import { copyFile } from 'node:fs/promises';
import { serve } from './serve.mjs';

const srv = await serve();
const browser = await chromium.launch();
const page = await browser.newPage();
await page.emulateMedia({ media: 'print', colorScheme: 'light' });
await page.goto(`${srv.url}/cv/`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: 'dist/salehi-cv.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
srv.close();
await copyFile('dist/salehi-cv.pdf', 'public/salehi-cv.pdf');
console.log('wrote dist/salehi-cv.pdf and public/salehi-cv.pdf');
