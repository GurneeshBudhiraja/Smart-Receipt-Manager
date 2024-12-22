"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DashboardIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

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
        router.refresh();
      } else {
        console.error("Error in logging out user", logoutResponse);
      }
    } catch (error) {
      console.error("Error in logging out user", error);
    }
  }
  return (
    <header
      className={cn("mt-4 md:mt-7 mx-5  md:mx-10 md:mb-2 p-3", className)}
    >
      <div className="container mx-auto w-full md:mr-6 ">
        <div className="flex items-center justify-end h-16 ">
          <nav className="flex justify-end md:justify-center  items-center space-x-2 md:space-x-8  transition-colors duration-100 ease-in-out flex-wrap">
            {isLogin ? (
              <>
                {/* Dashboard link for md screen and above */}
                <div className="hidden md:block">
                  <TooltipProvider delayDuration={400}>
                    <Tooltip>
                      <TooltipTrigger>
                        {/* Dashboard text for the md screens and above */}
                        <Button
                          variant="outline"
                          size="lg"
                          aria-label="User profile"
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
                </div>
                {/* Dashboard link button for sm screens and below */}
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="User profile"
                  asChild
                  className="p-5"
                >
                  <Link href="/dashboard" className="block md:hidden">
                    <LayoutDashboard height={4} width={4} strokeWidth={"2px"} />
                  </Link>
                </Button>

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
