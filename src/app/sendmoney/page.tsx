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
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SendMoney = () => {
  const searchParams = useSearchParams();
  const toId = searchParams.get("userId");
  const [token, setToken] = useState<string | number>("");
  const [currentAmount, setCurrentAmount] = useState<string | number>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sendingAmount, setSendingAmount] = useState<number | string>("");
  const [toName, setToName] = useState<string>("");

  const initiatePayment = async () => {
    try {
      setLoading(true);
      const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/account/transfer`;
      const payload = {
        amount: sendingAmount,
        to: toId,
      };
      const sendingAmountNum = Number(sendingAmount);
      const currentAmountNum = Number(currentAmount);
      if (sendingAmountNum > currentAmountNum) {
        toast.error("Insufficient balance");
        setLoading(false);
        return;
      }

      const res = await axios.post(backendUrl, payload, {
        headers: {
          Authorization: token,
        },
      });

      if (res.status === 200) {
        toast.success("Transaction Successful! 🎉 ");
        setSendingAmount("");
        setTimeout(() => setLoading(false), 1000);
      }
    } catch (error: any) {
      if (error.status === 403) {
        toast.error("Not Authorized", {
          duration: 2000,
        });
      } else {
        toast.error("Transaction faild, Please try again later", {
          duration: 2000,
        });
      }
      console.error("Failed to fetch balance:", error);
      // Optionally show toast or set error state
      setLoading(false);
    }
  };

  useEffect(() => {
    const tokenVaue = localStorage.getItem("token");
    const amount = localStorage.getItem("currentBalance");
    const name = localStorage.getItem("to");
    if (tokenVaue) {
      setToken(tokenVaue);
    }
    if (amount) {
      setCurrentAmount(amount);
    }
    if (name) {
      setToName(name);
    }
  }, []);

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <div className="w-[350px]">
          <Card className="gap-3">
            <CardHeader className="text-center">
              <CardTitle>Send Money</CardTitle>
            </CardHeader>
            <CardContent className="gap-2 flex flex-col">
              <div className="flex justify-betwen items-center gap-2">
                <div className="h-[30px] w-[30px] bg-green-500  text-white rounded-full text-center flex justify-center items-center">
                  <div>{toName.charAt(0).toUpperCase()}</div>
                </div>
                <div> {toName} </div>
              </div>
              <div>Amount (in Rs)</div>
              <Input
                type="number"
                placeholder="enter amount"
                value={sendingAmount}
                onChange={(e) => setSendingAmount(e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button
                onClick={initiatePayment}
                disabled={!sendingAmount || loading ? true : false}
                className="bg-green-500 w-full hover:bg-green-400 cursor-pointer"
              >
                {loading ? "Initiating Transfer..." : "Initiate Transfer"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SendMoney;
