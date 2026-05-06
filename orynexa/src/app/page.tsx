import Link from "next/link";
import {
  ArrowUpRight,
  Brain,
  Workflow,
  Radio,
  BookOpen,
  Globe,
  FlaskConical,
  ChevronRight,
  Zap,
  TrendingUp,
  Shield,
  BarChart3,
} from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import ProcessTimeline from "@/components/ProcessTimeline";
import PricingCard from "@/components/PricingCard";
import ProjectCard from "@/components/ProjectCard";
import CoreNetwork from "@/components/CoreNetwork";

const ecosystem = [
  {
    title: "ORYNEXA AI",
    subtitle: "Intelligence Layer",
    description:
      "Custom AI pipelines, LLM integrations, automated decision systems, and intelligent data processing built into your core operations.",
    icon: <Brain size={18} />,
    accent: "red" as const,
    tag: "AI",
  },
  {
    title: "ORYNEXA FLOW",
    subtitle: "Automation Engine",
    description:
      "End-to-end workflow automation. CRM triggers, multi-step logic, API orchestration, and task routing at operational scale.",
    icon: <Workflow size={18} />,
    accent: "green" as const,
    tag: "Automation",
  },
  {
    title: "ORYNEXA MEDIA",
    subtitle: "Brand Architecture",
    description:
      "Strategic brand systems, content pipelines, visual identity, and media infrastructure designed to communicate at a system level.",
    icon: <Radio size={18} />,
    accent: "red" as const,
    tag: "Brand",
  },
  {
    title: "ORYNEXA LEARN",
    subtitle: "Training Systems",
    description:
      "Internal knowledge bases, onboarding flows, LMS architecture, and upskilling programs built for repeatable team performance.",
    icon: <BookOpen size={18} />,
    accent: "grey" as const,
    tag: "Training",
  },
  {
    title: "ORYNEXA GLOBAL",
    subtitle: "Cross-Border Operations",
    description:
      "Localization infrastructure, multi-region playbooks, international compliance mapping, and global expansion systems.",
    icon: <Globe size={18} />,
    accent: "green" as const,
    tag: "Global",
  },
  {
    title: "ORYNEXA LABS",
    subtitle: "R&D Division",
    description:
      "Experimental frameworks, prototype builds, emerging technology research, and internal tools for future-proofing your business.",
    icon: <FlaskConical size={18} />,
    accent: "grey" as const,
    tag: "R&D",
  },
];

const process = [
  { number: "01", title: "Discover", description: "Deep-dive audit of your current state, blockers, and goals.", accent: "red" as const },
  { number: "02", title: "Map", description: "System architecture diagram — every flow, tool, and team." },
  { number: "03", title: "Design", description: "Blueprint the new system with specs, logic, and interfaces." },
  { number: "04", title: "Build", description: "Engineering, configuration, and integration execution." },
  { number: "05", title: "Automate", description: "Deploy triggers, workflows, and intelligent automation.", accent: "green" as const },
  { number: "06", title: "Launch", description: "Go-live with full handoff, training, and documentation." },
  { number: "07", title: "Improve", description: "Ongoing monitoring, iteration, and system evolution.", accent: "red" as const },
];

const packages = [
  {
    tier: "Tier 1",
    name: "START",
    tagline: "For founders who need to get structured before they can grow.",
    price: "From $4,800",
    priceNote: "One-time project fee",
    features: ["System audit & diagnosis", "Core workflow mapping", "1 automation setup", "Brand essentials package", "30-day support"],
  },
  {
    tier: "Tier 2",
    name: "FLOW",
    tagline: "For growing teams that need connected, automated operations.",
    price: "From $12,500",
    priceNote: "One-time + optional retainer",
    features: ["Everything in START", "Full system architecture", "5 automation flows", "CRM & pipeline setup", "Team training system", "90-day support"],
    highlight: true,
    cta: "Most Chosen",
  },
  {
    tier: "Tier 3",
    name: "CORE",
    tagline: "Full infrastructure design for businesses ready to operate at scale.",
    price: "From $28,000",
    priceNote: "Scoped per engagement",
    features: ["Everything in FLOW", "AI integration (ORYNEXA AI)", "Multi-channel media system", "Custom tool builds", "Global operations mapping", "6-month strategic support"],
  },
  {
    tier: "Tier 4",
    name: "GLOBAL",
    tagline: "Cross-border operations, localization, and enterprise-grade systems.",
    price: "Custom",
    priceNote: "Enterprise engagement",
    features: ["Everything in CORE", "Global expansion blueprint", "Multi-region compliance", "Dedicated system architect", "LABS access (R&D)", "Ongoing retainer model"],
    cta: "Contact Us",
  },
];

const projects = [
  { title: "NEXAFLOW CRM Platform", category: "System Architecture", description: "End-to-end CRM and lead management system with automated qualification flows.", tags: ["CRM", "Automation", "AI"], status: "Live" as const, year: "2024" },
  { title: "PH Global Expansion System", category: "ORYNEXA GLOBAL", description: "Cross-border business infrastructure for a Southeast Asian brand entering Japan and Australia.", tags: ["Global", "Operations", "Localization"], status: "Live" as const, year: "2024" },
  { title: "AI Content Intelligence Engine", category: "ORYNEXA AI", description: "LLM-powered content generation, classification, and distribution system.", tags: ["AI", "Media", "Automation"], status: "Prototype" as const, year: "2025" },
  { title: "Internal Knowledge OS", category: "ORYNEXA LEARN", description: "Structured onboarding and knowledge management system for a 200+ person org across 4 countries.", tags: ["Training", "HR", "Knowledge"], status: "In Build" as const, year: "2025" },
];

const problems = [
  { icon: <Zap size={20} />, title: "Disconnected tools.", description: "Your CRM doesn't talk to your marketing. Your ops don't sync with sales." },
  { icon: <BarChart3 size={20} />, title: "No visibility into performance.", description: "Data exists everywhere, but insights exist nowhere." },
  { icon: <TrendingUp size={20} />, title: "Growth that breaks things.", description: "Every time you scale, something downstream collapses." },
  { icon: <Shield size={20} />, title: "Over-reliance on individuals.", description: "If one person leaves, the whole process stops working." },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#101214",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: 72,
        }}
      >
        <div className="bg-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.7 }} />
        <div style={{ position: "absolute", top: "20%", left: "50%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,37,45,0.12) 0%, transparent 70%)", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(31,163,107,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 72, width: "50%", height: "100%", opacity: 0.6 }}>
          <CoreNetwork />
        </div>

        <div className="container-fluid" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <span className="tag tag-red">System Status: Operational</span>
              <span className="tag tag-green">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1FA36B", display: "inline-block" }} />
                All Systems Online
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <svg width="40" height="40" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" fill="#C9252D" />
                <rect x="5" y="5" width="8" height="8" fill="#F4F5F2" />
                <rect x="15" y="15" width="8" height="8" fill="#1FA36B" />
                <rect x="15" y="5" width="8" height="8" fill="rgba(244,245,242,0.3)" />
                <rect x="5" y="15" width="8" height="8" fill="rgba(244,245,242,0.15)" />
              </svg>
              <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.2em", color: "rgba(244,245,242,0.6)", textTransform: "uppercase" }}>
                ORYNEXA
              </span>
            </div>

            <h1 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(3rem, 6vw, 5.5rem)", letterSpacing: "-0.03em", lineHeight: 1, color: "#F4F5F2", marginBottom: 8 }}>
              Built From
            </h1>
            <h1 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(3rem, 6vw, 5.5rem)", letterSpacing: "-0.03em", lineHeight: 1, color: "#C9252D", marginBottom: 32 }}>
              The Core.
            </h1>

            <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.7, color: "rgba(244,245,242,0.55)", maxWidth: 540, marginBottom: 48 }}>
              ORYNEXA designs intelligent business systems — from AI pipelines and automation infrastructure
              to global operations architecture. We don&apos;t patch problems. We build the systems that eliminate them.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary">
                Start Building
                <ArrowUpRight size={15} />
              </Link>
              <Link href="/systems" className="btn-outline-light">
                Explore Systems
                <ChevronRight size={15} />
              </Link>
            </div>

            <div style={{ display: "flex", gap: 48, marginTop: 72, paddingTop: 40, borderTop: "1px solid rgba(244,245,242,0.08)", flexWrap: "wrap" }}>
              {[{ num: "6", label: "System Divisions" }, { num: "40+", label: "Automated Flows" }, { num: "12+", label: "Countries Served" }, { num: "98%", label: "System Uptime" }].map(({ num, label }) => (
                <div key={label} className="stat-block">
                  <span className="stat-number" style={{ color: "#F4F5F2" }}>{num}</span>
                  <span className="label-text" style={{ color: "rgba(244,245,242,0.4)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to bottom, transparent, #101214)", pointerEvents: "none" }} />
      </section>

      {/* ── CORE MESSAGE ───────────────────────────────────────────── */}
      <section style={{ background: "#F4F5F2", padding: "100px 0", borderBottom: "1px solid rgba(107,112,117,0.15)" }}>
        <div className="container-fluid">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="grid-cols-1 lg:grid-cols-2">
            <div>
              <span className="tag tag-grey" style={{ marginBottom: 24, display: "inline-flex" }}>Core Philosophy</span>
              <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#101214", marginBottom: 24 }}>
                From scattered ideas to <span style={{ color: "#C9252D" }}>structured systems.</span>
              </h2>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "1.05rem", lineHeight: 1.75, color: "#6B7075", marginBottom: 32 }}>
                Most businesses grow fast but build slow. They accumulate tools, teams, and processes without ever
                connecting them into something coherent. ORYNEXA exists to build that connective layer — the
                operating system beneath your business.
              </p>
              <Link href="/about" className="btn-outline-dark">Our Philosophy <ArrowUpRight size={14} /></Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { label: "Disconnected", color: "#6B7075", before: true },
                { label: "Structured", color: "#1FA36B", before: false },
                { label: "Manual", color: "#6B7075", before: true },
                { label: "Automated", color: "#1FA36B", before: false },
                { label: "Reactive", color: "#C9252D", before: true },
                { label: "Predictive", color: "#1FA36B", before: false },
                { label: "Fragile", color: "#C9252D", before: true },
                { label: "Resilient", color: "#1FA36B", before: false },
              ].map(({ label, color, before }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: before ? "rgba(107,112,117,0.06)" : "rgba(31,163,107,0.06)", border: `1px solid ${before ? "rgba(107,112,117,0.15)" : "rgba(31,163,107,0.2)"}`, borderRadius: 3 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: "0.8rem", color }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM SECTION ────────────────────────────────────────── */}
      <section style={{ background: "#101214", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        <div className="bg-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span className="tag tag-red" style={{ marginBottom: 20, display: "inline-flex" }}>The Real Problem</span>
            <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#F4F5F2", marginBottom: 20 }}>
              Most businesses are not weak.
              <br />
              <span style={{ color: "#C9252D" }}>Their systems are.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(244,245,242,0.5)", maxWidth: 560, margin: "0 auto" }}>
              The ambition is there. The talent is there. But without the right infrastructure, even great businesses operate at a fraction of their potential.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {problems.map(({ icon, title, description }) => (
              <div key={title} style={{ padding: "28px 24px", background: "rgba(244,245,242,0.03)", border: "1px solid rgba(244,245,242,0.07)", borderRadius: 4, display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ color: "#C9252D", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(201,37,45,0.1)", border: "1px solid rgba(201,37,45,0.2)", borderRadius: 3 }}>{icon}</div>
                <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#F4F5F2" }}>{title}</h3>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.825rem", lineHeight: 1.65, color: "rgba(244,245,242,0.45)" }}>{description}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 56, display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <p style={{ fontFamily: "var(--font-inter), sans-serif", color: "rgba(244,245,242,0.45)", fontSize: "0.9rem" }}>Does any of this sound familiar?</p>
            <Link href="/contact" className="btn-primary">Let&apos;s Fix It <ArrowUpRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* ── SERVICE ECOSYSTEM ──────────────────────────────────────── */}
      <section style={{ background: "#F4F5F2", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        <div className="bg-grid-light" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 64 }}>
            <span className="tag tag-grey" style={{ marginBottom: 20, display: "inline-flex" }}>The Ecosystem</span>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
              <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#101214", maxWidth: 500 }}>
                Six systems.<br />One intelligent architecture.
              </h2>
              <Link href="/systems" className="btn-outline-dark">Explore All Systems <ArrowUpRight size={14} /></Link>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {ecosystem.map((item) => (
              <ServiceCard key={item.title} {...item} href="/systems" />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────────────────────── */}
      <section style={{ background: "#1a1e22", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        <div className="bg-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span className="tag tag-green" style={{ marginBottom: 20, display: "inline-flex" }}>System Process</span>
            <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#F4F5F2", marginBottom: 16 }}>
              How we build your system
            </h2>
            <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(244,245,242,0.45)", maxWidth: 520, margin: "0 auto" }}>
              A repeatable seven-phase methodology. Every ORYNEXA engagement follows this process.
            </p>
          </div>
          <ProcessTimeline steps={process} dark />
        </div>
      </section>

      {/* ── PACKAGES ───────────────────────────────────────────────── */}
      <section style={{ background: "#F4F5F2", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        <div className="bg-grid-light" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="tag tag-red" style={{ marginBottom: 20, display: "inline-flex" }}>Engagement Packages</span>
            <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#101214", marginBottom: 16 }}>
              Structured for where you are.<br />Designed for where you&apos;re going.
            </h2>
            <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.95rem", color: "#6B7075", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
              Each tier is a complete system engagement — not a service menu.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg) => (
              <PricingCard key={pkg.name} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────────────────────────── */}
      <section style={{ background: "#101214", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        <div className="bg-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
            <div>
              <span className="tag tag-white" style={{ marginBottom: 20, display: "inline-flex" }}>Project Gallery</span>
              <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#F4F5F2" }}>
                Systems we&apos;ve built.
              </h2>
            </div>
            <Link href="/projects" className="btn-outline-light">View All Projects <ArrowUpRight size={14} /></Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {projects.map((p) => (<ProjectCard key={p.title} {...p} dark />))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER MESSAGE ────────────────────────────────────────── */}
      <section style={{ background: "#F4F5F2", padding: "100px 0", borderTop: "1px solid rgba(107,112,117,0.12)" }}>
        <div className="container-fluid">
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
            <span className="tag tag-grey">From The Founder</span>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#101214", border: "2px solid rgba(201,37,45,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                <rect width="72" height="72" fill="#101214" />
                <rect x="12" y="12" width="20" height="20" fill="#C9252D" opacity="0.8" />
                <rect x="40" y="40" width="20" height="20" fill="#1FA36B" opacity="0.8" />
                <rect x="40" y="12" width="20" height="20" fill="rgba(244,245,242,0.2)" />
                <rect x="12" y="40" width="20" height="20" fill="rgba(244,245,242,0.1)" />
              </svg>
            </div>
            <blockquote style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: "clamp(1.2rem, 3vw, 1.75rem)", letterSpacing: "-0.015em", lineHeight: 1.5, color: "#101214", maxWidth: 700 }}>
              &ldquo;I started ORYNEXA because I kept seeing brilliant founders fail — not because of bad ideas,
              but because of broken infrastructure. Our mission is to build the systems that let good businesses become{" "}
              <span style={{ color: "#C9252D" }}>great ones.</span>&rdquo;
            </blockquote>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "#101214" }}>
                Founder & Chief Architect
              </span>
              <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.825rem", color: "#6B7075" }}>ORYNEXA Global</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ width: 40, height: 2, background: "#C9252D", borderRadius: 1 }} />
              <span style={{ width: 20, height: 2, background: "#1FA36B", borderRadius: 1 }} />
              <span style={{ width: 10, height: 2, background: "#D9DED8", borderRadius: 1 }} />
            </div>
            <Link href="/about" className="btn-outline-dark">Read Our Story <ArrowUpRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────── */}
      <section style={{ background: "#101214", padding: "120px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,37,45,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div className="bg-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
          <span className="tag tag-red">Ready to Build?</span>
          <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 1, color: "#F4F5F2", maxWidth: 700 }}>
            Your system<br /><span style={{ color: "#C9252D" }}>starts here.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(244,245,242,0.5)", maxWidth: 480 }}>
            Tell us what you&apos;re building and where it&apos;s breaking. We&apos;ll design the system to fix it at the root.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/contact" className="btn-primary" style={{ padding: "16px 40px", fontSize: "0.9rem" }}>
              Begin Your System <ArrowUpRight size={16} />
            </Link>
            <Link href="/services" className="btn-outline-light" style={{ padding: "16px 40px", fontSize: "0.9rem" }}>
              View Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
