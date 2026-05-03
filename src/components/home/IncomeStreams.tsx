import Link from 'next/link';
import { ShoppingBag, Users, Share2, Wrench, FileText, TrendingUp, ArrowRight } from 'lucide-react';

const STREAMS = [
  {
    icon: ShoppingBag,
    title: 'Digital Product Store',
    description: 'Sell ebooks, templates, courses, and tools. Instant delivery. 100% profit margin.',
    income: '$200–$5,000/mo',
    href: '/store',
    color: 'text-gold-400',
    bg: 'from-gold-500/20 to-gold-600/5',
    border: 'border-gold-500/20',
    tag: 'Most Popular',
  },
  {
    icon: Users,
    title: 'Membership Tiers',
    description: 'Recurring monthly income from Bronze to Platinum. Unlock exclusive content and tools.',
    income: '$500–$10,000/mo',
    href: '/membership',
    color: 'text-brand-400',
    bg: 'from-brand-700/20 to-brand-800/5',
    border: 'border-brand-700/20',
    tag: 'Best ROI',
  },
  {
    icon: Share2,
    title: 'Affiliate Network',
    description: 'Earn 30–50% commission on every referral. Lifetime cookies. Real-time tracking.',
    income: '$300–$8,000/mo',
    href: '/affiliate',
    color: 'text-green-400',
    bg: 'from-green-500/20 to-green-600/5',
    border: 'border-green-500/20',
    tag: 'Passive Income',
  },
  {
    icon: Wrench,
    title: 'SaaS Micro-Tools',
    description: 'Subscription-based AI tools, calculators, and automations. Pay-per-use revenue.',
    income: '$100–$3,000/mo',
    href: '/tools',
    color: 'text-blue-400',
    bg: 'from-blue-500/20 to-blue-600/5',
    border: 'border-blue-500/20',
    tag: 'Scalable',
  },
  {
    icon: FileText,
    title: 'Content Monetization',
    description: 'Blog posts, newsletters, and guides monetized with ads, sponsors, and affiliate links.',
    income: '$50–$2,000/mo',
    href: '/blog',
    color: 'text-pink-400',
    bg: 'from-pink-500/20 to-pink-600/5',
    border: 'border-pink-500/20',
    tag: 'Content',
  },
  {
    icon: TrendingUp,
    title: 'Growth Compounding',
    description: 'All streams compound together. The longer you run, the faster it grows. Exponential returns.',
    income: 'Unlimited',
    href: '/dashboard',
    color: 'text-orange-400',
    bg: 'from-orange-500/20 to-orange-600/5',
    border: 'border-orange-500/20',
    tag: 'Compounding',
  },
];

export function IncomeStreams() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest">Revenue Ecosystem</span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">
            5 Streams. <span className="shimmer-text">1 Platform.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Most people rely on one income stream. VaultFlow runs five simultaneously, all automated and compounding.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STREAMS.map(({ icon: Icon, title, description, income, href, color, bg, border, tag }) => (
            <Link
              key={title}
              href={href}
              className={`group relative rounded-2xl p-6 bg-gradient-to-br ${bg} border ${border} hover:scale-[1.02] transition-all overflow-hidden`}
            >
              <div className="absolute top-4 right-4">
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/10 text-white/60">{tag}</span>
              </div>

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 glass group-hover:scale-110 transition-transform`}>
                <Icon size={22} className={color} />
              </div>

              <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
              <p className="text-white/50 text-sm mb-5 leading-relaxed">{description}</p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-white/30">Avg. Monthly</span>
                  <div className={`font-black text-lg ${color}`}>{income}</div>
                </div>
                <div className={`w-8 h-8 rounded-full glass flex items-center justify-center ${color} group-hover:translate-x-1 transition-transform`}>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Total potential */}
        <div className="mt-8 glass rounded-2xl p-6 border border-gold-500/20 text-center">
          <p className="text-white/50 mb-2">Combined Income Potential</p>
          <div className="text-4xl font-black shimmer-text">$1,150 — $28,000 / month</div>
          <p className="text-white/30 text-sm mt-2">Running all 5 streams simultaneously</p>
        </div>
      </div>
    </section>
  );
}
