import { Rootstate } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BsBook, BsPen, BsPerson } from "react-icons/bs";
import { FaSchool } from "react-icons/fa";
import { useSelector } from "react-redux";

const DashboardLayout: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const { user } = useSelector((state: Rootstate) => state.userState);
  const router = useRouter();
  if (!user.isAdmin) {
    router.push("/");
  }

  return (
    <div className="flex min-h-screen">
      <div className="left w-[20%] border-r p-5">
        <div className="p-5 text-2xl font-bold border-b">Welcome Ezz</div>
        <Link
          href="/dashboard"
          className="Users p-4 font-bold flex items-center gap-4 hover:text-tsecondary  "
        >
          <BsPerson /> Users
        </Link>
        <Link
          href="/dashboard/years"
          className="Users p-4 font-bold flex items-center gap-4 hover:text-tsecondary cursor-pointer "
        >
          <BsPen /> Years
        </Link>
        <Link
          href="/dashboard/courses"
          className="Users p-4 font-bold flex items-center gap-4 hover:text-tsecondary cursor-pointer "
        >
          <BsBook />
          Courses
        </Link>
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
