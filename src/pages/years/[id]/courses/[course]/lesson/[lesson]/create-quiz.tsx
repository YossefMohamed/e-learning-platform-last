import QuizSelect, { Option } from "@/components/QuizSelect";
import Spinner from "@/components/Spinner";
import request from "@/endpoints/request";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPlus, BsStopwatch } from "react-icons/bs";
import { useQuery } from "react-query";
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
      console.log(index);
      return { ...option, selected: true };
    });
    setOptions(newOptions);
    console.log(options);
  };
  const onChangeValue = (index: number, value: string) => {
    console.log(index, value);
    const newOptions = options.map((option: Option, idx) => {
      if (idx !== index) return { ...option, selected: false };
      return { ...option, value: value };
    });
    console.log(newOptions, "here");
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
  React.useEffect(() => {
    if (router.isReady) {
      !quizResponse.data && quizResponse.refetch();
    }
  }, [router, quizResponse]);

  return quizResponse.isLoading ? (
    <div className="flex   flex-col px-[10%] mt-14 ">
      <Spinner />
    </div>
  ) : (
    <div className="flex   flex-col px-[10%] mt-14 ">
      <div className="flex flex-col items-start w-full  gap-4">
        <div className="sec-title p-0 m-0">Quiz : Integraion by parts </div>
        <div className="quiz flex gap-4 justify-between w-full">
          {quizResponse.isSuccess &&
            quizResponse.data.questions?.map((_: any, idx: number) => {
              return (
                <div
                  key={idx}
                  onClick={() => router.push()}
                  className="ball w-11 h-11 flex items-center justify-center bg-primary aspect-square rounded-full text-light"
                >
                  1
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
              if (!title) {
                toast.error("Add a valid question");
                return;
              }

              setQuestions((prev: any) => [
                ...prev,
                {
                  title,
                  options,
                },
              ]);
              setTitle("");
              console.log(questions);
              setIndex((prev) => ++prev);
            }}
          >
            Next
          </div>
        </div>
        <div className="btn-primary w-full">submit</div>
      </div>
    </div>
  );
}

export default Quiz;
