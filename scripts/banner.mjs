// Render the GitHub profile README banner (light + dark) into $OUT (default ./banner/).
import { chromium } from 'playwright';
import { readFile, mkdir } from 'node:fs/promises';

const out = process.env.OUT ?? 'banner';
await mkdir(out, { recursive: true });
const font = async (p) => (await readFile(p)).toString('base64');
const inter = await font('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const mono = await font('node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2');
const themes = {
  dark: { bg: '#0d1117', line: '#1b2229', text: '#e6ebee', muted: '#98a3ac', accent: '#3dd6c0' },
  light: { bg: '#ffffff', line: '#eceee9', text: '#11161a', muted: '#545e66', accent: '#0c7a6e' },
};
const browser = await chromium.launch();
for (const [name, t] of Object.entries(themes)) {
  const html = `<!doctype html><html><head><style>
@font-face{font-family:I;src:url(data:font/woff2;base64,${inter}) format('woff2');font-weight:100 900}
@font-face{font-family:M;src:url(data:font/woff2;base64,${mono}) format('woff2');font-weight:100 800}
*{margin:0;box-sizing:border-box}
body{width:1280px;height:300px;background:${t.bg};color:${t.text};font-family:I;padding:56px 64px;position:relative;overflow:hidden}
.g{position:absolute;inset:0;background-image:linear-gradient(${t.line} 1px,transparent 1px),linear-gradient(90deg,${t.line} 1px,transparent 1px);background-size:40px 40px;-webkit-mask-image:radial-gradient(ellipse 60% 120% at 90% 50%,#000 10%,transparent 70%)}
.l{font-family:M;font-size:26px;font-weight:600;position:relative}.l span{color:${t.accent}}
h1{font-size:64px;letter-spacing:-.035em;font-weight:680;margin-top:44px;position:relative;line-height:1}
p{font-family:M;color:${t.accent};font-size:21px;margin-top:22px;position:relative}p i{font-style:normal;color:${t.muted}}
</style></head><body><div class="g"></div><div class="l">salehi<span>_</span></div><h1>Principal Engineer.</h1>
<p>ai <i>·</i> devops <i>·</i> sre <i>·</i> backend <i>·</i> networking</p></body></html>`;
  const page = await browser.newPage({ viewport: { width: 1280, height: 300 }, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${out}/banner-${name}.png` });
  await page.close();
}
await browser.close();
console.log(`wrote ${out}/banner-{dark,light}.png`);
