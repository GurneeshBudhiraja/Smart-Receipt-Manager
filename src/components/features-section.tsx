"use client";
import React from "react";
import FeatureCard from "./ui/feature-card";
import { BarChart2, MessageSquare, Receipt, Tag, Upload } from "lucide-react";

function FeaturesSection() {
  return (
    <section className="p-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-4 grid-rows-3 gap-4">
          <FeatureCard
            icon={
              <Tag className="h-8 w-8 text-blue-600 absolute top-6 right-6" />
            }
            title="Automatic Categorization"
            description="AI automatically tags your expenses into categories like groceries, utilities, and more."
            className="col-span-3 row-span-1 relative "
          />
          <FeatureCard
            icon={
              <MessageSquare className="h-8 w-8 text-blue-600 absolute top-4 right-4" />
            }
            title="Smart Chatbot"
            description="Ask questions about your expenses and get instant, accurate answers."
            className="col-span-3 row-span-1 relative"
          />
          <FeatureCard
            icon={
              <BarChart2 className="h-8 w-8 text-blue-600 absolute right-6 top-5" />
            }
            title="Expense Analytics"
            description="Visualize your spending patterns with intuitive graphs and charts."
            className="col-span-2 row-span-1 relative"
          />
          <FeatureCard
            icon={<Upload className="h-8 w-8 text-blue-600 mb-2 " />}
            title="Easy Receipt Upload"
            description="Click a photo or upload your receipt. Our AI converts it to text instantly."
            className="col-span-1 col-start-4 row-start-1  row-span-2 relative"
          />
          <FeatureCard
            icon={
              <Receipt className="h-8 w-8 text-blue-600 absolute right-6 top-6" />
            }
            title="Detailed Receipt View"
            description="Review your receipts, categories, and personal notes anytime."
            className="col-span-2 row-span-1 relative"
          />
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
