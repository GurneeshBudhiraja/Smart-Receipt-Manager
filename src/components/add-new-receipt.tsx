"use client";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import ReceiptFormModal from "./receipt-form-modal";

function AddReceiptForm() {
  const pathname = usePathname();
const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div>
      <div
        className={`absolute right-10 bottom-9 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-3 rounded-full cursor-pointer ${
          pathname === "/dashboard/chat" ? "hidden" : ""
        }`}
        onClick={() => setShowModal((prev) => !prev)}
      >
        <Plus size={40} strokeWidth={3} color="white" />
      </div>
      {showModal && (
        <ReceiptFormModal onClose={() => setShowModal((prev) => !prev)} />
      )}
    </div>
  );
}

export default AddReceiptForm;
