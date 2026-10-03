import type { FlowNode } from "@/data/projects";

type Props = {
  nodes: FlowNode[];
  orientation?: "vertical" | "horizontal";
  /** colour of node boxes */
  nodeClass?: string;
  arrowClass?: string;
  /** highlight nodes sequentially when an ancestor `.group` is hovered */
  animateOnGroupHover?: boolean;
};

/** Tiny architecture diagram: boxes connected by hand-drawn arrows. */
export function FlowDiagram({
  nodes,
  orientation = "vertical",
  nodeClass = "bg-cream text-ink border-ink",
  arrowClass = "text-ink/60",
  animateOnGroupHover = false,
}: Props) {
  const vertical = orientation === "vertical";
  return (
    <ol
      className={`flex ${vertical ? "flex-col items-stretch" : "flex-col items-stretch md:flex-row md:flex-wrap md:items-center"} gap-0`}
      aria-label="Architecture flow"
    >
      {nodes.map((n, i) => (
        <li key={n.label} className={`flex ${vertical ? "flex-col" : "flex-col md:flex-row md:items-center"}`}>
          <div
            className={`rough-box flex items-baseline justify-between gap-3 border-[1.5px] px-3 py-2 ${nodeClass} ${
              animateOnGroupHover
                ? "transition-transform duration-300 group-hover:translate-x-1.5"
                : ""
            }`}
            style={animateOnGroupHover ? { transitionDelay: `${i * 55}ms` } : undefined}
          >
            <span className="t-mono text-[0.72rem] font-bold tracking-[0.12em] uppercase">{n.label}</span>
            {n.note && <span className="t-hand text-[1.05rem] leading-none opacity-75">{n.note}</span>}
          </div>
          {i < nodes.length - 1 && (
            <svg
              aria-hidden="true"
              viewBox="0 0 20 22"
              className={`${arrowClass} ${vertical ? "mx-auto my-0.5 h-4 w-4" : "mx-auto my-0.5 h-4 w-4 md:mx-1.5 md:my-0 md:-rotate-90"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M10 2 C 8 8, 12 12, 10 19" />
              <path d="M5 14 L 10 20 L 15 14" />
            </svg>
          )}
        </li>
      ))}
    </ol>
  );
}
