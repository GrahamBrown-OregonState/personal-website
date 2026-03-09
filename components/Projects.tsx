"use client";

import { useEffect, useRef, useState } from "react";

// ─── EDIT THESE ───────────────────────────────────────────
const PROJECTS = [
  {
    index: "001",
    title: "Distributed Cache Layer",
    category: "Infrastructure",
    year: "2024",
    description: "Designed and deployed a distributed caching system across a multi-region cluster, reducing p99 latency by 40%.",
    tags: ["Redis", "Kubernetes", "Go"],
    image: null,
  },
  {
    index: "002",
    title: "CI/CD Pipeline Overhaul",
    category: "Automation",
    year: "2024",
    description: "Re-architected a legacy build system into a fully containerised pipeline with parallel test execution.",
    tags: ["GitHub Actions", "Docker", "Bash"],
    image: null,
  },
  {
    index: "003",
    title: "Observability Platform",
    category: "Monitoring",
    year: "2023",
    description: "Built an internal metrics and alerting platform ingesting 500k+ events per minute with sub-second dashboards.",
    tags: ["Prometheus", "Grafana", "Rust"],
    image: null,
  },
  {
    index: "004",
    title: "Network Topology Mapper",
    category: "Tooling",
    year: "2023",
    description: "CLI tool that auto-discovers and renders live network topology as an interactive graph for ops teams.",
    tags: ["Python", "SNMP", "D3.js"],
    image: null,
  },
  {
    index: "005",
    title: "Zero-Downtime Migration",
    category: "Database",
    year: "2022",
    description: "Led a live schema migration across 12 TB of production PostgreSQL data with no service interruption.",
    tags: ["PostgreSQL", "pglogical", "Terraform"],
    image: null,
  },
  {
    index: "006",
    title: "Secrets Management System",
    category: "Security",
    year: "2022",
    description: "Rolled out a centralised secrets rotation system with audit logging and automatic credential expiry.",
    tags: ["Vault", "AWS IAM", "Python"],
    image: null,
  },
];
// ──────────────────────────────────────────────────────────

function useInView(ref: React.RefObject<Element>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function PlaceholderImage({ index, category }: { index: string; category: string }) {
  return (
    <div className="proj-placeholder" aria-hidden>
      <span className="proj-placeholder-index">{index}</span>
      <span className="proj-placeholder-cat">{category}</span>
      <div className="proj-placeholder-lines">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="proj-placeholder-line" style={{ width: `${40 + i * 10 + (parseInt(index) * 7 % 30)}%` }} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, delay }: { project: typeof PROJECTS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  return (
    <div
      ref={ref}
      className={`proj-card ${inView ? "in-view" : ""}`}
    >
      <div className="proj-image-wrap" style={{ transitionDelay: `${delay}ms` }}>
        {project.image
          ? <img src={project.image} alt={project.title} className="proj-image" />
          : <PlaceholderImage index={project.index} category={project.category} />
        }
        <div className="proj-image-overlay">
          <span className="proj-overlay-label">View project →</span>
        </div>
      </div>

      <div className="proj-card-body">
        <div className="proj-card-body-inner" style={{ transitionDelay: `${delay + 80}ms` }}>
          <div className="proj-card-top">
            <span className="proj-index">#{project.index}</span>
            <span className="proj-year">{project.year}</span>
          </div>

          <div className="proj-rule-h" />
          <h3 className="proj-title">{project.title}</h3>
          <p className="proj-category">{project.category}</p>
          <p className="proj-desc">{project.description}</p>

          <div className="proj-tags">
            {project.tags.map(tag => (
              <span key={tag} className="proj-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef as React.RefObject<Element>, 0.3);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@300;400&display=swap');

        .proj-section {
          background: var(--bg, #f5f0e8);
          padding: 0 0 8rem;
          position: relative;
        }

        /* Section header */
        .proj-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid var(--rule, #c8bfb0);
          border-bottom: 1px solid var(--rule, #c8bfb0);
          margin-bottom: 4rem;
        }

        .proj-header-left {
          padding: 2rem 2.5rem 2rem 4rem;
          border-right: 1px solid var(--rule, #c8bfb0);
          display: flex;
          align-items: flex-end;
        }

        .proj-section-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          color: var(--ink-faint, #9a8e80);
          text-transform: uppercase;
        }

        .proj-header-right {
          padding: 2rem 4rem 2rem 3.5rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .proj-heading {
          font-family: 'EB Garamond', serif;
          font-style: italic;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 400;
          color: var(--ink, #1a1612);
          line-height: 1;
          margin: 0;
        }

        .proj-count {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.18em;
          color: var(--ink-faint, #9a8e80);
          align-self: flex-start;
          padding-top: 0.3rem;
        }

        /* Grid */
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border-left: 1px solid var(--rule, #c8bfb0);
          border-top: 1px solid var(--rule, #c8bfb0);
          margin: 0 4rem;
        }

        /* Card */
        .proj-card {
          border-right: 1px solid var(--rule, #c8bfb0);
          border-bottom: 1px solid var(--rule, #c8bfb0);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition-property: background;
          transition-duration: 0.3s;
        }

        .proj-card:hover {
          background: rgba(122, 92, 58, 0.03);
        }

        /* Image area */
        .proj-image-wrap {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-bottom: 1px solid var(--rule, #c8bfb0);
        }

        .proj-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }

        .proj-card:hover .proj-image {
          transform: scale(1.03);
        }

        /* Placeholder image */
        .proj-placeholder {
          width: 100%;
          height: 100%;
          background: #ede8de;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.4rem;
          position: relative;
          transition: background 0.3s ease;
        }

        .proj-card:hover .proj-placeholder {
          background: #e8e2d6;
        }

        .proj-placeholder-index {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: var(--ink-faint, #9a8e80);
        }

        .proj-placeholder-cat {
          font-family: 'EB Garamond', serif;
          font-style: italic;
          font-size: 1.1rem;
          color: var(--accent, #7a5c3a);
          opacity: 0.5;
          align-self: flex-end;
        }

        .proj-placeholder-lines {
          position: absolute;
          bottom: 1.4rem;
          left: 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .proj-placeholder-line {
          height: 1px;
          background: var(--rule, #c8bfb0);
        }

        /* Hover overlay */
        .proj-image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(26, 22, 18, 0);
          display: flex;
          align-items: flex-end;
          padding: 1.2rem;
          transition: background 0.3s ease;
        }

        .proj-card:hover .proj-image-overlay {
          background: rgba(26, 22, 18, 0.18);
        }

        .proj-overlay-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          color: var(--ink, #1a1612);
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .proj-card:hover .proj-overlay-label {
          opacity: 1;
          transform: translateY(0);
        }

        /* Card body */
        .proj-card-body {
          padding: 1.4rem 1.6rem 1.8rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .proj-card-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.9rem;
        }

        .proj-index {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          font-weight: 300;
          letter-spacing: 0.18em;
          color: var(--ink-faint, #9a8e80);
        }

        .proj-year {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          font-weight: 300;
          letter-spacing: 0.18em;
          color: var(--ink-faint, #9a8e80);
        }

        .proj-rule-h {
          width: 1.6rem;
          height: 1px;
          background: var(--accent, #7a5c3a);
          margin-bottom: 0.75rem;
        }

        .proj-title {
          font-family: 'EB Garamond', serif;
          font-weight: 500;
          font-size: 1.2rem;
          color: var(--ink, #1a1612);
          line-height: 1.2;
          margin: 0 0 0.25rem;
        }

        .proj-category {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          font-weight: 300;
          letter-spacing: 0.2em;
          color: var(--accent, #7a5c3a);
          text-transform: uppercase;
          margin: 0 0 0.85rem;
        }

        .proj-desc {
          font-family: 'EB Garamond', serif;
          font-size: 0.95rem;
          color: var(--ink-faint, #9a8e80);
          line-height: 1.6;
          margin: 0 0 1.2rem;
          flex: 1;
        }

        .proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: auto;
        }

        .proj-tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem;
          font-weight: 300;
          letter-spacing: 0.15em;
          color: var(--ink-faint, #9a8e80);
          border: 1px solid var(--rule, #c8bfb0);
          padding: 0.2rem 0.5rem;
          text-transform: uppercase;
        }

        /* Reveal animation — only for text/header elements, not cards */
        .reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .reveal.show {
          opacity: 1;
          transform: translateY(0);
        }

        /* Card body fade-in — card itself stays visible so borders are stable */
        .proj-card-body-inner {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .proj-card.in-view .proj-card-body-inner {
          opacity: 1;
          transform: translateY(0);
        }
        .proj-card.in-view .proj-image-wrap {
          opacity: 1;
        }
        .proj-image-wrap {
          opacity: 0;
          transition: opacity 0.55s ease;
        }

        @media (max-width: 900px) {
          .proj-grid {
            grid-template-columns: repeat(2, 1fr);
            margin: 0 2rem;
          }
          .proj-header { grid-template-columns: 1fr; }
          .proj-header-left { border-right: none; border-bottom: 1px solid var(--rule, #c8bfb0); padding: 1.5rem 2rem; }
          .proj-header-right { padding: 1.5rem 2rem; }
        }

        @media (max-width: 580px) {
          .proj-grid {
            grid-template-columns: 1fr;
            margin: 0 1.5rem;
          }
        }
      `}</style>

      <section className="proj-section">

        {/* Header */}
        <div className="proj-header" ref={headerRef}>
          <div className="proj-header-left">
            <span className={`proj-section-label reveal ${headerInView ? "show" : ""}`}>
              Selected work
            </span>
          </div>
          <div className="proj-header-right">
            <h2 className={`proj-heading reveal ${headerInView ? "show" : ""}`} style={{ transitionDelay: "0.1s" }}>
              Projects
            </h2>
            <span className={`proj-count reveal ${headerInView ? "show" : ""}`} style={{ transitionDelay: "0.2s" }}>
              {String(PROJECTS.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="proj-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.index}
              project={project}
              delay={Math.floor(i / 3) * 80 + (i % 3) * 80}
            />
          ))}
        </div>

      </section>
    </>
  );
}