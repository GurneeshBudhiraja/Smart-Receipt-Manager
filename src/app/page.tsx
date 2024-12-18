import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import HowItWorks from "@/components/home-how-it-works";
import { HomeHeader } from "@/components/home-header";
import { headers } from "next/headers";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
async function page() {
  const headersList = await headers();
  const isLogin = headersList.get("x-is-login") === "true" ? true : false;
  return (
    <div className="min-h-screen ">
      <HomeHeader isLogin={isLogin} className="" />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            Simplify Your Expense Management with Smart Expense
          </h2>
          <p className="text-base md:text-lg mb-6 leading-relaxed">
            Take control of your finances, starting today.
          </p>
          <Link
            href={"/login"}
            className="bg-stone-50 text-gray-900 hover:bg-stone-200 py-2 px-4 rounded-md text-sm md:text-base inline-flex items-center transition-colors duration-200 ease-in-out"
          >
            Get Started
            <ArrowRight size={20} className="ml-1" />
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default page;
