import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";

const values = [
  { title: "Systems Over Services", description: "We don't sell time or deliverables in isolation. We design systems with defined outcomes. The goal is always an infrastructure that works after we leave." },
  { title: "Diagnostic Before Design", description: "We never propose a solution before we fully understand the problem. Every engagement starts with a structured discovery — no assumptions." },
  { title: "Built to Outlast", description: "Short-term fixes create long-term debt. Every system we build is documented, transferable, and designed to scale beyond the engagement." },
  { title: "Integration by Default", description: "Nothing we build is an island. Every system is designed to connect with your existing stack and the rest of your ORYNEXA architecture." },
  { title: "Global by Design", description: "From the first line of architecture, we think in markets, not just teams. Every system we build is ready to scale across borders." },
  { title: "Automation as Infrastructure", description: "Automation isn't a feature — it's a foundation. We design it into the core of every system so that scale doesn't require proportional headcount." },
];

const team = [
  { name: "Chief Architect", role: "System Design & Strategy", focus: "System architecture, AI integration, global operations", icon: "CA" },
  { name: "Lead Engineer", role: "Automation & AI Engineering", focus: "ORYNEXA FLOW, AI pipelines, technical infrastructure", icon: "LE" },
  { name: "Brand Director", role: "Media & Identity Systems", focus: "ORYNEXA MEDIA, brand architecture, content strategy", icon: "BD" },
  { name: "Operations Lead", role: "Global & Training Systems", focus: "ORYNEXA GLOBAL, LEARN, compliance, operations", icon: "OL" },
];

const timeline = [
  { year: "2021", event: "ORYNEXA Founded", desc: "Started as an independent system design consultancy, focused on business architecture." },
  { year: "2022", event: "FLOW Division Launched", desc: "Built our automation engineering capability. First major enterprise client goes live." },
  { year: "2023", event: "Expansion to APAC", desc: "Opened operations across Southeast Asia and Japan. GLOBAL division established." },
  { year: "2024", event: "AI Division + LABS", desc: "ORYNEXA AI launched. LABS R&D arm begins internal and client prototype work." },
  { year: "2025", event: "Full Ecosystem Online", desc: "All six system divisions operational. 12+ markets served. Global infrastructure complete." },
];

export default function AboutPage() {
  return (
    <>
      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <section style={{ background: "#101214", paddingTop: 144, paddingBottom: 96, position: "relative", overflow: "hidden" }}>
        <div className="bg-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
        <div style={{ position: "absolute", top: "30%", left: "60%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,37,45,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <Link href="/" style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(244,245,242,0.4)", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={12} style={{ color: "rgba(244,245,242,0.25)" }} />
            <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9252D" }}>About</span>
          </div>
          <div style={{ maxWidth: 720 }}>
            <span className="tag tag-red" style={{ marginBottom: 24, display: "inline-flex" }}>About ORYNEXA</span>
            <h1 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1, color: "#F4F5F2", marginBottom: 24 }}>
              We build business
              <br /><span style={{ color: "#C9252D" }}>infrastructure.</span>
            </h1>
            <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(244,245,242,0.5)" }}>
              ORYNEXA is an intelligent system design company. We exist to build the operational infrastructure
              between where a business is and where it needs to be — through AI, automation, brand systems,
              training architecture, and global operations design.
            </p>
          </div>
        </div>
      </section>

      {/* ── MISSION + FOUNDER ────────────────────────────────── */}
      <section style={{ background: "#F4F5F2", padding: "100px 0" }}>
        <div className="container-fluid">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="grid-cols-1 lg:grid-cols-2">
            <div>
              <span className="tag tag-grey" style={{ marginBottom: 24, display: "inline-flex" }}>Our Mission</span>
              <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 2.8rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#101214", marginBottom: 24 }}>
                Built from the belief that<br /><span style={{ color: "#C9252D" }}>systems change everything.</span>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "#6B7075" }}>
                  ORYNEXA was founded on a simple observation: most business problems aren&apos;t caused by bad people
                  or bad ideas. They&apos;re caused by broken systems — disconnected tools, manual processes, unclear
                  workflows, and infrastructure that was never designed to scale.
                </p>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "#6B7075" }}>
                  Our mission is to close that gap. We design, build, and deploy the operating systems that let
                  good businesses operate like great ones. Not by working harder, but by building smarter.
                </p>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "#6B7075" }}>
                  We call it &ldquo;Built From The Core&rdquo; — because real transformation doesn&apos;t happen at the surface.
                  It happens in the infrastructure layer most businesses never think about.
                </p>
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
                <Link href="/systems" className="btn-primary">See Our Systems <ArrowUpRight size={14} /></Link>
                <Link href="/contact" className="btn-outline-dark">Talk to Us <ArrowUpRight size={14} /></Link>
              </div>
            </div>

            {/* Founder card */}
            <div>
              <div style={{ background: "#101214", borderRadius: 4, overflow: "hidden", border: "1px solid rgba(244,245,242,0.06)" }}>
                {/* Card header */}
                <div style={{ padding: "32px 32px 0", background: "rgba(201,37,45,0.08)", borderBottom: "1px solid rgba(244,245,242,0.06)" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#101214", border: "2px solid rgba(201,37,45,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                      <rect width="80" height="80" fill="#101214" />
                      <rect x="12" y="12" width="24" height="24" fill="#C9252D" opacity="0.9" />
                      <rect x="44" y="44" width="24" height="24" fill="#1FA36B" opacity="0.9" />
                      <rect x="44" y="12" width="24" height="24" fill="rgba(244,245,242,0.15)" />
                      <rect x="12" y="44" width="24" height="24" fill="rgba(244,245,242,0.08)" />
                    </svg>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                    <span className="tag tag-red">Founder</span>
                    <span className="tag tag-green">Chief Architect</span>
                  </div>
                </div>
                <div style={{ padding: "28px 32px" }}>
                  <blockquote style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "-0.01em", lineHeight: 1.6, color: "#F4F5F2", marginBottom: 24 }}>
                    &ldquo;Every business has a ceiling. Most of the time, that ceiling isn&apos;t talent or market — it&apos;s the
                    system underneath. Fix the system, and the business can go as far as the vision will take it.&rdquo;
                  </blockquote>
                  <div style={{ display: "flex", gap: 8, paddingTop: 20, borderTop: "1px solid rgba(244,245,242,0.06)" }}>
                    <span style={{ width: 32, height: 2, background: "#C9252D", borderRadius: 1 }} />
                    <span style={{ width: 16, height: 2, background: "#1FA36B", borderRadius: 1 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ──────────────────────────────────────────── */}
      <section style={{ background: "#101214", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        <div className="bg-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 64 }}>
            <span className="tag tag-red" style={{ marginBottom: 20, display: "inline-flex" }}>Operating Principles</span>
            <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#F4F5F2" }}>
              How we think.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {values.map(({ title, description }, i) => (
              <div key={title} style={{ padding: "28px 24px", background: "rgba(244,245,242,0.03)", border: "1px solid rgba(244,245,242,0.07)", borderRadius: 4, position: "relative" }}>
                <span style={{ position: "absolute", top: 20, right: 20, fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "1.8rem", color: "rgba(244,245,242,0.05)", letterSpacing: "-0.04em" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#F4F5F2", marginBottom: 12 }}>{title}</h3>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.825rem", lineHeight: 1.7, color: "rgba(244,245,242,0.45)" }}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ───────────────────────────────────────────── */}
      <section style={{ background: "#F4F5F2", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        <div className="bg-grid-light" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 64 }}>
            <span className="tag tag-grey" style={{ marginBottom: 20, display: "inline-flex" }}>The Core Team</span>
            <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#101214" }}>
              The architects behind the system.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {team.map(({ name, role, focus, icon }) => (
              <div key={name} style={{ padding: "28px 24px", background: "rgba(255,255,255,0.8)", border: "1px solid rgba(107,112,117,0.15)", borderRadius: 4, display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: 4, background: "#101214", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(201,37,45,0.3)" }}>
                  <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.05em", color: "#C9252D" }}>{icon}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#101214", marginBottom: 4 }}>{name}</h3>
                  <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", color: "#C9252D", fontWeight: 500, marginBottom: 12 }}>{role}</p>
                  <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.775rem", color: "#6B7075", lineHeight: 1.6 }}>{focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ───────────────────────────────────────── */}
      <section style={{ background: "#101214", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        <div className="bg-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 64 }}>
            <span className="tag tag-white" style={{ marginBottom: 20, display: "inline-flex" }}>History</span>
            <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#F4F5F2" }}>
              How we got here.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {timeline.map(({ year, event, desc }, i) => (
              <div key={year} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 40, alignItems: "start", paddingBottom: i < timeline.length - 1 ? 40 : 0, marginBottom: i < timeline.length - 1 ? 0 : 0, borderBottom: i < timeline.length - 1 ? "1px solid rgba(244,245,242,0.06)" : "none" }}>
                <div style={{ paddingTop: 4 }}>
                  <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "1.4rem", letterSpacing: "-0.03em", color: i === timeline.length - 1 ? "#C9252D" : "rgba(244,245,242,0.35)" }}>
                    {year}
                  </span>
                </div>
                <div style={{ paddingTop: 4, paddingBottom: 40 }}>
                  <h4 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "1rem", color: "#F4F5F2", marginBottom: 8 }}>{event}</h4>
                  <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.875rem", lineHeight: 1.65, color: "rgba(244,245,242,0.45)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section style={{ background: "#C9252D", padding: "96px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
          <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,245,242,0.7)", display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", border: "1px solid rgba(244,245,242,0.25)", borderRadius: 2 }}>
            Join the System
          </span>
          <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.025em", color: "#F4F5F2", lineHeight: 1.1, maxWidth: 600 }}>
            Ready to build your infrastructure?
          </h2>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F4F5F2", color: "#101214", padding: "14px 32px", fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.07em", textTransform: "uppercase", borderRadius: 2, textDecoration: "none", transition: "all 0.2s" }}>
              Start a Conversation <ArrowUpRight size={14} />
            </Link>
            <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#F4F5F2", padding: "13px 32px", fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.07em", textTransform: "uppercase", border: "1px solid rgba(244,245,242,0.4)", borderRadius: 2, textDecoration: "none" }}>
              View Services <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
