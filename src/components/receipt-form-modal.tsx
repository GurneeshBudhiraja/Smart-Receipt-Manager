import React, { useState, useRef } from "react";
import Image from "next/image";
import { Camera, ImageIcon, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { convertToBase64 } from "@/utils/toBase64";
import { useRouter } from "next/navigation";

interface ReceiptForm {
  onClose: () => void;
}

export default function ReceiptFormModal({ onClose }: ReceiptForm) {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [receiptDate, setReceiptDate] = useState("");
  const [amount, setAmount] = useState("");
  const [sideNotes, setSideNotes] = useState("");
  const [receiptText, setReceiptText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formFile, setFormFile] = useState<File | "">("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState<boolean>(true);
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!image) newErrors.image = "Please upload a receipt image";
    if (!amount.trim()) newErrors.amount = "Please enter the amount";
    if (tags.length === 0) newErrors.tags = "Please add at least one tag";

    setErrors(newErrors);
    setTimeout(() => setOpen(false),2000);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      const file = e.target.files?.[0] as File;
      const base64Image = (await convertToBase64(file)) as string;
      // To show in the browser
      setImage(base64Image);
      // state for sending file in the backend
      setFormFile(file);
      const base64EncodedImage = base64Image.replace(
        /^data:image\/\w+;base64,/,
        ""
      );

      // gets the image description from the Gemini
      const imageDescription = await axios.post(
        "/api/v1/ai/image/description",
        {
          image: base64EncodedImage,
          mimeType: file.type,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { isValidReceipt, price, receiptText, tags, date } =
        imageDescription.data.data;
      console.log(imageDescription.data.data);
      if (!isValidReceipt) {
        throw new Error("Image is not a valid receipt");
      }
      setTags(tags);
      setAmount(price);
      setReceiptText(receiptText);
      setReceiptDate(() => {
        return date ?? "";
      });
      return;
    } catch (error) {
      console.log(error);
      setImage(null);
      setFormFile("");
      setTags([]);
      setAmount("");
      setSideNotes("");
      setReceiptText("");
    } finally {
      setIsLoading(false);
      setReceiptDate("");
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim() !== "") {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const triggerImageUpload = (captureMethod: "camera" | "gallery") => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute(
        "capture",
        captureMethod === "camera" ? "environment" : ""
      );
      fileInputRef.current.click();
    }
  };

  const saveReciptData = async () => {
    try {
      if (validateForm()) {
        setIsLoading(true);
        await axios.post(
          "/api/v1/storage/receipts/upload",
          {
            image: formFile,
            category: tags[0],
            sidenotes: sideNotes.trim(),
            amount,
            receipttext: receiptText,
            date: receiptDate,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setIsSuccess(true);
        router.push("/dashboard/");
        router.refresh();
      }
    } catch (error) {
      console.log("error in saving receipt invo", error);
      onClose();
    } finally {
      setIsLoading(false);
      setTags([]);
      setAmount("");
      setImage(null);
      setFormFile("");
      setSideNotes("");
      setReceiptText("");
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md overflow-y-auto max-h-[90vh]"
        aria-describedby="Modal for adding a new receipt"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Add New Receipt
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div>
            <Label
              htmlFor="image-upload"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Receipt Image
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => triggerImageUpload("camera")}
                className="flex-1 bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                disabled={isLoading}
              >
                <Camera className="h-4 w-4 mr-2" />
                Camera
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => triggerImageUpload("gallery")}
                className="flex-1 bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                disabled={isLoading}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Gallery
              </Button>
            </div>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              ref={fileInputRef}
              disabled={isLoading}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>
          {image && (
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
              <Image
                src={image}
                alt="Uploaded receipt"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </div>
          )}
          <div>
            <Label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="amount"
              placeholder="Enter amount"
              className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tags
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="tags"
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={handleAddTag}
              placeholder="Add tags and press Enter"
              className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-gray-200 text-gray-800"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {errors.tags && (
              <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor="side-notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Side Notes
            </Label>
            <Textarea
              id="side-notes"
              value={sideNotes}
              onChange={(e) => setSideNotes(e.target.value)}
              placeholder="Enter any additional notes"
              className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {isSuccess ? (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline">
                {" "}
                Receipt saved successfully.
              </span>
            </div>
          ) : (
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isLoading}
              onClick={saveReciptData}
            >
              {isLoading ? "Saving..." : "Save Receipt"}
            </Button>
          )}
          {errors.submit && (
            <p className="text-red-500 text-sm mt-1">{errors.submit}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
