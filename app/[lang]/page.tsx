import Features from "@/app/components/features";
import FeaturesBlocks from "@/app/components/features-blocks";
import Hero from "@/app/components/hero";
import Newsletter from "@/app/components/newsletter";
import Testimonials from "@/app/components/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturesBlocks />
      <Testimonials />
      <Newsletter />
    </>
  );
}
