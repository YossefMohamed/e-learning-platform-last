import useOuterClick from "@/custom-hooks/useOuterClick";
import request from "@/endpoints/request";
import React from "react";
import Spinner from "@/components/Spinner";
import { useQuery } from "react-query";
const CreateCourseModal: React.FC<{
  closeModal: () => void;
  onSubmit: (data: { name: string; year: string }) => void;
}> = ({ closeModal, onSubmit }) => {
  const { ref, out }: { ref: any; out: boolean } = useOuterClick();
  const yearsResponse = useQuery("years", async () => {
    const res = await request({
      url: `/api/years/`,
      method: "get",
    }).then((res) => {
      console.log(res.data);
      return res.data;
    });

    return res;
  });
  const [name, setName] = React.useState("");
  const [year, setYear] = React.useState("");

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
        className="fixed z-[999]  top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-1/2 p-5 border  shadow-lg rounded-md bg-white"
        ref={ref}
        onSubmit={(e) => {
          e.preventDefault();

          onSubmit({ name, year });
        }}
      >
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
                >
                  <option selected disabled>
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
              <button className="btn-primary w-full">Create</button>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default CreateCourseModal;
