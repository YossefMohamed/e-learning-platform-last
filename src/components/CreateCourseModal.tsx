import useOuterClick from "@/custom-hooks/useOuterClick";
import request from "@/endpoints/request";
import React from "react";
import Spinner from "@/components/Spinner";
import { useQuery } from "react-query";
import { Rootstate } from "@/redux/store";
import { useSelector } from "react-redux";
import { BsX } from "react-icons/bs";
const CreateCourseModal: React.FC<{
  closeModal: () => void;
  onSubmit: (data: FormData) => void;
}> = ({ closeModal, onSubmit }) => {
  const { ref, out }: { ref: any; out: boolean } = useOuterClick();

  const { token } = useSelector((state: Rootstate) => state.userState);
  const yearsResponse = useQuery("years", async () => {
    const res = await request({
      url: `/api/years/`,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });
  const [name, setName] = React.useState("");
  const [year, setYear] = React.useState("");
  const [image, setImage] = React.useState<any>("");

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
          const formData = new FormData();
          formData.append("name", name);
          formData.append("year", year);
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
        {yearsResponse.isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="sec-title p-0 m-0 border-0">Create New Course</div>

            <div className="mt-3  flex flex-col gap-4">
              <div className="group">
                <label className="label">Course name</label>
                <input
                  type="text"
                  name="course"
                  id="course"
                  className="text-input"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Course's name"
                />
              </div>

              <div className="group">
                <label className="label">Course year</label>

                <select
                  id="years"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  onChange={(e) => setYear(e.target.value)}
                  defaultValue={"Choose a year"}
                >
                  <option disabled value="Choose a year">
                    Choose a year
                  </option>

                  {yearsResponse.data?.map(
                    ({ name, id }: { name: string; id: string }) => {
                      return (
                        <option value={id} key={id}>
                          {name}
                        </option>
                      );
                    }
                  )}
                </select>
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
          </>
        )}
      </form>
    </>
  );
};

export default CreateCourseModal;
