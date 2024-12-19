import React from "react";
import Image from "next/image";
import type { Receipt } from "@/app/dashboard/receipts/page";

interface ReceiptGridProps {
  receipts: Receipt[];
  onReceiptClick: (receipt: Receipt) => void;
}

export default function ReceiptGrid({
  receipts,
  onReceiptClick,
}: ReceiptGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {receipts.map((receipt) => (
        <div
          key={receipt.id}
          className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
          onClick={() => onReceiptClick(receipt)}
        >
          <Image
            src={receipt.imageUrl}
            alt={`Receipt ${receipt.id}`}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
            <p className="text-sm font-semibold">{receipt.date}</p>
            <p className="text-xs">${receipt.amount.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
