import { CourseCard } from "@/components/CourseCard";
import Link from "next/link";
import React from "react";

function Courses() {
  return (
    <section className="px-[5%] my-10">
      <div className="sec-title w-fit">Year 5 Courses</div>

      <div className="flex  flex-wrap gap-8 w-full ">
        <CourseCard img="/course-bg2.jpg" />
        <CourseCard img="/course-bg3.jpg" />
        <CourseCard />
        <CourseCard />
        <CourseCard img="/course-bg2.jpg" />
        <CourseCard img="/course-bg3.jpg" />
        <CourseCard />
        <CourseCard />
        <CourseCard img="/course-bg2.jpg" />
        <CourseCard img="/course-bg3.jpg" />
        <CourseCard />
        <CourseCard />
        <CourseCard />

        <Link
          href="/add-course"
          className="flex items-center justify-center w-[30%] my-4 cursor-pointer h-[500px] p-4  shadow-xl hover:shadow-2xl border-2 bg-gray-100"
        >
          <div className="text-2xl font-bold text-tsecondary">
            Add New Course
          </div>
        </Link>
      </div>
    </section>
  );
}

export default Courses;
