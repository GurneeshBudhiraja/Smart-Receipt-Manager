import { roboto_mono } from "@/app/fonts";

function HeroSection() {
  return (
    <div className={`${roboto_mono.className}`}>
      <section className="py-10 sm:py-16 md:py-20 text-center min-h-[50vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 decoration-blue-500 underline-offset-4 underline decoration-wavy tracking-wide sm:tracking-wider selection:bg-black selection:text-stone-50">
          Smart Expense
        </h1>
        <span className="text-lg sm:text-xl text-white mb-6 sm:mb-8 font-bold relative p-2 sm:p-3 bg-blue-500 border-black rounded-sm border-2 -skew-y-1 selection:bg-black selection:text-white inline-block">
          Make managing your expenses easier than ever!
        </span>
      </section>
    </div>
  );
}

export default HeroSection;
