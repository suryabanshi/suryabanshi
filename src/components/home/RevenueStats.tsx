import { BarChart2, Globe, Clock, Shield } from 'lucide-react';

const STATS = [
  {
    icon: BarChart2,
    value: '847%',
    label: 'Average ROI',
    sub: 'vs traditional businesses',
    color: 'text-gold-400',
    bg: 'bg-gold-500/10',
  },
  {
    icon: Globe,
    value: '127',
    label: 'Countries',
    sub: 'generating income globally',
    color: 'text-brand-400',
    bg: 'bg-brand-700/10',
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'Always On',
    sub: 'automated income streams',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    icon: Shield,
    value: '$0',
    label: 'Hidden Fees',
    sub: 'transparent pricing always',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
];

export function RevenueStats() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map(({ icon: Icon, value, label, sub, color, bg }) => (
          <div
            key={label}
            className="glass rounded-2xl p-6 border border-white/5 hover:border-brand-700/40 transition-all group"
          >
            <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <Icon size={22} className={color} />
            </div>
            <div className={`text-3xl font-black ${color} mb-1`}>{value}</div>
            <div className="font-semibold text-white mb-1">{label}</div>
            <div className="text-xs text-white/40">{sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
