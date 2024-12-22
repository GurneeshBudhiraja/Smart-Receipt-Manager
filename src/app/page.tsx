import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import HowItWorks from "@/components/home-how-it-works";
import { HomeHeader } from "@/components/home-header";
import { headers } from "next/headers";
async function page() {
  const headersList = await headers();
  const isLogin = headersList.get("x-is-login") === "true" ? true : false;
  return (
    <div className="w-screen">
      <HomeHeader isLogin={isLogin} className="" />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
    </div>
  );
}

export default page;
