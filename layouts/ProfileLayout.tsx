import Link from "next/link";
import React from "react";
import { BsBook, BsPen, BsPerson } from "react-icons/bs";
import { FaSchool } from "react-icons/fa";

const DashboardLayout: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="left w-[20%] border-r p-5 flex flex-col">
        <div className="p-5 text-2xl font-bold border-b">Welcome Ezz</div>
        <Link
          href="/profile"
          className="Users p-4 font-bold flex items-center gap-4 hover:text-tsecondary  "
        >
          <BsPerson /> My Profile
        </Link>
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
