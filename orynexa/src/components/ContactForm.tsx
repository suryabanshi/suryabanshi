"use client";

import { useState, FormEvent } from "react";
import { ArrowUpRight, CheckCircle } from "lucide-react";

type FormData = {
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  service: string;
  problem: string;
  budget: string;
  timeline: string;
  message: string;
};

const initialData: FormData = {
  name: "",
  company: "",
  country: "",
  email: "",
  phone: "",
  service: "",
  problem: "",
  budget: "",
  timeline: "",
  message: "",
};

const services = [
  "System Architecture & Design",
  "AI Integration (ORYNEXA AI)",
  "Automation Flows (ORYNEXA FLOW)",
  "Brand & Media (ORYNEXA MEDIA)",
  "Training System (ORYNEXA LEARN)",
  "Global Operations (ORYNEXA GLOBAL)",
  "Research & Development (ORYNEXA LABS)",
  "Full System Package",
  "Consultation Only",
];

const budgets = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $30,000",
  "$30,000 – $60,000",
  "$60,000 – $100,000",
  "$100,000+",
  "Let's discuss",
];

const timelines = [
  "ASAP (1–2 weeks)",
  "1 Month",
  "1–3 Months",
  "3–6 Months",
  "6+ Months",
  "Flexible / TBD",
];

const countries = [
  "Japan", "United States", "United Kingdom", "Singapore", "Australia",
  "Canada", "Germany", "France", "Netherlands", "UAE", "Hong Kong",
  "South Korea", "Taiwan", "Thailand", "Indonesia", "Malaysia",
  "Vietnam", "Philippines", "India", "Brazil", "Mexico", "Other",
];

type Props = {
  dark?: boolean;
};

export default function ContactForm({ dark = false }: Props) {
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const textPrimary = dark ? "#F4F5F2" : "#101214";
  const textSecondary = dark ? "rgba(244,245,242,0.5)" : "#6B7075";
  const inputBg = dark ? "rgba(244,245,242,0.04)" : "rgba(255,255,255,0.7)";
  const inputBorder = dark ? "rgba(244,245,242,0.12)" : "rgba(107,112,117,0.22)";
  const labelColor = dark ? "rgba(244,245,242,0.65)" : "#6B7075";

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setData((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    background: inputBg,
    border: `1px solid ${inputBorder}`,
    borderRadius: 2,
    padding: "13px 16px",
    fontFamily: "var(--font-inter), sans-serif",
    fontSize: "0.875rem",
    color: textPrimary,
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-space-grotesk), sans-serif",
    fontWeight: 500,
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: labelColor,
    display: "block",
    marginBottom: 8,
  };

  if (submitted) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 24,
          padding: "80px 40px",
          border: `1px solid ${dark ? "rgba(31,163,107,0.3)" : "rgba(31,163,107,0.25)"}`,
          borderRadius: 4,
          background: dark ? "rgba(31,163,107,0.06)" : "rgba(31,163,107,0.04)",
        }}
      >
        <CheckCircle size={48} style={{ color: "#1FA36B" }} />
        <div>
          <h3
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 700,
              fontSize: "1.5rem",
              letterSpacing: "-0.02em",
              color: textPrimary,
              marginBottom: 12,
            }}
          >
            System Entry Received
          </h3>
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: textSecondary,
              maxWidth: 440,
            }}
          >
            Your inquiry has been logged and routed into our intake system.
            A strategist will review your brief and reach out within 24–48 hours.
          </p>
        </div>
        <span className="tag tag-green">Lead Captured · Entering CRM</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Row 1: Name + Company */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-cols-1 md:grid-cols-2">
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input
            type="text"
            placeholder="Your full name"
            value={data.name}
            onChange={set("name")}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Company / Organization</label>
          <input
            type="text"
            placeholder="Company name"
            value={data.company}
            onChange={set("company")}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Row 2: Country + Email */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-cols-1 md:grid-cols-2">
        <div>
          <label style={labelStyle}>Country *</label>
          <select
            value={data.country}
            onChange={set("country")}
            required
            style={{
              ...inputStyle,
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7075' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center",
              paddingRight: 44,
              cursor: "pointer",
            }}
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Email Address *</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={data.email}
            onChange={set("email")}
            required
            style={inputStyle}
          />
        </div>
      </div>

      {/* Row 3: Phone + Service */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-cols-1 md:grid-cols-2">
        <div>
          <label style={labelStyle}>Phone / LINE / WhatsApp</label>
          <input
            type="text"
            placeholder="+1 234 567 8900"
            value={data.phone}
            onChange={set("phone")}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Service of Interest *</label>
          <select
            value={data.service}
            onChange={set("service")}
            required
            style={{
              ...inputStyle,
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7075' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center",
              paddingRight: 44,
              cursor: "pointer",
            }}
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 4: Budget + Timeline */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-cols-1 md:grid-cols-2">
        <div>
          <label style={labelStyle}>Budget Range</label>
          <select
            value={data.budget}
            onChange={set("budget")}
            style={{
              ...inputStyle,
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7075' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center",
              paddingRight: 44,
              cursor: "pointer",
            }}
          >
            <option value="">Select budget</option>
            {budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Desired Timeline</label>
          <select
            value={data.timeline}
            onChange={set("timeline")}
            style={{
              ...inputStyle,
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7075' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center",
              paddingRight: 44,
              cursor: "pointer",
            }}
          >
            <option value="">Select timeline</option>
            {timelines.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Current problem */}
      <div>
        <label style={labelStyle}>Current Problem / Challenge *</label>
        <input
          type="text"
          placeholder="Briefly describe your main challenge or bottleneck"
          value={data.problem}
          onChange={set("problem")}
          required
          style={inputStyle}
        />
      </div>

      {/* Message */}
      <div>
        <label style={labelStyle}>Additional Context / Message</label>
        <textarea
          placeholder="Tell us more about your business, goals, or what you're building..."
          value={data.message}
          onChange={set("message")}
          rows={5}
          style={{
            ...inputStyle,
            resize: "vertical",
            lineHeight: 1.7,
          }}
        />
      </div>

      {/* Disclaimer */}
      <p
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "0.72rem",
          color: textSecondary,
          lineHeight: 1.6,
        }}
      >
        By submitting this form, your information will be processed and entered
        into our intake system. We do not share your data with third parties.
        Response time: 24–48 business hours.
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary"
        style={{
          width: "100%",
          justifyContent: "center",
          padding: "16px 32px",
          opacity: submitting ? 0.7 : 1,
          cursor: submitting ? "not-allowed" : "pointer",
        }}
      >
        {submitting ? (
          <>
            <span>Processing</span>
            <span className="animate-blink">_</span>
          </>
        ) : (
          <>
            Submit to ORYNEXA System
            <ArrowUpRight size={15} />
          </>
        )}
      </button>
    </form>
  );
}
