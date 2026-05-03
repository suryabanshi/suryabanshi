import { HeroSection } from '@/components/home/HeroSection';
import { IncomeStreams } from '@/components/home/IncomeStreams';
import { RevenueStats } from '@/components/home/RevenueStats';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { MembershipPreview } from '@/components/home/MembershipPreview';
import { AffiliatePreview } from '@/components/home/AffiliatePreview';
import { GrowthChart } from '@/components/home/GrowthChart';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <div className="pt-16">
      <HeroSection />
      <RevenueStats />
      <IncomeStreams />
      <FeaturedProducts />
      <MembershipPreview />
      <GrowthChart />
      <AffiliatePreview />
      <TestimonialsSection />
      <FinalCTA />
    </div>
  );
}
