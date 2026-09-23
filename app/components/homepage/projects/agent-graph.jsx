// Static SVG of the multi-agent graph. Kept as plain JSX so it ships with zero JS.
// Layout is on a 640x360 viewBox and scales with its container.

const NODE_W = 96;
const NODE_H = 30;

const nodes = {
  prompt: { x: 20, y: 40, label: "prompt", tone: "muted" },
  pm: { x: 150, y: 40, label: "pm_agent" },
  architect: { x: 280, y: 40, label: "architect" },
  backend: { x: 410, y: 12, label: "backend" },
  frontend: { x: 410, y: 68, label: "frontend" },
  devops: { x: 410, y: 124, label: "devops" },
  sandbox: { x: 540, y: 68, label: "sandbox", tone: "warn" },
  qa: { x: 540, y: 180, label: "qa_agent" },
  security: { x: 410, y: 180, label: "security" },
  reviewer: { x: 280, y: 180, label: "reviewer", tone: "accent" },
  approval: { x: 150, y: 180, label: "human ✓", tone: "accent2" },
  zip: { x: 20, y: 180, label: "codebase.zip", tone: "done" },
  ckpt: { x: 280, y: 250, label: "postgres ckpt", tone: "muted" },
};

const edges = [
  ["prompt", "pm"],
  ["pm", "architect"],
  ["architect", "backend"],
  ["architect", "frontend"],
  ["architect", "devops"],
  ["backend", "sandbox"],
  ["frontend", "sandbox"],
  ["devops", "sandbox"],
  ["sandbox", "qa"],
  ["qa", "security"],
  ["security", "reviewer"],
  ["reviewer", "approval"],
  ["approval", "zip"],
];

const stroke = {
  default: "#3b4864",
  accent: "#22d3ee",
  accent2: "#a78bfa",
  warn: "#fbbf24",
  done: "#34d399",
  muted: "#2a3550",
};

const textFill = {
  default: "#e8ecf4",
  accent: "#22d3ee",
  accent2: "#c4b5fd",
  warn: "#fde68a",
  done: "#6ee7b7",
  muted: "#8d97ad",
};

const center = (n) => ({ cx: n.x + NODE_W / 2, cy: n.y + NODE_H / 2 });

function edgePath(a, b) {
  const A = center(nodes[a]);
  const B = center(nodes[b]);
  // Horizontal-ish edges leave from the right/left side; vertical from top/bottom.
  if (Math.abs(A.cy - B.cy) < 4) {
    const x1 = A.cx < B.cx ? nodes[a].x + NODE_W : nodes[a].x;
    const x2 = A.cx < B.cx ? nodes[b].x : nodes[b].x + NODE_W;
    return `M ${x1} ${A.cy} L ${x2} ${B.cy}`;
  }
  if (Math.abs(A.cx - B.cx) < 4) {
    const y1 = A.cy < B.cy ? nodes[a].y + NODE_H : nodes[a].y;
    const y2 = A.cy < B.cy ? nodes[b].y : nodes[b].y + NODE_H;
    return `M ${A.cx} ${y1} L ${B.cx} ${y2}`;
  }
  const x1 = A.cx < B.cx ? nodes[a].x + NODE_W : nodes[a].x;
  const x2 = A.cx < B.cx ? nodes[b].x : nodes[b].x + NODE_W;
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${A.cy} C ${mx} ${A.cy}, ${mx} ${B.cy}, ${x2} ${B.cy}`;
}

function AgentGraph() {
  const rv = nodes.reviewer;
  const bk = nodes.backend;
  // Dashed re-run loop from reviewer back up to the backend agent.
  const loop = `M ${rv.x + NODE_W / 2} ${rv.y} C ${rv.x + NODE_W / 2} ${rv.y - 60}, ${bk.x - 40} ${bk.y + NODE_H + 30}, ${bk.x} ${bk.y + NODE_H / 2}`;
  // Checkpoint edges (dotted) from approval and reviewer down to postgres.
  const ck = nodes.ckpt;
  const ckFromReviewer = `M ${rv.x + NODE_W / 2} ${rv.y + NODE_H} L ${ck.x + NODE_W / 2} ${ck.y}`;

  return (
    <svg
      viewBox="0 0 640 300"
      role="img"
      aria-label="Agent graph: prompt to PM, architect, backend, frontend and devops agents, sandbox tests, QA, security, reviewer with a re-run loop, human approval, and a downloadable codebase, with checkpoints in Postgres."
      className="h-auto w-full font-mono"
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b4864" />
        </marker>
        <marker id="arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
        </marker>
      </defs>

      {edges.map(([a, b]) => (
        <path key={`${a}-${b}`} d={edgePath(a, b)} fill="none" stroke={stroke.default} strokeWidth="1.25" markerEnd="url(#arrow)" />
      ))}

      <path d={loop} fill="none" stroke={stroke.accent} strokeWidth="1.25" strokeDasharray="4 4" markerEnd="url(#arrow-accent)" className="animate-dash" />
      <text x={40} y={132} fill={textFill.accent} fontSize="10">
        score &lt; threshold → re-run only the failing agent
      </text>

      <path d={ckFromReviewer} fill="none" stroke={stroke.muted} strokeWidth="1" strokeDasharray="2 3" />
      <text x={ck.x + NODE_W + 8} y={ck.y + NODE_H / 2 + 3} fill={textFill.muted} fontSize="10">
        interrupt() · resume from any step
      </text>

      {Object.entries(nodes).map(([key, n]) => {
        const tone = n.tone ?? "default";
        return (
          <g key={key}>
            <rect
              x={n.x}
              y={n.y}
              width={NODE_W}
              height={NODE_H}
              rx="7"
              fill="#121829"
              stroke={stroke[tone] ?? stroke.default}
              strokeWidth={tone === "default" ? 1 : 1.5}
            />
            <text
              x={n.x + NODE_W / 2}
              y={n.y + NODE_H / 2 + 3.5}
              textAnchor="middle"
              fontSize="10.5"
              fill={textFill[tone] ?? textFill.default}
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default AgentGraph;
