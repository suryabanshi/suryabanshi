'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { generateRevenueData } from '@/lib/data';

const DATA = generateRevenueData();

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl p-4 border border-white/10 text-sm">
      <p className="font-bold text-white mb-2">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="capitalize">
          {p.name}: <strong>${p.value.toLocaleString()}</strong>
        </p>
      ))}
      <p className="text-white font-bold border-t border-white/10 mt-2 pt-2">
        Total: ${payload.reduce((s: number, p: any) => s + p.value, 0).toLocaleString()}
      </p>
    </div>
  );
};

export function GrowthChart() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent via-brand-950/10 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-green-400 font-semibold text-sm uppercase tracking-widest">Compounding Growth</span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">
            Watch Your Income <span className="text-green-400">Compound</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Real member income growth over 12 months — all 4 streams compounding together.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 border border-white/5">
          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { color: '#7c3aed', label: 'Digital Products' },
              { color: '#f59e0b', label: 'Memberships' },
              { color: '#10b981', label: 'Affiliate' },
              { color: '#3b82f6', label: 'SaaS Tools' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                <span className="text-xs text-white/60">{label}</span>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                {[
                  { id: 'products',   color: '#7c3aed' },
                  { id: 'membership', color: '#f59e0b' },
                  { id: 'affiliate',  color: '#10b981' },
                  { id: 'tools',      color: '#3b82f6' },
                ].map(({ id, color }) => (
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={color} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.05} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="products"   stroke="#7c3aed" fill="url(#products)"   strokeWidth={2} name="Products"   />
              <Area type="monotone" dataKey="membership" stroke="#f59e0b" fill="url(#membership)" strokeWidth={2} name="Membership" />
              <Area type="monotone" dataKey="affiliate"  stroke="#10b981" fill="url(#affiliate)"  strokeWidth={2} name="Affiliate"  />
              <Area type="monotone" dataKey="tools"      stroke="#3b82f6" fill="url(#tools)"      strokeWidth={2} name="Tools"      />
            </AreaChart>
          </ResponsiveContainer>

          <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
            <div className="text-center">
              <div className="text-xs text-white/40">Month 1 Total</div>
              <div className="font-black text-white">${DATA[0].total.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-white/40">Month 6 Total</div>
              <div className="font-black text-green-400">${DATA[5].total.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-white/40">Month 12 Total</div>
              <div className="font-black text-gold-400">${DATA[11].total.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
