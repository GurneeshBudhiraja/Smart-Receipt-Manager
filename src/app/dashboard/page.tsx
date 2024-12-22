"use client";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Overview() {
  const [recentReceipts, setRecentReceipt] = useState<
    { id: string; imageUrl: string }[]
  >([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (recentReceipts.length === 0) {
      // getRecentReceipts();
    }
  }, []);
  async function getRecentReceipts() {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/storage/receipts/images/");
      const { image_ids } = data;

      const fourImageIds = image_ids.splice(0, 4);
      const base64ImagesPromises = fourImageIds.map((image: string) => {
        return axios.get(`/api/v1/storage/image/${image}`);
      });

      const base64Images = await Promise.all(base64ImagesPromises);
      const base64ImageURLs = base64Images.map((image) => {
        return image.data;
      });
      const recentReceiptsArray = base64ImageURLs.map((imageObj, index) => {
        return {
          id: String(index),
          imageUrl: `data:${imageObj.contentType};base64,${imageObj.data}`,
        };
      });
      setRecentReceipt(recentReceiptsArray);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching recent receipts");
      }
      setRecentReceipt([]);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col h-full space-y-6 ">
      <section className="flex-none h-1/3">
        <h1 className="text-3xl font-bold mb-4">Overview</h1>
        {/* Content for the top section can be added here */}
      </section>

      <section className="flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Recent Receipts</h2>
          <Button variant="ghost" asChild disabled={loading}>
            <Link
              href="/dashboard/receipts"
              className="text-blue-600 hover:text-blue-800"
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <LoadingIndicator />
        ) : recentReceipts.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4 md:mb-0">
            {recentReceipts.map((receipt) => (
              <Card key={receipt.id} className="overflow-hidden p-4 shadow-lg">
                <CardContent className=" relative aspect-[3/4] ">
                  <Image
                    loading="lazy"
                    src={receipt.imageUrl}
                    alt={`Receipt ${receipt.id}`}
                    layout="fill"
                    objectPosition="center"
                    objectFit="cover"
                    className="rounded-sm"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-gray-50 border-dashed border-gray-300 rounded-lg mx-auto mb-4 md:mb-0">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Receipt className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Recent Receipts
              </h3>
              <p className="text-gray-500 text-center max-w-xs mx-auto">
                You haven&apos;t added any receipts yet. Start by adding your
                first receipt to track your expenses.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}

function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className=" h-16 w-16 rounded-full drop-shadow-lg animate-spin   border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
