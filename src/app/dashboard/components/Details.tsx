"use client";
import { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";

const Details = () => {
  const [balance, setBalance] = useState<string | number>("");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const tokenVaue = localStorage.getItem("token");
    if (tokenVaue) {
      setToken(tokenVaue);
      fetchUserBalance(tokenVaue);
    }
  }, []);

  const fetchUserBalance = async (tokenValue: string) => {
    console.log("toekenValue", tokenValue);
    try {
      setLoading(true);
      const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/account/balance`;

      const res = await axios.get(backendUrl, {
        headers: {
          Authorization: tokenValue,
        },
      });

      if (res.status === 200) {
        const data = res.data;
        setBalance(Math.floor(data?.balance * 100) / 100);
        setTimeout(() => setLoading(false), 1000);
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      // Optionally show toast or set error state
      toast.error("Failed to load balance");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="px-4">
        {" "}
        <div className="py-4 flex gap-2 items-center">
          {" "}
          <div className="font-bold ">Your Balance</div>{" "}
          <div>
            {loading ? (
              <Skeleton className=" bg-gray-400 h-6 w-[200px]" />
            ) : (
              `${balance} Rs`
            )}
          </div>
        </div>
        <div className="font-bold pb-2">Users</div>
        <UserDetails />
      </div>
    </>
  );
};

export default Details;
