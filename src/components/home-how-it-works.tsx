"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import Link from "next/link";

const steps = [
  {
    title: "Upload Receipt",
    description: "Upload or snap a photo of your receipt",
    image: "/upload_receipt.jpeg",
  },
  {
    title: "AI Processing",
    description: "AI converts the image to text and categorizes the expense",
    image: "/ai_processing.jpeg",
  },
  {
    title: "Add Notes",
    description: "Add optional notes, like splitting costs with friends",
    image: "/add_notes.jpeg",
  },
  {
    title: "Save and Access",
    description: "Save and access your organized expenses anytime",
    image: "/save_access.jpeg",
  },
  {
    title: "Query with Chatbot",
    description: "Use the chatbot to query your expense data effortlessly",
    image: "/query_chatbot.jpeg",
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative bg-gray-50" ref={containerRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          How It Works
        </h2>
        <div className="space-y-32 md:space-y-64 mb-96">
          {steps.map((step, index) => (
            <StepContent
              key={index}
              step={step}
              index={index}
              progress={scrollYProgress}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
      <Footer progress={scrollYProgress} />
      <ScrollIndicator progress={scrollYProgress} />
    </section>
  );
}

interface StepContentProps {
  step: {
    title: string;
    description: string;
    image: string;
  };
  index: number;
  progress: MotionValue<number>;
  isLast: boolean;
}

function StepContent({ step, index, progress, isLast }: StepContentProps) {
  const yOffset = useTransform(
    progress,
    [index / steps.length, (index + 1) / steps.length],
    [100, 0]
  );
  const opacity = useTransform(
    progress,
    [
      index / steps.length,
      (index + 0.3) / steps.length,
      (index + 0.8) / steps.length,
      (index + 1) / steps.length,
    ],
    [0, 1, 1, isLast ? 1 : 0]
  );

  return (
    <motion.div
      style={{ opacity, y: yOffset }}
      className={`flex flex-col md:flex-row items-center justify-between gap-8 ${
        index === 0 ? "mt-4" : ""
      }`}
    >
      <div className="w-full md:w-1/2 relative aspect-video">
        <Image
          src={step.image}
          alt={step.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="w-full md:w-1/2 space-y-4">
        <h3 className="text-2xl md:text-3xl font-semibold">{step.title}</h3>
        <p className="text-lg text-gray-600">{step.description}</p>
      </div>
    </motion.div>
  );
}

// Home page footer
function Footer({ progress }: { progress: MotionValue<number> }) {
  const footerY = useTransform(progress, [0.85, 1], ["100%", "0%"]);
  const footerScale = useTransform(progress, [0.85, 1], [0.9, 1]);
  const footerOpacity = useTransform(progress, [0.85, 1], [0, 1]);

  return (
    <motion.footer
      className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-3xl"
      style={{ y: footerY, scale: footerScale, opacity: footerOpacity }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h3 className="text-2xl font-bold text-center mb-4">Ready to Start?</h3>
        <p className="text-center text-gray-600 mb-6">
          Begin your journey to smarter expense management today.
        </p>
        <div className="flex justify-center">
          <Link href={"/login"}>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
