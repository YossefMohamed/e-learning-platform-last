import QuizSelect, { Option } from "@/components/QuizSelect";
import React, { useState } from "react";
import { BsPlus, BsStopwatch } from "react-icons/bs";
function Quiz() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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
  const handleSelect = (index: number) => {
    const newOptions = options.map((option: Option, idx) => {
      if (idx !== index) return { ...option, selected: false };
      return { ...option, selected: true };
    });
    console.log(newOptions);

    setOptions(newOptions);
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
  return (
    <div className="flex   flex-col px-[10%] mt-14 ">
      <div className="flex flex-col items-start w-full  gap-4">
        <div className="sec-title p-0 m-0">Quiz : Integraion by parts </div>
        <div className="quiz flex gap-4 justify-between w-full">
          <div className="ball w-11 h-11 flex items-center justify-center bg-primary aspect-square rounded-full text-light">
            1
          </div>
          <div className="ball w-11 h-11 flex items-center justify-center bg-primary aspect-square rounded-full text-light">
            <BsPlus />
          </div>
          <div className="ml-auto flex items-center text-2xl gap-3">
            <input type="text" name="" id="" className="text-input w-16" />{" "}
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
          <div className="btn-primary w-full">Previous</div>
          <div className="btn-primary w-full">Next</div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
