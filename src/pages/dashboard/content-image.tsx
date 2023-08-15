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
const ContentImage = () => {
  const {
    data,
    isLoading,
    mutate: uploadContentImage,
    isSuccess,
    isError,
    error,
  } = useMutation(async (data: FormData) => {
    const token: string = localStorage.getItem("token") || "";
    console.table(data);
    const res = await request({
      url: `/api/content/`,
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

  React.useEffect(() => {
    isSuccess && toast.success("Image Uploaded");
  }, [isError, isSuccess]);

  const [image, setImage] = React.useState<any>();

  return (
    <DashboardLayout>
      <>
        <>
          <div className="flex flex-col gap-6 bg-gray-100 p-6 rounded-xl">
            <div className="overflow-auto">
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <div className="bg-red-300 w-full">
                    {[
                      { name: "Section One", slug: "home1.png" },
                      { name: "Section Two", slug: "home2.png" },
                      { name: "Years Page", slug: "home3.png" },
                    ].map(
                      (
                        { name, slug }: { name: string; slug: string },
                        idx: number
                      ) => {
                        return (
                          <form
                            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                              e.preventDefault();
                              if (!image)
                                return toast.error("Please select an image");
                              const formData = new FormData();
                              formData.append("name", slug);
                              formData.append("image", image);
                              uploadContentImage(formData);
                            }}
                          >
                            <tr
                              className="bg-white border-b  hover:bg-gray-50 flex flex-col md:flex-row"
                              key={idx}
                            >
                              <th
                                scope="row"
                                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap flex-1  justify-center"
                              >
                                <div className="pl-3">
                                  <div className="text-base font-semibold">
                                    {name}
                                  </div>
                                </div>
                              </th>

                              <td className="px-6 py-4 flex gap-2 flex-1 justify-center">
                                <input
                                  type="file"
                                  id="image"
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) => {
                                    if (e.target.files) {
                                      setImage(e.target.files[0]);
                                    }
                                  }}
                                />
                              </td>

                              <td className="px-6 py-4 flex gap-2 flex-1 justify-center">
                                <button type="submit" className="btn-primary">
                                  Edit image
                                </button>
                              </td>
                            </tr>
                          </form>
                        );
                      }
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      </>
    </DashboardLayout>
  );
};

export default ContentImage;
