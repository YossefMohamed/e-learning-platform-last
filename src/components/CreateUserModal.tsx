import useOuterClick from "@/custom-hooks/useOuterClick";
import request from "@/endpoints/request";
import React from "react";
import { useQuery } from "react-query";
import Spinner from "./Spinner";
import { BsX } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Rootstate } from "@/redux/store";

const CreateUserModal: React.FC<{
  closeModal: () => void;
  onSubmit: (data: any) => void;
}> = ({ closeModal, onSubmit }) => {
  const [name, setName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [year, setYear] = React.useState("");
  const [course, setCourse] = React.useState("");
  const { ref, out }: { ref: any; out: boolean } = useOuterClick();
  const { token } = useSelector((state: Rootstate) => state.userState);
  const coursesRespone = useQuery(
    "courses",
    async () => {
      const res = await request({
        url: `/api/courses/${year}`,
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((res) => {
        console.log(res.data);
        return res.data;
      });

      return res;
    },
    {
      enabled: false,
    }
  );

  React.useEffect(() => {
    // year && alert("haha");
    year && coursesRespone.refetch();
  }, [year]);

  const yearsResponse = useQuery("years", async (year) => {
    const res = await request({
      url: `/api/years/`,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      console.log(res.data);
      return res.data;
    });

    return res;
  });

  React.useEffect(() => {
    out && closeModal();
  }, [out, closeModal]);

  const onSubmitForm = () => {
    onSubmit({
      name,
      phoneNumber,
      password,
      passwordConfirmation,
      isAdmin,
      status,
      year,
      course,
      userType: isAdmin ? "admin" : "parent",
    });
  };

  return (
    <>
      <div
        className="fixed   inset-0 z-[999]  bg-gray-600 bg-opacity-50 overflow-y-auto h-screen w-full"
        id="my-modal"
      />

      <form
        className="fixed z-[999] block top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2  p-5 border  shadow-lg rounded-md bg-white md:w-1/2 md:max-h-[75%] overflow-auto w-full h-full "
        ref={ref}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitForm();
        }}
      >
        <div
          className="p-3 cursor-pointer absolute top-1 right-1"
          onClick={closeModal}
        >
          <BsX size={20} />
        </div>
        {yearsResponse.isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="sec-title p-0 m-0 border-0">Create New User</div>

            <div className="mt-3  flex flex-col gap-4">
              <div className="group">
                <label className="label">Student Name</label>
                <input
                  type="text"
                  name=""
                  id=""
                  className="text-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Student's full name"
                />
              </div>

              <div className="group">
                <label className="label">Student phone number</label>
                <input
                  type="text"
                  name=""
                  id=""
                  className="text-input"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Student's full name"
                />
              </div>

              <div className="group">
                <label className="label">Student Password</label>
                <input
                  type="password"
                  name=""
                  id=""
                  value={password}
                  className="text-input"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Student's password"
                />
              </div>

              <div className="group">
                <label className="label">Student Password confirmation</label>
                <input
                  type="password"
                  name=""
                  id=""
                  value={passwordConfirmation}
                  className="text-input"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="retype Student's password"
                />
              </div>

              <div className="group">
                <label className="label">Student Year</label>

                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option selected disabled>
                    Choose a year
                  </option>
                  {yearsResponse.data?.map(
                    (year: { name: string; id: string }) => {
                      return (
                        <option value={year.id} key={year.id}>
                          {year.name}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>

              <div className="group">
                <label className="label">Student Course</label>

                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  onChange={(e) => setCourse(e.target.value)}
                  disabled={!yearsResponse.data}
                >
                  <option selected>Choose a course</option>
                  {coursesRespone.data?.map(
                    (course: { name: string; id: string }) => {
                      return (
                        <option value={course.id} key={course.id}>
                          {course.name}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>

              <div className="group">
                <label className="label">Student Status</label>

                <select
                  id="Status"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option selected disabled>
                    Choose a course
                  </option>
                  <option value={"active"}>active</option>
                  <option value={"suspanded"}>suspanded</option>
                </select>
              </div>
              <div className="group">
                <label className="label">Student's Authority</label>

                <select
                  id="Authority"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  onChange={(e) => setIsAdmin(Boolean(e.target.value))}
                >
                  <option value="true">Admin</option>
                  <option value="false" selected>
                    Student
                  </option>
                  <option value="parent">
                    Parent
                  </option>
                </select>
              </div>

              <button className="btn-primary w-full">Create</button>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default CreateUserModal;