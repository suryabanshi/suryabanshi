import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Props = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  status?: "Live" | "Prototype" | "In Build";
  year?: string;
  dark?: boolean;
};

const statusColor = {
  Live: "#1FA36B",
  Prototype: "#C9252D",
  "In Build": "#6B7075",
};

export default function ProjectCard({
  title,
  category,
  description,
  tags,
  status = "Live",
  year = "2024",
  dark = false,
}: Props) {
  const bg = dark ? "rgba(244,245,242,0.03)" : "rgba(255,255,255,0.85)";
  const border = dark ? "rgba(244,245,242,0.08)" : "rgba(107,112,117,0.15)";
  const textPrimary = dark ? "#F4F5F2" : "#101214";
  const textSecondary = dark ? "rgba(244,245,242,0.45)" : "#6B7075";

  return (
    <Link
      href="/projects"
      className="card-lift"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        padding: "28px 24px",
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 4,
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top meta */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 500,
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: textSecondary,
          }}
        >
          {category}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: statusColor[status],
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 600,
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: statusColor[status],
            }}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Visual placeholder */}
      <div
        style={{
          height: 120,
          background: dark
            ? "rgba(244,245,242,0.03)"
            : "rgba(107,112,117,0.06)",
          borderRadius: 3,
          border: `1px solid ${border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 8px,
              rgba(107,112,117,0.06) 8px,
              rgba(107,112,117,0.06) 9px
            )`,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 700,
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: dark ? "rgba(244,245,242,0.15)" : "rgba(107,112,117,0.4)",
          }}
        >
          {category}
        </span>
      </div>

      {/* Title + desc */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <h3
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "-0.01em",
            color: textPrimary,
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.8rem",
            lineHeight: 1.65,
            color: textSecondary,
          }}
        >
          {description}
        </p>
      </div>

      {/* Tags + link */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="tag"
              style={{
                background: dark ? "rgba(244,245,242,0.06)" : "rgba(107,112,117,0.08)",
                color: textSecondary,
                border: `1px solid ${border}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <ArrowUpRight size={15} style={{ color: "#C9252D", flexShrink: 0 }} />
      </div>

      {/* Year */}
      <span
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 600,
          fontSize: "0.62rem",
          letterSpacing: "0.1em",
          color: dark ? "rgba(244,245,242,0.15)" : "rgba(107,112,117,0.3)",
        }}
      >
        {year}
      </span>
    </Link>
  );
}
