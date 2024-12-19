"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import ReceiptGrid from "@/components/receipt-grid";
import ReceiptModal from "@/components/receipt-modal";
import axios from "axios";

export interface Receipt {
  id: string;
  imageUrl: string;
  category: string[];
  sideNotes: string;
  date: string;
  amount: string;
}

export default function ReceiptsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    getUserReceipts();

    return () => {
      setReceipts([]);
      setIsLoading(true);
      setSelectedReceipt(null);
      setSearchTerm("");
    };
  }, []);

  const getUserReceipts = async () => {
    try {
      const response = await axios.get("/api/v1/storage/receipts/images");
      const image_ids = response?.data?.image_ids;

      const imageRequests = image_ids.map((image: string) =>
        axios.get(`/api/v1/storage/receipts/${image}`)
      );

      const responses: Array<Record<string, string | Record<string, string>>> =
        await Promise.all(imageRequests);

      const filteredResponses = responses.map((response) => {
        return response.data?.data;
      });
      console.log(filteredResponses);
      setReceipts([...receipts, ...filteredResponses]);
    } catch (error) {
      console.log("error in getting all the receipts", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredReceipts = receipts.filter(
    (receipt) =>
      receipt.category.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ) || receipt.sideNotes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`container mx-auto px-4 py-8 `}>
      {/* loader */}
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  text-xl font-medium z-50 opacity-100 transition-all ease-in-out duration-200">
          Loading...
        </div>
      )}
      <div
        className={`${
          isLoading ? "opacity-25" : "opacity-100"
        } transition-opacity ease-in-out duration-200`}
      >
        <h1 className="text-3xl font-bold mb-6">Receipts</h1>
        <div className="flex items-center space-x-4 mb-6">
          <Input
            type="text"
            placeholder="Search receipts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md  focus-visible:ring-blue-600 focus-visible:ring-1 tracking-wide border-gray-400 "
            disabled={isLoading}
          />
        </div>

        <ReceiptGrid
          receipts={filteredReceipts}
          onReceiptClick={setSelectedReceipt}
        />
        {selectedReceipt && (
          <ReceiptModal
            receipt={selectedReceipt}
            onClose={() => setSelectedReceipt(null)}
          />
        )}
      </div>
    </div>
  );
}
