import UpdatePasswordModal from "@/components/UpdatePasswordModal";
import React from "react";
import { BsPersonBadge } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import ProfileLayout from "../../layouts/ProfileLayout";
import { Rootstate } from "@/redux/store";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import request from "@/endpoints/request";
import { toast } from "react-hot-toast";

function Profile() {
  const [modal, setModal] = React.useState(false);
  const { user } = useSelector((state: Rootstate) => state.userState);
  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => setModal(true);

  const editUserResponse = useMutation(async (data: any) => {
    const token: string = localStorage.getItem("token") || "";
    const res = await request({
      url: `/api/users/` + user._id,
      method: "patch",
      data,
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      console.log(res.data);
      return res.data;
    });

    return res;
  });

  const onSubmit = (data: {
    password: string;
    passwordConfirmation: string;
  }) => {
    if (!data.password || !data.passwordConfirmation)
      return toast.error("Please fill all fields");
    if (data.password !== data.passwordConfirmation)
      return toast.error("Passwords do not match");
    editUserResponse.mutate(data);
  };

  React.useEffect(() => {
    if (editUserResponse.isSuccess) {
      closeModal();
      toast.success("Password updated successfully");
    } else {
      editUserResponse.isError && toast.error(editUserResponse.error as string);
    }
  }, [editUserResponse.isSuccess, editUserResponse.isError]);

  return (
    <ProfileLayout>
      <>
        {modal && (
          <div className="absolute top-0">
            <UpdatePasswordModal closeModal={closeModal} onSubmit={onSubmit} />
          </div>
        )}

        <div className="right flex-1 p-10 ">
          <div className="info flex flex-col gap-4">
            <div className="flex flex-col ">
              <div className="btn-secondary">My profile</div>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl flex  flex-col gap-5">
              <div className="flex flex-col ">
                <span className="label">Name :</span>
                <input
                  type="text"
                  className="text-input font-bold"
                  value={user.name}
                  disabled
                ></input>
              </div>

              <div className="flex flex-col ">
                <span className="label">Phone Number :</span>
                <input
                  type="text"
                  className="text-input font-bold"
                  value={user.phoneNumber}
                  disabled
                ></input>
              </div>
            </div>
            <div className="btn-primary ml-auto" onClick={openModal}>
              Update Password
            </div>
          </div>
        </div>
      </>
    </ProfileLayout>
  );
}

export default Profile;
