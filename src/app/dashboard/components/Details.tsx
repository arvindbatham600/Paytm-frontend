import UserDetails from "./UserDetails";

const Details = () => (
  <>
    <div className="px-4">
      {" "}
      <div className="py-4">
        {" "}
        <span className="font-bold ">Your Balance</span> 30000000 INR
      </div>
      <div className="font-bold pb-2">Users</div>
      <UserDetails />
    </div>
  </>
);

export default Details;
