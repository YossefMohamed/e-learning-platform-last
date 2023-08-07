import UpdatePasswordModal from "@/components/UpdatePasswordModal";
import React from "react";
import { BsPersonBadge } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import ProfileLayout from "../../layouts/ProfileLayout";
import { Rootstate } from "@/redux/store";
import { useSelector } from "react-redux";

function Profile() {
  const [modal, setModal] = React.useState(false);
  const { user } = useSelector((state: Rootstate) => state.userState);
  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => setModal(true);
  return (
    <ProfileLayout>
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
    </ProfileLayout>
  );
}

export default Profile;
