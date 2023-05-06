import { Rootstate } from "@/redux/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { FaElementor } from "react-icons/fa";
import { useSelector } from "react-redux";

export const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const { isAuthenticated, user } = useSelector(
    (state: Rootstate) => state.userState
  );
  const changeBackground = () => {
    var body = document.body,
      html = document.documentElement;

    var height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

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

  let classStyle = !navbar
    ? "nav-container  bg-light flex justify-between z-[99] py-5 shadow items-center  px-10 relative"
    : "nav-container flex justify-between py-3 z-[99] shadow-xl bg-primary sticky top-0  items-center relative  px-10";
  let textColor = !navbar
    ? "items flex  gap-10 items-center text-md text-tsecondary  font-bold  "
    : "items flex  gap-10 items-center text-md text-light  font-bold ";

  let logoStyle = !navbar
    ? "logo text-4xl text-tsecondary"
    : "logo text-4xl text-light";

  return (
    <div className={classStyle}>
      <div className="w-full h-full absolute -z-10 top-0 right-0 bg-[url('/pattern.png')] opacity-5"></div>

      <Link href="/" className={logoStyle}>
        <FaElementor />
      </Link>

      <div className={textColor}>
        <Link href="/">Home</Link>
        <Link href="/years">Years</Link>
        {isAuthenticated && user.isAdmin && (
          <Link href="/dashboard">Dashboard</Link>
        )}
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

      <div className="absolute h-1 bg-secondary top-[100%] right-0 w-full"></div>
    </div>
  );
};
