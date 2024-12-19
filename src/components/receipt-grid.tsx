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
          className="relative aspect-[3/4] overflow-hidden rounded-lg drop-shadow-md cursor-pointer transition-transform duration-200 ease-in-out hover:scale-[1.02] group border border-gray-300"
          onClick={() => onReceiptClick(receipt)}
        >
          <Image
            src={receipt.imageUrl}
            alt={`Receipt ${receipt.id}`}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-blue-500 group-hover:bg-blue-600 text-white p-2 transition-colors ease-in-out duration-200">
            <p className="text-sm font-semibold">{receipt.date}</p>
            <p className="text-xs">${receipt.amount.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
