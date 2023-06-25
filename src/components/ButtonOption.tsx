import React, { useRef, useState } from "react";
import { BsCheck, BsTrash, BsTrashFill } from "react-icons/bs";
import { Option } from "./QuizSelect";
import CheckModal from "./CheckModal";
import katex from "katex";

interface ButtonOptionProps {
  option: Option;
  idx: number;
  onSelect: (idx: number) => void;
  onChange?: ((index: number, value: string) => void) | undefined;
  onDeleteOption: (index: number) => void;
  quiz?: boolean;
}

function ButtonOption({
  option,
  idx,
  onSelect,
  onChange,
  onDeleteOption,
  quiz,
}: ButtonOptionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    // Normalize the value of the input field
    // If there is an onChange handler, call it
    if (onChange && ref) {
      const value = ref?.current!.innerText || "";

      onChange(idx, value);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!option.label && !option.value) {
      e.currentTarget.textContent = "";
    }
  };
  const colors = [
    ["rgb(67 156 166)", "rgb(46 110 116)"],
    ["rgb(230 173 45)", "rgb(193 138 21)"],

    ["#446bae", "#304c7b"],
    ["rgb(207 83 110)", "rgb(181 45 74)"],
  ];
  const [closeModal, setCloseModal] = useState(false);
  return (
    <>
      {closeModal && (
        <CheckModal
          closeModal={() => setCloseModal(false)}
          onSubmit={() => {
            setCloseModal(false);
            onDeleteOption(idx);
          }}
        />
      )}
      <button
        key={option.label}
        className={`flex-1 flex-grow-1 w-full md:w-0  h-[250px] flex items-center justify-center rounded-xl text-2xl text-light contrast-100 hover:opacity-95 relative p-8 hover:-translate-y-1`}
        style={{
          backgroundColor: colors[idx][0],
          boxShadow: `0px 10px  ${colors[idx][1]}`,
        }}
      >
        <div
          className="absolute top-1 right-1 p-3"
          onClick={() => onSelect(idx)}
        >
          <div className="  h-5 w-5 flex items-center justify-center rounded-full bg-light text-tsecondary">
            {option.selected && <BsCheck />}
          </div>
        </div>

        {idx !== 0 && idx !== 1 && !quiz && (
          <div
            className="  absolute top-1 left-1 p-3 flex items-center justify-center  text-light
       opacity-80 hover:opacity-100 "
            onClick={() => setCloseModal(true)}
          >
            {<BsTrashFill />}
          </div>
        )}
        {quiz ? (
          <div
            contentEditable={!quiz}
            placeholder="Add an answer"
            onInput={handleInput}
            onClick={handleClick}
            ref={ref}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(
                (option.label && option.value) || "Add new Answer",
                {
                  throwOnError: false,
                  displayMode: true,
                }
              ),
            }}
            suppressContentEditableWarning={true}
            className="max-w-full w-full overflow-auto flex justify-center items-center h-full border-0 outline-0 focus:border-0 focus:outline-0 focus:-0 text-light p-1 align-middle"
          ></div>
        ) : (
          <div
            contentEditable={!quiz}
            placeholder="Add an answer"
            onInput={handleInput}
            onClick={handleClick}
            ref={ref}
            suppressContentEditableWarning={true}
            className="max-w-full w-full overflow-auto h-fit max-h-full border-0 outline-0 focus:border-0 focus:outline-0 focus:-0 text-light p-1 align-middle"
          >
            {(option.label && option.value) || "Add new Answer"}
          </div>
        )}
      </button>
    </>
  );
}

export default ButtonOption;
