import React from "react";
import Image from "next/image";
import type { Receipt } from "@/app/dashboard/receipts/page";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ReceiptModalProps {
  receipt: Receipt;
  onClose: () => void;
}

export default function ReceiptModal({ receipt, onClose }: ReceiptModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-sm overflow-scroll">
        <DialogHeader>
          <DialogTitle>Receipt Details</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4 ">
            <Image
              loading="lazy"
              src={receipt.imageUrl || "/placeholder.jpeg"}
              alt={`Receipt image`}
              layout="fill"
              objectFit="contain"
              objectPosition="center"
              className={`${receipt.imageUrl ? "" : "filter opacity-40"}`}
            />
          </div>
          <div className="space-y-2">
            <p>
              <strong>Date:</strong> {receipt.date}
            </p>
            <p>
              <strong>Amount:</strong> {receipt.amount || "N/A"}
            </p>
            <div>
              <strong>Tags:</strong>{" "}
              <Badge variant="secondary" className="mr-1">
                {receipt.category}
              </Badge>
            </div>
            <p>
              <strong>Side Notes:</strong> {receipt.sideNotes}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
