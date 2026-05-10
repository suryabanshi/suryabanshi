import Link from "next/link";
import { ChevronRight, Mail, MessageSquare, Clock, Globe } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const touchpoints = [
  { icon: <Mail size={18} />, label: "Email", value: "hello@orynexa.com", note: "Response within 24 hours" },
  { icon: <MessageSquare size={18} />, label: "LINE / WhatsApp", value: "+XX XXX XXX XXXX", note: "Business hours" },
  { icon: <Clock size={18} />, label: "Business Hours", value: "Mon–Fri, 9:00–18:00", note: "JST / SGT / GMT+7" },
  { icon: <Globe size={18} />, label: "Regions Active", value: "APAC · Europe · Americas", note: "Global team" },
];

const reasons = [
  { label: "New system project", desc: "Start building from scratch or redesign existing infrastructure." },
  { label: "Automation setup", desc: "Connect your tools and automate your workflows with ORYNEXA FLOW." },
  { label: "AI integration", desc: "Add intelligent decision systems to your existing operations." },
  { label: "Brand architecture", desc: "Design your brand as a scalable communication system." },
  { label: "Global expansion", desc: "Enter new markets with proper operational infrastructure." },
  { label: "Strategy consultation", desc: "Get a diagnosis and roadmap before committing to a full build." },
];

export default function ContactPage() {
  return (
    <>
      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <section style={{ background: "#101214", paddingTop: 144, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div className="bg-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(to bottom, transparent, #F4F5F2)", pointerEvents: "none" }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <Link href="/" style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(244,245,242,0.4)", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={12} style={{ color: "rgba(244,245,242,0.25)" }} />
            <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9252D" }}>Contact</span>
          </div>
          <div style={{ maxWidth: 680 }}>
            <span className="tag tag-red" style={{ marginBottom: 24, display: "inline-flex" }}>System Entry Point</span>
            <h1 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1, color: "#F4F5F2", marginBottom: 24 }}>
              Tell us what
              <br /><span style={{ color: "#C9252D" }}>you&apos;re building.</span>
            </h1>
            <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(244,245,242,0.5)" }}>
              Every ORYNEXA engagement starts with a conversation. Fill out the system entry form below —
              the more context you give, the better we can diagnose and design the right solution.
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <section style={{ background: "#F4F5F2", padding: "80px 0 100px", position: "relative", overflow: "hidden" }}>
        <div className="bg-grid-light" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div className="container-fluid" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }} className="grid-cols-1 lg:grid-cols-2">

            {/* Left: info panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>

              {/* Contact touchpoints */}
              <div>
                <p style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B7075", marginBottom: 20 }}>
                  Contact Points
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {touchpoints.map(({ icon, label, value, note }) => (
                    <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 18px", background: "rgba(255,255,255,0.7)", border: "1px solid rgba(107,112,117,0.15)", borderRadius: 3 }}>
                      <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(201,37,45,0.08)", border: "1px solid rgba(201,37,45,0.18)", borderRadius: 3, color: "#C9252D", flexShrink: 0 }}>
                        {icon}
                      </div>
                      <div>
                        <p style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B7075", marginBottom: 3 }}>{label}</p>
                        <p style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#101214", marginBottom: 3 }}>{value}</p>
                        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", color: "#6B7075" }}>{note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What you can reach us about */}
              <div>
                <p style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B7075", marginBottom: 20 }}>
                  What to Reach Us About
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {reasons.map(({ label, desc }) => (
                    <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px", background: "rgba(255,255,255,0.6)", border: "1px solid rgba(107,112,117,0.12)", borderRadius: 3 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9252D", flexShrink: 0, marginTop: 6 }} />
                      <div>
                        <p style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: "0.82rem", color: "#101214", marginBottom: 2 }}>{label}</p>
                        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", color: "#6B7075", lineHeight: 1.5 }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process note */}
              <div style={{ padding: "20px 20px", background: "rgba(31,163,107,0.06)", border: "1px solid rgba(31,163,107,0.2)", borderRadius: 4 }}>
                <p style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#1FA36B", marginBottom: 10 }}>
                  What Happens After You Submit
                </p>
                <ol style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    "Your inquiry is logged and entered into our intake system.",
                    "A strategist reviews your brief within 24 hours.",
                    "We schedule a 30-minute discovery call.",
                    "We deliver a system diagnosis and proposed approach.",
                    "You decide if we build together.",
                  ].map((step, i) => (
                    <li key={i} style={{ display: "flex", gap: 10 }}>
                      <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.68rem", color: "#1FA36B", minWidth: 16 }}>{i + 1}.</span>
                      <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.8rem", lineHeight: 1.5, color: "#6B7075" }}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right: form */}
            <div>
              <div style={{ padding: "40px 36px", background: "rgba(255,255,255,0.85)", border: "1px solid rgba(107,112,117,0.18)", borderRadius: 4 }}>
                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                      <rect width="28" height="28" fill="#C9252D" />
                      <rect x="5" y="5" width="8" height="8" fill="#F4F5F2" />
                      <rect x="15" y="15" width="8" height="8" fill="#1FA36B" />
                      <rect x="15" y="5" width="8" height="8" fill="rgba(244,245,242,0.3)" />
                      <rect x="5" y="15" width="8" height="8" fill="rgba(244,245,242,0.15)" />
                    </svg>
                    <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.04em", color: "#101214" }}>
                      System Entry Form
                    </h2>
                  </div>
                  <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.85rem", color: "#6B7075", lineHeight: 1.6 }}>
                    Fill out the form below. The more detail you provide, the faster we can begin.
                    All fields marked * are required.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GLOBAL PRESENCE ──────────────────────────────────── */}
      <section style={{ background: "#101214", padding: "80px 0", borderTop: "1px solid rgba(244,245,242,0.06)" }}>
        <div className="container-fluid">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="grid-cols-1 lg:grid-cols-2">
            <div>
              <span className="tag tag-green" style={{ marginBottom: 20, display: "inline-flex" }}>Global Operations</span>
              <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#F4F5F2", marginBottom: 16 }}>
                We operate across borders.
              </h2>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(244,245,242,0.45)" }}>
                ORYNEXA has active client engagements across APAC, Europe, and the Americas.
                No matter where you&apos;re building, we can meet you there.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[
                { region: "Japan", flag: "🇯🇵", status: "Primary" },
                { region: "Singapore", flag: "🇸🇬", status: "Active" },
                { region: "Philippines", flag: "🇵🇭", status: "Active" },
                { region: "Australia", flag: "🇦🇺", status: "Active" },
                { region: "USA", flag: "🇺🇸", status: "Active" },
                { region: "Europe", flag: "🇪🇺", status: "Active" },
                { region: "UAE", flag: "🇦🇪", status: "Active" },
                { region: "UK", flag: "🇬🇧", status: "Active" },
                { region: "Canada", flag: "🇨🇦", status: "Active" },
              ].map(({ region, flag, status }) => (
                <div key={region} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 12px", background: "rgba(244,245,242,0.03)", border: "1px solid rgba(244,245,242,0.07)", borderRadius: 3, textAlign: "center" }}>
                  <span style={{ fontSize: "1.25rem" }}>{flag}</span>
                  <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: "0.7rem", color: "#F4F5F2" }}>{region}</span>
                  <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.6rem", color: status === "Primary" ? "#C9252D" : "#1FA36B", letterSpacing: "0.06em", textTransform: "uppercase" }}>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
