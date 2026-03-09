"use client";

import { useEffect, useRef, useState } from "react";

// ─── EDIT THESE ───────────────────────────────────────────
const NAME_FIRST = "Graham";
const NAME_LAST  = "Brown";
const ROLE       = "Systems Engineer";
const LOCATION   = "Corvallis, OR";
const INDEX      = "001";
// ──────────────────────────────────────────────────────────

export default function HeroText() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@300;400&display=swap');

        :root {
          --bg:        #f5f0e8;
          --ink:       #1a1612;
          --ink-faint: #9a8e80;
          --rule:      #c8bfb0;
          --accent:    #7a5c3a;
        }

        .hero-root {
          background: var(--bg);
          min-height: 100vh;
          display: grid;
          grid-template-rows: 1fr auto;
          padding: 0;
          position: relative;
          overflow: hidden;
        }

        /* paper grain */
        .hero-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 180px;
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr;
          min-height: 100vh;
        }

        /* left column — metadata */
        .hero-meta {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3rem 2.5rem 3rem 4rem;
          border-right: 1px solid var(--rule);
        }

        .hero-index {
          font-family: 'DM Mono', monospace;
          font-weight: 300;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          color: var(--ink-faint);
          text-transform: uppercase;
        }

        .hero-meta-bottom {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        .hero-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          color: var(--ink-faint);
          text-transform: uppercase;
          margin-bottom: 0.3rem;
        }

        .hero-value {
          font-family: 'EB Garamond', serif;
          font-size: 1.05rem;
          color: var(--ink);
          line-height: 1.4;
        }

        .hero-rule-h {
          width: 2rem;
          height: 1px;
          background: var(--accent);
          margin-bottom: 0.6rem;
        }

        /* right column — name */
        .hero-name-col {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 3rem 4rem 3rem 3.5rem;
        }

        .hero-name-wrap {
          line-height: 0.88;
          margin-bottom: 3rem;
        }

        .hero-name-first {
          display: block;
          font-family: 'EB Garamond', serif;
          font-weight: 400;
          font-style: italic;
          font-size: clamp(4.5rem, 9vw, 9rem);
          color: var(--ink);
          letter-spacing: -0.01em;
        }

        .hero-name-last {
          display: block;
          font-family: 'EB Garamond', serif;
          font-weight: 500;
          font-style: normal;
          font-size: clamp(4.5rem, 9vw, 9rem);
          color: var(--ink);
          letter-spacing: -0.01em;
          margin-left: 0.12em;
        }

        .hero-role-line {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .hero-role-dash {
          width: 2.5rem;
          height: 1px;
          background: var(--accent);
          flex-shrink: 0;
        }

        .hero-role-text {
          font-family: 'DM Mono', monospace;
          font-weight: 300;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          color: var(--accent);
          text-transform: uppercase;
        }

        /* bottom bar */
        .hero-footer {
          position: relative;
          z-index: 1;
          border-top: 1px solid var(--rule);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 4rem;
        }

        .hero-footer-item {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          color: var(--ink-faint);
          text-transform: uppercase;
        }

        /* large ghost text — background decoration */
        .hero-ghost {
          position: absolute;
          bottom: -0.15em;
          right: -0.05em;
          font-family: 'EB Garamond', serif;
          font-size: clamp(12rem, 24vw, 22rem);
          font-weight: 500;
          color: transparent;
          -webkit-text-stroke: 1px rgba(122, 92, 58, 0.08);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }

        /* staggered reveal */
        .reveal {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.show { opacity: 1; transform: translateY(0); }
        .reveal-d1 { transition-delay: 0.05s; }
        .reveal-d2 { transition-delay: 0.18s; }
        .reveal-d3 { transition-delay: 0.32s; }
        .reveal-d4 { transition-delay: 0.46s; }
        .reveal-d5 { transition-delay: 0.60s; }
        .reveal-d6 { transition-delay: 0.74s; }

        @media (max-width: 700px) {
          .hero-inner {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
          }
          .hero-meta {
            border-right: none;
            border-bottom: 1px solid var(--rule);
            padding: 2rem 2rem 1.5rem;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 1.5rem;
            justify-content: space-between;
          }
          .hero-meta-bottom {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 1.5rem;
          }
          .hero-name-col {
            padding: 2rem 2rem 5rem;
            justify-content: flex-end;
          }
          .hero-ghost { font-size: 38vw; }
          .hero-footer { padding: 1rem 2rem; }
        }
      `}</style>

      <section className="hero-root" ref={ref}>

        <div className="hero-inner">

          {/* ── Left: metadata ── */}
          <div className="hero-meta">
            <span className={`hero-index reveal reveal-d1 ${visible ? "show" : ""}`}>
              #{INDEX}
            </span>

            <div className="hero-meta-bottom">
              <div className={`reveal reveal-d2 ${visible ? "show" : ""}`}>
                <div className="hero-rule-h" />
                <p className="hero-label">Discipline</p>
                <p className="hero-value">{ROLE}</p>
              </div>
              <div className={`reveal reveal-d3 ${visible ? "show" : ""}`}>
                <div className="hero-rule-h" />
                <p className="hero-label">Location</p>
                <p className="hero-value">{LOCATION}</p>
              </div>
              <div className={`reveal reveal-d4 ${visible ? "show" : ""}`}>
                <div className="hero-rule-h" />
                <p className="hero-label">Status</p>
                <p className="hero-value">Available for work</p>
              </div>
            </div>
          </div>

          {/* ── Right: name ── */}
          <div className="hero-name-col">
            <span className="hero-ghost" aria-hidden>
              {NAME_LAST.charAt(0)}
            </span>

            <div className={`hero-name-wrap reveal reveal-d3 ${visible ? "show" : ""}`}>
              <span className="hero-name-first">{NAME_FIRST}</span>
              <span className="hero-name-last">{NAME_LAST}</span>
            </div>

            <div className={`hero-role-line reveal reveal-d5 ${visible ? "show" : ""}`}>
              <span className="hero-role-dash" />
              <span className="hero-role-text">{ROLE}</span>
            </div>
          </div>

        </div>

        {/* ── Footer bar ── */}
        <footer className="hero-footer">
          <span className={`hero-footer-item reveal reveal-d5 ${visible ? "show" : ""}`}>
            Portfolio
          </span>
          <span className={`hero-footer-item reveal reveal-d6 ${visible ? "show" : ""}`}>
            {new Date().getFullYear()}
          </span>
          <span className={`hero-footer-item reveal reveal-d5 ${visible ? "show" : ""}`}>
            Scroll ↓
          </span>
        </footer>

      </section>
    </>
  );
}