import Image from "next/image";
import React from "react";
import Step from "./ui/step";

function HomeWorking() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
          <div className="w-full md:w-1/2">
            <Image
              src="/placeholder.svg"
              alt="Smart Expense Demo"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <Step number={1} text="Upload or snap a photo of your receipt" />
            <Step
              number={2}
              text="AI converts the image to text and categorizes the expense"
            />
            <Step
              number={3}
              text="Add optional notes, like splitting costs with friends"
            />
            <Step
              number={4}
              text="Save and access your organized expenses anytime"
            />
            <Step
              number={5}
              text="Use the chatbot to query your expense data effortlessly"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeWorking;
