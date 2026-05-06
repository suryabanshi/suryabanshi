import Link from "next/link";
import { ArrowUpRight, ChevronRight, Settings, Cpu, Layers, Workflow, Globe2, BookOpen, BarChart, Shield } from "lucide-react";

const services = [
  {
    id: "architecture",
    number: "01",
    title: "System Architecture & Design",
    icon: <Layers size={22} />,
    accent: "#C9252D",
    description: "We start by mapping your current state — every tool, team, and process. Then we design the architecture for how your business should actually operate: connected, automated, and built to scale.",
    deliverables: ["Business system audit", "Process map & gap analysis", "System architecture blueprint", "Tool stack recommendation", "Implementation roadmap"],
    duration: "2–4 weeks",
    tier: "All Packages",
  },
  {
    id: "ai",
    number: "02",
    title: "AI Integration & Intelligence Pipelines",
    icon: <Cpu size={22} />,
    accent: "#C9252D",
    description: "We architect and deploy custom AI systems that work inside your existing operations. Not chatbots. Real intelligence infrastructure — from data pipelines and decision engines to LLM-powered workflows.",
    deliverables: ["AI use case mapping", "LLM pipeline development", "Data ingestion & processing", "Model fine-tuning & testing", "Monitoring & feedback systems"],
    duration: "4–12 weeks",
    tier: "CORE & GLOBAL",
  },
  {
    id: "automation",
    number: "03",
    title: "Automation Flows & Workflow Engineering",
    icon: <Workflow size={22} />,
    accent: "#1FA36B",
    description: "We map every manual process and replace it with a precise automated workflow. From CRM triggers and email sequences to cross-platform data sync and reporting — your operations run without human input.",
    deliverables: ["Workflow discovery session", "Automation mapping document", "Flow build & configuration", "Testing & QA protocols", "Documentation & handoff"],
    duration: "3–8 weeks",
    tier: "FLOW & Above",
  },
  {
    id: "media",
    number: "04",
    title: "Brand Architecture & Media Systems",
    icon: <Settings size={22} />,
    accent: "#C9252D",
    description: "We design brand systems that communicate consistently at scale. From visual identity and messaging frameworks to content pipelines and media infrastructure — your brand becomes a reliable system, not a design project.",
    deliverables: ["Brand audit & positioning", "Visual identity system", "Messaging framework", "Content pipeline design", "Multi-channel playbook"],
    duration: "3–6 weeks",
    tier: "All Packages",
  },
  {
    id: "training",
    number: "05",
    title: "Training Systems & Knowledge Architecture",
    icon: <BookOpen size={22} />,
    accent: "#6B7075",
    description: "We design the knowledge infrastructure your team needs to perform at scale. Onboarding systems, SOPs, internal wikis, LMS platforms — everything structured to encode your process into repeatable learning.",
    deliverables: ["Learning needs analysis", "Onboarding flow design", "LMS architecture & setup", "Content creation & production", "Assessment & certification"],
    duration: "3–6 weeks",
    tier: "FLOW & Above",
  },
  {
    id: "global",
    number: "06",
    title: "Global Operations & Expansion Infrastructure",
    icon: <Globe2 size={22} />,
    accent: "#1FA36B",
    description: "Cross-border expansion requires more than translation. We design the operational systems for entering new markets: compliance mapping, localization infrastructure, multi-region team structures, and international business frameworks.",
    deliverables: ["Market entry readiness audit", "Compliance & legal mapping", "Localization system design", "International team framework", "Cross-border operations manual"],
    duration: "6–16 weeks",
    tier: "GLOBAL Only",
  },
];

const approach = [
  { icon: <BarChart size={20} />, title: "Diagnostic First", desc: "We never propose a solution before we understand the problem. Every engagement starts with a structured audit." },
  { icon: <Settings size={20} />, title: "Systems Over Services", desc: "We don't sell hours. We build systems. Every project has a defined outcome, not just a list of deliverables." },
  { icon: <Shield size={20} />, title: "Built to Last", desc: "Systems should outlast the engagement. Every solution we build is documented, transferable, and designed to scale." },
  { icon: <Workflow size={20} />, title: "Integrated by Default", desc: "Nothing we build operates in isolation. Every system is designed to integrate with your existing stack." },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <section style={{ background: "#101214", paddingTop: 144, paddingBottom: 96, position: "relative", overflow: "hidden" }}>
        <div className="bg-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
        <div style={{ position: "absolute", bottom: "0", left: "0", right: "0", height: 200, background: "linear-gradient(to bottom, transparent, rgba(201,37,45,0.06))", pointerEvents: "none" }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <Link href="/" style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(244,245,242,0.4)", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={12} style={{ color: "rgba(244,245,242,0.25)" }} />
            <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9252D" }}>Services</span>
          </div>
          <div style={{ maxWidth: 700 }}>
            <span className="tag tag-red" style={{ marginBottom: 24, display: "inline-flex" }}>What We Build</span>
            <h1 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1, color: "#F4F5F2", marginBottom: 24 }}>
              Services that build<br /><span style={{ color: "#C9252D" }}>your infrastructure.</span>
            </h1>
            <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(244,245,242,0.5)", marginBottom: 40 }}>
              Every service ORYNEXA offers is an investment in your business operating system. We don&apos;t do one-off tasks.
              We design the systems that make those tasks unnecessary.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary">Start a Project <ArrowUpRight size={14} /></Link>
              <Link href="/systems" className="btn-outline-light">View Systems <ChevronRight size={14} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR APPROACH ─────────────────────────────────────── */}
      <section style={{ background: "#F4F5F2", padding: "80px 0", borderBottom: "1px solid rgba(107,112,117,0.15)" }}>
        <div className="container-fluid">
          <div style={{ marginBottom: 48 }}>
            <span className="tag tag-grey" style={{ marginBottom: 16, display: "inline-flex" }}>Our Approach</span>
            <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.02em", color: "#101214" }}>
              How we work
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {approach.map(({ icon, title, desc }) => (
              <div key={title} style={{ padding: "24px 20px", background: "white", border: "1px solid rgba(107,112,117,0.15)", borderRadius: 4 }}>
                <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(201,37,45,0.08)", border: "1px solid rgba(201,37,45,0.2)", borderRadius: 3, color: "#C9252D", marginBottom: 16 }}>
                  {icon}
                </div>
                <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#101214", marginBottom: 8 }}>{title}</h3>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.8rem", lineHeight: 1.65, color: "#6B7075" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE DETAIL SECTIONS ──────────────────────────── */}
      {services.map((svc, i) => (
        <section
          key={svc.id}
          id={svc.id}
          style={{ background: i % 2 === 0 ? "#101214" : "#F4F5F2", padding: "96px 0", position: "relative", overflow: "hidden" }}
        >
          {i % 2 === 0 && <div className="bg-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />}
          {i % 2 !== 0 && <div className="bg-grid-light" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />}
          <div className="container-fluid" style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="grid-cols-1 lg:grid-cols-2">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                  <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "3rem", letterSpacing: "-0.04em", color: i % 2 === 0 ? "rgba(244,245,242,0.08)" : "rgba(16,18,20,0.07)", lineHeight: 1 }}>
                    {svc.number}
                  </span>
                  <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", background: `${svc.accent}18`, border: `1px solid ${svc.accent}35`, borderRadius: 3, color: svc.accent }}>
                    {svc.icon}
                  </div>
                </div>
                <span className={`tag ${i % 2 === 0 ? "tag-white" : "tag-grey"}`} style={{ marginBottom: 16, display: "inline-flex" }}>
                  {svc.tier}
                </span>
                <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.025em", lineHeight: 1.15, color: i % 2 === 0 ? "#F4F5F2" : "#101214", marginBottom: 20 }}>
                  {svc.title}
                </h2>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: i % 2 === 0 ? "rgba(244,245,242,0.5)" : "#6B7075", marginBottom: 32 }}>
                  {svc.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ padding: "8px 16px", background: i % 2 === 0 ? "rgba(244,245,242,0.06)" : "rgba(16,18,20,0.06)", border: `1px solid ${i % 2 === 0 ? "rgba(244,245,242,0.1)" : "rgba(107,112,117,0.2)"}`, borderRadius: 2 }}>
                    <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: i % 2 === 0 ? "rgba(244,245,242,0.5)" : "#6B7075" }}>
                      Duration: {svc.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: i % 2 === 0 ? "rgba(244,245,242,0.35)" : "#6B7075", marginBottom: 20 }}>
                  What You Receive
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                  {svc.deliverables.map((d, di) => (
                    <div key={d} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: i % 2 === 0 ? "rgba(244,245,242,0.03)" : "rgba(255,255,255,0.8)", border: `1px solid ${i % 2 === 0 ? "rgba(244,245,242,0.07)" : "rgba(107,112,117,0.15)"}`, borderRadius: 3 }}>
                      <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.7rem", color: svc.accent, opacity: 0.6, minWidth: 20 }}>
                        {String(di + 1).padStart(2, "0")}
                      </span>
                      <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.85rem", color: i % 2 === 0 ? "rgba(244,245,242,0.65)" : "#6B7075" }}>{d}</span>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className={i % 2 === 0 ? "btn-primary" : "btn-outline-dark"}>
                  Inquire About This Service <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section style={{ background: "#101214", padding: "96px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="bg-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,37,45,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
          <span className="tag tag-red">Not sure where to start?</span>
          <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.025em", color: "#F4F5F2", lineHeight: 1.1, maxWidth: 600 }}>
            We&apos;ll diagnose your system.<br />Then we&apos;ll design the fix.
          </h2>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.95rem", color: "rgba(244,245,242,0.45)", maxWidth: 480, lineHeight: 1.7 }}>
            Every engagement starts with a discovery session. Tell us what&apos;s broken — we&apos;ll map the solution.
          </p>
          <Link href="/contact" className="btn-primary" style={{ padding: "16px 40px" }}>
            Book a Discovery Session <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
