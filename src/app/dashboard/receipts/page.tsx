"use client";

import React, { useState } from "react";
import { Grid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReceiptGrid from "@/components/receipt-grid";
import ReceiptModal from "@/components/receipt-modal";

export interface Receipt {
  id: string;
  imageUrl: string;
  tags: string[];
  sideNotes: string;
  date: string;
  amount: number;
}

const receipts: Receipt[] = [
  {
    id: "1",
    imageUrl: "/placeholder.svg?height=300&width=200",
    tags: ["groceries", "food"],
    sideNotes: "Weekly shopping",
    date: "2023-04-15",
    amount: 85.5,
  },
  {
    id: "2",
    imageUrl: "/placeholder.svg?height=300&width=200",
    tags: ["electronics"],
    sideNotes: "New headphones",
    date: "2023-04-10",
    amount: 199.99,
  },
  {
    id: "3",
    imageUrl: "/placeholder.svg?height=300&width=200",
    tags: ["clothing"],
    sideNotes: "Summer clothes",
    date: "2023-04-05",
    amount: 120.75,
  },
  {
    id: "4",
    imageUrl: "/placeholder.svg?height=300&width=200",
    tags: ["restaurant", "food"],
    sideNotes: "Dinner with friends",
    date: "2023-04-02",
    amount: 65.3,
  },
  {
    id: "5",
    imageUrl: "/placeholder.svg?height=300&width=200",
    tags: ["utilities"],
    sideNotes: "Electricity bill",
    date: "2023-03-28",
    amount: 95.0,
  },
  {
    id: "6",
    imageUrl: "/placeholder.svg?height=300&width=200",
    tags: ["transportation"],
    sideNotes: "Gas refill",
    date: "2023-03-25",
    amount: 40.2,
  },
];

export default function ReceiptsPage() {
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReceipts = receipts.filter(
    (receipt) =>
      receipt.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ) || receipt.sideNotes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Receipts</h1>
      <div className="flex items-center space-x-4 mb-6">
        <Input
          type="text"
          placeholder="Search receipts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" size="icon">
          <Grid className="h-4 w-4" />
        </Button>
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
  );
}
