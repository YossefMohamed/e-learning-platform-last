import { Rootstate } from "@/redux/store";
import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";
export const Layout = ({ children }: any) => {
  const { user } = useSelector((state: Rootstate) => state.userState);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" type="image/png" href="/favicon.jpg" />

        <title>Math with Ezz</title>
      </Head>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.min.css"
      />

      <div className="min-h-screen flex flex-col">{children}</div>
    </>
  );
};
