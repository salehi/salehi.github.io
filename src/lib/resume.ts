// Parses resume.md (repo root) — the single source of truth for all site content.
// Every visible word on the site comes from that file; edit it, not this.
import raw from '../../resume.md?raw';

export type Item = { html: string; sub: string[] };
export type Def = { term: string; items: string[] }; // "**Term:** a, b, c"
export type Job = { role: string; company: string; meta: string; items: Item[] };
export type Section = {
  id: string;
  title: string;
  paragraphs: string[];
  items: Item[];
  defs: Def[];
  jobs: Job[];
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const hrefFor = (t: string) => (t.includes('@') ? `mailto:${t}` : `https://${t}`);

/** Inline markdown → HTML: escape, **bold**, and plain domains/emails become links. */
export function inline(s: string): string {
  let h = esc(s);
  h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  h = h.replace(/\b[\w.+-]+@[\w-]+\.[\w.]+\b|(?<![@\w/])((?:[a-z0-9-]+\.)+(?:com|io|org|net|dev)(?:\/[\w\-./]*[\w\-/])?)/gi, (m) =>
    `<a href="${hrefFor(m)}">${m}</a>`);
  return h;
}

/** Split on commas that are not inside parentheses. */
const splitList = (s: string) => {
  const out: string[] = [];
  let depth = 0, cur = '';
  for (const ch of s) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) { out.push(cur.trim()); cur = ''; } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const strip = (s: string) => s.replace(/^\*\*(.*)\*\*$/, '$1');

function parse(md: string) {
  const lines = md.replace(/\r/g, '').split('\n');
  let name = '';
  const intro: string[] = []; // lines between "# Name" and the first "##"
  const sections: Section[] = [];
  let sec: Section | null = null;
  let job: Job | null = null;

  for (const line of lines) {
    if (!line.trim()) continue;
    if (line.startsWith('# ')) { name = line.slice(2).trim(); continue; }
    if (line.startsWith('## ')) {
      const title = line.slice(3).trim();
      sec = { id: slug(title), title, paragraphs: [], items: [], defs: [], jobs: [] };
      sections.push(sec); job = null;
      continue;
    }
    if (!sec) { intro.push(line.trim()); continue; }
    if (line.startsWith('### ')) {
      const [role, ...rest] = line.slice(4).split(' | ');
      job = { role: role.trim(), company: rest.join(' | ').trim(), meta: '', items: [] };
      sec.jobs.push(job);
      continue;
    }
    const sub = line.match(/^\s{2,}[-*] (.*)$/);
    const top = line.match(/^[-*] (.*)$/);
    const list = job ? job.items : sec.items;
    if (sub && list.length) { list[list.length - 1].sub.push(inline(sub[1])); continue; }
    if (top) {
      const d = !job && top[1].match(/^\*\*(.+?):\*\*\s*(.*)$/);
      if (d) {
        // "**Term:** a, b" → definition; skills split into chips, prose kept whole.
        const body = d[2];
        const isList = !body.trim().endsWith('.');
        sec.defs.push({ term: inline(d[1]), items: isList ? splitList(body).map(inline) : [inline(body)] });
      } else list.push({ html: inline(top[1]), sub: [] });
      continue;
    }
    if (job && !job.meta && /^\*\*.*\*\*$/.test(line.trim())) { job.meta = strip(line.trim()); continue; }
    sec.paragraphs.push(inline(line.trim()));
  }

  const headline = intro.find((l) => /^\*\*.*\*\*$/.test(l));
  const contactLine = intro.find((l) => l !== headline) ?? '';
  return {
    name,
    headline: headline ? strip(headline) : '',
    contacts: contactLine.split(' · ').map((t) => t.trim()).filter(Boolean),
    sections,
  };
}

export const resume = parse(raw);
