import React from "react";
import { BsPen, BsPerson } from "react-icons/bs";
import DashboardLayout from "../../../layouts/DashboardLayout";
import CheckModal from "@/components/CheckModal";
import { useMutation, useQuery } from "react-query";
import request from "@/endpoints/request";
import { toast } from "react-hot-toast";
import Spinner from "@/components/Spinner";
import CreateCourseModal from "@/components/CreateCourseModal";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "@/redux/store";
import { addId } from "@/redux/slices/operationSlices";
import EditCourseModal from "@/components/editCourseModal";
const CoursesPage = () => {
  const [modal, setModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [checkModal, setCheckModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setEditModal(false);
    setCheckModal(false);
  };
  const openModal = () => setModal(true);
  const openEditModal = () => setEditModal(true);
  const openCheckModal = () => setCheckModal(true);
  const {
    data,
    isLoading,
    mutate: createNewYearMutate,
    isSuccess,
    isError,
    error,
  } = useMutation(async (data: FormData) => {
    const token: string = localStorage.getItem("token") || "";
    console.table(data);
    const res = await request({
      url: `/api/courses/`,
      method: "post",
      data,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });

  const createNewCourse = (data: FormData) => {
    !isLoading && createNewYearMutate(data);
  };

    const { token } = useSelector((state: Rootstate) => state.userState);

  const coursesResponse = useQuery("coursesDashboard", async () => {

    const res = await request({
      url: `/api/courses/`,
      method: "get",
        headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      return res.data;
    });
    return res;
  });
  const { id } = useSelector((state: Rootstate) => state.operationsState);

  const deleteResponse = useMutation(async () => {
    const token: string = localStorage.getItem("token") || "";

    const res = await request({
      url: `/api/courses/${id}`,
      method: "delete",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });
  const dispatch = useDispatch();

  const deleteCourse = () => {
    !deleteResponse.isLoading && deleteResponse.mutate();
  };

 

  React.useEffect(() => {
    deleteResponse.isError && toast.error(deleteResponse.error as string);
    deleteResponse.isSuccess && toast.success("Course is deleted !");
    deleteResponse.isSuccess && closeModal();
            // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [
    deleteResponse.isError,
    deleteResponse.isSuccess,
    deleteResponse.error,
  ]);

  const editCourseResponse = useMutation(async (data: any) => {
    const token: string = localStorage.getItem("token") || "";
    const res = await request({
      url: `/api/courses/` + id,
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

  const editCourseSubmit = (data: any) => {
    !editCourseResponse.isLoading && editCourseResponse.mutate(data);
  };

  React.useEffect(() => {
    editCourseResponse.isError && toast.error(error as string);
    editCourseResponse.isSuccess && toast.success("Course has been updated !");
    editCourseResponse.isSuccess && closeModal();
        // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [
    editCourseResponse.isError,
    editCourseResponse.isSuccess,
    error,
  ]);

  if(isSuccess||deleteResponse.isSuccess ||   editCourseResponse.isSuccess){
    coursesResponse.refetch();
   }


  return (
    <DashboardLayout>
      <>
        {modal && (
          <CreateCourseModal
            closeModal={closeModal}
            onSubmit={createNewCourse}
          />
        )}
        {editModal && (
          <EditCourseModal
            closeModal={closeModal}
            onSubmit={editCourseSubmit}
          />
        )}

        {checkModal && (
          <CheckModal closeModal={closeModal} onSubmit={deleteCourse} />
        )}
        <>
          <div className="flex flex-col gap-6 bg-gray-100 p-6 rounded-xl">
            <div className="btn-primary ml-auto" onClick={openModal}>
              Add Course
            </div>
            <div className="overflow-auto">
              {coursesResponse.isLoading ? (
                <Spinner />
              ) : (
                <table className="w-full text-sm text-left text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Course
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Students
                      </th>
                      <th scope="col" className="px-6 py-3">
                        lessons
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Year
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {coursesResponse.isError ? (
                      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 ">
                        {coursesResponse.error as string}
                      </div>
                    ) : (
                      coursesResponse.isSuccess &&
                      coursesResponse.data?.map(
                        (course: {
                          name: string;
                          id: string;
                          year: { name: string };
                          students: [any];
                          lessons: [any];
                        }) => {
                          console.log(course);
                          return (
                            <tr
                              className="bg-white border-b  hover:bg-gray-50 "
                              key={course.id}
                            >
                              <th
                                scope="row"
                                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                              >
                                <div className="pl-3">
                                  <div className="text-base font-semibold">
                                    {course.name}
                                  </div>
                                </div>
                              </th>
                              <td className="px-6 py-4">
                                {" "}
                                {course.students.length}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  {course.lessons.length}
                                </div>
                              </td>
                              <td className="px-6 py-4 ">
                                {course.year?.name}
                              </td>
                              <td className="px-6 py-4 flex gap-2">
                                <div
                                  className="btn-primary"
                                  onClick={() => {
                                    dispatch(addId(course.id));
                                    openEditModal();
                                  }}
                                >
                                  Edit
                                </div>
                                <div
                                  className="btn-secondary"
                                  onClick={() => {
                                    dispatch(addId(course.id));
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
            </div>
            {coursesResponse.data?.length === 0 && (
              <div className="alert w-full">no courses found</div>
            )}
          </div>
        </>
      </>
    </DashboardLayout>
  );
};

export default CoursesPage;
