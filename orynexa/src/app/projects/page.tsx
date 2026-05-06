import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "NEXAFLOW CRM Platform",
    category: "System Architecture",
    description: "End-to-end CRM and lead management system built for a multi-region sales operation with automated qualification flows, scoring logic, and pipeline automation across 3 countries.",
    tags: ["CRM", "Automation", "AI", "Sales"],
    status: "Live" as const,
    year: "2024",
    client: "Confidential · Japan/Southeast Asia",
    systems: ["ORYNEXA FLOW", "ORYNEXA AI"],
    impact: "Reduced lead response time by 78%, automated 94% of qualification tasks.",
  },
  {
    title: "PH Global Expansion System",
    category: "ORYNEXA GLOBAL",
    description: "Complete cross-border business infrastructure for a Southeast Asian brand entering Japan and Australia simultaneously. Included compliance mapping, team frameworks, and localized operating playbooks.",
    tags: ["Global", "Operations", "Localization"],
    status: "Live" as const,
    year: "2024",
    client: "Philippines-based company · Japan & AU expansion",
    systems: ["ORYNEXA GLOBAL", "ORYNEXA LEARN"],
    impact: "Market launch in 60 days. Full operational readiness on day one.",
  },
  {
    title: "AI Content Intelligence Engine",
    category: "ORYNEXA AI",
    description: "LLM-powered content generation, classification, and distribution system for a digital media company. Automated content briefing, first-draft generation, SEO analysis, and cross-channel scheduling.",
    tags: ["AI", "Media", "Automation", "LLM"],
    status: "Prototype" as const,
    year: "2025",
    client: "Media company · APAC",
    systems: ["ORYNEXA AI", "ORYNEXA MEDIA"],
    impact: "5x content output at 40% of previous labor cost.",
  },
  {
    title: "Internal Knowledge OS",
    category: "ORYNEXA LEARN",
    description: "Structured onboarding and knowledge management system for a 200+ person organization spanning 4 countries. Includes LMS, SOP library, certification tracks, and manager enablement tools.",
    tags: ["Training", "HR", "Knowledge"],
    status: "In Build" as const,
    year: "2025",
    client: "Enterprise · 4 countries",
    systems: ["ORYNEXA LEARN", "ORYNEXA FLOW"],
    impact: "Projected 60% reduction in onboarding time.",
  },
  {
    title: "B2B Sales Automation System",
    category: "ORYNEXA FLOW",
    description: "Full sales operations automation for a B2B services company — from initial contact to contract. Includes CRM setup, proposal automation, follow-up sequences, and performance dashboards.",
    tags: ["Sales", "Automation", "CRM"],
    status: "Live" as const,
    year: "2024",
    client: "B2B Services · Europe",
    systems: ["ORYNEXA FLOW"],
    impact: "Revenue pipeline increased 3x in 90 days post-launch.",
  },
  {
    title: "Brand System & Content Architecture",
    category: "ORYNEXA MEDIA",
    description: "Complete brand rebuild and content infrastructure for a professional services firm entering a new market. Visual identity system, messaging framework, LinkedIn pipeline, and thought leadership playbook.",
    tags: ["Brand", "Media", "Content"],
    status: "Live" as const,
    year: "2023",
    client: "Professional Services · Singapore",
    systems: ["ORYNEXA MEDIA"],
    impact: "Inbound leads increased 220% within 6 months of launch.",
  },
  {
    title: "Multi-Market E-commerce Operations",
    category: "System Architecture",
    description: "Operational infrastructure for an e-commerce brand running across 6 markets. Unified inventory management, localized fulfillment logic, customer support automation, and cross-border compliance.",
    tags: ["E-commerce", "Global", "Operations"],
    status: "Live" as const,
    year: "2023",
    client: "DTC brand · 6 markets",
    systems: ["ORYNEXA GLOBAL", "ORYNEXA FLOW"],
    impact: "Operational costs reduced 35%. Order processing time cut by 80%.",
  },
  {
    title: "AI Diagnostics Prototype — LABS",
    category: "ORYNEXA LABS",
    description: "R&D prototype for an AI-powered business diagnostics tool. Analyzes company data inputs and generates structured system audit reports with prioritized recommendations.",
    tags: ["AI", "R&D", "Prototype"],
    status: "Prototype" as const,
    year: "2025",
    client: "ORYNEXA Internal",
    systems: ["ORYNEXA LABS", "ORYNEXA AI"],
    impact: "Internal tool — now being tested with select beta clients.",
  },
];

const stats = [
  { num: "25+", label: "Systems Built" },
  { num: "12+", label: "Countries Reached" },
  { num: "6", label: "System Divisions" },
  { num: "100%", label: "On-Time Delivery" },
];

const statusConfig: Record<string, { color: string; bg: string; border: string }> = {
  Live: { color: "#1FA36B", bg: "rgba(31,163,107,0.1)", border: "rgba(31,163,107,0.25)" },
  Prototype: { color: "#C9252D", bg: "rgba(201,37,45,0.1)", border: "rgba(201,37,45,0.25)" },
  "In Build": { color: "#6B7075", bg: "rgba(107,112,117,0.1)", border: "rgba(107,112,117,0.25)" },
};

export default function ProjectsPage() {
  return (
    <>
      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <section style={{ background: "#101214", paddingTop: 144, paddingBottom: 96, position: "relative", overflow: "hidden" }}>
        <div className="bg-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
        <div style={{ position: "absolute", top: "40%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(31,163,107,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <Link href="/" style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(244,245,242,0.4)", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={12} style={{ color: "rgba(244,245,242,0.25)" }} />
            <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9252D" }}>Projects</span>
          </div>
          <div style={{ maxWidth: 700 }}>
            <span className="tag tag-green" style={{ marginBottom: 24, display: "inline-flex" }}>Project Gallery</span>
            <h1 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1, color: "#F4F5F2", marginBottom: 24 }}>
              Systems we&apos;ve<br /><span style={{ color: "#1FA36B" }}>built and deployed.</span>
            </h1>
            <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(244,245,242,0.5)" }}>
              A selection of systems, platforms, and infrastructure projects. Each one was built to solve a
              specific operational challenge — and designed to keep working long after we delivered it.
            </p>
          </div>

          {/* Stats bar */}
          <div style={{ display: "flex", gap: 64, marginTop: 64, paddingTop: 48, borderTop: "1px solid rgba(244,245,242,0.08)", flexWrap: "wrap" }}>
            {stats.map(({ num, label }) => (
              <div key={label} className="stat-block">
                <span className="stat-number" style={{ color: "#F4F5F2" }}>{num}</span>
                <span className="label-text" style={{ color: "rgba(244,245,242,0.4)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECT GRID ──────────────────────────────────────── */}
      <section style={{ background: "#F4F5F2", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        <div className="bg-grid-light" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 48 }}>
            <span className="tag tag-grey" style={{ marginBottom: 16, display: "inline-flex" }}>All Projects</span>
            <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.02em", color: "#101214" }}>
              {projects.length} systems documented.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 80 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {projects.map((p) => (<ProjectCard key={p.title} title={p.title} category={p.category} description={p.description} tags={p.tags} status={p.status} year={p.year} />))}
          </div>

          {/* Extended detail cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B7075", marginBottom: 8 }}>
              Project Details
            </h3>
            {projects.map((p) => {
              const sc = statusConfig[p.status];
              return (
                <div key={`detail-${p.title}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32, padding: "28px 32px", background: "rgba(255,255,255,0.8)", border: "1px solid rgba(107,112,117,0.15)", borderRadius: 4, alignItems: "start" }} className="grid-cols-1 lg:grid-cols-3">
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 10px", background: sc.bg, border: `1px solid ${sc.border}`, borderRadius: 2, fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: sc.color }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.color, display: "inline-block" }} />{p.status}
                      </span>
                      <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.68rem", letterSpacing: "0.08em", color: "#6B7075" }}>{p.year}</span>
                    </div>
                    <h4 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "1rem", color: "#101214", marginBottom: 4 }}>{p.title}</h4>
                    <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", color: "#6B7075" }}>{p.client}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 500, fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B7075", marginBottom: 8 }}>Systems Used</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {p.systems.map((s) => (<span key={s} className="tag tag-red">{s}</span>))}
                    </div>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 500, fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#1FA36B", marginBottom: 8 }}>Impact</p>
                    <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.85rem", lineHeight: 1.6, color: "#101214", fontWeight: 500 }}>{p.impact}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section style={{ background: "#101214", padding: "96px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="bg-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(31,163,107,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
          <span className="tag tag-green">Add Your Project to the List</span>
          <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.025em", color: "#F4F5F2", lineHeight: 1.1, maxWidth: 600 }}>
            Your system.<br />Next on this list.
          </h2>
          <Link href="/contact" className="btn-primary" style={{ padding: "16px 40px" }}>
            Start Your Project <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
