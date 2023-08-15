import request from "@/endpoints/request";
import { Rootstate } from "@/redux/store";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";

export const SubmitCard: React.FC<{
  userName: string;
  lessonName: string;
  file: string;
  id: string;
  mark: number;
  refMark: number;
  reviewed: boolean;
  getSubmit: () => void;
}> = ({
  userName,
  lessonName,
  file,
  id,
  getSubmit,
  reviewed,
  mark: studentMark,
  refMark: studentRefMark,
}) => {
  const { user } = useSelector((state: Rootstate) => state.userState);
  const [mark, setMark] = React.useState<number | null>(null);
  const [refMark, setRefMark] = React.useState<number>(10);
  const [edit, setEdit] = React.useState(false);
  const {
    data,
    isLoading,
    mutate: reviewSubmitMutation,
    isSuccess,
    isError,
    error,
  } = useMutation(async (data: { refMark: number; mark: number }) => {
    const token: string = localStorage.getItem("token") || "";

    const res = await request({
      url: `/api/submits/reviews/${id}`,
      method: "patch",
      data,
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });
  const reviewSubmit = () => {
    if (mark === null || mark < 0 || mark > refMark)
      return toast.error("Please enter a valid marks");
    if (typeof mark === "number" && typeof refMark === "number")
      !isLoading && reviewSubmitMutation({ refMark, mark });
  };

  React.useEffect(() => {
    isSuccess && setEdit(false);
    isSuccess && getSubmit();
    isError && toast.error(error as string);
  }, [isError, isSuccess, error, getSubmit]);
  return (
    <div className="flex gap-6 mb-6">
      <div className="flex-1 border p-4 flex flex-col">
        <div className="icons flex flex-col  flex-1 justify-center gap-4 max-h-[650px] ">
          <div className="group flex-1 flex flex-col gap-4  overflow-y-auto ">
            <div className=" m-0 text-xl   border-b-4 py-2 flex gap-4 md:flex-row flex-col ">
              <span className="font-bold uppercase">{userName} work :</span>{" "}
              {lessonName}
            </div>
            <div className="description py-4 max-h-[100%] overflow-y-auto flex flex-col gap-8">
              <div className="flex justify-between md:flex-row flex-col gap-6">
                <div className="text-xl font-bold">You submitted your work</div>
                {reviewed ? (
                  <div className="text-xl font-bold text-green-600">
                    Reviewed
                  </div>
                ) : (
                  <div className="text-xl font-bold text-green-600">
                    Submitted
                  </div>
                )}
              </div>
              <div className="text-lg">
                <Link
                  href={`https://e-learning-platform-server.onrender.com/files/${file}`}
                  className="text-primary font-bold underline  ml-auto"
                  target="_blank"
                >
                  Click here Download your work
                </Link>
              </div>
              <div className="flex justify-between md:flex-row flex-col gap-6">
                {reviewed && !edit ? (
                  <div className="alert md:py-0 flex items-center px-8 py-4">
                    {studentMark} / {studentRefMark}
                  </div>
                ) : (
                  <>
                    {user.isAdmin ? (
                      <div className="alert py-0 flex items-center  px-8 gap-1">
                        <input
                          type="number"
                          name="mark"
                          className="border-none border-transparent focus:border-transparent focus:ring-0 p-0 bg-transparent  w-12 appearance-text"
                          value={mark === null ? 0 : mark}
                          min={0}
                          max={1000}
                          onChange={(e) => {
                            if (
                              Number(e.target.value) > 500 ||
                              Number(e.target.value) < 0
                            )
                              return;
                            setMark(Number(e.target.value));
                          }}
                        />
                        /
                        <input
                          type="text"
                          name="mark"
                          className="border-none border-transparent focus:border-transparent focus:ring-0 p-0 bg-transparent  w-12 appearance-text"
                          value={refMark}
                          min={0}
                          max={1000}
                          onChange={(e) => setRefMark(Number(e.target.value))}
                        />
                      </div>
                    ) : (
                      <div className="alert py-0 flex items-center px-8">
                        _ / 10
                      </div>
                    )}
                  </>
                )}
                {user.isAdmin && (
                  <>
                    {!reviewed || edit ? (
                      <div
                        className="btn btn-primary px-8 ml-auto  w-full  md:w-fit"
                        onClick={reviewSubmit}
                      >
                        {isLoading ? "Loading..." : "Submit"}
                      </div>
                    ) : (
                      <div
                        className="btn btn-primary px-8 ml-auto  w-full  md:w-fit"
                        onClick={() => {
                          setEdit(true);
                          console.log(edit);
                        }}
                      >
                        Edit marks
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
