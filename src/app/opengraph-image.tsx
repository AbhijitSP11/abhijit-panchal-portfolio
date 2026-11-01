import { ImageResponse } from "next/og";

export const alt = "Abhijit. — full stack developer in Mumbai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f1f0eb",
          color: "#242620",
          padding: "72px 84px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#6b6d63" }}>
          FULL STACK DEVELOPER · MUMBAI
        </div>
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 230, fontWeight: 700, letterSpacing: -10, lineHeight: 1 }}>
          Abhijit
          <span style={{ color: "#d62d46" }}>.</span>
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#3a3c33" }}>
          I build software for banks and fintech: payments, reconciliation and billing.
        </div>
      </div>
    ),
    size
  );
}
