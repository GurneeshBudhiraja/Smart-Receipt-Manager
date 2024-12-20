import React, { useState, useRef } from "react";
import Image from "next/image";
import { Camera, ImageIcon } from "lucide-react";
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
import { getImageSummary } from "@/lib/gemini/imageSummary";

interface ReceiptForm {
  onClose: () => void;
}

export default function ReceiptFormModal({ onClose }: ReceiptForm) {
  const [image, setImage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        const mimeType = file.type;
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          setImage(reader.result as string);
          setIsLoading(true);
          console.log("sending response to gemini");

          // Fix the types issue
          const base64EncodedImage = reader.result
            .replace(/^data:image\/\w+;base64,/, "")
            .toString();

          const geminiRespone = await getImageSummary(
            base64EncodedImage as string,
            mimeType
          );
          console.log(geminiRespone);
          setIsLoading(false);
        };
      }
    } catch (error) {
      console.log(error);
      setImage(null);
      setIsLoading(false);
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

  return (
    <Dialog open={true} onOpenChange={onClose}>
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
          </div>
          {image && (
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
              <Image
                src={image}
                alt="Uploaded receipt"
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          <div>
            <Label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="Enter amount"
              className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
          </div>
          <div>
            <Label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tags
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
                    ×
                  </button>
                </Badge>
              ))}
            </div>
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
              placeholder="Enter any additional notes"
              className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            disabled={isLoading}
          >
            Save Receipt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
