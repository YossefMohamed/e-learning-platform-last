import React from "react";
import LessonLayout from "../../../../layouts/LessonLayout";
import { useMutation, useQuery } from "react-query";
import request from "@/endpoints/request";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Rootstate } from "@/redux/store";
import { toast } from "react-hot-toast";
import { SubmitCard } from "@/components/SubmitCard";

function Submit() {
  const router = useRouter();
  const { user } = useSelector((state: Rootstate) => state.userState);

  const [file, setFile] = React.useState<any>("");

  const submitResponse = useQuery(
    "submit",
    async () => {
      const res = await request({
        url: `/api/submits/${router.query.lesson}`,

        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token") || "",
        },
      }).then((res) => {
        return res.data;
      });
      return res;
    },
    {
      enabled: false,
      cacheTime: 0,
    }
  );

  const {
    data,
    isLoading,
    mutate: createSubmit,
    isSuccess,
    isError,
    error,
  } = useMutation(async (data: any) => {
    const token: string = localStorage.getItem("token") || "";

    const res = await request({
      url: `/api/submits/${router.query.lesson}`,
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

  const createSubmitHandler = async () => {
    const formData = new FormData();

    formData.append("file", file);
    !isLoading && createSubmit(formData);
  };

  React.useEffect(() => {
    if (router.isReady && user) {
      !submitResponse.data && submitResponse.refetch();
    }
  }, [router, submitResponse, user]);

  React.useEffect(() => {
    isSuccess && submitResponse.refetch();
    isError && toast.error(error as string);
  }, [isError, isSuccess, error, submitResponse]);

  return (
    <LessonLayout>
      <>
        {submitResponse.isLoading ? (
          <Spinner />
        ) : submitResponse.data && submitResponse.data.length ? (
          submitResponse.data.map(
            (submit: {
              _id: string;
              user: {
                name: string;
              };
              lesson: {
                name: string;
              };
              file: string;
              refMark: number;
              mark: number;
              reviewed: boolean;
            }) => (
              <SubmitCard
                key={submit._id}
                id={submit._id}
                userName={submit.user.name}
                lessonName={submit.lesson.name}
                file={submit.file}
                refMark={submit.refMark}
                mark={submit.mark}
                reviewed={submit.reviewed}
                getSubmit={submitResponse.refetch}
              />
            )
          )
        ) : (
          submitResponse.data && (
            <div className="flex gap-6">
              <div className="flex-1 border p-4 flex flex-col">
                <div className="icons flex flex-col  flex-1 justify-center gap-4 max-h-[650px] ">
                  <div className="group flex-1 flex flex-col gap-4  overflow-y-auto ">
                    <div className=" m-0 text-xl   border-b-4 py-2">
                      <span className="font-bold uppercase">
                        Submit your work to be reviewed
                      </span>
                    </div>
                    <div className="description py-4 max-h-[100%] overflow-y-auto flex flex-col gap-8">
                      <div className="flex justify-between">
                        <div className="text-xl font-bold">
                          Upload your solutions
                        </div>
                        <div className="text-xl font-bold text-red-600">
                          Not Submitted
                        </div>
                      </div>
                      <input
                        className="block w-full text-sm text-gray-900 border  rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
                        id="Assignment"
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files) {
                            setFile(e.target.files[0]);
                          }
                        }}
                      />
                      <div className="flex justify-between">
                        <div className="alert py-0 flex items-center px-8">
                          _ / 10
                        </div>
                        <div
                          className="btn btn-primary px-8 ml-auto"
                          onClick={createSubmitHandler}
                        >
                          {isLoading ? "Submitting" : "Submit"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </>
    </LessonLayout>
  );
}

export default Submit;
