"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Systems", href: "/systems" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
  Systems: [
    { label: "ORYNEXA AI", href: "/systems#ai" },
    { label: "ORYNEXA FLOW", href: "/systems#flow" },
    { label: "ORYNEXA MEDIA", href: "/systems#media" },
    { label: "ORYNEXA LEARN", href: "/systems#learn" },
    { label: "ORYNEXA GLOBAL", href: "/systems#global" },
    { label: "ORYNEXA LABS", href: "/systems#labs" },
  ],
  Services: [
    { label: "System Architecture", href: "/services#architecture" },
    { label: "AI Integration", href: "/services#ai" },
    { label: "Brand & Media", href: "/services#media" },
    { label: "Automation Flows", href: "/services#automation" },
    { label: "Training Systems", href: "/services#training" },
    { label: "Global Operations", href: "/services#global" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#101214",
        borderTop: "1px solid rgba(244,245,242,0.06)",
        color: "#F4F5F2",
      }}
    >
      {/* Main footer */}
      <div className="container-fluid" style={{ paddingTop: 80, paddingBottom: 64 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 64,
          }}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Brand column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
                  <rect width="28" height="28" fill="#C9252D" />
                  <rect x="5" y="5" width="8" height="8" fill="#F4F5F2" />
                  <rect x="15" y="15" width="8" height="8" fill="#1FA36B" />
                  <rect x="15" y="5" width="8" height="8" fill="rgba(244,245,242,0.3)" />
                  <rect x="5" y="15" width="8" height="8" fill="rgba(244,245,242,0.15)" />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    letterSpacing: "0.14em",
                    color: "#F4F5F2",
                    textTransform: "uppercase",
                  }}
                >
                  ORYNEXA
                </span>
              </div>
            </Link>

            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "rgba(244,245,242,0.45)",
                maxWidth: 300,
              }}
            >
              Intelligent system design for businesses that want to scale without
              breaking. We build the infrastructure layer between your vision and
              your results.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span className="label-text" style={{ color: "rgba(244,245,242,0.3)" }}>
                Built From The Core
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                <span
                  style={{
                    width: 32,
                    height: 3,
                    background: "#C9252D",
                    borderRadius: 1,
                  }}
                />
                <span
                  style={{
                    width: 16,
                    height: 3,
                    background: "#1FA36B",
                    borderRadius: 1,
                  }}
                />
                <span
                  style={{
                    width: 8,
                    height: 3,
                    background: "rgba(244,245,242,0.2)",
                    borderRadius: 1,
                  }}
                />
              </div>
            </div>

            <Link
              href="/contact"
              className="btn-primary"
              style={{ alignSelf: "flex-start", padding: "10px 20px" }}
            >
              Get in Touch
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h4
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#F4F5F2",
                }}
              >
                {title}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "0.825rem",
                        color: "rgba(244,245,242,0.45)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = "rgba(244,245,242,0.85)")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = "rgba(244,245,242,0.45)")
                      }
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(244,245,242,0.06)",
        }}
      >
        <div className="container-fluid">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "24px 0",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.75rem",
                color: "rgba(244,245,242,0.3)",
              }}
            >
              © {year} ORYNEXA. All rights reserved. Built From The Core.
            </span>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(244,245,242,0.3)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
