import request from "@/endpoints/request";
import Link from "next/link";
import React from "react";
import { BsPen } from "react-icons/bs";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Rootstate } from "@/redux/store";

const Unit = ({
  id,
  name,
  course,
  idx,
}: {
  id: string;
  name: string;
  course: string;
  idx: number;
}) => {
  const { isAuthenticated, user, loading } = useSelector(
    (state: Rootstate) => state.userState
  );

  const router = useRouter();

  return (
    <div className="t-head w-full text-2xl border p-6 text-tsecondary font-bold flex justify-between">
      <span>
        Unit {idx} : {name}
      </span>
      {user.isAdmin && (
        <div className="group flex gap-4">
          <Link
            href={`${router.asPath}/unit/${id}`}
            className="btn-primary text-sm"
          >
            Add lesson
          </Link>

          <Link
            href={`${router.asPath}/unit/${id}`}
            className="btn-primary text-sm  flex items-center gap-1"
          >
            Edit <BsPen />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Unit;
