import useOuterClick from "@/custom-hooks/useOuterClick";
import React, { useState } from "react";
import { BsX } from "react-icons/bs";

const Modal: React.FC<{
  closeModal: () => void;
  onSubmit: (name: string) => void;
}> = ({ closeModal, onSubmit }) => {
  const { ref, out }: { ref: any; out: boolean } = useOuterClick();
  React.useEffect(() => {
    out && closeModal();
  }, [out, closeModal]);
  const [name, setName] = useState("");
  return (
    <>
      <div
        className="fixed  inset-0 z-[999]  bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="my-modal"
      />

      <div
        className="fixed z-[999]  top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 md:w-1/2 w-full  h-[100%] md:h-fit  flex items-center p-5 border  shadow-lg rounded-md bg-white"
        ref={ref}
      >
        <form
          className="w-full"
          ref={ref}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(name);
          }}
        >
          <div
            className="absolute top-2 right-2 text-2xl cursor-pointer"
            onClick={closeModal}
          >
            <BsX />
          </div>

          <div>
            <div className="sec-title p-0 m-0 border-0 text-left mb-5 font-bold">
              Unit name
            </div>
            <input
              type="text"
              name=""
              id="unitName"
              placeholder="Enter Unit Name"
              className="text-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button className="btn-primary w-full mt-2">Submit</button>
        </form>
      </div>
    </>
    // <div className="h-full w-full fixed top-0  text-4xl z-[9999] bg-opacity-30 flex justify-center items-center bg-red-300">
    //   <div className="w-full h-full absolute -z-10 top-0 right-0"></div>
    // <form
    //   className="flex flex-col relative w-1/2 bg-light min-h-[150px] p-10 gap-4 text-base border rounded-xl shadow-2xl"
    //   ref={ref}
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     onSubmit(name);
    //   }}
    // >
    //   <div
    //     className="absolute top-6 right-6 text-2xl cursor-pointer"
    //     onClick={closeModal}
    //   >
    //     <BsX />
    //   </div>

    //   <div>
    //     <label className="label">Unit name</label>
    //     <input
    //       type="text"
    //       name=""
    //       id="unitName"
    //       placeholder="Enter Unit Name"
    //       className="text-input"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //   </div>
    //   <button className="btn-primary w-full mt-2">Submit</button>
    // </form>
    // </div>
  );
};

export default Modal;
