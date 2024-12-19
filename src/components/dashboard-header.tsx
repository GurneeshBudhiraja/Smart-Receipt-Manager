"use client";
import React from "react";
import { Button } from "./ui/button";
import { LogOut, PanelRight } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

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
    <header className="flex justify-between items-center bg-white border-b w-full px-12 py-9">
      <Button size={"icon"} variant={"outline"}>
        <PanelRight />
      </Button>
      <Button
        variant="outline"
        onClick={logoutUser}
        disabled={loading}
        className="p-5"
      >
        <LogOut className="h-5 w-5 mr-2" />
        <span className="text-[15px]">Logout</span>
      </Button>
    </header>
  );
}

export default DashboardHeader;
