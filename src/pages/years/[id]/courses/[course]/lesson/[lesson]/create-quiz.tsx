import QuizSelect, { Option } from "@/components/QuizSelect";
import Spinner from "@/components/Spinner";
import request from "@/endpoints/request";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPlus, BsStopwatch } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
function Quiz() {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState<any>([]);
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

  const handleOnSubmit = () => {
    !isLoading &&
      createNewQuestion({
        options,
        text: title,
      });
    isSuccess && quizResponse.refetch();
  };

  React.useEffect(() => {
    if (router.isReady) {
      if (!router.query.question) {
        router.push(router.asPath + "&question=" + "new");
      }
      !quizResponse.data && quizResponse.refetch();
    }
  }, [router, quizResponse]);

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
            quizResponse.data.questions?.map((_: any, idx: number) => {
              return (
                <div
                  key={idx}
                  onClick={() => router.push("/awd")}
                  className="ball w-11 h-11 flex items-center justify-center bg-primary aspect-square rounded-full text-light"
                >
                  {++idx}
                </div>
              );
            })}
          <div className="ball w-11 h-11 flex items-center justify-center bg-primary aspect-square rounded-full text-light">
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
        <div className=" text-3xl font-bold w-full">
          <textarea
            className="text-input  text-2xl py-4 h-[200px] text-center border-4 border-transparent w-full 
            hover:border-4 hover:border-primary  focus:border-primary focus:border-4
             border-primary resize-none
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
          {index ? (
            <div
              className="btn-primary w-full"
              onClick={() => setIndex((prev) => --prev)}
            >
              Previous
            </div>
          ) : (
            ""
          )}
          <div
            className="btn-primary w-full"
            onClick={() => {
              if (isLoading) {
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
            {isLoading ? <Spinner /> : "Next"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
