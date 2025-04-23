"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

const inputFields = [
  {
    id: 1,
    type: "email",
    label: "Email",
    name: "email",
  },
  {
    id: 2,
    type: "password",
    label: "Password",
    name: "password",
  },
];

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};

    // Required validation
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `${key} is required`;
      }
    });

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const backendUrl:
        | string
        | undefined = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/user/signin`;
      if (!backendUrl) {
        throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
      }
      const res = await axios.post(backendUrl, formData);
      if (res.status === 200) {
        toast.success("Logged in successfully 🎉", { duration: 2000 });

        // Reset form or redirect as needed
        setFormData({ email: "", password: "" });
        setLoading(false);
      }
    } catch (error: any) {
      toast.error("Invalid Credentials  ", { duration: 2000 });
      console.error("Login error:", error.response?.data || error.message);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-[350px]">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to sign in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {inputFields.map((field) => (
                <div className="flex flex-col gap-1" key={field.id}>
                  <Label className="font-light text-sm">{field.label}</Label>
                  <Input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    className="border-1 border-gray-300"
                  />
                  {errors[field.name] && (
                    <span className="text-red-500 text-sm">
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-1">
            <Button
              disabled={loading}
              className="w-full cursor-pointer"
              onClick={handleSubmit}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <div className="text-center font-light text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 underline">
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
