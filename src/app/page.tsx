import HeroSection from "@/components/hero-section";
import { HomeHeader } from "@/components/home-header";
import { headers } from "next/headers";
async function page() {
  const headersList = await headers();
  const isLogin = headersList.get("x-is-login") === "true" ? true : false;
  return (
    <div className="min-h-screen ">
      <HomeHeader isLogin={isLogin} className="" />
      <div className="h-screen">
        <HeroSection />
      </div>
    </div>
  );
}

export default page;
