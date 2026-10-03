import { site, hasEmail } from "@/lib/site";

export type Social = { label: string; href: string; handle: string; external: boolean };

export function getSocials(): Social[] {
  const list: Social[] = [
    { label: "GitHub", href: site.github, handle: `@${site.githubUser}`, external: true },
    { label: "LinkedIn", href: site.linkedin, handle: "in/tridibesh-samantroy", external: true },
  ];
  if (hasEmail()) {
    list.push({ label: "Email", href: `mailto:${site.email}`, handle: site.email, external: false });
  }
  list.push({ label: "Resume", href: site.resume, handle: "resume.pdf", external: true });
  return list;
}

/** Selected repositories shown in the Open Source section. */
export const selectedRepos = [
  { name: "messaging-platform", blurb: "Real-time messaging backend — WebSockets, Redis Pub/Sub, Postgres." },
  { name: "EVENTRA", blurb: "Agentic event orchestration with LangGraph + FastAPI." },
  { name: "CodeArena", blurb: "Sandboxed code execution platform on Docker." },
  { name: "retail-store-agent", display: "Retail Store Agent", blurb: "Multi-agent inventory + supplier negotiation workflow." },
  { name: "System-Design", display: "System-Design", blurb: "Study notes & implementations on system design & distributed systems fundamentals." },
  { name: "Workbench", blurb: "Workbench repository." },
].map((r) => ({ ...r, url: `${site.github}/${r.name}` }));
