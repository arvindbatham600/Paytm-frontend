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
import { useRouter } from "next/navigation";

const inputFeildsData = [
  {
    id: 1,
    type: "text",
    label: "First Name",
    name: "firstName",
  },
  {
    id: 2,
    type: "text",
    label: "Last Name",
    name: "lastName",
  },
  {
    id: 3,
    type: "email",
    label: "Email",
    name: "email",
  },
  {
    id: 4,
    type: "password",
    label: "Password",
    name: "password",
  },
];

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `${key} is required`;
      }
    });

    // Email format check
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
      // Simulate API call
      const backendUrl:
        | string
        | undefined = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/signup`;
      if (!backendUrl) {
        throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
      }
      const res = await axios.post(backendUrl, formData);
      if (res.status === 200) {
        // Success: Show success
        const data = res.data;
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("email", data.email);
        localStorage.setItem("firstName", data.firstName);
        localStorage.setItem("lastName", data.lastName);
        localStorage.setItem("token", `Bearer ${data.token}`);
        document.cookie = `token=Bearer ${data.token}; path=/; max-age=${
          60 * 60 * 24
        };`;
        toast.success("Signed up successfully! 🎉", {
          duration: 2000, // in milliseconds
        });
        router.push("/dashboard");
        // You can redirect or clear form here
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setLoading(false);
      }
    } catch (err: any) {
      if (err.status === 409) {
        toast.error("Email already registered", {
          duration: 2000,
        });
      } else {
        toast.error("Internal server error. Please try again later.", {
          duration: 2000,
        });
      }
      // Error: Show error toast

      setLoading(false);
      console.error("Signup error:", err.response?.data || err.message);
    }
  };

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <div className="w-[350px]">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {inputFeildsData.map((item) => (
                  <div className="flex flex-col gap-1" key={item.id}>
                    <Label className="font-light text-sm">{item.label}</Label>
                    <Input
                      className="border-1 border-gray-300"
                      type={item.type}
                      onChange={handleChange}
                      name={item.name}
                      value={formData[item.name as keyof typeof formData]}
                    />
                    {errors[item.name] && (
                      <span className="text-red-500 text-sm">
                        {errors[item.name]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-1">
              <Button
                disabled={loading ? true : false}
                className="w-[100%] cursor-pointer"
                onClick={handleSubmit}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
              <div className="text-center font-light text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 underline cursor-pointer"
                >
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
