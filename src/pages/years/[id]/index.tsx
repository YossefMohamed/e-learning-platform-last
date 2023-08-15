import { CourseCard } from "@/components/CourseCard";
import Link from "next/link";
import React from "react";
import request from "@/endpoints/request";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";
import { Rootstate } from "@/redux/store";
import { useSelector } from "react-redux";

function Courses() {
  const router = useRouter();
  const coursesResponse = useQuery(
    "courses",
    async () => {
      const res = await request({
        url: `/api/courses/${router.query.id}`,
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
    }
  );
  React.useEffect(() => {
    if (router.isReady) {
      coursesResponse.refetch();
    }
  }, [router.query.id, coursesResponse, router.isReady]);
  return (
    <section className="px-[5%] my-10">
      <div className="sec-title w-fit">Choose a Course</div>

      <div className="md:flex  flex-wrap gap-8 w-full ">
        {coursesResponse.isLoading ? (
          <Spinner />
        ) : (
          coursesResponse.isSuccess &&
          coursesResponse.data?.map(
            (course: { name: string; id: string; image: string }) => {
              return (
                <CourseCard
                  name={course.name}
                  link={"/years/" + router.query.id + "/courses/" + course.id}
                  img={
                    "https://e-learning-platform-server.onrender.com/images/" +
                    course.image
                  }
                  key={course.id}
                />
              );
            }
          )
        )}
        {coursesResponse.isSuccess && !coursesResponse.data.length && (
          <div className="alert w-full"> No courses available now</div>
        )}
      </div>
    </section>
  );
}

export default Courses;
