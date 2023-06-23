import QuizSelect, { Option } from "@/components/QuizSelect";
import Spinner from "@/components/Spinner";
import request from "@/endpoints/request";
import { Rootstate } from "@/redux/store";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPlus, BsStopwatch } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import katex from "katex";

function Quiz() {
  const { token, user } = useSelector((state: Rootstate) => state.userState);
  const [index, setIndex] = useState<number | null>(null);
  const [questionIndex, setQuestionIndex] = useState<string | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [title, setTitle] = useState("");
  const router = useRouter();
  const [scores, setScores] = useState<boolean[]>([]);

  const quizResponse = useQuery(
    "quiz",
    async () => {
      const res = await request({
        url: `/api/quizzes/${router.query.id}`,
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        return res.data;
      });
      return res;
    },
    {
      cacheTime: 0,
      enabled: false,
    }
  );

  const questionResponse = useQuery(
    "question",
    async () => {
      const res = await request({
        url: `/api/quizzes/questions/${questionIndex}`,
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
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

  const scoreResponse = useQuery(
    "score",
    async () => {
      const res = await request({
        url: `/api/quizzes/score/${router.query.id}`,
        method: "post",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          score: scores.filter((item) => item).length,
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

  const checkQuestionAnswer = useMutation(async (data: { index: number }) => {
    const token: string = localStorage.getItem("token") || "";
    const res = await request({
      url: `/api/quizzes/questions/check/${questionIndex}`,
      method: "post",
      data,
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });

  const handleSelect = (index: number) => {
    setIndex(index);
    const newOptions = options.map((option: Option, idx) => {
      if (idx !== index) return { ...option, selected: false };
      return { ...option, selected: true };
    });
    setOptions(newOptions);
  };

  React.useEffect(() => {
    if (checkQuestionAnswer.isSuccess) {
      console.log(checkQuestionAnswer.data.score);
      setScores((scores) => [...scores, checkQuestionAnswer.data.score]);

      if (scores.length + 1 >= quizResponse.data.questions.length) {
        scoreResponse.refetch();
      } else {
        router.push(
          router.asPath.split("?")[0] +
            "?question=" +
            quizResponse.data.questions[
              quizResponse.data.questions.indexOf(questionIndex) + 1
            ]
        );
      }
    }
    checkQuestionAnswer.isError && toast.error(checkQuestionAnswer.error);
  }, [checkQuestionAnswer.isSuccess, checkQuestionAnswer.isError]);

  React.useEffect(() => {
    if (scoreResponse.isSuccess) {
      console.log(scoreResponse.data);

      //   {
      //     "statue": "ok",
      //     "data": {
      //         "score": 0,
      //         "question": "6484b2f43123b448ce7b1752",
      //         "student": "644ab0ea250ab721c3c12975",
      //         "_id": "6492bc053126ba828bd1828f",
      //         "__v": 0
      //     }
      // }
      toast.success("Quiz Completed");
      router.push("/");
    }
  }, [scoreResponse.isSuccess]);

  React.useEffect(() => {
    if (questionResponse.data) {
      setOptions(
        questionResponse.data.options.map(
          (option: { value: string; selected: boolean }) => {
            return {
              label: option.value,
              selected: option.selected,
              value: option.value,
            };
          }
        )
      );
      setTitle(questionResponse.data.text);
    }
  }, [router.query.question, questionResponse.data]);
  React.useEffect(() => {
    if (router.isReady) {
      if (!router.query.question && quizResponse.data) {
        router.push(
          router.asPath + "?question=" + quizResponse.data.questions[0]
        );
      }

      if (quizResponse.data) {
        if (
          quizResponse.data.takenBy.filter(
            ({ user: userArray }: { user: string }) => userArray === user._id
          ).length
        ) {
          console.log(quizResponse.data);
          toast.error(
            "You have already taken this quiz :" +
              quizResponse.data.takenBy.length
          );
          router.push(
            "/years/" +
              quizResponse.data.lesson.course.year +
              "/courses/" +
              quizResponse.data.lesson.course._id +
              "/lesson/" +
              quizResponse.data.lesson._id +
              "/quiz"
          );
        }
        if (router.query.question) {
          setQuestionIndex(`${router.query.question}`);
        }
      }
    }
  }, [router.query, quizResponse.isSuccess]);

  React.useEffect(() => {
    if (router.isReady) {
      !quizResponse.data && !quizResponse.isLoading && quizResponse.refetch();
    }
  }, [router.isReady]);

  React.useEffect(() => {
    if (questionIndex) {
      questionResponse.refetch();
    }
  }, [questionIndex]);

  return quizResponse.isLoading ? (
    <div className="flex   flex-col px-[10%] mt-14 ">
      <Spinner />
    </div>
  ) : (
    <div className="flex   flex-col px-[10%] my-14 ">
      <div className="flex flex-col items-start w-full  gap-4">
        <div className="sec-title p-0 m-0">Quiz : Integraion by parts </div>

        <div className="quiz flex gap-4 justify-between w-full">
          {quizResponse.isSuccess &&
            quizResponse.data.questions?.map(
              (questionData: any, idx: number) => {
                return (
                  <div
                    key={idx}
                    className={`ball cursor-pointer w-11 h-11 flex items-center justify-center  aspect-square rounded-full text-light ${
                      questionData === questionIndex
                        ? "bg-primary"
                        : "bg-secondary"
                    }`}
                  >
                    {++idx}
                  </div>
                );
              }
            )}

          <div className="ml-auto flex items-center text-2xl gap-3"></div>
        </div>
        <h4 className="my-5 text-xl text-gray-600">Question 1 of 10</h4>
        {questionResponse.isLoading ? (
          <Spinner />
        ) : (
          <>
            <div
              className=" h-[150px] font-bold bg-gray-200 text-tprimary flex items-center justify-center rounded-xl text-2xl  contrast-100 hover:opacity-95 relative p-8  w-full"
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(title, {
                  throwOnError: false,
                  displayMode: true,
                }),
              }}
            />
            <div className="radio-button-group w-full">
              <QuizSelect
                title="Select a Quiz"
                options={options}
                onSelect={handleSelect}
                onChange={console.log}
                onAddOption={console.log}
                onDeleteOption={console.log}
                quiz={true}
              />
            </div>
            <div className="flex group w-full justify-between gap-16">
              <div
                className="btn-primary w-full"
                onClick={() => {
                  if (checkQuestionAnswer.isLoading)
                    return toast.loading("Checking your answer..");
                  if (index === null)
                    return toast.error("Select the correct answer");
                  checkQuestionAnswer.mutate({ index });
                }}
              >
                {checkQuestionAnswer.isLoading
                  ? "Submitting.."
                  : "Submit Answer"}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
