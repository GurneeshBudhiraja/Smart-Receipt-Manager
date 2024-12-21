import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import HowItWorks from "@/components/home-how-it-works";
import { HomeHeader } from "@/components/home-header";
import { headers } from "next/headers";
import Footer from "@/components/footer";
async function page() {
  const headersList = await headers();
  const isLogin = headersList.get("x-is-login") === "true" ? true : false;
  return (
    <div className="w-full">
      <HomeHeader isLogin={isLogin} className="" />
      <HeroSection />
      <FeaturesSection />
      <Footer />
      {/* <div className="w-screen">
      <HowItWorks />
        <footer className="bg-black text-white py-12">...</footer>
      </div> */}
    </div>
  );
}

export default page;
