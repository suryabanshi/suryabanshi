import { Star } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent via-brand-950/10 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest">Real Results</span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">
            Members Who <span className="shimmer-text">Changed Their Lives</span>
          </h2>
          <p className="text-white/50 text-lg">
            Join 14,892 people who replaced their 9-5 with VaultFlow income.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-6 border border-white/5 hover:border-brand-700/30 transition-all">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-gold-400 fill-gold-400" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 glass rounded-full flex items-center justify-center text-lg">{t.avatar}</div>
                  <div>
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-white/40">{t.handle}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-green-400 text-sm">{t.income}</div>
                  <div className="text-xs text-white/30">{t.tier}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
