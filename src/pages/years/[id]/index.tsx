import { CourseCard } from "@/components/CourseCard";
import Link from "next/link";
import React from "react";
import request from "@/endpoints/request";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";

function Courses() {
  const router = useRouter();
  const coursesResponse = useQuery(
    "courses",
    async () => {
      const res = await request({
        url: `/api/courses/${router.query.id}`,
        method: "get",
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
    router.query.id && coursesResponse.refetch();
  }, [router.query.id]);
  return (
    <section className="px-[5%] my-10">
      <div className="sec-title w-fit">Choose a Course</div>

      <div className="flex  flex-wrap gap-8 w-full ">
        {coursesResponse.isLoading ? (
          <Spinner />
        ) : (
          coursesResponse.isSuccess &&
          coursesResponse.data?.map((course: { name: string; id: string }) => {
            return (
              <CourseCard
                name={course.name}
                link={"/years/" + router.query.id + "/courses/" + course.id}
                img="/course-bg2.jpg"
                key={course.id}
              />
            );
          })
        )}
        {coursesResponse.isSuccess && !coursesResponse.data.length && (
          <div className="alert w-full"> No courses available now</div>
        )}
      </div>
    </section>
  );
}

export default Courses;
