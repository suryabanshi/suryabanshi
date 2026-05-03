'use client';
import { useState } from 'react';
import { Wrench, Zap, Lock, DollarSign, TrendingUp, Mail, Link2, Lightbulb, Star } from 'lucide-react';
import { TOOLS } from '@/lib/data';

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<string | null>('t1');

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">SaaS Micro-Tools</span>
          <h1 className="text-5xl font-black mt-3 mb-4">
            Powerful <span className="text-blue-400">Income Tools</span>
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Free tools that drive traffic. Premium tools that drive income.
            All powered by VaultFlow's AI engine.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Tool list */}
          <div className="space-y-3">
            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`w-full p-4 rounded-xl text-left transition-all border ${
                  activeTool === tool.id
                    ? 'bg-brand-700/30 border-brand-500/50'
                    : 'glass border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tool.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm">{tool.name}</div>
                    <div className="text-xs text-white/40">{tool.category}</div>
                  </div>
                  {tool.free ? (
                    <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold">FREE</span>
                  ) : (
                    <Lock size={12} className="text-gold-400" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Active tool panel */}
          <div className="lg:col-span-2">
            {activeTool && <ToolPanel toolId={activeTool} />}
          </div>
        </div>

        {/* Usage stats */}
        <div className="mt-12 glass rounded-2xl p-6 border border-white/5">
          <h2 className="text-xl font-black mb-6">Tool Usage Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Calculations Run', value: '847K', color: 'text-blue-400' },
              { label: 'Links Tracked', value: '124K', color: 'text-brand-400' },
              { label: 'Ideas Generated', value: '52K', color: 'text-gold-400' },
              { label: 'Emails Optimized', value: '238K', color: 'text-green-400' },
            ].map(({ label, value, color }) => (
              <div key={label} className="text-center">
                <div className={`text-2xl font-black ${color}`}>{value}</div>
                <div className="text-xs text-white/40">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolPanel({ toolId }: { toolId: string }) {
  if (toolId === 't1') return <IncomeCalculatorTool />;
  if (toolId === 't2') return <ProfitMarginTool />;
  if (toolId === 't5') return <SubjectLineTool />;
  return <LockedToolPanel toolId={toolId} />;
}

function IncomeCalculatorTool() {
  const [vals, setVals] = useState({ products: 3, avgPrice: 67, memberships: 10, membershipPrice: 79, affiliateSales: 20, affiliateComm: 35 });

  const productIncome = vals.products * vals.avgPrice;
  const membershipIncome = vals.memberships * vals.membershipPrice;
  const affiliateIncome = vals.affiliateSales * (vals.affiliateComm / 100) * vals.avgPrice;
  const total = productIncome + membershipIncome + affiliateIncome;

  return (
    <div className="glass rounded-2xl p-6 border border-white/5">
      <h2 className="text-xl font-black mb-2 flex items-center gap-2">🧮 Income Calculator</h2>
      <p className="text-white/50 text-sm mb-6">Project your monthly VaultFlow income based on your goals.</p>

      <div className="space-y-5">
        {[
          { label: `Product Sales/mo: ${vals.products}`,      key: 'products',        min: 1, max: 100,  step: 1 },
          { label: `Avg Product Price: $${vals.avgPrice}`,    key: 'avgPrice',        min: 29, max: 299, step: 10 },
          { label: `New Members/mo: ${vals.memberships}`,     key: 'memberships',     min: 0, max: 100,  step: 1 },
          { label: `Membership Price: $${vals.membershipPrice}`, key: 'membershipPrice', min: 29, max: 299, step: 1 },
          { label: `Affiliate Sales: ${vals.affiliateSales}`, key: 'affiliateSales',  min: 0, max: 200,  step: 5 },
          { label: `Commission Rate: ${vals.affiliateComm}%`, key: 'affiliateComm',   min: 10, max: 50,  step: 5 },
        ].map(({ label, key, min, max, step }) => (
          <div key={key}>
            <div className="text-sm text-white/60 mb-1.5">{label}</div>
            <input
              type="range" min={min} max={max} step={step}
              value={(vals as any)[key]}
              onChange={e => setVals(v => ({ ...v, [key]: Number(e.target.value) }))}
              className="w-full accent-brand-500"
            />
          </div>
        ))}

        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="p-3 rounded-xl bg-brand-700/20 border border-brand-700/30 text-center">
            <div className="text-xs text-white/40 mb-1">Products</div>
            <div className="font-black text-brand-400">${productIncome.toLocaleString()}</div>
          </div>
          <div className="p-3 rounded-xl bg-gold-500/20 border border-gold-500/30 text-center">
            <div className="text-xs text-white/40 mb-1">Membership</div>
            <div className="font-black text-gold-400">${membershipIncome.toLocaleString()}</div>
          </div>
          <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/30 text-center">
            <div className="text-xs text-white/40 mb-1">Affiliate</div>
            <div className="font-black text-green-400">${affiliateIncome.toLocaleString()}</div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-gradient-to-r from-brand-700/20 to-gold-500/10 border border-brand-500/30 text-center">
          <div className="text-sm text-white/50 mb-1">Your Projected Monthly Income</div>
          <div className="text-5xl font-black shimmer-text">${total.toLocaleString()}</div>
          <div className="text-xs text-white/30 mt-1">${(total * 12).toLocaleString()}/year</div>
        </div>
      </div>
    </div>
  );
}

function ProfitMarginTool() {
  const [cost, setCost] = useState(10);
  const [price, setPrice] = useState(49);
  const margin = price > 0 ? ((price - cost) / price * 100).toFixed(1) : '0';
  const profit = price - cost;
  const roi = cost > 0 ? ((profit / cost) * 100).toFixed(0) : '0';

  return (
    <div className="glass rounded-2xl p-6 border border-white/5">
      <h2 className="text-xl font-black mb-2 flex items-center gap-2">📊 Profit Margin Analyzer</h2>
      <p className="text-white/50 text-sm mb-6">Instantly analyze any product's profitability.</p>

      <div className="space-y-5">
        <div>
          <label className="text-sm text-white/60 mb-2 block">Product Cost (your expense): ${cost}</label>
          <input type="range" min={0} max={200} value={cost} onChange={e => setCost(Number(e.target.value))} className="w-full accent-brand-500" />
        </div>
        <div>
          <label className="text-sm text-white/60 mb-2 block">Selling Price: ${price}</label>
          <input type="range" min={10} max={500} value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full accent-brand-500" />
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="p-4 glass rounded-xl border border-white/5 text-center">
            <div className="text-xs text-white/40 mb-1">Profit</div>
            <div className={`font-black text-xl ${profit > 0 ? 'text-green-400' : 'text-red-400'}`}>${profit}</div>
          </div>
          <div className="p-4 glass rounded-xl border border-white/5 text-center">
            <div className="text-xs text-white/40 mb-1">Margin</div>
            <div className={`font-black text-xl ${Number(margin) > 50 ? 'text-green-400' : Number(margin) > 20 ? 'text-gold-400' : 'text-red-400'}`}>{margin}%</div>
          </div>
          <div className="p-4 glass rounded-xl border border-white/5 text-center">
            <div className="text-xs text-white/40 mb-1">ROI</div>
            <div className={`font-black text-xl text-brand-400`}>{roi}%</div>
          </div>
        </div>

        <div className={`p-4 rounded-xl text-center ${Number(margin) > 70 ? 'bg-green-500/10 border border-green-500/20' : Number(margin) > 40 ? 'bg-gold-500/10 border border-gold-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
          <div className="font-bold text-white">
            {Number(margin) > 70 ? '🚀 Excellent margin! Highly profitable.' : Number(margin) > 40 ? '✅ Good margin. Room to improve.' : '⚠️ Low margin. Consider increasing price.'}
          </div>
        </div>
      </div>
    </div>
  );
}

function SubjectLineTool() {
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState<number | null>(null);

  const analyze = () => {
    if (!subject.trim()) return;
    let s = 50;
    if (subject.length >= 30 && subject.length <= 50) s += 15;
    if (/\d/.test(subject)) s += 10;
    if (/\?/.test(subject)) s += 8;
    if (/free|secret|proven|insider/i.test(subject)) s += 12;
    if (/limited|urgent|today|now/i.test(subject)) s += 10;
    if (subject === subject.toUpperCase()) s -= 20;
    setScore(Math.min(100, Math.max(10, s)));
  };

  return (
    <div className="glass rounded-2xl p-6 border border-white/5">
      <h2 className="text-xl font-black mb-2">📧 Email Subject Line Tester</h2>
      <p className="text-white/50 text-sm mb-6">Score your subject line for maximum open rates.</p>

      <textarea
        value={subject}
        onChange={e => setSubject(e.target.value)}
        placeholder="Enter your email subject line here..."
        rows={3}
        className="w-full p-4 glass rounded-xl border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-500 bg-transparent resize-none mb-4"
      />
      <button onClick={analyze} className="w-full py-3 bg-brand-700 hover:bg-brand-600 rounded-xl font-bold transition-all mb-5">
        Analyze Subject Line
      </button>

      {score !== null && (
        <div className="space-y-4">
          <div className="text-center p-5 rounded-xl glass border border-white/10">
            <div className="text-xs text-white/50 mb-2">Open Rate Score</div>
            <div className={`text-6xl font-black ${score >= 80 ? 'text-green-400' : score >= 60 ? 'text-gold-400' : 'text-red-400'}`}>
              {score}/100
            </div>
            <div className="mt-2 text-white/50 text-sm">
              {score >= 80 ? '🔥 Excellent! High open rate expected.' : score >= 60 ? '✅ Good. A few tweaks could boost it.' : '⚠️ Needs work. Try the tips below.'}
            </div>
          </div>
          <div className="space-y-2 text-sm">
            {[
              { tip: 'Keep it 30–50 characters', ok: subject.length >= 30 && subject.length <= 50 },
              { tip: 'Include a number', ok: /\d/.test(subject) },
              { tip: 'Add curiosity (question mark)', ok: /\?/.test(subject) },
              { tip: 'Use power words', ok: /free|secret|proven|insider/i.test(subject) },
              { tip: 'No ALL CAPS', ok: subject !== subject.toUpperCase() || subject.length === 0 },
            ].map(({ tip, ok }) => (
              <div key={tip} className="flex items-center gap-2">
                <span className={ok ? 'text-green-400' : 'text-white/30'}>{ok ? '✓' : '○'}</span>
                <span className={ok ? 'text-white/70' : 'text-white/30'}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LockedToolPanel({ toolId }: { toolId: string }) {
  const tool = TOOLS.find(t => t.id === toolId);
  return (
    <div className="glass rounded-2xl p-10 border border-white/5 text-center">
      <Lock size={40} className="text-gold-400 mx-auto mb-4" />
      <h2 className="text-xl font-black mb-2">{tool?.name}</h2>
      <p className="text-white/50 mb-6">{tool?.description}</p>
      <p className="text-white/40 text-sm mb-6">This tool is available for Silver tier members and above.</p>
      <a href="/membership" className="inline-flex items-center gap-2 px-8 py-3 bg-gold-gradient text-black font-bold rounded-xl hover:opacity-90 transition-all">
        <Zap size={16} className="fill-black" /> Upgrade to Unlock
      </a>
    </div>
  );
}
