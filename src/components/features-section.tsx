import FeatureCard from "./ui/feature-card";
import { BarChart2, MessageSquare, Receipt, Tag, Upload } from "lucide-react";

function FeaturesSection() {
  return (
    <section className="py-4 px-2 md:p-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-4">
          <FeatureCard
            icon={
              <Tag className="h-5 w-5  md:h-8 md:w-8 text-blue-600   md:absolute top-4 right-4 " />
            }
            title="Automatic Categorization"
            description="AI automatically tags your expenses into categories like groceries, utilities, and more."
            className="col-start-1 col-span-2  md:col-start-1  md:col-span-2 md:row-span-1 relative text-center md:text-left"
          />
          <FeatureCard
            icon={
              <MessageSquare className="h-8 w-8 text-blue-600 md:absolute top-4 right-4" />
            }
            title="Smart Chatbot"
            description="Ask questions about your expenses and get instant, accurate answers."
            className=" md:col-start-3 md:col-span-2 relative text-center  md:text-left"
          />
          <FeatureCard
            icon={
              <BarChart2 className="h-8 w-8 text-blue-600 mb-2 md:absolute right-6 top-5" />
            }
            title="Expense Analytics"
            description="Visualize your spending patterns with intuitive graphs and charts."
            className="text-center md:text-left col-span-1 col-start-1 row-start-1  row-span-1  md:col-span-2 md:row-span-1 relative"
          />
          <FeatureCard
            icon={<Upload className="h-8 w-8 text-blue-600 mb-2 " />}
            title="Easy Receipt Upload"
            description="Click a photo or upload your receipt. Our AI converts it to text instantly."
            className="text-center md:text-left col-span-1 col-start-2  md:col-start-3 md:col-span-2 row-start-1 row-span-1 md:row-start-2  md:row-span-4 relative"
          />
          <FeatureCard
            icon={
              <Receipt className="h-8 w-8 text-blue-600 md:absolute right-4 top-4" />
            }
            title="Detailed Receipt View"
            description="Review your receipts, categories, and personal notes anytime."
            className="text-center md:text-left  md:col-span-2 md:row-span-3 relative"
          />
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
