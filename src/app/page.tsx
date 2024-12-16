import About from "@/components/About/About";
import Faqs from "@/components/FAQS/Faqs";
import Features from "@/components/Features/Features";

import HeroBanner from "@/components/HeroBanner/HeroBanner";
import LatestCampaings from "@/components/LatestCampaings/LatestCampaings";
import ReadyTo from "@/components/ReadyTo/ReadyTo";
import Testimonial from "@/components/Testimonial/Testimonial";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <HeroBanner />
      <About />
      <Features />
      <LatestCampaings />
      <Testimonial />
      <Faqs />
      <ReadyTo />
    </div>
  );
}
