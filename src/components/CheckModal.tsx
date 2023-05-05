import useOuterClick from "@/custom-hooks/useOuterClick";
import React from "react";

const CheckModal: React.FC<{
  closeModal: () => void;
  onSubmit: () => void;
}> = ({ closeModal, onSubmit }) => {
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
        className="fixed z-[999]  top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-1/4 p-5 border  shadow-lg rounded-md bg-white"
        ref={ref}
      >
        <div className="mt-3  flex flex-col gap-4">
          <div className="sec-title p-0 m-0 border-0 text-left">
            Delete User
          </div>

          <div className="group label">
            This resource will not be able to accessed any more and the resource
            will be deleted from the database forever <br />
            Are you sure?
          </div>
          <div className="flex gap-4">
            <div
              className="btn-primary w-full btn-secondary"
              onClick={onSubmit}
            >
              Delete
            </div>
            <div className="btn-primary w-full" onClick={closeModal}>
              Cancel
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckModal;
