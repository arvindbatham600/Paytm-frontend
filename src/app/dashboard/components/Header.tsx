"use client";

import { useEffect, useState } from "react";

const Header = () => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("firstName");
    setName(storedName);
  }, []);

  const firstInitial = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div>
      <main className="bg-white shadow flex justify-between px-4 py-4 items-center">
        <div className="text-lg font-bold">My Payment App</div>
        <div className="flex gap-2 items-center">
          <div>Hello, {name || "User"}</div>
          <div className="h-[30px] w-[30px] bg-gray-200 rounded-full text-center flex justify-center items-center">
            <div>{firstInitial}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Header;
