import React from "react";
import { CourseCard } from "../components/CourseCard";

import Link from "next/link";
import { useAuth } from "@/custom-hooks/useAuth";
import Spinner from "@/components/Spinner";
import request from "@/endpoints/request";
import { useQuery } from "react-query";

export default function Home() {
  const yearsResponse = useQuery("years", async () => {
    const res = await request({
      url: `/api/years/`,
      method: "get",
    }).then((res) => {
      return res.data;
    });

    return res;
  });
  console.log(yearsResponse);
  return (
    <>
      <section className="my-10">
        <div className="gap-8 items-center  px-4 mx-auto max-w-screen-xl xl:gap-16 grid grid-cols-2">
          <img className="w-[90%]" src="/math3.png" alt="dashboard image" />
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-3xl tracking-tight font-extrabold ">
              Let's create more{" "}
              <span className="text-ttertiary text-4xl font-bold uppercase">
                tools
              </span>{" "}
              and ideas that brings us together.
            </h2>
            <p className="mb-6  text-tmuted">
              Flowbite helps you connect with friends and communities of people
              who share your interests. Connecting with your friends and family
              as well as discovering new ones is easy with features like Groups.
            </p>
            <a href="#" className="inline-flex items-center btn-primary">
              Get started
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
      <section className="text-center relative flex justify-center flex-col items-center px-[10%] mt-10 bg-primary bg-opacity-5">
        <div className="w-full h-full absolute -z-10 top-0 right-0 bg-[url('/pattern.png')] opacity-5"></div>

        <div className="sec-title">The results speak for themselves</div>
        <div className="cards flex  w-full justify-around py-10">
          <div className="card w-[15%] flex flex-col gap-4">
            <div className="font-bold text-6xl">78%</div>
            <div className="text-sm">
              of our 2022 students achieved an ATAR above 90
            </div>
          </div>
          <div className="card w-[15%] flex flex-col gap-4">
            <div className="font-bold text-6xl">63%</div>
            <div className="text-sm">
              of our 2022 students achieved an ATAR above 90
            </div>
          </div>
          <div className="card w-[15%] flex flex-col gap-4">
            <div className="font-bold text-6xl">99.95</div>
            <div className="text-sm">
              of our 2022 students achieved an ATAR above 90
            </div>
          </div>
          <div className="card w-[15%] flex flex-col gap-4">
            <div className="font-bold text-6xl">5</div>
            <div className="text-sm">
              of our 2022 students achieved an ATAR above 90
            </div>
          </div>
        </div>
        <a href="#" className="inline-flex items-center btn-primary my-10">
          Get started
          <svg
            className="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </section>{" "}
      <section className="h-[100px] bg-tertiary text-light text-4xl font-bold flex justify-center items-center ">
        Learn from the best!
      </section>
      <section className="my-10">
        <div className="gap-8 items-center  px-4 mx-auto max-w-screen-xl flex flex-row-reverse">
          <img className="w-1/2" src="/math2.png" alt="dashboard image" />
          <div className="mt-4 md:mt-0 flex flex-col gap-6">
            <h2 className="text-4xl text-primary font-bold ">
              Let's create more tools and ideas that brings us together.
            </h2>
            <p className="mb-6 text-tmuted">
              Flowbite helps you connect with friends and communities of people
              who share your interests. Connecting with your friends and family
              as well as discovering new ones is easy with features like Groups.
            </p>
          </div>
        </div>
      </section>
      <section className="text-center relative flex justify-center flex-col items-center px-[5%] my-10 bg-primary bg-opacity-5">
        <div className="w-full h-full absolute -z-10 top-0 right-0 bg-[url('/pattern.png')] opacity-5"></div>

        <div className="sec-title">Study online</div>
        <div className="cards flex  w-full justify-around py-10">
          <div className="card  flex flex-col items-center  gap-4 ">
            <div className="font-bold h-full w-[40%]">
              <img
                src="/section1.png"
                alt="section3"
                className="h-full w-full"
              />
            </div>
            <div className="flex flex-col  gap-4">
              <div className="text-2xl font-light">Study Anywhere</div>
              <div>Distance Learning and flexible study options</div>
            </div>
          </div>

          <div className="card  flex flex-col items-center  gap-4 ">
            <div className="font-bold h-full w-[40%]">
              <img
                src="/section2.png"
                alt="section3"
                className="h-full w-full"
              />
            </div>
            <div className="flex flex-col  gap-4">
              <div className="text-2xl font-light">Full Online Lessons</div>
              <div>Adapt to your own timing and convenience</div>
            </div>
          </div>

          <div className="card  flex flex-col items-center  gap-4 ">
            <div className="font-bold h-full w-[40%]">
              <img
                src="/section3.png"
                alt="section3"
                className="h-full w-full"
              />
            </div>
            <div className="flex flex-col  gap-4">
              <div className="text-2xl font-light">Earn Certificates</div>
              <div>Get a certificate immediately after each course</div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-center flex justify-center flex-col items-center px-[5%] my-10">
        <div className="sec-title">Choose your year</div>

        <div className="flex  flex-wrap gap-8 w-full ">
          {yearsResponse.isLoading ? (
            <Spinner />
          ) : (
            yearsResponse.isSuccess &&
            yearsResponse.data?.map((year: { name: string; id: string }) => {
              return (
                <CourseCard
                  name={year.name}
                  link={"/years/" + year.id}
                  img="/course-bg2.jpg"
                  key={year.id}
                />
              );
            })
          )}
          {yearsResponse.isSuccess && !yearsResponse.data?.length && (
            <div className="alert w-full">No Years available</div>
          )}
        </div>
      </section>
    </>
  );
}
