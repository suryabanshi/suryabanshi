import Link from "next/link";
import { ArrowUpRight, Brain, Workflow, Radio, BookOpen, Globe, FlaskConical, ChevronRight, Cpu, Database, Network, Layers } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

const systems = [
  {
    id: "ai",
    title: "ORYNEXA AI",
    subtitle: "Intelligence Layer",
    tag: "AI",
    accent: "red" as const,
    icon: <Brain size={24} />,
    tagline: "The thinking layer of your business.",
    description: "ORYNEXA AI architects custom AI pipelines that plug directly into your operations. We don't add AI as a feature — we integrate it as infrastructure. From LLM-powered decision engines to automated data intelligence, every AI system we build serves a specific operational function.",
    capabilities: [
      "Custom LLM pipeline development",
      "AI-powered decision routing",
      "Automated data classification",
      "Intelligent lead scoring",
      "Natural language interfaces",
      "Predictive analytics systems",
      "Document processing automation",
      "AI monitoring & feedback loops",
    ],
    metrics: [{ label: "Avg. Processing Speed", value: "10x" }, { label: "Data Accuracy", value: "96%+" }, { label: "Integration Points", value: "40+" }],
  },
  {
    id: "flow",
    title: "ORYNEXA FLOW",
    subtitle: "Automation Engine",
    tag: "Automation",
    accent: "green" as const,
    icon: <Workflow size={24} />,
    tagline: "Operations that run without manual input.",
    description: "ORYNEXA FLOW builds the connective tissue between your tools, teams, and processes. Every trigger, condition, and action is engineered with precision. We turn multi-step manual workflows into intelligent automated systems that operate 24/7.",
    capabilities: [
      "CRM automation & triggers",
      "Multi-step workflow logic",
      "API orchestration & webhooks",
      "Cross-platform data sync",
      "Automated reporting pipelines",
      "Sales funnel automation",
      "Customer journey mapping",
      "Error handling & fallbacks",
    ],
    metrics: [{ label: "Hours Saved / Month", value: "200+" }, { label: "Error Reduction", value: "94%" }, { label: "Workflow Templates", value: "60+" }],
  },
  {
    id: "media",
    title: "ORYNEXA MEDIA",
    subtitle: "Brand Architecture",
    tag: "Brand",
    accent: "red" as const,
    icon: <Radio size={24} />,
    tagline: "A brand that communicates like a system.",
    description: "ORYNEXA MEDIA builds brand infrastructure — not just logos. We design the full communication architecture: visual identity, content systems, messaging frameworks, and media pipelines. The result is a brand that operates consistently at scale.",
    capabilities: [
      "Brand identity system design",
      "Visual language & guidelines",
      "Content pipeline architecture",
      "Multi-channel messaging",
      "Video & media production",
      "SEO content infrastructure",
      "Social media systems",
      "Campaign frameworks",
    ],
    metrics: [{ label: "Brand Consistency", value: "100%" }, { label: "Content Output", value: "5x" }, { label: "Channels Managed", value: "8+" }],
  },
  {
    id: "learn",
    title: "ORYNEXA LEARN",
    subtitle: "Training Systems",
    tag: "Training",
    accent: "grey" as const,
    icon: <BookOpen size={24} />,
    tagline: "Teams that scale without breaking.",
    description: "ORYNEXA LEARN builds the knowledge infrastructure that makes your team repeatable and self-sufficient. From LMS architecture to onboarding systems, we design training environments that encode your process into scalable learning paths.",
    capabilities: [
      "LMS architecture & setup",
      "Onboarding system design",
      "SOPs and documentation",
      "Knowledge base development",
      "Training content production",
      "Assessment & certification",
      "Team performance tracking",
      "Manager enablement systems",
    ],
    metrics: [{ label: "Onboarding Time", value: "-60%" }, { label: "Knowledge Retention", value: "87%" }, { label: "Team Scalability", value: "∞" }],
  },
  {
    id: "global",
    title: "ORYNEXA GLOBAL",
    subtitle: "Cross-Border Operations",
    tag: "Global",
    accent: "green" as const,
    icon: <Globe size={24} />,
    tagline: "Systems that operate across borders.",
    description: "ORYNEXA GLOBAL designs the operational infrastructure for businesses that need to move across markets. From compliance mapping to multi-region team structures, we build the systems that make international expansion predictable.",
    capabilities: [
      "Market entry playbooks",
      "Multi-region compliance mapping",
      "Localization infrastructure",
      "Global team structures",
      "Cross-border payment systems",
      "International HR frameworks",
      "Multi-language content systems",
      "Regional operations dashboards",
    ],
    metrics: [{ label: "Markets Supported", value: "15+" }, { label: "Compliance Coverage", value: "100%" }, { label: "Expansion Speed", value: "3x" }],
  },
  {
    id: "labs",
    title: "ORYNEXA LABS",
    subtitle: "R&D Division",
    tag: "R&D",
    accent: "grey" as const,
    icon: <FlaskConical size={24} />,
    tagline: "The future of your business, built today.",
    description: "ORYNEXA LABS is our research and prototype division. We explore emerging technologies, build internal tools, and develop proof-of-concept systems for clients who want to stay ahead of their industry. If it doesn't exist yet, we build it.",
    capabilities: [
      "Technology research & scouting",
      "Rapid prototype development",
      "Internal tool engineering",
      "Novel system design",
      "Industry trend analysis",
      "Experimental AI research",
      "Open-source contributions",
      "Client co-development",
    ],
    metrics: [{ label: "Prototypes Built", value: "20+" }, { label: "Technologies Researched", value: "50+" }, { label: "R&D Partners", value: "8" }],
  },
];

const architectureComponents = [
  { icon: <Cpu size={20} />, label: "Intelligence Core", desc: "AI decision engine powering all system logic", color: "#C9252D" },
  { icon: <Database size={20} />, label: "Data Layer", desc: "Unified data infrastructure across all divisions", color: "#1FA36B" },
  { icon: <Network size={20} />, label: "Flow Engine", desc: "Automation and workflow orchestration layer", color: "#6B7075" },
  { icon: <Layers size={20} />, label: "Interface Layer", desc: "Human touchpoints, dashboards, and outputs", color: "#6B7075" },
];

export default function SystemsPage() {
  return (
    <>
      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <section
        style={{ background: "#101214", paddingTop: 144, paddingBottom: 96, position: "relative", overflow: "hidden" }}
      >
        <div className="bg-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
        <div style={{ position: "absolute", top: "50%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,37,45,0.1) 0%, transparent 70%)", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />

        <div className="container-fluid" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <Link href="/" style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(244,245,242,0.4)", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={12} style={{ color: "rgba(244,245,242,0.25)" }} />
            <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9252D" }}>Systems</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="grid-cols-1 lg:grid-cols-2">
            <div>
              <span className="tag tag-red" style={{ marginBottom: 24, display: "inline-flex" }}>System Architecture</span>
              <h1 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1, color: "#F4F5F2", marginBottom: 24 }}>
                The ORYNEXA
                <br /><span style={{ color: "#C9252D" }}>System Stack</span>
              </h1>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(244,245,242,0.5)", marginBottom: 40 }}>
                Six specialized divisions. One integrated architecture. Each system is designed to work standalone,
                or as part of a unified operating infrastructure for your business.
              </p>
              <Link href="/contact" className="btn-primary">Build Your System <ArrowUpRight size={14} /></Link>
            </div>

            {/* Architecture diagram */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {architectureComponents.map(({ icon, label, desc, color }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: "rgba(244,245,242,0.03)", border: "1px solid rgba(244,245,242,0.07)", borderRadius: 3 }}>
                  <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: `${color}18`, border: `1px solid ${color}30`, borderRadius: 3, color, flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "#F4F5F2", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", color: "rgba(244,245,242,0.4)" }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SYSTEMS GRID ───────────────────────────────────── */}
      <section style={{ background: "#F4F5F2", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        <div className="bg-grid-light" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 64 }}>
            <span className="tag tag-grey" style={{ marginBottom: 16, display: "inline-flex" }}>Six Divisions</span>
            <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.02em", color: "#101214" }}>
              All systems. Deep detail.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {systems.map((s) => (
              <ServiceCard key={s.id} title={s.title} subtitle={s.subtitle} description={s.description} icon={s.icon} accent={s.accent} tag={s.tag} href={`/systems#${s.id}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SYSTEM DEEP DIVES ──────────────────────────────── */}
      {systems.map((sys, i) => (
        <section
          key={sys.id}
          id={sys.id}
          style={{ background: i % 2 === 0 ? "#101214" : "#F4F5F2", padding: "100px 0", position: "relative", overflow: "hidden" }}
        >
          {i % 2 === 0 && <div className="bg-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />}
          {i % 2 !== 0 && <div className="bg-grid-light" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />}
          <div className="container-fluid" style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="grid-cols-1 lg:grid-cols-2">
              {/* Left */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <div style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", background: i % 2 === 0 ? `rgba(201,37,45,0.15)` : `rgba(201,37,45,0.1)`, border: `1px solid rgba(201,37,45,0.3)`, borderRadius: 3, color: "#C9252D" }}>
                    {sys.icon}
                  </div>
                  <span className={`tag ${i % 2 === 0 ? "tag-white" : "tag-grey"}`}>{sys.tag}</span>
                </div>
                <p style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: i % 2 === 0 ? "rgba(244,245,242,0.4)" : "#6B7075", marginBottom: 8 }}>
                  {sys.subtitle}
                </p>
                <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: i % 2 === 0 ? "#F4F5F2" : "#101214", marginBottom: 12 }}>
                  {sys.title}
                </h2>
                <p style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: "1rem", color: "#C9252D", marginBottom: 20, fontStyle: "italic" }}>
                  {sys.tagline}
                </p>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: i % 2 === 0 ? "rgba(244,245,242,0.5)" : "#6B7075", marginBottom: 32 }}>
                  {sys.description}
                </p>
                {/* Metrics */}
                <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                  {sys.metrics.map(({ label, value }) => (
                    <div key={label} className="stat-block">
                      <span className="stat-number" style={{ color: i % 2 === 0 ? "#F4F5F2" : "#101214", fontSize: "1.8rem" }}>{value}</span>
                      <span className="label-text" style={{ color: i % 2 === 0 ? "rgba(244,245,242,0.4)" : "#6B7075" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: capabilities */}
              <div>
                <p style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: i % 2 === 0 ? "rgba(244,245,242,0.35)" : "#6B7075", marginBottom: 20 }}>
                  Core Capabilities
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {sys.capabilities.map((cap) => (
                    <div key={cap} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", background: i % 2 === 0 ? "rgba(244,245,242,0.03)" : "rgba(16,18,20,0.04)", border: `1px solid ${i % 2 === 0 ? "rgba(244,245,242,0.07)" : "rgba(107,112,117,0.15)"}`, borderRadius: 3 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9252D", flexShrink: 0, marginTop: 5 }} />
                      <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.78rem", lineHeight: 1.5, color: i % 2 === 0 ? "rgba(244,245,242,0.6)" : "#6B7075" }}>{cap}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 28 }}>
                  <Link href="/contact" className={i % 2 === 0 ? "btn-primary" : "btn-outline-dark"}>
                    Discuss {sys.title} <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── FINAL CTA ──────────────────────────────────────── */}
      <section style={{ background: "#101214", padding: "96px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="bg-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(31,163,107,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
          <span className="tag tag-green">Ready to Stack Your Systems?</span>
          <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.025em", color: "#F4F5F2", lineHeight: 1.1, maxWidth: 600 }}>
            Choose your system.<br />We&apos;ll integrate the rest.
          </h2>
          <Link href="/contact" className="btn-primary" style={{ padding: "16px 40px" }}>
            Start System Design <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
