import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { Receipt } from "@/app/dashboard/receipts/page";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="mt-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
            <Image
              src={receipt.imageUrl}
              alt={`Receipt ${receipt.id}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="space-y-2">
            <p>
              <strong>Date:</strong> {receipt.date}
            </p>
            <p>
              <strong>Amount:</strong> ${receipt.amount.toFixed(2)}
            </p>
            <div>
              <strong>Tags:</strong>{" "}
              {receipt.tags.map((tag) => (
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
