"use client";
import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

function DashboardHeader() {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  async function logoutUser() {
    try {
      setLoading(true);
      console.log("loggin out user in dashboard header");
      await axios.post("/api/v1/auth/logout");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error logging out user in DashboardHeader");
      }
    } finally {
      setLoading(false);
      router.push("/");
      router.refresh();
    }
  }
  return (
    <header className="flex justify-between items-center bg-white border-b w-full  px-5 md:px-12 py-9">
      <Link
        href="#"
        onClick={() => {
          router.back();
          router.refresh();
        }}
        className="text-black hover:text-black/60 transition-all ease-in-out duration-200  text-lg font-semibold flex gap-1 items-center"
      >
        <ChevronLeft />
        <span className="hidden md:block">Back</span>
      </Link>
      <Button
        variant="outline"
        onClick={logoutUser}
        disabled={loading}
        className="p-5"
      >
        <LogOut className="h-5 w-2 md:mr-2" />
        <span className="text-[15px] hidden md:block">Logout</span>
      </Button>
    </header>
  );
}

export default DashboardHeader;
