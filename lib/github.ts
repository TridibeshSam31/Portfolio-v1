import { site } from "@/lib/site";

export type RepoMeta = { language: string | null; updated: string | null; description: string | null };

/**
 * Fetches REAL public repo metadata from the GitHub REST API (cached 24h).
 * Returns an empty map on any failure — the UI then falls back to static copy.
 */
export async function getRepoMeta(): Promise<Record<string, RepoMeta>> {
  try {
    const res = await fetch(`https://api.github.com/users/${site.githubUser}/repos?per_page=100&sort=updated`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return {};
    const data = (await res.json()) as {
      name: string;
      language: string | null;
      pushed_at: string | null;
      description: string | null;
    }[];
    const map: Record<string, RepoMeta> = {};
    for (const r of data) {
      map[r.name.toLowerCase()] = { language: r.language, updated: r.pushed_at, description: r.description };
    }
    return map;
  } catch {
    return {};
  }
}
