'use client';
import { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { DollarSign, TrendingUp, Users, ShoppingBag, Zap, RefreshCw, ArrowUpRight, Award, Target } from 'lucide-react';
import { generateRevenueData } from '@/lib/data';

const REVENUE_DATA = generateRevenueData();

const STREAM_BREAKDOWN = [
  { name: 'Digital Products', value: 35, color: '#7c3aed', income: 2840 },
  { name: 'Memberships',      value: 28, color: '#f59e0b', income: 2270 },
  { name: 'Affiliate',        value: 22, color: '#10b981', income: 1785 },
  { name: 'SaaS Tools',       value: 15, color: '#3b82f6', income: 1215 },
];

const RECENT_TRANSACTIONS = [
  { time: '2 min ago',  desc: 'AI Prompt Pack sold',        amount: 49,  type: 'product',   flag: '+' },
  { time: '8 min ago',  desc: 'Gold Membership joined',     amount: 149, type: 'membership', flag: '+' },
  { time: '15 min ago', desc: 'Affiliate commission',       amount: 67,  type: 'affiliate',  flag: '+' },
  { time: '23 min ago', desc: 'Dropshipping Blueprint sold',amount: 97,  type: 'product',   flag: '+' },
  { time: '31 min ago', desc: 'Income Calculator Pro sub',  amount: 19,  type: 'tool',      flag: '+' },
  { time: '44 min ago', desc: 'YouTube Automation sold',    amount: 127, type: 'product',   flag: '+' },
  { time: '58 min ago', desc: 'Silver Membership joined',   amount: 79,  type: 'membership', flag: '+' },
  { time: '1h 12m ago', desc: 'SEO Toolkit sold',           amount: 79,  type: 'product',   flag: '+' },
];

const DAILY_GOALS = [
  { label: 'Products Sold',     current: 18, target: 20, color: 'bg-brand-500' },
  { label: 'New Members',       current: 3,  target: 5,  color: 'bg-gold-500' },
  { label: 'Affiliate Clicks',  current: 340, target: 500, color: 'bg-green-500' },
  { label: 'Daily Revenue',     current: 812, target: 1000, color: 'bg-blue-500' },
];

export default function DashboardPage() {
  const [liveRevenue, setLiveRevenue] = useState(8121);
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveRevenue(v => v + Math.floor(Math.random() * 80 + 10));
      setTicker(t => t + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const totalMonthly = STREAM_BREAKDOWN.reduce((s, x) => s + x.income, 0);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black">Income <span className="shimmer-text">Dashboard</span></h1>
            <p className="text-white/40 mt-1">Live view of your VaultFlow income machine</p>
          </div>
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <RefreshCw size={14} className="animate-spin" />
            Live updating
          </div>
        </div>

        {/* Hero metric */}
        <div className="relative glass rounded-3xl p-8 mb-6 border border-gold-500/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-brand-900/20" />
          <div className="relative grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="text-white/50 text-sm mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Today's Revenue — Live
              </div>
              <div className="text-6xl md:text-7xl font-black text-gold-400 text-glow">
                ${liveRevenue.toLocaleString()}
              </div>
              <div className="flex items-center gap-2 mt-3 text-green-400">
                <TrendingUp size={16} />
                <span className="text-sm">+24.8% vs yesterday · +127% vs last month</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'This Week',  value: '$' + (liveRevenue * 4.2).toLocaleString().split('.')[0], color: 'text-brand-400' },
                { label: 'This Month', value: '$' + totalMonthly.toLocaleString(), color: 'text-gold-400' },
                { label: 'Pending',    value: '$342', color: 'text-white' },
                { label: 'Withdrawn',  value: '$6,420', color: 'text-green-400' },
              ].map(({ label, value, color }) => (
                <div key={label} className="glass rounded-xl p-3 border border-white/5 text-center">
                  <div className={`font-black text-lg ${color}`}>{value}</div>
                  <div className="text-[10px] text-white/40">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: ShoppingBag, label: 'Products Sold Today', value: '18', change: '+4 vs avg', color: 'text-brand-400', bg: 'bg-brand-700/10' },
            { icon: Users,       label: 'New Members Today',  value: '3',  change: '+1 vs avg', color: 'text-gold-400',  bg: 'bg-gold-500/10' },
            { icon: Zap,         label: 'Affiliate Clicks',   value: '340', change: '+68%',     color: 'text-green-400', bg: 'bg-green-500/10' },
            { icon: Award,       label: 'Active Streams',     value: '5/5', change: 'All live', color: 'text-blue-400',  bg: 'bg-blue-500/10' },
          ].map(({ icon: Icon, label, value, change, color, bg }) => (
            <div key={label} className="glass rounded-2xl p-5 border border-white/5">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={18} className={color} />
              </div>
              <div className={`text-2xl font-black ${color} mb-0.5`}>{value}</div>
              <div className="text-sm text-white/60">{label}</div>
              <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
                <ArrowUpRight size={10} /> {change}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Revenue chart */}
          <div className="lg:col-span-2 glass rounded-2xl p-6 border border-white/5">
            <h2 className="font-black text-lg mb-5">12-Month Revenue Growth</h2>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#7c3aed" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: '#1a0a3e', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(v: any) => [`$${v.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="total" stroke="#7c3aed" fill="url(#totalGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Stream breakdown */}
          <div className="glass rounded-2xl p-6 border border-white/5">
            <h2 className="font-black text-lg mb-5">Income Breakdown</h2>
            <div className="flex justify-center mb-4">
              <PieChart width={160} height={160}>
                <Pie data={STREAM_BREAKDOWN} cx={75} cy={75} innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                  {STREAM_BREAKDOWN.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div className="space-y-2">
              {STREAM_BREAKDOWN.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                    <span className="text-white/60 truncate">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/40 text-xs">{s.value}%</span>
                    <span className="font-bold text-white">${s.income.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Recent transactions */}
          <div className="glass rounded-2xl p-6 border border-white/5">
            <h2 className="font-black text-lg mb-5">Live Transactions</h2>
            <div className="space-y-2">
              {RECENT_TRANSACTIONS.map((tx, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${i === 0 ? 'bg-green-500/10 border border-green-500/20' : 'hover:bg-white/3'}`}>
                  <div className={`w-2 h-2 rounded-full ${
                    tx.type === 'product'    ? 'bg-brand-400' :
                    tx.type === 'membership' ? 'bg-gold-400'  :
                    tx.type === 'affiliate'  ? 'bg-green-400' :
                    'bg-blue-400'
                  }`} />
                  <div className="flex-1">
                    <div className="text-sm text-white">{tx.desc}</div>
                    <div className="text-xs text-white/30">{tx.time}</div>
                  </div>
                  <div className="font-black text-green-400">+${tx.amount}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily goals */}
          <div className="glass rounded-2xl p-6 border border-white/5">
            <h2 className="font-black text-lg mb-5 flex items-center gap-2">
              <Target size={20} className="text-gold-400" />
              Daily Goals
            </h2>
            <div className="space-y-5">
              {DAILY_GOALS.map((goal) => {
                const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
                return (
                  <div key={goal.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/70">{goal.label}</span>
                      <span className="text-white font-bold">
                        {typeof goal.current === 'number' && goal.current > 100
                          ? goal.current.toLocaleString()
                          : goal.current}
                        {' '}/{' '}
                        {typeof goal.target === 'number' && goal.target > 100
                          ? goal.target.toLocaleString()
                          : goal.target}
                      </span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${goal.color} rounded-full transition-all`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="text-xs text-white/30 mt-1 text-right">{pct}% complete</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-brand-700/20 to-gold-500/10 border border-brand-500/20 text-center">
              <div className="text-xs text-white/40 mb-1">At current pace, today's projected earnings:</div>
              <div className="text-2xl font-black text-gold-400">$1,124</div>
            </div>
          </div>
        </div>

        {/* Monthly bar chart */}
        <div className="glass rounded-2xl p-6 border border-white/5">
          <h2 className="font-black text-lg mb-5">Stream Comparison (Monthly)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={REVENUE_DATA.slice(-6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: '#1a0a3e', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', fontSize: '12px' }}
                formatter={(v: any, name: string) => [`$${v.toLocaleString()}`, name]}
              />
              <Bar dataKey="products"   fill="#7c3aed" radius={[4,4,0,0]} name="Products"   />
              <Bar dataKey="membership" fill="#f59e0b" radius={[4,4,0,0]} name="Membership" />
              <Bar dataKey="affiliate"  fill="#10b981" radius={[4,4,0,0]} name="Affiliate"  />
              <Bar dataKey="tools"      fill="#3b82f6" radius={[4,4,0,0]} name="Tools"      />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
