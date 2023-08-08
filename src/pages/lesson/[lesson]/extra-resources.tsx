import React from "react";
import LessonLayout from "../../../../layouts/LessonLayout";
import { useQuery } from "react-query";
import request from "@/endpoints/request";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";

function Lesson() {
  const [video, setVideo] = React.useState(false);

  React.useEffect(() => {
    setVideo(true);
  }, []);

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

  console.log(lessonResponse.data);

  return (
    <LessonLayout>
      <>
        {lessonResponse.isLoading && !lessonResponse.data ? (
          <Spinner />
        ) : (
          <>
            <div className="flex gap-6">
              <div className="flex-1 border p-4 flex flex-col">
                <div className="icons flex flex-col  flex-1 justify-center gap-4 max-h-[650px] ">
                  <div className="group flex-1 flex flex-col gap-4  overflow-y-auto ">
                    <div className=" m-0 text-xl   border-b-4 py-2">
                      <span className="font-bold uppercase">
                        Extra resources :
                      </span>{" "}
                      {lessonResponse.data.name}
                    </div>
                    <div className="description py-4 max-h-[100%] overflow-y-auto">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: lessonResponse.data.extra,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </LessonLayout>
  );
}

export default Lesson;
