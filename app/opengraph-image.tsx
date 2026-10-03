import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c101c",
          color: "#ece4d2",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, color: "#6f8fc4" }}>
          <span>DELHI NCR · INDIA</span>
          <span>ENGINEERING · {site.graduation}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 150, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4 }}>TRIDIBESH</div>
          <div style={{ fontSize: 150, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4, color: "#ef9b3a" }}>
            SAMANTROY
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div
            style={{
              display: "flex",
              background: "#f6f0e1",
              color: "#0c101c",
              padding: "14px 22px",
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 4,
              transform: "rotate(-2deg)",
            }}
          >
            AI BACKEND ENGINEER
          </div>
          <div style={{ fontSize: 24, color: "#d9cfb8", maxWidth: 520, textAlign: "right" }}>
            {site.tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
