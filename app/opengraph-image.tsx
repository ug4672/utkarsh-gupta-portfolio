import { ImageResponse } from "next/og";

export const alt = "Utkarsh Gupta — Growth & Strategy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(circle at 15% 10%, rgba(217,125,77,0.25), transparent 45%), radial-gradient(circle at 85% 80%, rgba(180,83,42,0.18), transparent 45%), #fbf6ec",
          fontFamily: "Georgia, serif",
          color: "#2a1f17",
          position: "relative",
        }}
      >
        {/* Monogram top-left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "28px",
            fontStyle: "italic",
            color: "#b4532a",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#b4532a",
              color: "#fbf6ec",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontStyle: "italic",
            }}
          >
            U
          </div>
          <span>hi-utkarsh.vercel.app</span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div style={{ fontSize: "32px", color: "#b4532a", fontStyle: "italic" }}>
            — Hello, I&rsquo;m
          </div>
          <div style={{ display: "flex", fontSize: "180px", lineHeight: 0.9, letterSpacing: "-4px" }}>
            <span>Utkarsh&nbsp;</span>
            <span style={{ fontStyle: "italic", color: "#b4532a" }}>Gupta.</span>
          </div>
          <div style={{ display: "flex", fontSize: "40px", lineHeight: 1.2, color: "#2a1f17", maxWidth: "900px", marginTop: "10px" }}>
            <span>
              Growth &amp; Strategy operator building acquisition funnels —&nbsp;
              <span style={{ fontStyle: "italic", color: "#b4532a" }}>
                and the AI tools that run them.
              </span>
            </span>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: "22px",
            color: "#6b5b4e",
          }}
        >
          <div style={{ display: "flex", gap: "40px" }}>
            <span>$3.25M+ ARR @ Interview Kickstart</span>
            <span>·</span>
            <span>$650M scaled @ BrightCHAMPS</span>
          </div>
          <span>Bengaluru → World</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
