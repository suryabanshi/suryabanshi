"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/systems", label: "Systems" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled
          ? "rgba(16, 18, 20, 0.96)"
          : "rgba(16, 18, 20, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled
          ? "1px solid rgba(244,245,242,0.08)"
          : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div className="container-fluid">
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
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
                  fontSize: "1.05rem",
                  letterSpacing: "0.12em",
                  color: "#F4F5F2",
                  textTransform: "uppercase",
                }}
              >
                ORYNEXA
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: 40,
              listStyle: "none",
            }}
            className="hidden lg:flex"
          >
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontWeight: 500,
                      fontSize: "0.78rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: active ? "#F4F5F2" : "rgba(244,245,242,0.55)",
                      textDecoration: "none",
                      position: "relative",
                      paddingBottom: 4,
                      transition: "color 0.2s",
                    }}
                  >
                    {label}
                    {active && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: -2,
                          left: 0,
                          right: 0,
                          height: 2,
                          background: "#C9252D",
                          borderRadius: 1,
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex" style={{ gap: 12 }}>
            <Link href="/contact" className="btn-primary" style={{ padding: "10px 24px" }}>
              Start a Project
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            style={{
              background: "none",
              border: "none",
              color: "#F4F5F2",
              cursor: "pointer",
              padding: 4,
            }}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            background: "#101214",
            borderTop: "1px solid rgba(244,245,242,0.08)",
            padding: "24px 40px 32px",
          }}
        >
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      display: "block",
                      padding: "12px 0",
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontWeight: 500,
                      fontSize: "0.9rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: active ? "#F4F5F2" : "rgba(244,245,242,0.5)",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(244,245,242,0.06)",
                    }}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div style={{ marginTop: 24 }}>
            <Link href="/contact" className="btn-primary" style={{ width: "100%" }}>
              Start a Project
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
