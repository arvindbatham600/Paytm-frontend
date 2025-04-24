"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

type User = {
  firstName: string;
  lastName: string;
  userId: string;
};

const UserDetails = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchUsersInformation = async (tokenValue: string, search: string) => {
    // console.log("toekenValue", tokenValue);
    try {
      setLoading(true);
      const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/bulk?filter=${search}`;

      const res = await axios.get(backendUrl, {
        headers: {
          Authorization: tokenValue,
        },
      });

      if (res.status === 200) {
        const data = res.data;
        setUsers(data.user);
        setTimeout(() => setLoading(false), 1000);
      }
    } catch (error: unknown) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 403) {
          toast.error("Not Authorized", {
            duration: 2000,
          });
        } else {
          toast.error("Failed to get user details", {
            duration: 2000,
          });
        }

        console.error(
          "Failed to fetch user details:",
          error.response?.data || error.message
        );
      } else {
        toast.error("Unexpected error occurred while fetching user details", {
          duration: 2000,
        });
        console.error("Unknown error while fetching user details:", error);
      }
    }
  };

  useEffect(() => {
    const tokenValue = localStorage.getItem("token");
    if (tokenValue) {
      setToken(tokenValue);
      fetchUsersInformation(tokenValue, search);
    }
  }, []);
  return (
    <div>
      <Input
        type="text"
        placeholder=" Search Users..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          console.log("onchange token", token);
          fetchUsersInformation(token, e.target.value);
        }}
      ></Input>
      <div className="flex flex-col gap-3 py-4">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <UserSkeleton key={index} />
            ))
          : users.map((user, index) => (
              <div
                key={index}
                className="flex justify-between items-center w-[100%]"
              >
                {/* Left side */}
                <div className="flex justify-between items-center gap-2">
                  <div className="h-[30px] w-[30px] bg-gray-200 rounded-full text-center flex justify-center items-center">
                    <div>{user.firstName.charAt(0).toUpperCase()}</div>
                  </div>
                  <div>{user.firstName}</div>
                </div>

                {/* Right side */}
                {/* <Link href={`/sendmoney?userId=${user.userId}`}> */}
                <Button
                  onClick={() => {
                    localStorage.setItem("to", user.firstName);
                    localStorage.setItem("toId", user.userId);
                    router.push(`/sendmoney`);
                  }}
                  className="cursor-pointer"
                >
                  Send Money
                </Button>
                {/* </Link> */}
              </div>
            ))}
      </div>
    </div>
  );
};

export default UserDetails;

const UserSkeleton = () => (
  <div className="flex justify-between items-center w-full py-2">
    <div className="flex items-center gap-2">
      <Skeleton className="h-[30px] w-[30px] rounded-full" />
      <Skeleton className="h-4 w-[100px]" />
    </div>
    <Skeleton className="h-8 w-[100px] rounded-md" />
  </div>
);
