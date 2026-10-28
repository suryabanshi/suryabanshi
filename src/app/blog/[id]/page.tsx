import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Eye, Tag } from 'lucide-react';

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
    body: `Month one. Zero experience. $12,400 in revenue.

Here's exactly how it happened.

**Week 1: Setting Up the Machines**

I started by activating three streams simultaneously: the Digital Product Store, Affiliate Network, and Bronze Membership. The key insight is that you don't need to master one before starting another — the platform handles the infrastructure.

Day 1 revenue: $0. That's fine. You're planting seeds.

**Week 2: First Sales**

The AI Prompt Pack sold first. Then a Dropshipping Blueprint. Affiliate commissions started trickling in as I shared my links with my Twitter following of 1,200 people.

Total by end of Week 2: $840.

**Week 3: Compounding Begins**

This is where the math gets interesting. Each affiliate sale generates a commission AND brings a new potential member. I upgraded to Gold and unlocked the done-for-you funnels.

Revenue jumped to $3,200 for the week alone.

**Week 4: The Snowball**

With funnels running and affiliate links embedded in three blog posts, revenue ran on autopilot. I added a newsletter that hit 400 subscribers.

Final month total: $12,400 across all 5 streams.

**The Breakdown**

- Digital products: $4,100 (33%)
- Memberships: $3,480 (28%)
- Affiliate commissions: $2,720 (22%)
- SaaS tools: $1,240 (10%)
- Content/newsletter: $860 (7%)

The lesson: diversification is not just a safety net. It's a growth engine.`,
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
    body: `Paid ads are optional. Here are the 5 products that find buyers on their own.

**1. Template Packs**

People search for templates constantly — Canva templates, Notion templates, Excel templates. A pack of 50 social media templates can rank on Google, Pinterest, and Etsy with zero ad spend.

**2. Checklists and SOPs**

"New employee onboarding checklist," "podcast launch checklist" — these are high-intent searches with buyers ready to pay immediately. Price them at $19–$49.

**3. Swipe Files**

Email swipe files, copywriting swipe files, sales script swipe files. These rank because they match exact search queries from professionals.

**4. Mini-Courses on Specific Skills**

Not "learn marketing" — too broad. "Set up Facebook Pixel in 30 minutes" — that's specific enough to rank and convert.

**5. AI Prompt Packs**

The fastest-growing category. People search for "ChatGPT prompts for [niche]" millions of times per day. A targeted pack dominates with one SEO-optimized landing page.

**The SEO strategy for each:**

1. Find a long-tail keyword with 500–5,000 monthly searches
2. Name your product to match that keyword exactly
3. Write a 600-word sales page using the keyword 8–10 times
4. Build 5–10 backlinks from relevant blogs

That's it. No ads required.`,
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
    body: `Let's run the numbers. No fluff — just math.

**The Basic Formula**

Clicks × Conversion Rate × Product Price × Commission Rate = Monthly Earnings

**Example: 500 clicks per month**

- 500 clicks
- 4% conversion rate = 20 sales
- Average product price: $97
- Commission rate: 40%
- Monthly earnings: 20 × $97 × 0.40 = **$776**

Not bad. But let's optimize.

**Lever 1: Traffic Quality Over Quantity**

500 targeted clicks from a niche blog beats 5,000 random clicks every time. A reader of a dropshipping blog who clicks a Dropshipping Blueprint link converts at 8–12%, not 4%.

With 8% conversion: 500 × 0.08 × $97 × 0.40 = **$1,552/month**

**Lever 2: Promote Higher-Ticket Products**

The Platinum Membership at $299 with a 50% commission pays $149.50 per sale. At the same 4% conversion on 500 clicks: **$2,990/month**.

**Lever 3: Stack Commissions**

Promote 3 products with the same link. Buyers often purchase multiple items. Average cart size for VaultFlow customers: $187. Commission on $187 at 40%: **$74.80 per referral**.

**The Real Numbers for Top Affiliates**

Top performers hit $8,000–$18,000/month by combining all three levers: quality traffic, premium products, and stacked commissions. The cookie window is 90 days, so a click today earns you money 89 days from now.`,
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
    body: `Newsletters compound. Here's the 90-day playbook.

**Days 1–30: Build the Foundation**

Pick one niche. Not "business" — pick "e-commerce for fitness brands" or "SaaS growth for solo founders." Specificity drives referrals.

Set up Beehiiv (free). Write 4 issues. Use this formula for each:
- 1 insight from the week
- 1 tool recommendation (affiliate link)
- 1 framework or template (free value)
- 1 product mention (subtle, not salesy)

Growth hack: Post a thread on Twitter/X summarizing your best insight. End with "Get the full breakdown + template — link in bio." 30% of profile visitors will subscribe.

**Days 31–60: Distribution Systems**

Launch a referral program (Beehiiv has this built in). Give subscribers a unique share link. Reward 3 referrals with a free template pack. This creates viral loops.

Submit to newsletters directories: Substack discovery, Feedspot, Newsletter Crew. Free distribution to readers actively looking for newsletters.

Target: 2,000 subscribers by day 60.

**Days 61–90: Monetization**

With 2,000+ engaged subscribers, you have:

- Sponsor revenue: $50 CPM = $100/issue. Two sponsors = $200/issue. 8 issues/month = $1,600.
- Affiliate revenue: 2% click-through on 2,000 readers = 40 clicks/issue. 4% conversion × $97 product × 40% commission = $62/issue. $496/month.
- Product drops: Launch a $29 template pack to your list. 2% buy rate on 2,000 = 40 sales. $1,160 in one email.

Total: $3,256/month by day 90.`,
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
    body: `One sale. Twelve payments. That's the membership model.

**The Math That Changes Everything**

A $97 digital product sale generates $97. Once.

A $79/month Silver membership generates $948/year — from the same acquisition cost.

If you convert 100 customers to memberships instead of one-time products, the difference is $89,700/year vs. $9,700/year. Same traffic. Same effort. 9x the revenue.

**Why Members Stay**

The #1 driver of retention is perceived value delivered regularly. Members don't cancel when they consistently receive:

1. New content or products each month
2. A community that creates social accountability
3. Access to tools that would be inconvenient to rebuild elsewhere

VaultFlow Gold delivers all three: a new product each week, a Discord community, and an analytics dashboard you'd have to pay $50/month elsewhere to replicate.

**Stacking Membership Tiers**

The upgrade path is where the real money lives. A Bronze member at $29/month becomes a Gold member at $149/month when they see the ROI.

Average upgrade timeline: 47 days after joining Bronze.

Average LTV of a member who upgrades: $2,847 over 18 months.

**Building to 100 Members**

Month 1: 10 members from your existing audience
Month 2: 22 members (referrals + content)
Month 3: 41 members (affiliate program kicks in)
Month 6: 100+ members

At 100 Gold members: $14,900/month in pure recurring revenue. That's the compounding power of memberships.`,
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
    body: `Linear income grows by addition. Compound income grows by multiplication.

**The Single Stream Trap**

If you earn $2,000/month from freelancing, adding $500 takes active work. Add another $500 and the ceiling becomes your time. Growth is arithmetic.

**The Five-Stream Model**

Each VaultFlow stream feeds the others:

- A blog post (content) attracts a reader
- The reader buys a product (store)
- They join the membership (recurring revenue)
- They share their affiliate link (affiliate)
- They use the tools dashboard (SaaS)

One acquisition event generates five revenue events. That's a multiplier, not an adder.

**The Compounding Math**

Month 1: $1,200 total (all 5 streams small)
Month 3: $3,800 (membership base growing, affiliates activating)
Month 6: $8,400 (affiliate network reaches critical mass)
Month 12: $18,000+ (all streams self-reinforcing)

The growth rate accelerates because each stream amplifies the others. A new product sale → membership upsell → affiliate who promotes the product → blog post that ranks for the product keyword.

**The Inflection Point**

Most multi-stream operators hit an inflection point around month 4–6. This is when passive revenue exceeds active time investment.

Before inflection: you earn $X per hour worked.
After inflection: you earn $X per hour whether you work or not.

That's not passive income as a concept — it's passive income as a mathematical reality of compounded systems.`,
  },
];

export function generateStaticParams() {
  return POSTS.map(p => ({ id: String(p.id) }));
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const post = POSTS.find(p => p.id === Number(params.id));
  if (!post) notFound();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        <div className={`rounded-3xl overflow-hidden bg-gradient-to-br ${post.gradient} border border-white/10 mb-10`}>
          <div className="p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold glass px-3 py-1 rounded-full text-white/70 flex items-center gap-1">
                <Tag size={10} /> {post.category}
              </span>
              <span className="text-xs text-white/40 flex items-center gap-1"><Clock size={10} /> {post.readTime} read</span>
              <span className="text-xs text-white/40 flex items-center gap-1"><Eye size={10} /> {post.views} views</span>
            </div>
            <div className="text-6xl mb-5">{post.emoji}</div>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">{post.title}</h1>
            <p className="text-white/50 mt-4 text-lg">{post.date}</p>
          </div>
        </div>

        <article className="glass rounded-2xl p-8 md:p-10 border border-white/5 prose prose-invert max-w-none">
          {post.body.split('\n\n').map((para, i) => {
            if (para.startsWith('**') && para.endsWith('**') && !para.slice(2, -2).includes('**')) {
              return <h2 key={i} className="text-xl font-black text-white mt-8 mb-3">{para.slice(2, -2)}</h2>;
            }
            const html = para
              .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
              .replace(/\n/g, '<br />');
            return <p key={i} className="text-white/70 leading-relaxed mb-5" dangerouslySetInnerHTML={{ __html: html }} />;
          })}
        </article>

        <div className="mt-8 glass rounded-2xl p-6 border border-brand-700/30 text-center">
          <p className="text-white/50 mb-4">Ready to put this into action?</p>
          <Link
            href="/store"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-700 hover:bg-brand-600 rounded-xl font-bold transition-all"
          >
            Browse the Store
          </Link>
        </div>
      </div>
    </div>
  );
}
