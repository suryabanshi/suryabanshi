import Link from 'next/link';
import { Zap, ArrowRight, Shield } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950" />
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-600/20 rounded-full blur-[80px]" />

          <div className="relative z-10 p-12 md:p-16 text-center">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 border border-gold-500/30">
              <Zap size={14} className="text-gold-400 fill-gold-400" />
              <span className="text-sm text-white/70">
                <span className="text-gold-400 font-semibold">Join FREE today</span> — No credit card needed
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Start Your Income
              <br />
              <span className="shimmer-text">Journey Today</span>
            </h2>

            <p className="text-white/60 text-xl mb-10 max-w-2xl mx-auto">
              Every day you wait is money left on the table.
              VaultFlow is running 24/7 — your income starts the moment you join.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/dashboard"
                className="group flex items-center justify-center gap-2 px-10 py-5 bg-gold-gradient rounded-2xl text-black font-black text-lg hover:opacity-90 transition-all glow-gold"
              >
                <Zap size={22} className="fill-black" />
                Launch VaultFlow FREE
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/membership"
                className="flex items-center justify-center gap-2 px-10 py-5 glass rounded-2xl text-white font-bold text-lg hover:bg-white/10 transition-all border border-white/20"
              >
                View Premium Plans
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 text-white/40 text-sm flex-wrap">
              <div className="flex items-center gap-1"><Shield size={14} /> 30-day money back</div>
              <div className="flex items-center gap-1">✓ No credit card for free tier</div>
              <div className="flex items-center gap-1">✓ Cancel anytime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
