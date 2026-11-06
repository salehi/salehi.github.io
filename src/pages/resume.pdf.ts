// Serves resume.pdf (repo root) as-is at /resume.pdf.
import { readFile } from 'node:fs/promises';

export async function GET() {
  return new Response(await readFile('resume.pdf'), { headers: { 'Content-Type': 'application/pdf' } });
}
