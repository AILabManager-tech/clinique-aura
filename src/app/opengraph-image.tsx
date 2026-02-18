import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Clinique Aura — Clinique multidisciplinaire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #5BA4C9 0%, #4888AD 50%, #366C8A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div style={{ fontSize: 72, fontWeight: 700, color: "#fff", letterSpacing: "-2px" }}>
            Clinique Aura
          </div>
          <div style={{ fontSize: 28, color: "#E4EFE2", fontWeight: 400 }}>
            Clinique multidisciplinaire
          </div>
          <div
            style={{
              marginTop: "24px",
              width: "80px",
              height: "4px",
              background: "linear-gradient(90deg, #F4B183, #A8C5A0)",
              borderRadius: "2px",
            }}
          />
          <div style={{ fontSize: 20, color: "#FAFCFD", marginTop: "8px" }}>
            Sherbrooke, QC
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
