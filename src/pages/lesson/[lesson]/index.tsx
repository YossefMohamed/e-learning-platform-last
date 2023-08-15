import Link from "next/link";
import React from "react";
import { BsBook, BsDownload } from "react-icons/bs";
import ReactPlayer from "react-player";

import { useQuery } from "react-query";
import request from "@/endpoints/request";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";
import LessonLayout from "../../../../layouts/LessonLayout";

function IndexLesson() {
  const [video, setVideo] = React.useState(false);
  const router = useRouter();
  const lessonResponse = useQuery(
    "lesson",
    async () => {
      const res = await request({
        url: `/api/lessons/lesson/${router.query.lesson}`,
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
    setVideo(true);
    if (router.isReady) {
      !lessonResponse.data && lessonResponse.refetch();
    }
  }, [router, lessonResponse]);
  return (
    <LessonLayout>
      <>
        {video && !lessonResponse.isLoading ? (
          lessonResponse.data && (
            <div className="flex gap-6 md:flex-row flex-col">
              .
              <div className="md:w-[70%]">
                <ReactPlayer
                  url={`https://e-learning-platform-server.onrender.com/videos/${lessonResponse.data.video}`}
                  controls
                  width={"100%"}
                  height={"650px"}
                />
              </div>
              <div className="flex-1 border p-4 flex flex-col">
                <div className="icons flex flex-col  flex-1 justify-center gap-4 max-h-[650px] ">
                  <div className="group flex-1 flex flex-col gap-4  overflow-y-auto ">
                    <div className=" m-0 text-xl font-bold  border-b-4 py-2">
                      {lessonResponse.data.name}
                    </div>
                    <div className="description py-4 max-h-[100%] overflow-y-auto">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: lessonResponse.data.description,
                        }}
                      />
                    </div>
                  </div>

                  {lessonResponse.data.file && (
                    <Link
                      target="_blank"
                      href={`https://e-learning-platform-server.onrender.com/files/${lessonResponse.data.file}`}
                      className="play  btn-primary flex items-center gap-1 font-normal  w-full justify-between"
                    >
                      Lecture File
                      <span className="font-bold ">
                        <BsDownload />
                      </span>
                    </Link>
                  )}
                  {lessonResponse.data.assignment && (
                    <Link
                      target="_blank"
                      href={`https://e-learning-platform-server.onrender.com/files/${lessonResponse.data.assignment}`}
                      className="play  btn-primary flex items-center gap-1 font-normal  w-full justify-between"
                    >
                      Home work
                      <span className="font-bold ">
                        <BsBook />
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )
        ) : (
          <Spinner />
        )}
      </>
    </LessonLayout>
  );
}

export default IndexLesson;
