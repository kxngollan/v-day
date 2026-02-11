"use client";
import React, { useEffect, useRef, useState } from "react";

export default function ValentinePage() {
  const playRef = useRef(null);
  const noRef = useRef(null);

  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const [saidYes, setSaidYes] = useState(false);
  const [forceYes, setForceYes] = useState(false);

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  const setCenteredNo = () => {
    const exists = document.querySelector(".nobtn");
    if (exists) {
      exists.remove();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const play: any = playRef.current;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const noBtn: any = noRef.current;
    if (!play || !noBtn) return;

    const p = play.getBoundingClientRect();
    const b = noBtn.getBoundingClientRect();
    const pad = 12;

    const x = clamp(p.width / 2 - b.width / 2, pad, p.width - b.width - pad);
    const y = clamp(
      p.height / 2 - b.height / 2,
      pad,
      p.height - b.height - pad,
    );

    setNoPos({ x, y });
    setReady(true);
  };

  useEffect(() => {
    const onResize = () => setCenteredNo();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moveNo = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const play: any = playRef.current;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const noBtn: any = noRef.current;
    if (!play || !noBtn) return;

    const p = play.getBoundingClientRect();
    const b = noBtn.getBoundingClientRect();
    const pad = 12;

    const maxX = Math.max(pad, p.width - b.width - pad);
    const maxY = Math.max(pad, p.height - b.height - pad);

    let x = noPos.x;
    let y = noPos.y;

    for (let i = 0; i < 12; i++) {
      const nx = pad + Math.random() * (maxX - pad);
      const ny = pad + Math.random() * (maxY - pad);
      if (Math.hypot(nx - noPos.x, ny - noPos.y) > 70) {
        x = nx;
        y = ny;
        break;
      }
      x = nx;
      y = ny;
    }

    setNoPos({ x, y });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background:
          "radial-gradient(circle at top, #ffe4f1 0%, #fff 45%, #ffeef6 100%)",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
      }}
    >
      <div
        style={{
          width: "min(720px, 92vw)",
          height: "min(460px, 75vh)",
          borderRadius: 24,
          position: "relative",
          padding: 28,
          background: "rgba(255,255,255,0.8)",
          border: "1px solid rgba(255, 45, 134, 0.25)",
          boxShadow: "0 20px 60px rgba(255, 105, 180, 0.15)",
          overflow: "hidden",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 52, lineHeight: 1 }}>💘</div>
          <h1 style={{ margin: "12px 0 6px", fontSize: 34 }}>
            Will you be my valentine?
          </h1>
          <p style={{ margin: 0, opacity: 0.75 }}>(Choose wisely 😇)</p>
        </div>

        <div
          ref={playRef}
          style={{
            position: "absolute",
            left: 16,
            right: 16,
            top: 150,
            bottom: 110,
            borderRadius: 18,
          }}
        >
          {!forceYes ? (
            <button
              ref={noRef}
              onClick={() => {
                setForceYes(true);
              }}
              onMouseEnter={moveNo}
              onMouseDown={moveNo}
              onTouchStart={(e) => {
                e.preventDefault();
                moveNo();
              }}
              style={{
                position: "absolute",
                left: noPos.x,
                top: noPos.y,
                opacity: ready ? 1 : 0,
                border: "1px solid rgba(0,0,0,0.12)",
                padding: "14px 22px",
                borderRadius: 999,
                background: "white",
                color: "#222",
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 10px 26px rgba(0,0,0,0.10)",
                transition:
                  "left 160ms ease, top 160ms ease, opacity 120ms ease",
                userSelect: "none",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              No 🙃
            </button>
          ) : (
            ""
          )}
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 28,
            display: "flex",
            justifyContent: "center",
            gap: 14,
          }}
        >
          <button
            onClick={() => setSaidYes(true)}
            style={{
              border: "none",
              padding: "14px 22px",
              borderRadius: 999,
              background: "#ff2d86",
              color: "white",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 12px 30px rgba(255,45,134,0.35)",
            }}
          >
            Yes
          </button>
          <button
            className="nobtn"
            onClick={setCenteredNo}
            onMouseEnter={setCenteredNo}
            onMouseDown={setCenteredNo}
            onTouchStart={(e) => {
              e.preventDefault();
              setCenteredNo();
            }}
            style={{
              border: "1px solid rgba(0,0,0,0.12)",
              padding: "14px 22px",
              borderRadius: 999,
              background: "white",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 10px 26px rgba(0,0,0,0.10)",
              transition: "left 160ms ease, top 160ms ease, opacity 120ms ease",
              userSelect: "none",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            No 🙃
          </button>
          {forceYes ? (
            <p
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 700,
                color: "#ff2d86",
                margin: 0,
                padding: "14px 0",
                opacity: 0.9,
              }}
            >
              You do not have a choice!
            </p>
          ) : (
            ""
          )}
        </div>

        {saidYes && (
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setSaidYes(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.25)",
              display: "grid",
              placeItems: "center",
              padding: 16,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "min(520px, 92vw)",
                background: "white",
                borderRadius: 20,
                padding: 22,
                textAlign: "center",
                boxShadow: "0 22px 70px rgba(0,0,0,0.25)",
                border: "1px solid rgba(255, 45, 134, 0.25)",
                color: "#ff2d86",
              }}
            >
              <div style={{ fontSize: 44, marginBottom: 6 }}>🎉💞</div>
              <h2 style={{ margin: "6px 0 8px" }}>YAY! It’s a date!</h2>
              <p style={{ margin: 0, opacity: 0.8 }}>Best. Valentine. Ever.</p>
              <button
                onClick={() => setSaidYes(false)}
                style={{
                  marginTop: 16,
                  border: "none",
                  padding: "12px 18px",
                  borderRadius: 999,
                  background: "#111",
                  color: "white",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
