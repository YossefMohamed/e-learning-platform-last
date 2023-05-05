import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsClock, BsPerson } from "react-icons/bs";

export const CourseCard = ({
  img = "/course-bg.jpg",
  name,
  link,
}: {
  img?: string;
  name: string;
  link: string;
}) => {
  return (
    <div className="flex flex-col w-[30%] my-4 cursor-pointer max-h-[500px] p-4  shadow-xl hover:shadow-2xl border-2">
      <div className="flex max-h-[60%] flex-1 relative min-h-[250px]">
        <Image src={img} alt="image course" fill className="h-full w-full" />
      </div>
      <div className="flex flex-col mt-5 gap-6 flex-1 ">
        <Link href={link} className="flex justify-between mt-auto">
          <div className="btn-primary w-full">{name}</div>
        </Link>
      </div>
    </div>
  );
};
