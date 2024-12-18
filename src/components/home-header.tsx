"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { roboto_mono } from "@/app/fonts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";
import { useRouter } from "next/navigation";

export function HomeHeader({
  isLogin,
  className,
}: {
  isLogin: boolean;
  className?: string;
}) {
  const router = useRouter();
  async function logoutUser() {
    try {
      console.log("logging out user");
      const logoutResponse = await axios.post("/api/v1/auth/logout");
      if (logoutResponse.status === 200) {
        router.push("/");
      } else {
        console.error("Error in logging out user", logoutResponse);
      }
    } catch (error) {
      console.error("Error in logging out user", error);
    }
  }
  return (
    <header
      className={` mt-7 mx-10 mb-2 p-3  ${roboto_mono.className} ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-end h-16 ">
          <nav className="flex items-center space-x-8 transition-colors duration-100 ease-in-out ">
            {/* TODO change to actual link */}
            {isLogin ? (
              <>
                {/* Dashboard link */}
                <TooltipProvider delayDuration={400}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="outline"
                        size="lg"
                        aria-label="User profile"
                        className=""
                        asChild
                      >
                        <Link href="/dashboard">Dashboard</Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" sideOffset={10}>
                      Dashboard
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {/* Logout button */}
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        onClick={logoutUser}
                        variant="outline"
                        size="icon"
                        aria-label="User profile"
                        className="p-5"
                        asChild
                      >
                        <Link href={"#"}>
                          <LogOut />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" sideOffset={10}>
                      Logout
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            ) : (
              // Get started
              <Button
                variant="outline"
                size="lg"
                aria-label="User profile"
                className=""
                asChild
              >
                <Link href="/login">Get Started</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
