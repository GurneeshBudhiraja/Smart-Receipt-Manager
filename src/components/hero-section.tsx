import { roboto_mono } from "@/app/fonts";
function HeroSection() {
  return (
    <div className={` ${roboto_mono.className} `}>
      {" "}
      <section className="py-20 text-center h-full flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mb-6 decoration-blue-500 underline-offset-4 underline decoration-wavy tracking-wider selection:bg-black selection:text-stone-50 ">
          Smart Expense
        </h1>
        <span className="text-xl text-white mb-8 font-bold relative p-3 bg-blue-500 border-black rounded-sm border-2 -skew-y-1 selection:bg-black selection:text-white">
          Make managing your expenses easier than ever!
        </span>
      </section>
    </div>
  );
}

export default HeroSection;
