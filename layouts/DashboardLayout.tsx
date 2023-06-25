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
  const [menu, setMenu] = React.useState(false);
  React.useEffect(() => {
    if (router.isReady) {
      setMenu(false);
      if (!user.isAdmin) {
        router.push("/");
      }
    }
  }, [router]);

  return (
    <div className="flex w-full min-h-screen">
      {menu && (
        <div className="left  md:w-[20%] w-full  border-r p-5">
          <div className="p-5 text-2xl font-bold border-b">
            Welcome {!user.isAdmin ? "loading.." : user.name}
          </div>
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
      )}
      <div
        className={`relative sm:rounded-lg flex-1 w-full p-10 border md:flex flex-col gap-5 ${
          menu ? "hidden" : ""
        }`}
      >
        <div
          className="flex gap-1 items-center  btn-secondary mb-5"
          onClick={() => setMenu((prev) => !prev)}
        >
          <BsPerson /> Show menu
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
