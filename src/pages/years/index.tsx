import { CourseCard } from "@/components/CourseCard";
import Link from "next/link";
import React from "react";
import request from "@/endpoints/request";
import { useQuery } from "react-query";
import Spinner from "@/components/Spinner";
import Image from "next/image";

function IndexYear() {
  const yearsResponse = useQuery(
    "years",
    async () => {
      const res = await request({
        url: `/api/years/`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        return res.data;
      });

      return res;
    },
    {
      enabled: false,
      cacheTime: 0,
    }
  );

  React.useEffect(() => {
    yearsResponse.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="my-10">
        <div className="gap-8 items-center  px-4 mx-auto max-w-screen-xl md:flex ">
          <div className="md:w-1/2 relative">
            <Image
              src={`${process.env.url}/images/home1.png`}
              alt="dashboard image"
              fill
            />
          </div>

          <div className="mt-4 md:mt-0 flex flex-col gap-6">
            <h2 className="text-4xl text-primary font-bold ">
              Lets create more tools and ideas.
            </h2>
            <p className="mb-6 text-tmuted">
              Flowbite helps you connect with friends and communities of people
              who share your interests. Connecting with your friends and family
              as well as discovering new ones is easy with features like Groups.
            </p>
          </div>
        </div>
      </section>

      <section className="px-[5%] my-10">
        <div className="sec-title w-fit">Choose Your Year</div>

        <div className="md:flex  flex-wrap gap-8 w-full ">
          {yearsResponse.isLoading ? (
            <Spinner />
          ) : (
            yearsResponse.isSuccess &&
            yearsResponse.data?.map(
              (year: { name: string; id: string; image: string }) => {
                return (
                  <CourseCard
                    name={year.name}
                    link={"/years/" + year.id}
                    img={`${process.env.url}/images/ ` + year.image}
                    key={year.id}
                  />
                );
              }
            )
          )}
        </div>
      </section>
    </>
  );
}

export default IndexYear;
