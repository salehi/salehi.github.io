import snapshot from '../data/repos.snapshot.json';

/** Repos that are infrastructure for the profile itself, not projects. */
export const META_REPOS = new Set(['salehi.github.io', 'salehi']);

export type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  size: number;
};

const USER = 'salehi';
let cache: Promise<Repo[]> | undefined;

async function fetchRepos(): Promise<Repo[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'salehi.github.io-build',
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const all: Repo[] = [];
  for (let page = 1; page <= 5; page++) {
    const res = await fetch(
      `https://api.github.com/users/${USER}/repos?per_page=100&type=owner&sort=pushed&page=${page}`,
      { headers },
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const batch = (await res.json()) as (Repo & { private: boolean })[];
    all.push(...batch.filter((r) => !r.private));
    if (batch.length < 100) break;
  }
  return all;
}

/** Public repos, newest activity first. Falls back to the committed snapshot when offline. */
export function getRepos(): Promise<Repo[]> {
  cache ??= fetchRepos().catch((err) => {
    console.warn(`[github] ${err.message}; using repos.snapshot.json`);
    return snapshot as Repo[];
  });
  return cache;
}

export const langColor: Record<string, string> = {
  Go: '#00add8',
  Python: '#3572a5',
  Kotlin: '#a97bff',
  Java: '#b07219',
  Shell: '#89e051',
  Lua: '#5a6fd6',
  HTML: '#e34c26',
  CSS: '#8a5cd6',
  JavaScript: '#e8d44d',
  TypeScript: '#3178c6',
  C: '#8b949e',
  'C++': '#f34b7d',
  PHP: '#6e7bb8',
  Perl: '#0298c3',
  PostScript: '#da291c',
  Mustache: '#a0785a',
};

export const fmtMonth = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
