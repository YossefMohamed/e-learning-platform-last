import React from "react";
import LessonLayout from "../../../../../../../../layouts/LessonLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import request from "@/endpoints/request";
import Spinner from "@/components/Spinner";
import { toast } from "react-hot-toast";

function Quiz() {
  const quizResponse = useQuery(
    "quiz",
    async () => {
      const res = await request({
        url: `/api/quizzes/lesson/${router.query.lesson}`,
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

  const {
    data,
    isLoading,
    mutate: createNewQuiz,
    isSuccess,
    isError,
    error,
  } = useMutation(async () => {
    const token: string = localStorage.getItem("token") || "";

    const res = await request({
      url: `/api/quizzes/${router.query.lesson}`,
      method: "post",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });
  const createNewQuizHandler = async () => {
    await createNewQuiz();
  };
  const router = useRouter();

  React.useEffect(() => {
    isError && toast.error(error);
    isSuccess && quizResponse.refetch();
    isSuccess && toast.success("Quiz created");
    isSuccess && router.push("/quiz/" + "/create-quiz?quiz=" + data._id);
  }, [isSuccess, error, isError, router]);

  React.useEffect(() => {
    if (router.isReady) {
      !quizResponse.data && quizResponse.refetch();
    }
  }, [router, quizResponse]);

  return (
    <LessonLayout>
      {quizResponse.isLoading || isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col gap-10">
            {!isLoading &&
              quizResponse.data?.map(
                ({ _id }: { _id: string }, idx: number) => {
                  return (
                    <div className="flex gap-6" key={_id}>
                      <div className="flex-1 border p-4 flex flex-col">
                        <div className="icons flex flex-col  flex-1 justify-center gap-4 max-h-[650px] ">
                          <div className="group flex-1 flex flex-col gap-4  overflow-y-auto ">
                            <div className=" m-0 text-xl   border-b-4 py-2">
                              <span className="font-bold uppercase">
                                Quiz {++idx} :
                              </span>{" "}
                              Integration by parts rule with examples
                            </div>
                            <div className="description py-4 max-h-[100%] overflow-y-auto flex flex-col gap-8">
                              <div className="grade ">
                                Start your quiz and once you take it the grade
                                will be appear here
                              </div>
                              <div className="alert flex">_ / 10</div>
                              <div className="flex gap-4">
                                <Link
                                  href="/quiz/123"
                                  className="btn btn-secondary px-8 "
                                >
                                  Edit your quiz
                                </Link>
                                <Link
                                  href="/quiz/123"
                                  className="btn btn-primary px-8 "
                                >
                                  Start your quiz
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
          {true && (
            <div className="flex gap-6">
              <div className="flex-1 border p-4 flex flex-col">
                <div className="icons flex flex-col  flex-1 justify-center gap-4 max-h-[650px] ">
                  <div className="group flex-1 flex flex-col gap-4  overflow-y-auto ">
                    <div className=" m-0 text-xl   border-b-4 py-2">
                      <span className="font-bold uppercase">Quiz :</span>{" "}
                      Integration by parts rule with examples
                    </div>
                    <div className="description py-4 max-h-[100%] overflow-y-auto flex flex-col gap-8">
                      <div className="grade ">
                        Create a new quiz for this lesson
                      </div>

                      <div
                        onClick={createNewQuizHandler}
                        className="btn btn-primary px-8 "
                      >
                        Create a quiz
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </LessonLayout>
  );
}

export default Quiz;
