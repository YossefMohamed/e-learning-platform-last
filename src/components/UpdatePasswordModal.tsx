import useOuterClick from "@/custom-hooks/useOuterClick";
import React from "react";
import { BsX } from "react-icons/bs";

const UpdatePasswordModal: React.FC<{
  closeModal: () => void;
  onSubmit: (data: { password: string; passwordConfirmation: string }) => void;
}> = ({ closeModal, onSubmit }) => {
  const { ref, out }: { ref: any; out: boolean } = useOuterClick();
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

  React.useEffect(() => {
    out && closeModal();
  }, [out, closeModal]);

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
          onSubmit({
            password,
            passwordConfirmation,
          });
        }}
      >
        <div
          className="p-3 cursor-pointer absolute top-1 right-1"
          onClick={closeModal}
        >
          <BsX size={20} />
        </div>
        <>
          <div className="sec-title p-0 m-0 border-0">Edit a Course</div>

          <div className="mt-3  flex flex-col gap-4">
            <div className="sub-group">
              <label className="label mb-1">Enter new password</label>

              <input
                type="text"
                name="course"
                id="course"
                className="text-input"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="new password"
              />
            </div>
            <div className="sub-group">
              <label className="label mb-1">Renter new password</label>

              <input
                type="text"
                name="course"
                id="course"
                className="text-input"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                value={passwordConfirmation}
                placeholder="password confirmation"
              />
            </div>

            <button className="btn-primary w-full">Create</button>
          </div>
        </>
      </form>
    </>
  );
};

export default UpdatePasswordModal;
