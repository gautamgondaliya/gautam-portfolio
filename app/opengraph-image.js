import { ImageResponse } from "next/og";
import { personalData } from "@/utils/data/personal-data";

export const alt = `${personalData.name} · ${personalData.designation}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stats = [
  ["10", "LangGraph agents"],
  ["Hybrid RAG", "pgvector + FTS"],
  ["200K+", "concurrent viewers"],
];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #090d17 0%, #0f1523 100%)",
          color: "#e6e9f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, color: "#22d3ee", letterSpacing: 4 }}>
            ~/gautam
          </div>
          <div style={{ fontSize: 68, fontWeight: 700, marginTop: 24, color: "#ffffff" }}>
            {personalData.name}
          </div>
          <div style={{ fontSize: 40, marginTop: 8, color: "#a78bfa" }}>
            {personalData.designation}
          </div>
          <div style={{ fontSize: 26, marginTop: 24, color: "#8b94a7", maxWidth: 900 }}>
            LLM agents · RAG pipelines · real-time platforms at scale
          </div>
        </div>

        <div style={{ display: "flex", gap: 24 }}>
          {stats.map(([value, label]) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "20px 28px",
                border: "1px solid #1e2738",
                borderRadius: 16,
                background: "#0f1523",
                minWidth: 260,
              }}
            >
              <div style={{ fontSize: 40, fontWeight: 700, color: "#ffffff" }}>{value}</div>
              <div style={{ fontSize: 22, color: "#22d3ee", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
