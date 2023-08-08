import { Rootstate } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BsBook, BsPen, BsPlayBtn, BsStopwatch } from "react-icons/bs";
import { useSelector } from "react-redux";

const Lesson = ({ name, id }: { name: string; id: number }) => {
  const router = useRouter();
  const { isAuthenticated, user, loading } = useSelector(
    (state: Rootstate) => state.userState
  );
  return (
    <div className="t-data w-full text-md border p-6 text-tsecondary justify-between md:items-center font-bold bg-gray-50 flex md:flex-row flex-col gap-6">
      <div className="section-title">{name}</div>
      <div className="icons flex  gap-4 md:flex-row flex-col ">
        <Link
          href={`/lesson/${id}`}
          className="play  btn-secondary flex items-center gap-1 font-normal md:w-fit w-full md:py-0 py-3"
        >
          Watch
          <span className="font-bold ">
            <BsPlayBtn />
          </span>
        </Link>
        <Link
          href={`/lesson/${id}/quiz`}
          className="play  btn-secondary flex items-center gap-1 font-normal md:w-fit w-full md:py-0 py-3"
        >
          Exam
          <span className="font-bold ">
            <BsStopwatch />
          </span>
        </Link>
        <Link
          href={`/lesson/${id}/submit`}
          className="play  btn-secondary flex items-center gap-1 font-normal md:w-fit w-fit md:py-2 py-3 w-full"
        >
          assignment
          <span className="font-bold ">
            <BsBook />
          </span>
        </Link>

        {user.isAdmin && (
          <Link
            href={`/lesson/${id}/edit`}
            className="play  btn-secondary flex items-center gap-1 font-normal md:w-fit w-full md:py-0 py-3"
          >
            Edit
            <span className="font-bold ">
              <BsPen />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Lesson;
