import DashboardHeader from "@/components/dashboard-header";
import { Plus } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("heelo");
  return (
    <div>
      <div className="flex h-screen bg-white w-screen ">
        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            {children}
          </main>
          <div className="absolute right-10 bottom-9 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-3 rounded-full cursor-pointer">
            <Plus size={40} strokeWidth={3} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}
