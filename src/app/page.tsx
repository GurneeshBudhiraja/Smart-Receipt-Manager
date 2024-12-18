import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import HomeWorking from "@/components/home-working";
import { HomeHeader } from "@/components/home-header";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
async function page() {
  const headersList = await headers();
  const isLogin = headersList.get("x-is-login") === "true" ? true : false;
  return (
    <div className="min-h-screen ">
      <HomeHeader isLogin={isLogin} className="" />
      <HeroSection />
      <FeaturesSection />
      <HomeWorking />
      <footer>
        <h2 className="text-3xl font-bold mb-6">
          Ready to Simplify Your Expense Management?
        </h2>
        <p className="text-xl mb-8">
          Join Smart Expense today and take control of your finances.
        </p>
        <Button className="bg-white text-gray-900 hover:bg-gray-100">
          Sign Up Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </footer>
    </div>
  );
}

export default page;
