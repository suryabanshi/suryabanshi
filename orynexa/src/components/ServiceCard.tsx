import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  accent?: "red" | "green" | "grey";
  tag?: string;
  href?: string;
  dark?: boolean;
};

export default function ServiceCard({
  title,
  subtitle,
  description,
  icon,
  accent = "red",
  tag,
  href = "/services",
  dark = false,
}: Props) {
  const accentColor = {
    red: "#C9252D",
    green: "#1FA36B",
    grey: "#6B7075",
  }[accent];

  const bg = dark ? "rgba(244,245,242,0.03)" : "rgba(255,255,255,0.8)";
  const border = dark ? "rgba(244,245,242,0.08)" : "rgba(107,112,117,0.15)";
  const textPrimary = dark ? "#F4F5F2" : "#101214";
  const textSecondary = dark ? "rgba(244,245,242,0.45)" : "#6B7075";

  return (
    <Link
      href={href}
      className="card-lift"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        padding: "28px 28px 24px",
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 4,
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent line */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 2,
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div
          style={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}33`,
            borderRadius: 3,
            color: accentColor,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        {tag && (
          <span
            className="tag"
            style={{
              background: `${accentColor}12`,
              color: accentColor,
              border: `1px solid ${accentColor}28`,
            }}
          >
            {tag}
          </span>
        )}
      </div>

      {/* Text */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <div>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 500,
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: accentColor,
              marginBottom: 4,
            }}
          >
            {subtitle}
          </span>
          <h3
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: "-0.01em",
              color: textPrimary,
              lineHeight: 1.2,
            }}
          >
            {title}
          </h3>
        </div>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.825rem",
            lineHeight: 1.7,
            color: textSecondary,
          }}
        >
          {description}
        </p>
      </div>

      {/* Link */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 600,
          fontSize: "0.72rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: accentColor,
        }}
      >
        Learn More
        <ArrowUpRight size={13} />
      </div>
    </Link>
  );
}
