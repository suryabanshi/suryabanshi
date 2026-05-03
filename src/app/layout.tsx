import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { LiveTicker } from '@/components/LiveTicker';

export const metadata: Metadata = {
  title: 'VaultFlow — Your 24/7 Income Machine',
  description: 'The ultimate multi-stream online income ecosystem. Digital products, memberships, affiliate network, and SaaS tools — growing your wealth 24/7.',
  keywords: 'online income, digital products, passive income, affiliate marketing, membership site',
  openGraph: {
    title: 'VaultFlow — Your 24/7 Income Machine',
    description: 'Build, scale, and automate multiple income streams with VaultFlow.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-white antialiased">
        <LiveTicker />
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-white/5 mt-20 py-10 text-center text-white/40 text-sm">
          <p className="mb-1">© 2026 VaultFlow Inc. — The World's Fastest Growing Income Ecosystem</p>
          <p className="text-xs">Building generational wealth, one stream at a time.</p>
        </footer>
      </body>
    </html>
  );
}
