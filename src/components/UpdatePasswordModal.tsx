import useOuterClick from "@/custom-hooks/useOuterClick";
import React from "react";
import { BsX } from "react-icons/bs";

const UpdatePasswordModal: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const { ref, out }: { ref: any; out: boolean } = useOuterClick();
  React.useEffect(() => {
    out && closeModal();
  }, [out, closeModal]);
  return (
    <>
      <div
        className="fixed  inset-0 z-[999]  bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="my-modal"
      />

      <div
        className="fixed z-[999]  top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-1/2 p-5 border  shadow-lg rounded-md bg-white"
        ref={ref}
      >
        <div className="sec-title p-0 m-0 border-0">Update password</div>

        <div className="mt-3  flex flex-col gap-4">
          <div className="group">
            <label className="label">New password</label>
            <input type="text" name="" id="" className="text-input" />
          </div>

          <div className="group">
            <label className="label">retype your new password</label>
            <input type="text" name="" id="" className="text-input" />
          </div>

          <div className="btn-primary w-full">Update password</div>
        </div>
      </div>
    </>
  );
};

export default UpdatePasswordModal;
