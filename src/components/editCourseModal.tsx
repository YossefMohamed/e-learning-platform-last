import useOuterClick from "@/custom-hooks/useOuterClick";
import request from "@/endpoints/request";
import React from "react";
import Spinner from "@/components/Spinner";
import { useQuery } from "react-query";
const EditCourseModal: React.FC<{
  closeModal: () => void;
  onSubmit: (data: { name: string }) => void;
}> = ({ closeModal, onSubmit }) => {
  const { ref, out }: { ref: any; out: boolean } = useOuterClick();

  const [name, setName] = React.useState("");

  React.useEffect(() => {
    out && closeModal();
  }, [out, closeModal]);

  const onSubmitOutter = () => {
    onSubmit({ name });
  };

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

          onSubmit({ name });
        }}
      >
        <>
          <div className="sec-title p-0 m-0 border-0">Create New Course</div>

          <div className="mt-3  flex flex-col gap-4">
            <div className="group">
              <label className="label">Course name</label>
              <input
                type="text"
                name="course"
                id="course"
                className="text-input"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Course's name"
              />
            </div>

            <button className="btn-primary w-full" onClick={onSubmitOutter}>
              Create
            </button>
          </div>
        </>
      </form>
    </>
  );
};

export default EditCourseModal;
