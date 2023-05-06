import React, { useState } from "react";
import dynamic from "next/dynamic";

export interface Option {
  label: string;
  value: string;
  selected: boolean;
}

interface QuizSelectProps {
  title: string;
  options: Option[];
  onSelect: (index: number) => void;
  onChange?: (index: number, value: string) => void;
  onAddOption: () => void;
  onDeleteOption: (index: number) => void;
}
import { BsCheck, BsPlus } from "react-icons/bs";
import ButtonOption from "./ButtonOption";
import randomColor from "randomcolor";

function QuizSelect(props: QuizSelectProps) {
  return (
    <div className="my-10">
      <div className="flex  gap-4">
        {props.options.map((option, idx) => {
          return (
            <ButtonOption
              option={option}
              idx={idx}
              key={idx}
              onSelect={() => props.onSelect(idx)}
              onChange={props.onChange}
              onDeleteOption={props.onDeleteOption}
            />
          );
        })}
        {props.options.length < 4 && (
          <button
            className={`bg-primary shadow-[0px_10px_black] flex-1 flex-grow-1 w-0 h-[250px] flex items-center justify-center rounded-xl text-6xl text-light contrast-100 hover:opacity-95 relative p-8`}
            onClick={() => props.onAddOption()}
          >
            <BsPlus />
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizSelect;
