"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top, height } = sectionRef.current.getBoundingClientRect();
        const totalScrollRange = height - window.innerHeight;
        const scrollProgress = Math.max(
          0,
          Math.min(1, -top / totalScrollRange)
        );
        const stepIndex = Math.min(
          steps.length - 1,
          Math.floor(scrollProgress * steps.length)
        );
        setActiveStep(stepIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[500vh]">
      <h2 className="text-3xl md:text-4xl font-bold text-center  ">
        How It Works
      </h2>
      <div className="sticky top-0 h-screen flex items-center justify-center px-24">
        <div className="w-screen flex items-center justify-center">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: index === activeStep ? 1 : 0,
                x: index === activeStep ? 0 : -50,
              }}
              transition={{ duration: 0.5 }}
              className={`absolute`}
            >
              <Image
                src={step.image}
                alt={step.title}
                width={500}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          ))}
        </div>

        {/* Right Section: Text */}
        <div className="w-full ">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: index === activeStep ? 1 : 0,
                x: index === activeStep ? 0 : 50,
              }}
              transition={{ duration: 0.5 }}
              className={`absolute ml-5`}
            >
              <h3 className="text-3xl font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="text-lg text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
