import Link from 'next/link';
import { FileText, Clock, Eye, TrendingUp, ArrowRight, Tag } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    title: 'How I Made $12,400 in My First Month with VaultFlow',
    excerpt: 'A step-by-step breakdown of every income stream I activated and exactly how much each made in day 1 to day 30.',
    category: 'Case Study',
    readTime: '8 min',
    views: '24.2K',
    date: 'May 1, 2026',
    emoji: '💰',
    gradient: 'from-gold-900/50 to-amber-950/30',
    featured: true,
  },
  {
    id: 2,
    title: 'The 5 Digital Products That Sell Themselves (With Zero Ad Spend)',
    excerpt: 'Organic discovery + smart SEO = passive sales. Here are the 5 product types that consistently sell without paid traffic.',
    category: 'Strategy',
    readTime: '6 min',
    views: '18.7K',
    date: 'Apr 28, 2026',
    emoji: '📦',
    gradient: 'from-brand-900/50 to-purple-950/30',
    featured: false,
  },
  {
    id: 3,
    title: 'Affiliate Marketing Math: How 500 Clicks Becomes $2,000',
    excerpt: 'The exact funnel mathematics behind affiliate income. Conversion rates, average order values, and commission stacking explained.',
    category: 'Affiliate',
    readTime: '5 min',
    views: '15.3K',
    date: 'Apr 24, 2026',
    emoji: '🔗',
    gradient: 'from-green-900/50 to-emerald-950/30',
    featured: false,
  },
  {
    id: 4,
    title: 'Build a $3K/Mo Newsletter in 90 Days (Full Playbook)',
    excerpt: 'From 0 to 10,000 subscribers using just Twitter/X and SEO. Then monetize with sponsors, affiliate links, and product drops.',
    category: 'Newsletter',
    readTime: '11 min',
    views: '31.9K',
    date: 'Apr 20, 2026',
    emoji: '📧',
    gradient: 'from-cyan-900/50 to-teal-950/30',
    featured: false,
  },
  {
    id: 5,
    title: 'Why Memberships Are the Most Powerful Income Stream',
    excerpt: 'Recurring revenue compounds. A $79/month member is worth $948/year. Here\'s how to stack 100+ of them.',
    category: 'Membership',
    readTime: '7 min',
    views: '12.4K',
    date: 'Apr 16, 2026',
    emoji: '💎',
    gradient: 'from-brand-900/50 to-indigo-950/30',
    featured: false,
  },
  {
    id: 6,
    title: 'The Compound Effect: How 5 Income Streams Become Exponential',
    excerpt: 'One stream is linear. Five streams compound. The math behind why multi-stream income grows 10x faster than single-source.',
    category: 'Strategy',
    readTime: '9 min',
    views: '28.1K',
    date: 'Apr 12, 2026',
    emoji: '📈',
    gradient: 'from-orange-900/50 to-red-950/30',
    featured: false,
  },
];

const CATEGORIES = ['All', 'Case Study', 'Strategy', 'Affiliate', 'Newsletter', 'Membership', 'Tools'];

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-pink-400 font-semibold text-sm uppercase tracking-widest">Content Hub</span>
          <h1 className="text-5xl font-black mt-3 mb-4">
            The VaultFlow <span className="text-pink-400">Intelligence</span>
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Real strategies, real results. Learn exactly how top earners build and scale their income machines.
          </p>
        </div>

        {/* Featured post */}
        <div className={`relative rounded-3xl overflow-hidden mb-10 bg-gradient-to-br ${featured.gradient} border border-white/10`}>
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative p-10 md:p-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold bg-gold-gradient text-black px-3 py-1 rounded-full">{featured.category}</span>
              <span className="text-xs text-white/40 flex items-center gap-1"><Clock size={11} /> {featured.readTime}</span>
              <span className="text-xs text-white/40 flex items-center gap-1"><Eye size={11} /> {featured.views} views</span>
            </div>
            <div className="text-5xl mb-5">{featured.emoji}</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 max-w-3xl">{featured.title}</h2>
            <p className="text-white/60 text-lg mb-6 max-w-2xl">{featured.excerpt}</p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-gold-gradient text-black font-bold rounded-xl hover:opacity-90 transition-all">
                Read Article <ArrowRight size={16} />
              </button>
              <span className="text-white/30 text-sm">{featured.date}</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                cat === 'All' ? 'bg-brand-700 text-white' : 'glass text-white/50 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Post grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {rest.map((post) => (
            <div key={post.id} className={`group rounded-2xl overflow-hidden bg-gradient-to-br ${post.gradient} border border-white/10 hover:border-white/20 transition-all`}>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold glass px-2 py-1 rounded-full text-white/60">{post.category}</span>
                  <span className="text-xs text-white/30">{post.readTime}</span>
                </div>
                <div className="text-3xl mb-3">{post.emoji}</div>
                <h3 className="font-black text-white mb-3 group-hover:text-gold-400 transition-colors">{post.title}</h3>
                <p className="text-white/50 text-sm mb-5 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/30">{post.date}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/30 flex items-center gap-1"><Eye size={10} /> {post.views}</span>
                    <button className="text-xs text-white/50 hover:text-white flex items-center gap-1 transition-colors">
                      Read <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="glass rounded-2xl p-8 border border-brand-700/30 text-center">
          <div className="text-4xl mb-4">📬</div>
          <h2 className="text-2xl font-black mb-3">Get Weekly Income Strategies</h2>
          <p className="text-white/50 mb-6">Join 24,000+ subscribers getting actionable income tactics every Tuesday.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 glass rounded-xl border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-500 bg-transparent"
            />
            <button className="px-6 py-3 bg-brand-700 hover:bg-brand-600 rounded-xl font-bold transition-all whitespace-nowrap">
              Subscribe Free
            </button>
          </div>
          <p className="text-xs text-white/20 mt-3">No spam. Unsubscribe anytime. 24,000+ readers.</p>
        </div>
      </div>
    </div>
  );
}
