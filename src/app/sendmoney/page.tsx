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

const SendMoney = () => (
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
                <div>A</div>
              </div>
              <div> Arvind </div>
            </div>
            <div>Amount (in Rs)</div>
            <Input type="number" placeholder="enter amount" />
          </CardContent>
          <CardFooter>
            <Button className="bg-green-500 w-full hover:bg-green-400 cursor-pointer">
              Initiate Transfer
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </>
);

export default SendMoney;
