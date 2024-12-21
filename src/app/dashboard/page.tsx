import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Overview() {
  // This is sample data. Replace with actual data in a real application.
  const recentReceipts = [
    { id: 1, imageUrl: "/placeholder.svg?height=100&width=75" },
    { id: 2, imageUrl: "/placeholder.svg?height=100&width=75" },
    { id: 3, imageUrl: "/placeholder.svg?height=100&width=75" },
    { id: 4, imageUrl: "/placeholder.svg?height=100&width=75" },
  ];

  return (
    <div className="flex flex-col h-full space-y-6 ">
      <section className="flex-none h-1/3">
        <h1 className="text-3xl font-bold mb-4">Overview</h1>
        {/* Content for the top section can be added here */}
      </section>

      <section className="flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Recent Receipts</h2>
          <Button variant="ghost" asChild>
            <Link
              href="/dashboard/receipts"
              className="text-blue-600 hover:text-blue-800"
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4 md:mb-0">
          {recentReceipts.map((receipt) => (
            <Card key={receipt.id} className="overflow-hidden">
              <CardContent className="p-2">
                <Image
                  src={receipt.imageUrl}
                  alt={`Receipt ${receipt.id}`}
                  width={75}
                  height={100}
                  layout="responsive"
                  className="rounded-md"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
