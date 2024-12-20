import ReceiptForm from "@/components/add-new-receipt";
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
          <ReceiptForm />
        </div>
      </div>
    </div>
  );
}
