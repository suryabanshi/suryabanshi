'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Zap, Menu, X } from 'lucide-react';

const links = [
  { href: '/',            label: 'Home' },
  { href: '/store',       label: 'Store' },
  { href: '/membership',  label: 'Membership' },
  { href: '/affiliate',   label: 'Affiliates' },
  { href: '/tools',       label: 'Tools' },
  { href: '/dashboard',   label: 'Dashboard' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 px-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-purple-gradient rounded-lg flex items-center justify-center group-hover:glow-purple transition-all">
            <Zap size={16} className="text-gold-400 fill-gold-400" />
          </div>
          <span className="font-bold text-lg">
            <span className="text-white">Vault</span>
            <span className="shimmer-text">Flow</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/dashboard"
            className="px-5 py-2 rounded-xl bg-gold-gradient text-black font-bold text-sm hover:opacity-90 transition-all glow-gold"
          >
            Start Earning →
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white/60 hover:text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-2 glass rounded-2xl p-4 space-y-1 mx-0">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block mt-2 px-4 py-3 rounded-xl bg-gold-gradient text-black font-bold text-sm text-center"
          >
            Start Earning →
          </Link>
        </div>
      )}
    </nav>
  );
}
