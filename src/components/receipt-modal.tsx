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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Receipt Details</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
            <Image
              src={receipt.imageUrl || "/placeholder.jpeg"}
              alt={`Receipt image`}
              layout="fill"
              objectFit="cover"
              className={`${receipt.imageUrl ? "" : "filter opacity-40"}`}
            />
          </div>
          <div className="space-y-2">
            <p>
              <strong>Date:</strong> {receipt.date}
            </p>
            <p>
              <strong>Amount:</strong> {receipt.amount}
            </p>
            <div>
              <strong>Tags:</strong>{" "}
              {receipt.category.map((tag) => (
                <Badge key={tag} variant="secondary" className="mr-1">
                  {tag}
                </Badge>
              ))}
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
