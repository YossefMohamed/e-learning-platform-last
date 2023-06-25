import { Rootstate } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsList, BsPerson } from "react-icons/bs";
import { FaElementor } from "react-icons/fa";
import { useSelector } from "react-redux";

export const Header = () => {
  const router = useRouter();
  const [navbar, setNavbar] = useState(false);
  const { isAuthenticated, user, token, loading } = useSelector(
    (state: Rootstate) => state.userState
  );
  const [mobile, setMobile] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  });

  useEffect(() => {
    setMobile(false);
  }, [router]);

  let classStyle = !navbar
    ? "nav-container  bg-light  z-[99] py-5 shadow items-center  px-10 relative"
    : "nav-container   py-3 z-[99] shadow-xl bg-primary sticky top-0  items-center relative  px-10";
  let textColor = !navbar
    ? "items flex  gap-10 items-center text-md text-tsecondary  font-bold  "
    : "items flex  gap-10 items-center text-md text-light  font-bold ";

  let logoStyle = !navbar
    ? "logo text-4xl text-tsecondary"
    : "logo text-4xl text-light";

  return (
    // <div className={classStyle}>
    // <div className="w-full h-full absolute -z-10 top-0 right-0 bg-[url('/pattern.png')] opacity-5"></div>

    // <Link href="/" className={logoStyle}>
    //   <FaElementor />
    // </Link>

    // <div className={textColor}>
    //   <Link href="/">Home</Link>
    //   <Link href="/years">Years</Link>
    //   {user.isAdmin && true && <Link href="/dashboard">Dashboard</Link>}
    //   {isAuthenticated && <Link href="/logout">Logout</Link>}
    //   {isAuthenticated ? (
    //     <Link
    //       href="/profile"
    //       className={
    //         !navbar
    //           ? "btn-primary flex gap-1 items-center"
    //           : "btn-secondary flex gap-1 items-center"
    //       }
    //     >
    //       <BsPerson /> Profile
    //     </Link>
    //   ) : (
    //     <Link
    //       href="/login"
    //       className={!navbar ? "btn-primary" : "btn-secondary"}
    //     >
    //       Login
    //     </Link>
    //   )}
    // </div>

    // <div className="absolute h-1 bg-secondary top-[100%] right-0 w-full"></div>
    // </div>

    <nav className={classStyle}>
      <div className="w-full h-full absolute -z-10 top-0 right-0 bg-[url('/pattern.png')] opacity-5"></div>
      <div
        className={`h-1 absolute  top-full left-0 bg-secondary ${
          loading ? "animation-loading" : "w-full"
        }`}
      ></div>

      <div className="flex justify-between">
        <Link href="/" className={logoStyle}>
          <FaElementor />
        </Link>

        <div className={textColor + "hidden md:flex"}>
          <Link href="/">Home</Link>
          <Link href="/years">Years</Link>
          <Link href="/messages">Messages</Link>
          {user.isAdmin && true && <Link href="/dashboard">Dashboard</Link>}
          {isAuthenticated && <Link href="/logout">Logout</Link>}
          {isAuthenticated ? (
            <Link
              href="/profile"
              className={
                !navbar
                  ? "btn-primary flex gap-1 items-center"
                  : "btn-secondary flex gap-1 items-center"
              }
            >
              <BsPerson /> Profile
            </Link>
          ) : (
            <Link
              href="/login"
              className={!navbar ? "btn-primary" : "btn-secondary"}
            >
              Login
            </Link>
          )}
        </div>
        <div
          className={`md:hidden text-4xl font-bold cursor-pointer ${
            !navbar ? "text-tsecondary" : "text-light"
          }`}
          onClick={() => setMobile(!mobile)}
        >
          <BsList />
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      {mobile && (
        <div
          className={`flex md:hidden flex-col text-md ${
            !navbar ? "text-tsecondary" : "text-light"
          }  font-bold gap-10 my-10`}
          id="mobile-menu"
        >
          <Link href="/">Home</Link>
          <Link href="/years">Years</Link>
          {user.isAdmin && true && <Link href="/dashboard">Dashboard</Link>}
          {isAuthenticated && <Link href="/logout">Logout</Link>}
          {isAuthenticated ? (
            <Link
              href="/profile"
              className={`${
                !navbar
                  ? " flex gap-1 items-center w-full"
                  : " flex gap-1 items-center w-full"
              }`}
            >
              My Profile
            </Link>
          ) : (
            <Link href="/login" className={!navbar ? " w-full" : " w-full"}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
