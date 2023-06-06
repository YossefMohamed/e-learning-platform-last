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
function Quiz() {
  const { token, user } = useSelector((state: Rootstate) => state.userState);
  const [index, setIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState<string | null>(null);
  const [options, setOptions] = useState<Option[]>([
    {
      label: "",
      selected: false,
      value: "",
    },
    {
      label: "",
      value: "",
      selected: false,
    },
  ]);
  const [title, setTitle] = useState("");
  const handleSelect = (index: number) => {
    const newOptions = options.map((option: Option, idx) => {
      if (idx !== index) return { ...option, selected: false };
      return { ...option, selected: true };
    });
    setOptions(newOptions);
  };
  const onChangeValue = (index: number, value: string) => {
    const newOptions = options.map((option: Option, idx) => {
      if (idx !== index) return { ...option, selected: false };
      return { ...option, value: value };
    });
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions((prev) => [
      ...prev,
      {
        label: "",
        value: "",
        selected: false,
      },
    ]);
  };

  const deleteOption = (index: number) => {
    const newOptions = options.filter((option: Option, idx) => {
      if (idx !== index) return { ...option, selected: false };
    });
    setOptions(newOptions);
  };

  const router = useRouter();
  const quizResponse = useQuery(
    "quiz",
    async () => {
      const res = await request({
        url: `/api/quizzes/${router.query.quiz}`,
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
    }
  );

  const {
    data,
    isLoading,
    mutate: createNewQuestion,
    isSuccess,
    isError,
    error,
  } = useMutation(async (data: any) => {
    const token: string = localStorage.getItem("token") || "";
    console.log(data);
    const res = await request({
      url: `/api/quizzes/questions/${router.query.quiz}`,
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

  const editCurrentQuestionResponse = useMutation(async (data: any) => {
    const token: string = localStorage.getItem("token") || "";
    console.log(data);
    const res = await request({
      url: `/api/quizzes/questions/${questionIndex}`,
      method: "patch",
      data,
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });

  const handleOnSubmit = () => {
    if (!isLoading) {
      if (questionIndex && questionIndex !== "new") {
        editCurrentQuestionResponse.mutate({
          options,
          text: title,
        });
      } else {
        createNewQuestion({
          options,
          text: title,
        });
      }
    }

    isSuccess && quizResponse.refetch();
    isSuccess &&
      router.push(router.asPath.split("&question=")[0] + "&question=new");
    editCurrentQuestionResponse.isSuccess && quizResponse.refetch();
    editCurrentQuestionResponse.isSuccess &&
      router.push(router.asPath.split("&question=")[0] + "&question=new");
  };

  const questionResponse = useQuery(
    "question",
    async () => {
      const res = await request({
        url: `/api/quizzes/questions/${router.query.question}`,
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
  React.useEffect(() => {
    !user.isAdmin && router.push("/");
    if (router.isReady) {
      if (router.query.question) {
        router.query.question && setQuestionIndex(`${router.query.question}`);
        router.query.question &&
          !questionResponse.isLoading &&
          questionResponse.refetch();
      }
      !quizResponse.data && quizResponse.refetch();
    }
    if (!router.query.question) {
      setOptions([
        {
          label: "",
          selected: false,
          value: "",
        },
        {
          label: "",
          value: "",
          selected: false,
        },
      ]);
    }
  }, [router.query]);

  React.useEffect(() => {
    if (isSuccess) {
      setOptions([
        {
          label: "",
          selected: false,
          value: "",
        },
        {
          label: "",
          value: "",
          selected: false,
        },
      ]);
      setTitle("");
      setIndex((prev) => ++prev);
      quizResponse.refetch();
    }
    isError && toast.error(error);
  }, [isError, isSuccess, error]);

  React.useEffect(() => {
    if (questionResponse.data && router.query.question !== "new") {
      console.log(questionResponse.data);
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
    } else {
      setOptions([
        {
          label: "",
          selected: false,
          value: "",
        },
        {
          label: "",
          value: "",
          selected: false,
        },
      ]);
      setTitle("");
    }
  }, [router.query.question, questionResponse.data]);
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
                    onClick={() => {
                      router.push(
                        router.asPath.split("&question=")[0] +
                          "&question=" +
                          questionData
                      );
                    }}
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
          <div
            onClick={() => {
              router.push(router.asPath.split("&question=")[0]);
            }}
            className="ball w-11 h-11 flex items-center justify-center bg-primary aspect-square rounded-full text-light cursor-pointer"
          >
            <BsPlus />
          </div>
          <div className="ml-auto flex items-center text-2xl gap-3">
            <input
              type="number"
              name=""
              id=""
              className="text-input w-16"
              max={300}
              maxLength={300}
            />{" "}
            <BsStopwatch />
          </div>
        </div>
        <h4 className="my-5 text-xl text-gray-600">Question 1 of 10</h4>
        {questionResponse.isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className=" text-3xl font-bold w-full">
              <textarea
                className="text-input  text-2xl py-4 h-[200px] text-center border-4 border-secondary w-full 
            hover:border-4 hover:border-primary  focus:border-primary focus:border-4
              resize-none bg-gray-100
             align-middle
             "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                aria-multiline
                placeholder="Add a new question"
              />
            </div>
            <div className="radio-button-group w-full">
              <QuizSelect
                title="Select a Quiz"
                options={options}
                onSelect={handleSelect}
                onChange={onChangeValue}
                onAddOption={addOption}
                onDeleteOption={deleteOption}
              />
            </div>
            <div className="flex group w-full justify-between gap-16">
              <div
                className="btn-primary w-full"
                onClick={() => {
                  if (isLoading || editCurrentQuestionResponse.isLoading) {
                    toast.loading("submitting the question");
                    return;
                  }
                  if (!title) {
                    toast.error("Add a valid question");
                    return;
                  }
                  if (!options.some((e) => e.selected === true)) {
                    toast.error("Select the correct answer");
                    return;
                  }
                  if (options.some((e) => !e.value)) {
                    toast.error("Some answers are empty");
                    return;
                  }
                  handleOnSubmit();
                }}
              >
                {isLoading || editCurrentQuestionResponse.isLoading ? (
                  <Spinner />
                ) : (
                  "Submit Question"
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
