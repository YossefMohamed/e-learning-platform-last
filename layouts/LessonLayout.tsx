import Spinner from "@/components/Spinner";
import request from "@/endpoints/request";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

const LessonLayout: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const router = useRouter();
  const lessonResponse = useQuery(
    "lessonInLayout",
    async () => {
      const res = await request({
        url: `/api/lessons/lesson/${router.query.lesson}`,
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
      !lessonResponse.data && lessonResponse.refetch();
    }
  }, [router, lessonResponse]);
  return lessonResponse.isLoading ? (
    <Spinner />
  ) : (
    lessonResponse.isSuccess && (
      <>
        <Head>
          <title>{lessonResponse.data.name}</title>
        </Head>
        <div className="p-10">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li>
                <div className="flex items-center">
                  <Link
                    href={`
                      /years/${lessonResponse.data.year}
                    `}
                    className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium"
                  >
                    Years
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <a
                    href={`
                    /years/${lessonResponse.data.course.year}/courses/${lessonResponse.data.course._id}
                    `}
                    className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium"
                  >
                    Courses
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-400 ml-1 md:ml-2 text-sm font-medium">
                    {lessonResponse.data.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <div className="options my-10 ml-1 font-bold  flex border-b-4 w-full overflow-x-auto">
            <Link
              href={`quiz`}
              className="Video  cursor-pointer p-3 px-6 hover:text-light hover:bg-primary"
            >
              Video
            </Link>
            <Link
              href="/years/lesson/1/questions"
              className="Video  cursor-pointer p-3 px-6 hover:text-light hover:bg-primary"
            >
              Questions
            </Link>
            <Link
              href="/years/lesson/1/extra-resources"
              className="Video  cursor-pointer p-3 px-6 hover:text-light hover:bg-primary"
            >
              Extra resources
            </Link>
            <Link
              href={
                "/years/" +
                router.query.id +
                "/courses/" +
                router.query.course +
                "/lesson/" +
                router.query.lesson +
                "/submit"
              }
              className="Video  cursor-pointer p-3 px-6 hover:text-light hover:bg-primary"
            >
              Submit
            </Link>
            <Link
              href={
                "/years/" +
                router.query.id +
                "/courses/" +
                router.query.course +
                "/lesson/" +
                router.query.lesson +
                "/quiz"
              }
              className="Video  cursor-pointer p-3 px-6 hover:text-light hover:bg-primary"
            >
              Quiz
            </Link>
            <div className="Video  cursor-pointer p-3 px-6 hover:text-light hover:bg-primary">
              Teachers
            </div>
          </div>
          {children}
        </div>
      </>
    )
  );
};

export default LessonLayout;
