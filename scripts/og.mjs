// Render the 1200x630 social preview image into public/og.png from resume.md.
import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';

const md = await readFile('resume.md', 'utf8');
const name = md.match(/^# (.+)$/m)[1].trim();
const headline = md.match(/^\*\*(.+)\*\*$/m)[1].trim();
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const inter = (await readFile('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')).toString('base64');
const mono = (await readFile('node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2')).toString('base64');
const html = `<!doctype html><html><head><style>
@font-face{font-family:I;src:url(data:font/woff2;base64,${inter}) format('woff2');font-weight:100 900}
@font-face{font-family:M;src:url(data:font/woff2;base64,${mono}) format('woff2');font-weight:100 800}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#0a0d10;color:#e6ebee;font-family:I;padding:84px 92px;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(#1b2229 1px,transparent 1px),linear-gradient(90deg,#1b2229 1px,transparent 1px);background-size:48px 48px;-webkit-mask-image:radial-gradient(ellipse 70% 80% at 85% 30%,#000 10%,transparent 70%)}
.logo{font-family:M;font-size:34px;font-weight:600;position:relative}.logo span{color:#3dd6c0}
h1{font-size:76px;line-height:1.02;letter-spacing:-.035em;font-weight:680;margin-top:96px;max-width:900px;position:relative}
p{font-family:M;color:#98a3ac;font-size:26px;line-height:1.5;margin-top:34px;max-width:960px;position:relative}
.bar{position:absolute;left:0;bottom:0;height:8px;width:100%;background:#3dd6c0}
</style></head><body><div class="grid"></div><div class="logo">salehi<span>_</span></div>
<h1>${esc(name)}</h1><p>${esc(headline)}</p><div class="bar"></div></body></html>`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og.png' });
await browser.close();
console.log('wrote public/og.png');
