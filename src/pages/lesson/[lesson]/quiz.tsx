import React from "react";
import LessonLayout from "../../../../layouts/LessonLayout";

import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import request from "@/endpoints/request";
import Spinner from "@/components/Spinner";
import { toast } from "react-hot-toast";
import { Rootstate } from "@/redux/store";
import { useSelector } from "react-redux";
import { QuizCard } from "@/components/QuizCard";

function Quiz() {
  const { token, user } = useSelector((state: Rootstate) => state.userState);
  const quizResponse = useQuery(
    "quiz_lesson",
    async () => {
      const res = await request({
        url: `/api/quizzes/lesson/${router.query.lesson}`,
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        return res.data;
      });
      return res;
    },
    {
      enabled: false,
      cacheTime: 0,
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

  const onDeleteQuiz = () => {
    quizResponse.refetch();
  };
  const createNewQuizHandler = async () => {
    await createNewQuiz();
  };
  const router = useRouter();

  React.useEffect(() => {
    isError && toast.error(error as string);
    isSuccess && quizResponse.refetch();
    isSuccess && toast.success("Quiz created");
    isSuccess && router.push("/quiz/" + "/create-quiz?quiz=" + data._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error, isError, router, data._id]);

  React.useEffect(() => {
    if (router.isReady) {
      !quizResponse.data && quizResponse.refetch();
    }
  }, [router, quizResponse]);
  console.log(quizResponse.data);
  return (
    <LessonLayout>
      {quizResponse.isLoading || isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col gap-10">
            {quizResponse.isSuccess &&
              quizResponse.data?.map(
                (
                  {
                    _id,
                    questions,
                    takenBy,
                  }: {
                    _id: string;
                    questions: [string];
                    takenBy: [
                      {
                        user: string;
                        score: number;
                      }
                    ];
                  },
                  idx: number
                ) => {
                  return (
                    <QuizCard
                      key={_id}
                      idx={idx}
                      _id={_id}
                      questions={questions}
                      takenBy={takenBy}
                      onDeleteQuiz={onDeleteQuiz}
                    />
                  );
                }
              )}
            {!quizResponse.data?.length && (
              <div className="text-slate-600 text-xl text-center uppercase ">
                No quizzes avaliable now
              </div>
            )}
          </div>
          {user.isAdmin && (
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
