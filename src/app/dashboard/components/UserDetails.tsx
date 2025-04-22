import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const userData = [
  {
    firstName: "arvind",
    lastName: "batham",
    id: "1",
  },
  {
    firstName: "anil",
    lastName: "batham",
    id: "2",
  },
  {
    firstName: "aman",
    lastName: "batham",
    id: "3",
  },
];

const UserDetails = () => {
  return (
    <div>
      <Input type="text" placeholder=" Search Users..."></Input>
      <div className="flex flex-col gap-3 py-4">
        {userData.map((user, index) => (
          <div
            key={index}
            className="flex justify-between items-center w-[100%]"
          >
            {/* // left side div  */}
            <div className="flex justify-betwen items-center gap-2">
              <div className="h-[30px] w-[30px] bg-gray-200 rounded-full text-center flex justify-center items-center">
                <div>A</div>
              </div>
              <div> {user.firstName} </div>
            </div>
            {/* // right side button  */}
            <Link href="/sendmoney?id=500000">
              <Button className="cursor-pointer">Send Money</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
