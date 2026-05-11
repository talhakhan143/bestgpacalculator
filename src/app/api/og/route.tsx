import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "GPA Calculator").slice(0, 70);
  const subtitle = (searchParams.get("subtitle") ?? "Free tools for high school & college students").slice(0, 120);
  const stat = searchParams.get("stat") ?? "4.0";
  const label = searchParams.get("label") ?? "Scale";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #fdf6ef 0%, #fbeee0 35%, #ffe4ec 65%, #ede0ff 100%)",
          padding: "72px",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Inter, sans-serif",
        }}
      >
        {/* Header brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "#2563eb",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 800,
              fontSize: 28,
            }}
          >
            G
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", letterSpacing: -0.4 }}>
            BestGPACalculator.com
          </div>
        </div>

        {/* Title block */}
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between", marginTop: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: "62%" }}>
            <div
              style={{
                fontSize: 76,
                fontWeight: 800,
                lineHeight: 1.05,
                color: "#0f172a",
                letterSpacing: -1.5,
              }}
            >
              {title}
            </div>
            <div
              style={{
                marginTop: 24,
                fontSize: 28,
                lineHeight: 1.35,
                color: "#475569",
                letterSpacing: -0.2,
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Big stat card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 280,
              height: 280,
              background: "#ffffff",
              borderRadius: 28,
              boxShadow: "0 24px 48px -16px rgba(15, 23, 42, 0.18)",
              border: "1px solid rgba(15, 23, 42, 0.06)",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#64748b" }}>
              {label}
            </div>
            <div
              style={{
                fontSize: 132,
                fontWeight: 800,
                color: "#2563eb",
                letterSpacing: -3,
                lineHeight: 1,
                marginTop: 8,
              }}
            >
              {stat}
            </div>
          </div>
        </div>

        {/* Footer pills */}
        <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
          {["Free forever", "No signup", "Mobile-first", "Live recalc"].map((t) => (
            <div
              key={t}
              style={{
                padding: "10px 18px",
                background: "#ffffff",
                border: "1px solid rgba(15, 23, 42, 0.08)",
                borderRadius: 999,
                fontSize: 20,
                fontWeight: 600,
                color: "#1e293b",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
