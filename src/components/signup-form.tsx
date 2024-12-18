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
import { useState } from "react";
import { SignupWithEmail } from "@/types/auth.types"; // Assuming you have this type

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupWithEmail>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const password = watch("password");

  async function signupUser(data: SignupWithEmail) {
    setLoading(true);
    setError(null);
    try {
      console.log(data);
      const signupResponse: AxiosResponse = await axios.post(
        "/api/v1/auth/signup",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { success } = signupResponse.data;
      if (!success) {
        setError(signupResponse.data.message);
      }
      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error in signup page", error);
        setError(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Sign Up
        </CardTitle>
        <CardDescription className="text-gray-600">
          Create an account to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}
        <form onSubmit={handleSubmit(signupUser)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
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
              placeholder="Enter your password"
              {...register("password", {
                required: { value: true, message: "Password is required" },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-input"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-700">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Confirm password is required",
                },
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 ${
                errors.confirmPassword ? "border-red-500" : "border-input"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white  ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-center text-sm text-gray-600 w-full">
        <p className="text-center text-sm text-gray-600 w-full">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-500 hover:underline"
          >
            Log in here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}