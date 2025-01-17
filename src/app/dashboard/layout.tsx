import AddReceiptForm from "@/components/add-new-receipt";
import DashboardHeader from "@/components/dashboard-header";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex h-screen bg-white w-screen ">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            {children}
          </main>
          <AddReceiptForm  />
        </div>
      </div>
    </div>
  );
}
