import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";

type Props = {
  tier: string;
  name: string;
  tagline: string;
  price?: string;
  priceNote?: string;
  features: string[];
  highlight?: boolean;
  dark?: boolean;
  cta?: string;
};

export default function PricingCard({
  tier,
  name,
  tagline,
  price,
  priceNote,
  features,
  highlight = false,
  dark = false,
  cta = "Get Started",
}: Props) {
  const bg = highlight
    ? "#C9252D"
    : dark
    ? "rgba(244,245,242,0.03)"
    : "rgba(255,255,255,0.85)";

  const border = highlight
    ? "transparent"
    : dark
    ? "rgba(244,245,242,0.1)"
    : "rgba(107,112,117,0.18)";

  const textPrimary = highlight || dark ? "#F4F5F2" : "#101214";
  const textSecondary = highlight ? "rgba(244,245,242,0.75)" : dark ? "rgba(244,245,242,0.45)" : "#6B7075";
  const checkColor = highlight ? "#F4F5F2" : "#1FA36B";
  const tierColor = highlight ? "rgba(244,245,242,0.7)" : "#6B7075";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 28,
        padding: "32px 28px",
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 4,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {highlight && (
        <span
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "rgba(255,255,255,0.2)",
            color: "#F4F5F2",
            padding: "3px 10px",
            fontSize: "0.6rem",
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            borderRadius: 2,
          }}
        >
          Most Popular
        </span>
      )}

      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 600,
            fontSize: "0.62rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: tierColor,
          }}
        >
          {tier}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 700,
            fontSize: "1.5rem",
            letterSpacing: "-0.02em",
            color: textPrimary,
          }}
        >
          {name}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.825rem",
            lineHeight: 1.6,
            color: textSecondary,
          }}
        >
          {tagline}
        </p>
      </div>

      {/* Price */}
      {price && (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 700,
              fontSize: "2rem",
              letterSpacing: "-0.03em",
              color: textPrimary,
            }}
          >
            {price}
          </span>
          {priceNote && (
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.75rem",
                color: textSecondary,
              }}
            >
              {priceNote}
            </span>
          )}
        </div>
      )}

      {/* Divider */}
      <div
        style={{
          borderTop: `1px solid ${highlight ? "rgba(255,255,255,0.2)" : border}`,
        }}
      />

      {/* Features */}
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <Check
              size={13}
              style={{ color: checkColor, flexShrink: 0, marginTop: 3 }}
            />
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.825rem",
                lineHeight: 1.5,
                color: textSecondary,
              }}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/contact"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "13px 24px",
          background: highlight ? "rgba(255,255,255,0.15)" : "transparent",
          border: `1px solid ${highlight ? "rgba(255,255,255,0.4)" : border}`,
          borderRadius: 2,
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 600,
          fontSize: "0.78rem",
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: textPrimary,
          textDecoration: "none",
          transition: "all 0.2s",
        }}
      >
        {cta}
        <ArrowUpRight size={13} />
      </Link>
    </div>
  );
}
