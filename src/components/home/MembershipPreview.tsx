import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { MEMBERSHIP_TIERS } from '@/lib/data';

export function MembershipPreview() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-brand-400 font-semibold text-sm uppercase tracking-widest">Recurring Revenue</span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">
            Choose Your <span className="shimmer-text">Membership</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Unlock the full VaultFlow ecosystem. Higher tiers = higher commissions, more tools, and faster growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {MEMBERSHIP_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl p-6 bg-gradient-to-br ${tier.bg} border ${tier.border} ${
                tier.popular ? 'ring-2 ring-gold-500/50 scale-[1.02]' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-gradient text-black text-xs font-black px-4 py-1 rounded-full whitespace-nowrap">
                  ⭐ MOST POPULAR
                </div>
              )}

              <div className="text-4xl mb-3">{tier.emoji}</div>
              <div className={`text-xl font-black ${tier.color} mb-1`}>{tier.name}</div>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-3xl font-black text-white">${tier.price}</span>
                <span className="text-white/40">/mo</span>
              </div>

              <ul className="space-y-2.5 mb-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={14} className={`${tier.color} flex-shrink-0 mt-0.5`} />
                    <span className="text-white/70">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/membership"
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all ${
                  tier.popular
                    ? 'bg-gold-gradient text-black hover:opacity-90 glow-gold'
                    : 'glass hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                Get Started <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
