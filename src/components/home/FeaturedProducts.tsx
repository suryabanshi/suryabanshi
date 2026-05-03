import Link from 'next/link';
import { Star, Download, ArrowRight, Zap } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';

export function FeaturedProducts() {
  const featured = PRODUCTS.slice(0, 6);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest">Top Sellers</span>
            <h2 className="text-4xl font-black mt-2">
              Best-Selling <span className="text-brand-400">Products</span>
            </h2>
          </div>
          <Link href="/store" className="flex items-center gap-1 text-white/50 hover:text-white transition-colors text-sm">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((product) => (
            <div
              key={product.id}
              className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-brand-700/40 transition-all group"
            >
              <div className={`h-36 bg-gradient-to-br ${product.gradient} flex items-center justify-center relative`}>
                <span className="text-5xl">{product.emoji}</span>
                {product.badge && (
                  <div className="absolute top-3 right-3 bg-gold-gradient text-black text-xs font-bold px-2 py-1 rounded-full">
                    {product.badge}
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'text-gold-400 fill-gold-400' : 'text-white/20'} />
                  ))}
                  <span className="text-xs text-white/40 ml-1">({product.reviews})</span>
                </div>
                <h3 className="font-bold text-white mb-1">{product.title}</h3>
                <p className="text-white/50 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-gold-400">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-white/30 line-through ml-2">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/30 flex items-center gap-1">
                      <Download size={11} /> {product.sales.toLocaleString()}
                    </span>
                    <button className="flex items-center gap-1 px-4 py-2 bg-brand-700 hover:bg-brand-600 rounded-xl text-sm font-semibold transition-all group-hover:glow-purple">
                      <Zap size={13} className="fill-gold-400 text-gold-400" />
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
