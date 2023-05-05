import React from "react";
import { BsPen } from "react-icons/bs";
import DashboardLayout from "../../../layouts/DashboardLayout";

import CreateYearModal from "@/components/CreateYearModal";
import CheckModal from "@/components/CheckModal";
import { useMutation, useQuery } from "react-query";
import request from "@/endpoints/request";
import { toast } from "react-hot-toast";
import Spinner from "@/components/Spinner";
import EditYearModal from "@/components/editYearModal";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "@/redux/store";
import { addId } from "@/redux/slices/operationSlices";

const index = () => {
  const [modal, setModal] = React.useState(false);
  const [checkModal, setCheckModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setCheckModal(false);
    setEditModal(false);
  };
  const openModal = () => setModal(true);
  const openCheckModal = () => setCheckModal(true);
  const {
    data,
    isLoading,
    mutate: createNewYearMutate,
    isSuccess,
    isError,
    error,
  } = useMutation(async (name: string) => {
    const token: string = localStorage.getItem("token") || "";
    const res = await request({
      url: `/api/years/`,
      method: "post",
      data: {
        name,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });

  const createNewYear = (name: string) => {
    !isLoading && createNewYearMutate(name);
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

  const { id } = useSelector((state: Rootstate) => state.operationsState);

  const editYearResponse = useMutation(async (data: any) => {
    const token: string = localStorage.getItem("token") || "";
    const res = await request({
      url: `/api/years/` + id,
      method: "patch",
      data,
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      console.log(res.data);
      return res.data;
    });
  });
  const dispatch = useDispatch();
  const editYearSubmit = (data: any) => {
    !editYearResponse.isLoading && editYearResponse.mutate(data);
  };

  React.useEffect(() => {
    isError && toast.error(error);
    isSuccess && toast.success("Year is created !");
    isSuccess && closeModal();
    isSuccess && yearsResponse.refetch();
  }, [isError, isSuccess]);
  React.useEffect(() => {
    editYearResponse.isError && toast.error(editYearResponse.error);
    editYearResponse.isSuccess && toast.success("Year has been edited !");
    editYearResponse.isSuccess && closeModal();
    editYearResponse.isSuccess && yearsResponse.refetch();
  }, [editYearResponse.isSuccess, editYearResponse.isError]);

  const deleteResponse = useMutation(async () => {
    const token: string = localStorage.getItem("token") || "";

    const res = await request({
      url: `/api/years/${id}`,
      method: "delete",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });

  const deleteYear = () => {
    !deleteResponse.isLoading && deleteResponse.mutate();
  };

  React.useEffect(() => {
    deleteResponse.isError && toast.error(deleteResponse.error);
    deleteResponse.isSuccess && toast.success("Year has been edited !");
    deleteResponse.isSuccess && closeModal();
    deleteResponse.isSuccess && yearsResponse.refetch();
  }, [deleteResponse.isSuccess, deleteResponse.isError]);

  return (
    <DashboardLayout>
      <>
        {modal && (
          <CreateYearModal closeModal={closeModal} onSubmit={createNewYear} />
        )}{" "}
        {editModal && (
          <EditYearModal closeModal={closeModal} onSubmit={editYearSubmit} />
        )}
        {checkModal && (
          <CheckModal closeModal={closeModal} onSubmit={deleteYear} />
        )}
        <div className="relative sm:rounded-lg flex-1 p-10 border flex flex-col gap-5">
          <div className="flex gap-1 items-center  btn-secondary  ">
            <BsPen /> Years
          </div>
          <div className="flex flex-col gap-6 bg-gray-100 p-6 rounded-xl">
            <div className="btn-primary ml-auto" onClick={openModal}>
              Add new Year
            </div>
            {yearsResponse.isLoading ? (
              <Spinner />
            ) : (
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Year
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Courses
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Students
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Lessons
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {yearsResponse.isError ? (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  ">
                      {yearsResponse.error?.error[0].message}
                    </div>
                  ) : (
                    yearsResponse.isSuccess &&
                    yearsResponse.data.map(
                      (year: { name: string; id: string }) => {
                        return (
                          <tr className="bg-white border-b   hover:bg-gray-50 ">
                            <th
                              scope="row"
                              className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                            >
                              <div className="pl-3">
                                <div className="text-base font-semibold">
                                  {year.name}
                                </div>
                              </div>
                            </th>
                            <td className="px-6 py-4">5</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">250</div>
                            </td>
                            <td className="px-6 py-4 ">360</td>
                            <td className="px-6 py-4 flex gap-2">
                              <div
                                className="btn-primary"
                                onClick={(data: any) => {
                                  dispatch(addId(year.id));
                                  setEditModal(true);
                                }}
                              >
                                Edit
                              </div>
                              <div
                                className="btn-secondary"
                                onClick={() => {
                                  dispatch(addId(year.id));
                                  openCheckModal();
                                }}
                              >
                                Delete
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )
                  )}
                </tbody>
              </table>
            )}
            {yearsResponse.data?.length === 0 && (
              <div className="alert w-full">no years found</div>
            )}
          </div>
        </div>
      </>
    </DashboardLayout>
  );
};

export default index;
