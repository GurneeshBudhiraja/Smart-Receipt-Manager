"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1
            className={`text-9xl font-extrabold text-black transition-all duration-1000 ease-in-out ${
              mounted ? "opacity-100" : "opacity-0 translate-y-10"
            }`}
          >
            404
          </h1>
          <h2
            className={`mt-2 text-3xl font-bold text-gray-900 transition-all duration-1000 delay-300 ease-in-out ${
              mounted ? "opacity-100" : "opacity-0 translate-y-10"
            }`}
          >
            Page not found
          </h2>
          <p
            className={`mt-2 text-lg text-gray-600 transition-all duration-1000 delay-500 ease-in-out ${
              mounted ? "opacity-100" : "opacity-0 translate-y-10"
            }`}
          >
            Oops! It seems like the page you&apos;re looking for has taken an
            unexpected detour.
          </p>
        </div>
        <div
          className={`mt-6 transition-all duration-1000 delay-700 ease-in-out ${
            mounted ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <Link href="/" passHref>
            <Button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
        </div>
        <div
          className={`mt-8 transition-all duration-1000 delay-1000 ease-in-out ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Need help?</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Contact me at{" "}
            <Link
              href="mailto:gurneeshbudhiraja@gmail.com"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              gurneeshbudhiraja@gmail.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
