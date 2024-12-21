"use client";
import React from "react";
import Link from "next/link";
import { LayoutDashboard, Receipt, BotIcon, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Receipt, label: "Receipts", href: "/dashboard/receipts" },
  { icon: BotIcon, label: "Chat", href: "/dashboard/chat" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex flex-col h-full w-fit md:w-64 bg-white border-r">
      <div
        className="flex items-center justify-center h-16 border-b hover:opacity-70 cursor-pointer space-x-3 transition-opacity ease-in-out duration-150 drop-shadow-lg"
        onClick={() => {
          router.push("/");
          router.refresh();
        }}
      >
        <Home className="text-blue-700 " />
        <span className="text-xl font-semibold sr-only md:not-sr-only">
          Smart Expense
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto mt-5 w-fit md:w-full">
        <ul className="p-2 space-y-5 ">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center p-2 rounded-lg text-gray-900  hover:bg-blue-500 bg-blue-200 hover:text-stone-50",
                  "transition-colors duration-200",
                  { "bg-blue-500 text-white": pathname === item.href }
                )}
              >
                <item.icon className="w-5 h-5 md:mr-3" />
                <span className="sr-only md:not-sr-only">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
