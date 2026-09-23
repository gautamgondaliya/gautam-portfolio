"use client";

import { useEffect, useState } from "react";

// A replay of a real run shape from the multi-agent platform.
// tone: cmd | ok | fail | warn | info | done
const LINES = [
  { tone: "cmd", text: '$ agent-team run "Build a SaaS invoicing app with Stripe"' },
  { tone: "ok", text: "▸ pm_agent         → requirements.md            ✓ 2.1s" },
  { tone: "ok", text: "▸ architect_agent  → system_design.md           ✓ 3.4s" },
  { tone: "ok", text: "▸ backend_agent    → 14 files (FastAPI)         ✓ 11.8s" },
  { tone: "ok", text: "▸ frontend_agent   → 22 files (Next.js)         ✓ 13.2s" },
  { tone: "fail", text: "▸ qa_agent         → 38 tests · 36 passed       ✗" },
  { tone: "warn", text: "▸ reviewer_agent   → 7.1/10 → re-run backend_agent" },
  { tone: "ok", text: "▸ backend_agent    → patched 2 files            ✓ 4.0s" },
  { tone: "ok", text: "▸ qa_agent         → 38 tests · 38 passed       ✓" },
  { tone: "ok", text: "▸ security_agent   → 0 critical · 1 low         ✓" },
  { tone: "info", text: "⏸ interrupt() → awaiting human approval … approved" },
  { tone: "done", text: "✔ codebase.zip ready · checkpoint saved to postgres" },
];

const INITIAL = 3; // visible on first paint so the panel is never empty

const toneClass = {
  cmd: "text-white",
  ok: "text-emerald-300",
  fail: "text-rose-300",
  warn: "text-amber-300",
  info: "text-accent2",
  done: "text-accent font-semibold",
};

function AgentTerminal() {
  const [count, setCount] = useState(INITIAL);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = reduce ? 0 : 480;
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= LINES.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, step);
    return () => clearInterval(id);
  }, []);

  const finished = count >= LINES.length;

  return (
    <div className="card min-w-0 overflow-hidden shadow-glow">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] text-muted">
          <span className="rounded border border-line bg-surface-2 px-2 py-0.5 text-ink">run.log</span>
          <span>langgraph · #1042</span>
        </div>
      </div>

      <pre
        aria-label="Example multi-agent run log"
        className="min-h-[300px] overflow-x-auto px-4 py-4 font-mono text-[11px] leading-6 sm:text-xs"
      >
        {LINES.slice(0, count).map((l, i) => (
          <div key={i} className={toneClass[l.tone]}>
            {l.text}
          </div>
        ))}
        <div className="text-muted">
          {finished ? "$ " : ""}
          <span className="inline-block h-4 w-2 translate-y-[3px] animate-blink bg-accent" />
        </div>
      </pre>
    </div>
  );
}

export default AgentTerminal;
