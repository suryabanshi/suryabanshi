'use client';
import { useState } from 'react';
import { ShoppingBag, Search, Filter, Star, Download, Zap, TrendingUp } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';

const CATEGORIES = ['All', 'AI Tools', 'E-commerce', 'Templates', 'SEO', 'Freelancing', 'Crypto', 'Newsletter', 'Print-on-Demand', 'YouTube', 'Shopify', 'Mindset', 'Lead Gen'];

export default function StorePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [cart, setCart] = useState<string[]>([]);

  const filtered = PRODUCTS
    .filter(p => (category === 'All' || p.category === category))
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'popular')    return b.sales - a.sales;
      if (sort === 'price-asc')  return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating')     return b.rating - a.rating;
      return 0;
    });

  const addToCart = (id: string) => setCart(c => c.includes(id) ? c : [...c, id]);
  const totalRevenue = PRODUCTS.reduce((s, p) => s + p.price * p.sales, 0);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-gold-500/30">
            <TrendingUp size={14} className="text-gold-400" />
            <span className="text-sm text-white/70">
              <span className="text-gold-400 font-bold">${(totalRevenue / 1000000).toFixed(1)}M+</span> in digital products sold
            </span>
          </div>
          <h1 className="text-5xl font-black mb-4">
            Digital <span className="shimmer-text">Product Store</span>
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Instant-download products that build real income streams. No inventory. No shipping. Pure profit.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Products', value: PRODUCTS.length.toString(), color: 'text-brand-400' },
            { label: 'Total Sales', value: PRODUCTS.reduce((s,p) => s+p.sales,0).toLocaleString(), color: 'text-gold-400' },
            { label: 'Categories', value: (CATEGORIES.length - 1).toString(), color: 'text-green-400' },
          ].map(({label, value, color}) => (
            <div key={label} className="glass rounded-xl p-4 text-center border border-white/5">
              <div className={`text-2xl font-black ${color}`}>{value}</div>
              <div className="text-xs text-white/40">{label}</div>
            </div>
          ))}
        </div>

        {/* Search & filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 glass rounded-xl border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-500 bg-transparent"
            />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as typeof sort)}
            className="px-4 py-3 glass rounded-xl border border-white/10 text-white bg-transparent focus:outline-none focus:border-brand-500"
          >
            <option value="popular" className="bg-gray-900">Most Popular</option>
            <option value="price-asc" className="bg-gray-900">Price: Low to High</option>
            <option value="price-desc" className="bg-gray-900">Price: High to Low</option>
            <option value="rating" className="bg-gray-900">Highest Rated</option>
          </select>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                category === cat
                  ? 'bg-brand-700 text-white'
                  : 'glass text-white/50 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cart bar */}
        {cart.length > 0 && (
          <div className="mb-6 glass rounded-xl p-4 border border-gold-500/30 flex items-center justify-between">
            <span className="text-white font-semibold">
              🛒 {cart.length} item{cart.length > 1 ? 's' : ''} in cart —{' '}
              <span className="text-gold-400 font-black">
                ${PRODUCTS.filter(p => cart.includes(p.id)).reduce((s,p) => s+p.price, 0)}
              </span>
            </span>
            <button className="px-6 py-2 bg-gold-gradient text-black font-bold rounded-xl text-sm hover:opacity-90 transition-all">
              Checkout Now →
            </button>
          </div>
        )}

        {/* Product grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-brand-700/40 transition-all group"
            >
              <div className={`h-32 bg-gradient-to-br ${product.gradient} flex items-center justify-center relative`}>
                <span className="text-4xl group-hover:scale-110 transition-transform">{product.emoji}</span>
                {product.badge && (
                  <div className="absolute top-2 right-2 bg-gold-gradient text-black text-[10px] font-black px-2 py-0.5 rounded-full">
                    {product.badge}
                  </div>
                )}
                <div className="absolute bottom-2 left-2 text-[10px] font-bold text-white/60 glass px-2 py-0.5 rounded-full">
                  {product.category}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className={i < Math.floor(product.rating) ? 'text-gold-400 fill-gold-400' : 'text-white/20'} />
                  ))}
                  <span className="text-[10px] text-white/40 ml-1">({product.reviews.toLocaleString()})</span>
                </div>
                <h3 className="font-bold text-white text-sm mb-1 line-clamp-1">{product.title}</h3>
                <p className="text-white/40 text-xs mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center gap-2 mb-3">
                  {product.features.slice(0, 3).map(f => (
                    <span key={f} className="text-[9px] glass px-1.5 py-0.5 rounded-full text-white/50 border border-white/5 truncate max-w-[80px]">{f}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-black text-gold-400">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-white/30 line-through ml-1">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/30 flex items-center gap-0.5">
                      <Download size={9} /> {product.sales.toLocaleString()}
                    </span>
                    <button
                      onClick={() => addToCart(product.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        cart.includes(product.id)
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-brand-700 hover:bg-brand-600 text-white'
                      }`}
                    >
                      {cart.includes(product.id) ? '✓ Added' : <><Zap size={11} /> Buy</>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30">
            <ShoppingBag size={40} className="mx-auto mb-4 opacity-30" />
            <p>No products match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
