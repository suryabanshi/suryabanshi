'use client';
import { useState } from 'react';
import { Copy, CheckCheck, Share2, TrendingUp, DollarSign, Users, Clock, ExternalLink } from 'lucide-react';

const LEADERBOARD = [
  { rank: 1, name: 'Marcus Williams', handle: '@mw_financial', avatar: '👨‍🏫', earned: 8420, sales: 86, tier: 'Platinum' },
  { rank: 2, name: 'James Park',      handle: '@jpark_crypto',  avatar: '🧑‍💻', earned: 6210, sales: 63, tier: 'Platinum' },
  { rank: 3, name: 'Elena Rodriguez', handle: '@elena_earns',  avatar: '👩‍💻', earned: 4980, sales: 51, tier: 'Gold' },
  { rank: 4, name: 'Tom Bradley',     handle: '@tombiz',       avatar: '👨‍💼', earned: 3740, sales: 38, tier: 'Gold' },
  { rank: 5, name: 'Priya Sharma',    handle: '@priya_s',      avatar: '👩‍🎓', earned: 2890, sales: 29, tier: 'Silver' },
  { rank: 6, name: 'Chris O\'Brien',  handle: '@chrisobmoney', avatar: '👨‍🎤', earned: 2145, sales: 22, tier: 'Silver' },
  { rank: 7, name: 'Fatima Al-Said',  handle: '@fatima_earn',  avatar: '👩‍🚀', earned: 1780, sales: 18, tier: 'Gold' },
  { rank: 8, name: 'Kevin Liu',       handle: '@kevinl_biz',   avatar: '🧑‍🎓', earned: 1340, sales: 14, tier: 'Bronze' },
];

const PRODUCTS_TO_PROMOTE = [
  { name: 'Ultimate AI Prompt Pack', price: 49,  commission: 30, emoji: '🤖', convRate: '4.2%' },
  { name: 'Dropshipping Blueprint',  price: 97,  commission: 40, emoji: '📦', convRate: '3.8%' },
  { name: 'YouTube Automation',      price: 127, commission: 45, emoji: '▶️', convRate: '3.1%' },
  { name: 'SEO Domination Toolkit',  price: 79,  commission: 35, emoji: '🔍', convRate: '4.5%' },
  { name: 'Freelance Accelerator',   price: 67,  commission: 35, emoji: '💼', convRate: '5.1%' },
  { name: 'Platinum Membership',     price: 299, commission: 50, emoji: '💎', convRate: '2.4%' },
];

export default function AffiliatePage() {
  const [copied, setCopied] = useState('');

  const copyLink = (id: string) => {
    navigator.clipboard.writeText(`https://vaultflow.io/ref/${id}`);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-green-400 font-semibold text-sm uppercase tracking-widest">Passive Income Stream</span>
          <h1 className="text-5xl font-black mt-3 mb-4">
            The VaultFlow <span className="text-green-400">Affiliate Network</span>
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Earn 30–50% on every sale you refer. One link. Lifetime commissions. Daily payouts.
          </p>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: DollarSign, label: 'Max Commission',    value: '50%',    color: 'text-green-400' },
            { icon: Clock,      label: 'Cookie Window',     value: '90 Days', color: 'text-blue-400' },
            { icon: Users,      label: 'Active Affiliates', value: '3,841',  color: 'text-brand-400' },
            { icon: TrendingUp, label: 'Avg Monthly Earn',  value: '$1,240', color: 'text-gold-400' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="glass rounded-2xl p-5 border border-white/5 text-center">
              <Icon size={22} className={`${color} mx-auto mb-2`} />
              <div className={`text-2xl font-black ${color}`}>{value}</div>
              <div className="text-xs text-white/40 mt-1">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Products to promote */}
          <div className="glass rounded-2xl p-6 border border-white/5">
            <h2 className="text-xl font-black mb-5 flex items-center gap-2">
              <Share2 size={20} className="text-green-400" />
              Top Converting Products
            </h2>
            <div className="space-y-3">
              {PRODUCTS_TO_PROMOTE.map((p) => {
                const earn = Math.round(p.price * p.commission / 100);
                return (
                  <div key={p.name} className="flex items-center gap-3 p-3 glass rounded-xl border border-white/5 hover:border-green-500/20 transition-all">
                    <span className="text-2xl">{p.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white text-sm truncate">{p.name}</div>
                      <div className="text-xs text-white/40">${p.price} • Conv: {p.convRate}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-black text-green-400">${earn}</div>
                      <div className="text-[10px] text-white/30">{p.commission}% commission</div>
                    </div>
                    <button
                      onClick={() => copyLink(p.name)}
                      className={`p-2 rounded-lg transition-all ${copied === p.name ? 'bg-green-500/20 text-green-400' : 'glass text-white/50 hover:text-white'}`}
                    >
                      {copied === p.name ? <CheckCheck size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Commission calculator */}
          <div className="glass rounded-2xl p-6 border border-white/5">
            <h2 className="text-xl font-black mb-5 flex items-center gap-2">
              <DollarSign size={20} className="text-gold-400" />
              Income Calculator
            </h2>
            <IncomeCalc />
          </div>
        </div>

        {/* Leaderboard */}
        <div className="glass rounded-2xl p-6 border border-white/5 mb-12">
          <h2 className="text-xl font-black mb-6 flex items-center gap-2">
            👑 This Month's Top Affiliates
          </h2>
          <div className="space-y-3">
            {LEADERBOARD.map((a) => (
              <div key={a.rank} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/3 transition-all">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                  a.rank === 1 ? 'bg-gold-500/30 text-gold-400' :
                  a.rank === 2 ? 'bg-slate-500/30 text-slate-300' :
                  a.rank === 3 ? 'bg-orange-700/30 text-orange-500' :
                  'bg-white/5 text-white/40'
                }`}>
                  {a.rank}
                </div>
                <span className="text-2xl">{a.avatar}</span>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">{a.name}</div>
                  <div className="text-xs text-white/40">{a.handle} · {a.tier}</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-green-400">${a.earned.toLocaleString()}</div>
                  <div className="text-xs text-white/30">{a.sales} sales</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative rounded-2xl overflow-hidden p-8 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 to-green-950/10" />
          <div className="absolute inset-0 border border-green-500/20 rounded-2xl" />
          <div className="relative">
            <h2 className="text-3xl font-black mb-3">Ready to Start Earning Commissions?</h2>
            <p className="text-white/50 mb-6">Join free and get your affiliate link in 60 seconds.</p>
            <button className="px-10 py-4 bg-green-500/20 border border-green-500/30 rounded-2xl text-green-400 font-black text-lg hover:bg-green-500/30 transition-all">
              Get My Affiliate Link →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function IncomeCalc() {
  const [clicks, setClicks] = useState(500);
  const [rate, setRate] = useState(3.5);
  const [product, setProduct] = useState(97);
  const [commission, setCommission] = useState(35);

  const sales = Math.round(clicks * rate / 100);
  const earn = Math.round(sales * product * commission / 100);

  return (
    <div className="space-y-5">
      {[
        { label: 'Monthly Link Clicks', value: clicks, setValue: setClicks, min: 100, max: 10000, step: 100 },
        { label: `Conversion Rate (${rate}%)`, value: rate, setValue: setRate, min: 0.5, max: 10, step: 0.5 },
        { label: `Product Price ($${product})`, value: product, setValue: setProduct, min: 29, max: 299, step: 10 },
        { label: `Commission Rate (${commission}%)`, value: commission, setValue: setCommission, min: 10, max: 50, step: 5 },
      ].map(({ label, value, setValue, min, max, step }) => (
        <div key={label}>
          <div className="flex justify-between text-sm text-white/60 mb-2">
            <span>{label}</span>
          </div>
          <input
            type="range"
            min={min} max={max} step={step}
            value={value}
            onChange={e => setValue(Number(e.target.value))}
            className="w-full accent-brand-500"
          />
        </div>
      ))}

      <div className="mt-6 p-5 rounded-xl bg-green-500/10 border border-green-500/20">
        <div className="text-center">
          <div className="text-sm text-white/50 mb-1">Estimated Monthly Earnings</div>
          <div className="text-4xl font-black text-green-400">${earn.toLocaleString()}</div>
          <div className="text-xs text-white/30 mt-1">{sales} sales × ${Math.round(product * commission / 100)} commission</div>
        </div>
      </div>
    </div>
  );
}
