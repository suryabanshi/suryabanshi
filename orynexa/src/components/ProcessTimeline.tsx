type Step = {
  number: string;
  title: string;
  description: string;
  accent?: "red" | "green";
};

type Props = {
  steps: Step[];
  dark?: boolean;
};

export default function ProcessTimeline({ steps, dark = false }: Props) {
  const textPrimary = dark ? "#F4F5F2" : "#101214";
  const textSecondary = dark ? "rgba(244,245,242,0.45)" : "#6B7075";
  const borderColor = dark ? "rgba(244,245,242,0.08)" : "rgba(107,112,117,0.15)";
  const lineColor = dark ? "rgba(244,245,242,0.08)" : "rgba(107,112,117,0.2)";

  return (
    <div style={{ position: "relative" }}>
      {/* Horizontal connector line (desktop) */}
      <div
        className="hidden lg:block"
        style={{
          position: "absolute",
          top: 28,
          left: "calc(100% / 14)",
          right: "calc(100% / 14)",
          height: 1,
          background: lineColor,
          zIndex: 0,
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
          gap: 0,
          position: "relative",
          zIndex: 1,
        }}
        className="grid-cols-2 md:grid-cols-4 lg:grid-cols-7"
      >
        {steps.map((step, i) => {
          const isRed = step.accent === "red" || (!step.accent && (i === 0 || i === steps.length - 1));
          const isGreen = step.accent === "green";
          const nodeColor = isRed ? "#C9252D" : isGreen ? "#1FA36B" : "#6B7075";
          const nodeBg = isRed
            ? "rgba(201,37,45,0.12)"
            : isGreen
            ? "rgba(31,163,107,0.12)"
            : dark
            ? "rgba(244,245,242,0.06)"
            : "rgba(107,112,117,0.08)";

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "0 12px",
                gap: 16,
              }}
            >
              {/* Step node */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: nodeBg,
                  border: `1px solid ${nodeColor}40`,
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    color: nodeColor,
                    letterSpacing: "0.06em",
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <h4
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    letterSpacing: "0.04em",
                    color: textPrimary,
                    textTransform: "uppercase",
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.75rem",
                    lineHeight: 1.6,
                    color: textSecondary,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
