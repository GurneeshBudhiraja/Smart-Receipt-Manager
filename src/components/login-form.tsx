"use client";
import { useForm } from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { LoginWithEmail } from "@/types/auth.types";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginWithEmail>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  async function loginUser(data: LoginWithEmail) {
    setLoading(true);
    setError(null);
    try {
      const loginResponse: AxiosResponse = await axios.post(
        "/api/v1/auth/login",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(loginResponse);
      const { success } = loginResponse.data;
      if (!success) {
        setError(loginResponse.data.message);
      }
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error in login page", error);
        setError(error.response?.data.message);
      }
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  return (
    <div className="w-full  max-w-md mx-auto space-y-2">
      <Link
        href="/"
        className="text-blue-500 hover:text-blue-600 text-lg font-semibold flex gap-1 items-center"
      >
        <ChevronLeft />
        Back to Home
      </Link>
      <Card className="w-full shadow-lg ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Login
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="text-red-500 text-sm text-center mb-2">{error}</p>
          )}
          <form onSubmit={handleSubmit(loginUser)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                // TODO: changes this in prod
                defaultValue={"testing1@gmail.com"}
                placeholder="m@example.com"
                className={`bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-input"
                }`}
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                // TODO: changes this in prod
                defaultValue={process.env.NEXT_PUBLIC_TESTING1_PASSWORD}
                placeholder="Enter your password"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                })}
                className={`bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-input"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-500 hover:bg-blue-600 text-white  ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }
            `}
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-600 w-full">
          <p className="text-center text-sm text-gray-600 w-full">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-blue-500 hover:underline"
            >
              Register here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
