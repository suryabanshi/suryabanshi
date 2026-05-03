'use client';
import { useState } from 'react';
import { Check, Zap, Shield, ArrowRight, Users, TrendingUp, Award } from 'lucide-react';
import { MEMBERSHIP_TIERS } from '@/lib/data';

export default function MembershipPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-brand-400 font-semibold text-sm uppercase tracking-widest">Recurring Revenue Foundation</span>
          <h1 className="text-5xl font-black mt-3 mb-4">
            Choose Your <span className="shimmer-text">Power Level</span>
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto mb-8">
            Every VaultFlow member builds predictable recurring income.
            Higher tier = higher commissions, more tools, faster growth.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center glass rounded-2xl p-1 border border-white/10">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${billing === 'monthly' ? 'bg-brand-700 text-white' : 'text-white/50'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${billing === 'annual' ? 'bg-brand-700 text-white' : 'text-white/50'}`}
            >
              Annual
              <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-black">SAVE 30%</span>
            </button>
          </div>
        </div>

        {/* Tiers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {MEMBERSHIP_TIERS.map((tier) => {
            const price = billing === 'annual' ? Math.round(tier.price * 0.7) : tier.price;
            return (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-6 bg-gradient-to-br ${tier.bg} border ${tier.border} ${
                  tier.popular ? 'ring-2 ring-gold-500/60 scale-[1.03]' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-gradient text-black text-xs font-black px-5 py-1.5 rounded-full whitespace-nowrap">
                    ⭐ MOST POPULAR
                  </div>
                )}

                <div className="text-5xl mb-4">{tier.emoji}</div>
                <div className={`text-2xl font-black ${tier.color} mb-1`}>{tier.name}</div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-black text-white">${price}</span>
                  <span className="text-white/40">/mo</span>
                </div>
                {billing === 'annual' && (
                  <div className="text-xs text-green-400 mb-4">Billed annually (save ${(tier.price - price) * 12}/yr)</div>
                )}

                <ul className="space-y-3 mb-8 mt-4">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check size={15} className={`${tier.color} flex-shrink-0 mt-0.5`} />
                      <span className="text-white/70">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'bg-gold-gradient text-black hover:opacity-90 glow-gold'
                      : 'glass hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  <Zap size={15} className={tier.popular ? 'fill-black' : ''} />
                  Join {tier.name}
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Benefits breakdown */}
        <div className="glass rounded-2xl p-8 border border-white/5 mb-12">
          <h2 className="text-2xl font-black mb-6 text-center">What You Unlock at Each Level</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-white/50 font-medium">Feature</th>
                  {MEMBERSHIP_TIERS.map(t => (
                    <th key={t.id} className={`text-center py-3 font-black ${t.color}`}>{t.emoji} {t.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { feature: 'Products Access',   values: ['5 products', '25 products', '100+ products', 'All + Early Access'] },
                  { feature: 'Affiliate Rate',     values: ['10%', '25%', '35%', '50%'] },
                  { feature: 'Support',            values: ['Email', 'Priority', 'Live Chat', 'Dedicated Manager'] },
                  { feature: 'Coaching Calls',     values: ['—', 'Weekly Group', 'Weekly Group + 1x1', 'Weekly 1-on-1'] },
                  { feature: 'Done-for-You',       values: ['—', '—', 'Funnels', 'Full Business Setup'] },
                  { feature: 'Resell Rights',      values: ['—', '—', '—', 'White-Label Rights'] },
                  { feature: 'Analytics',          values: ['Basic', 'Advanced', 'Full Suite', 'Custom Reports'] },
                  { feature: 'Revenue Share',      values: ['—', '—', '—', '✓'] },
                ].map(({ feature, values }) => (
                  <tr key={feature} className="hover:bg-white/2">
                    <td className="py-3 text-white/60">{feature}</td>
                    {values.map((v, i) => (
                      <td key={i} className="py-3 text-center text-white/80">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Guarantees */}
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Shield, title: '30-Day Money Back', desc: 'Not happy? Full refund within 30 days. Zero questions asked.', color: 'text-green-400' },
            { icon: TrendingUp, title: 'Income Guarantee', desc: 'Follow our system for 90 days. If you don\'t earn your subscription back, we refund double.', color: 'text-gold-400' },
            { icon: Users, title: 'Community Forever', desc: 'Cancel anytime but keep Discord access permanently. Your network stays yours.', color: 'text-brand-400' },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="glass rounded-2xl p-6 border border-white/5 text-center">
              <Icon size={28} className={`${color} mx-auto mb-3`} />
              <div className="font-bold text-white mb-2">{title}</div>
              <div className="text-sm text-white/50">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
