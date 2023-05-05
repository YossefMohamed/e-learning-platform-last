import useOuterClick from "@/custom-hooks/useOuterClick";
import React from "react";

const CreateYearModal: React.FC<{
  closeModal: () => void;
  onSubmit: (name: string) => void;
}> = ({ closeModal, onSubmit }) => {
  const { ref, out }: { ref: any; out: boolean } = useOuterClick();
  React.useEffect(() => {
    out && closeModal();
  }, [out, closeModal]);
  const [name, setName] = React.useState("");
  return (
    <>
      <div
        className="fixed  inset-0 z-[999]  bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="my-modal"
      />

      <form
        className="fixed z-[999]  top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-1/2 p-5 border  shadow-lg rounded-md bg-white"
        ref={ref}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(name);
        }}
      >
        <div className="sec-title p-0 m-0 border-0">Create New Year</div>

        <div className="mt-3  flex flex-col gap-4">
          <div className="group">
            <label className="label">Year name</label>
            <input
              type="text"
              name=""
              id=""
              className="text-input"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <button className="btn-primary w-full">Create</button>
        </div>
      </form>
    </>
  );
};

export default CreateYearModal;
