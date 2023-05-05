import React from "react";
import { BsBook, BsPerson } from "react-icons/bs";
import DashboardLayout from "../../../layouts/DashboardLayout";
import CreateUserModal from "@/components/CreateUserModal";
import EditUserModal from "@/components/EditUserModal";
import CheckModal from "@/components/CheckModal";
import { useMutation, useQuery } from "react-query";
import request from "@/endpoints/request";
import { toast } from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addId } from "@/redux/slices/operationSlices";
import { Rootstate } from "@/redux/store";

const index = () => {
  const [modal, setModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [checkModal, setCheckModal] = React.useState(false);
  const [year, setYear] = React.useState("");
  const [name, setName] = React.useState("");
  const closeModal = () => {
    setModal(false);
    setCheckModal(false);
    setEditModal(false);
  };
  const openModal = () => setModal(true);
  const openCheckModal = () => setCheckModal(true);
  const dispatch = useDispatch();
  const usersResponse = useQuery("users", async () => {
    const token: string = localStorage.getItem("token") || "";

    const res = await request({
      url: `/api/users/all`,
      params: {
        year,
        name,
      },
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });
  const {
    data,
    isLoading,
    mutate: createNewUser,
    isSuccess,
    isError,
    error,
  } = useMutation(async (data: any) => {
    const token: string = localStorage.getItem("token") || "";
    const res = await request({
      url: `/api/users/signup`,
      method: "post",
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

  const createNewUserSubmit = (data: any) => {
    !isLoading && createNewUser(data);
  };

  const yearsResponse = useQuery("years", async () => {
    const res = await request({
      url: `/api/years/`,
      method: "get",
    }).then((res) => {
      return res.data;
    });

    return res;
  });
  React.useEffect(() => {
    usersResponse.refetch();
  }, [year, name]);

  const { id } = useSelector((state: Rootstate) => state.operationsState);
  const editUserResponse = useMutation(async (data: any) => {
    const token: string = localStorage.getItem("token") || "";
    const res = await request({
      url: `/api/users/` + id,
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

  const editUserSubmit = (data: any) => {
    !editUserResponse.isLoading && editUserResponse.mutate(data);
  };

  React.useEffect(() => {
    isError && toast.error(error);
    isSuccess && toast.success("User is created !");
    isSuccess && usersResponse.refetch();
    isSuccess && closeModal();
  }, [isError, isSuccess]);

  React.useEffect(() => {
    usersResponse.isError && toast.error(usersResponse.error);
  }, [usersResponse.isError, usersResponse.isSuccess]);

  React.useEffect(() => {
    editUserResponse.isError && toast.error(editUserResponse.error);
    editUserResponse.isSuccess && toast.success("User has been edited !");
    editUserResponse.isSuccess && usersResponse.refetch();
    editUserResponse.isSuccess && closeModal();
  }, [editUserResponse.isError, editUserResponse.isSuccess]);

  return (
    <DashboardLayout>
      <>
        {modal && (
          <CreateUserModal
            closeModal={closeModal}
            onSubmit={createNewUserSubmit}
          />
        )}
        {editModal && (
          <EditUserModal closeModal={closeModal} onSubmit={editUserSubmit} />
        )}
        {checkModal && (
          <CheckModal closeModal={closeModal} onSubmit={console.log} />
        )}
        <div className="relative sm:rounded-lg flex-1 p-10 border flex flex-col gap-5">
          <div className="flex gap-1 items-center  btn-secondary  ">
            <BsPerson /> Users
          </div>
          <div className="flex flex-col gap-6 bg-gray-100 p-6 rounded-xl">
            <div className="group flex gap-4">
              {!yearsResponse.isLoading && (
                <div className="flex-1">
                  <select
                    id="years"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option selected value="All years">
                      All years
                    </option>
                    {yearsResponse.data?.map(
                      (year: { name: string; id: string }) => {
                        return <option value={year.id}>{year.name}</option>;
                      }
                    )}
                  </select>
                </div>
              )}
              <div className="flex-1">
                <input
                  type="text"
                  name=""
                  placeholder="Users name"
                  id=""
                  className="text-input"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="btn-primary ml-auto" onClick={openModal}>
                Add User
              </div>
            </div>

            {usersResponse.isLoading ? (
              <Spinner />
            ) : (
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Year
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Course
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {usersResponse.data?.map(
                    (user: {
                      name: string;
                      phoneNumber: string;
                      year: { name: string };
                      course: { name: string };
                      status: string;
                      id: string;
                    }) => {
                      return (
                        <tr
                          className="bg-white border-b hover:bg-gray-50 "
                          key={user.id}
                        >
                          <th
                            scope="row"
                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                          >
                            <img
                              className="w-10 h-10 rounded-full"
                              src="/kid-learn.png"
                              alt="Jese image"
                            />
                            <div className="pl-3">
                              <div className="text-base font-semibold">
                                {user.name}
                              </div>
                              <div className="font-normal text-gray-500">
                                {user.phoneNumber}
                              </div>
                            </div>
                          </th>
                          <td className="px-6 py-4">{user.year?.name}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {user.course?.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 ">
                            {user.status === "active" ? (
                              <span className="text-green-600 font-bold p-1 rounded uppercase">
                                {user.status}
                              </span>
                            ) : (
                              <span className="text-yellow-600 font-bold p-1 rounded uppercase">
                                {user.status}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 flex gap-2">
                            <div
                              className="btn-primary"
                              onClick={(data: any) => {
                                dispatch(addId(user.id));
                                setEditModal(true);
                              }}
                            >
                              Edit
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            )}
            {usersResponse.data?.length === 0 && (
              <div className="alert w-full">no users found</div>
            )}
          </div>
        </div>
      </>
    </DashboardLayout>
  );
};

export default index;
