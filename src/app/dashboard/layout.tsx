import DashboardHeader from "@/components/dashboard-header";
import { Plus } from "lucide-react";
import { headers } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  return (
    <div>
      <div className="flex h-screen bg-white w-screen ">
        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            {children}
          </main>
          <div
            className={`absolute right-10 bottom-9 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-3 rounded-full cursor-pointer ${
              pathname === "/dashboard/chat" ? "hidden" : ""
            }`}
          >
            <Plus size={40} strokeWidth={3} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}
