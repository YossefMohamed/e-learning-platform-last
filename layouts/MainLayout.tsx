import Head from "next/head";

export const Layout = ({ children }: any) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.min.css"
        />

        <title>Learn</title>
      </Head>

      <div className="min-h-screen flex flex-col">{children}</div>
    </>
  );
};
