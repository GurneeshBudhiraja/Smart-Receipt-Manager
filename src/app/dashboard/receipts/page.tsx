"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import ReceiptGrid from "@/components/receipt-grid";
import ReceiptModal from "@/components/receipt-modal";
import axios from "axios";

export interface Receipt {
  id: string;
  imageUrl: string;
  category: string;
  sideNotes: string;
  date: string;
  amount: string;
}

export default function ReceiptsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

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
      const image_ids: string[] = response?.data?.image_ids;

      const imageDataRequests = image_ids.map((image: string) =>
        axios.get(`/api/v1/storage/receipts/data/${image}`)
      );
      type ResponseType = { data: { data: Receipt } }; // Define the response type to match the structure you're receiving

      const responses: Array<ResponseType> = await Promise.all(
        imageDataRequests
      );

      // Map over the responses and extract the data
      const filteredResponses: Receipt[] = responses.map(
        (response) => response.data?.data
      );

      setReceipts((prevReceipts) => [...prevReceipts, ...filteredResponses]);

      const base64ImagesPromises = image_ids.map((image: string) =>
        axios.get(`/api/v1/storage/image/${image}`)
      );

      const base64Images = await Promise.all(base64ImagesPromises);
      const base64ImageURLs = base64Images.map((image) => image.data);

      setReceipts((prevReceipts) => {
        const updatedReceipt = prevReceipts.map((receiptData, index) => {
          receiptData.imageUrl = `data:${base64ImageURLs[index].contentType};base64,${base64ImageURLs[index].data}`;
          return receiptData;
        });
        return updatedReceipt;
      });
    } catch (error) {
      console.log("error in getting all the receipts", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredReceipts = receipts.filter(
    (receipt) =>
      receipt.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.sideNotes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`container mx-auto px-4 py-8 `}>
      {/* loader */}
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <Loader />
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

function Loader() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className=" h-16 w-16 rounded-full drop-shadow-lg animate-spin border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
