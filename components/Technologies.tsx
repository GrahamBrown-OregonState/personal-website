"use client";

import { useEffect, useRef, useState } from "react";

// ─── EDIT THESE ───────────────────────────────────────────
// Place logo files in public/logos/ — e.g. public/logos/bash.svg
// The "file" value is the filename without extension.

const ROW_ONE = [
  { name: "AVR Assembly",   file: "avr-assembly"},
  { name: "Bash",           file: "bash"},
  { name: "C",              file: "c" },
  { name: "C++",            file: "cpp" },
  { name: "Debian",         file: "debian"},
  { name: "Git",            file: "git"},
  { name: "Haskell",        file: "haskell"},
  { name: "JavaScript",     file: "javascript"},
  { name: "Linux",          file: "linux" },
  { name: "Next.js",        file: "nextjs"},
  { name: "Node.js",        file: "nodejs"},
  { name: "Python",         file: "python"},
  { name: "Quartus",        file: "quartus"},
  { name: "React",          file: "react"},
  { name: "Red Hat",        file: "redhat"},
  { name: "Spreadsheets",   file: "spreadsheets"},
  { name: "SystemVerilog",  file: "systemverilog"},
  { name: "TypeScript",     file: "typescript"},
  { name: "Unity",          file: "unity"},
  { name: "Vercel",         file: "vercel"},
];

// File extension — change to "png" or "webp" if needed
const EXT = "svg";
// ──────────────────────────────────────────────────────────

function Logo({ name, file }: { name: string; file: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="tech-logo"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="tech-logo-inner">
        <img
          src={`/logos/${file}.${EXT}`}
          alt={name}
          className="tech-logo-img"
          style={{ opacity: hovered ? 0.75 : 0.25 }}
          onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
        />
        <span
          className="tech-logo-name"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(3px)",
          }}
        >
          {name}
        </span>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: typeof ROW_ONE; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrap">
      <div className={`marquee-track ${reverse ? "marquee-rev" : ""}`}>
        {doubled.map((tech, i) => (
          <Logo key={`${tech.file}-${i}`} name={tech.name} file={tech.file} />
        ))}
      </div>
    </div>
  );
}

export default function Technologies() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerInView, setHeaderInView] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeaderInView(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@300;400&display=swap');

        .tech-section {
          background: var(--bg, #f5f0e8);
          padding: 0 0 8rem;
          overflow: hidden;
        }

        .tech-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid var(--rule, #c8bfb0);
          border-bottom: 1px solid var(--rule, #c8bfb0);
          margin-bottom: 4rem;
        }

        .tech-header-left {
          padding: 2rem 2.5rem 2rem 4rem;
          border-right: 1px solid var(--rule, #c8bfb0);
          display: flex;
          align-items: flex-end;
        }

        .tech-section-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          color: var(--ink-faint, #9a8e80);
          text-transform: uppercase;
        }

        .tech-header-right {
          padding: 2rem 4rem 2rem 3.5rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .tech-heading {
          font-family: 'EB Garamond', serif;
          font-style: italic;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 400;
          color: var(--ink, #1a1612);
          line-height: 1;
          margin: 0;
        }

        .tech-total {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.18em;
          color: var(--ink-faint, #9a8e80);
          align-self: flex-start;
          padding-top: 0.3rem;
        }

        /* Marquee container */
        .tech-rows {
          border-top: 1px solid var(--rule, #c8bfb0);
          border-bottom: 1px solid var(--rule, #c8bfb0);
        }

        .marquee-wrap {
          overflow: hidden;
          border-bottom: 1px solid var(--rule, #c8bfb0);
          position: relative;
        }

        .marquee-wrap:last-child {
          border-bottom: none;
        }

        /* Fade edges */
        .marquee-wrap::before,
        .marquee-wrap::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 7rem;
          z-index: 2;
          pointer-events: none;
        }
        .marquee-wrap::before {
          left: 0;
          background: linear-gradient(to right, var(--bg, #f5f0e8), transparent);
        }
        .marquee-wrap::after {
          right: 0;
          background: linear-gradient(to left, var(--bg, #f5f0e8), transparent);
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: scroll-fwd 38s linear infinite;
        }

        .marquee-rev {
          animation: scroll-rev 44s linear infinite;
        }

        .marquee-track:hover,
        .marquee-rev:hover {
          animation-play-state: paused;
        }

        @keyframes scroll-fwd {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        @keyframes scroll-rev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        /* Logo item */
        .tech-logo {
          padding: 2.2rem 2.6rem;
          border-right: 1px solid var(--rule, #c8bfb0);
          flex-shrink: 0;
          cursor: default;
        }

        .tech-logo-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.65rem;
          width: 3rem;
        }

        .tech-logo-img {
          width: 1.9rem;
          height: 1.9rem;
          object-fit: contain;
          filter: sepia(0.3) brightness(0.45);
          transition: opacity 0.25s ease, filter 0.25s ease;
        }

        .tech-logo:hover .tech-logo-img {
          filter: sepia(0.5) saturate(0.9) brightness(0.65);
        }

        .tech-logo-name {
          font-family: 'DM Mono', monospace;
          font-size: 0.5rem;
          font-weight: 300;
          letter-spacing: 0.14em;
          color: var(--ink-faint, #9a8e80);
          text-transform: uppercase;
          white-space: nowrap;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        /* Header reveal */
        .t-reveal {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .t-reveal.show {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 700px) {
          .tech-header { grid-template-columns: 1fr; }
          .tech-header-left {
            border-right: none;
            border-bottom: 1px solid var(--rule, #c8bfb0);
            padding: 1.5rem 2rem;
          }
          .tech-header-right { padding: 1.5rem 2rem; }
        }
      `}</style>

      <section className="tech-section">

        <div className="tech-header" ref={headerRef}>
          <div className="tech-header-left">
            <span className={`tech-section-label t-reveal ${headerInView ? "show" : ""}`}>
              Tools &amp; stack
            </span>
          </div>
          <div className="tech-header-right">
            <h2
              className={`tech-heading t-reveal ${headerInView ? "show" : ""}`}
              style={{ transitionDelay: "0.1s" }}
            >
              Technologies
            </h2>
            <span
              className={`tech-total t-reveal ${headerInView ? "show" : ""}`}
              style={{ transitionDelay: "0.2s" }}
            >
              {String(ROW_ONE.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="tech-rows">
          <MarqueeRow items={ROW_ONE} />
        </div>

      </section>
    </>
  );
}