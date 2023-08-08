import useOuterClick from "@/custom-hooks/useOuterClick";
import React from "react";
import { BsX } from "react-icons/bs";

const CreateYearModal: React.FC<{
  closeModal: () => void;
  onSubmit: (formData: FormData) => void;
}> = ({ closeModal, onSubmit }) => {
  const { ref, out }: { ref: any; out: boolean } = useOuterClick();

  React.useEffect(() => {
    out && closeModal();
  }, [out, closeModal]);
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState<any>("");

  return (
    <>
      <div
        className="fixed  inset-0 z-[999]  bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="my-modal"
      />

      <form
        className="fixed z-[999]  top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 md:w-1/2 flex justify-center flex-col w-full h-[100%] md:h-fit p-5 border  shadow-lg rounded-md bg-white"
        ref={ref}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append("name", name);
          formData.append("image", image);
          onSubmit(formData);
        }}
      >
        <div
          className="p-3 cursor-pointer absolute top-1 right-1"
          onClick={closeModal}
        >
          <BsX size={20} />
        </div>
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
          <div>
            <label className="label">Upload course image</label>
            <input
              className="block w-full text-sm text-gray-900 border  rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
              id="image"
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>
          <button className="btn-primary w-full">Create</button>
        </div>
      </form>
    </>
  );
};

export default CreateYearModal;
