'use client';
import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

const EVENTS = [
  '💰 Alex earned $247 from Digital Templates',
  '🚀 Maria just joined Gold Membership',
  '💎 James earned $89 affiliate commission',
  '📦 New sale: AI Prompt Pack — $49',
  '🔥 Sarah upgraded to Platinum — $199/mo',
  '💸 Michael earned $312 this hour',
  '⚡ 3 new affiliates joined the network',
  '🎯 Elena sold 5x SEO Toolkit — $245',
  '💰 David earned $178 from SaaS Tools',
  '🚀 Emma hit $1,000 milestone today',
  '💎 New member: Bitcoin Mike — Platinum',
  '📈 Total platform revenue: $847,293',
];

export function LiveTicker() {
  const doubled = [...EVENTS, ...EVENTS];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-brand-950/90 border-b border-brand-800/30 py-1.5 overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-gold-gradient px-3 py-0.5 text-black font-bold text-xs flex items-center gap-1 z-10">
          <TrendingUp size={10} />
          LIVE
        </div>
        <div className="overflow-hidden flex-1 ml-3">
          <div className="ticker-inner flex gap-16 whitespace-nowrap">
            {doubled.map((ev, i) => (
              <span key={i} className="text-xs text-white/70 font-medium">{ev}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
