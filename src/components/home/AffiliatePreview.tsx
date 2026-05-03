import Link from 'next/link';
import { Share2, DollarSign, Clock, Users, ArrowRight } from 'lucide-react';

export function AffiliatePreview() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-green-400 font-semibold text-sm uppercase tracking-widest">Passive Income</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-6">
              Earn While You <span className="text-green-400">Sleep</span>
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Share your unique link. Earn 30–50% commission on every sale — forever.
              Our 90-day cookie window means you get paid even if they buy 3 months later.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: DollarSign, label: 'Max Commission', value: '50%', color: 'text-green-400' },
                { icon: Clock,      label: 'Cookie Window', value: '90 days', color: 'text-blue-400' },
                { icon: Users,      label: 'Active Affiliates', value: '3,841', color: 'text-brand-400' },
                { icon: Share2,     label: 'Avg Monthly Earn', value: '$1,240', color: 'text-gold-400' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="glass rounded-xl p-4 border border-white/5">
                  <Icon size={18} className={`${color} mb-2`} />
                  <div className={`font-black text-xl ${color}`}>{value}</div>
                  <div className="text-xs text-white/40 mt-1">{label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/affiliate"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500/20 border border-green-500/30 rounded-2xl text-green-400 font-bold hover:bg-green-500/30 transition-all"
            >
              Join Affiliate Network <ArrowRight size={18} />
            </Link>
          </div>

          <div className="space-y-4">
            {/* How it works */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="font-bold text-white mb-5">How It Works</h3>
              {[
                { step: '01', title: 'Get Your Link', desc: 'Unique tracking link generated instantly after joining' },
                { step: '02', title: 'Share Anywhere', desc: 'Post on social media, blog, YouTube, email — anywhere' },
                { step: '03', title: 'Earn Forever', desc: 'Get paid 30-50% on every purchase your link drives' },
                { step: '04', title: 'Cash Out Daily', desc: 'Withdraw earnings to PayPal or bank every single day' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4 mb-5 last:mb-0">
                  <div className="w-10 h-10 rounded-xl bg-brand-700/30 border border-brand-700/40 flex items-center justify-center flex-shrink-0 font-black text-brand-400 text-sm">
                    {step}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{title}</div>
                    <div className="text-sm text-white/40">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Top earner callout */}
            <div className="glass rounded-2xl p-5 border border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">👑</span>
                <div>
                  <div className="font-bold text-white">Top Affiliate This Month</div>
                  <div className="text-sm text-white/50">@marcus_w earned</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="font-black text-2xl text-green-400">$8,420</div>
                  <div className="text-xs text-white/30">in commissions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
