import React from "react";
import TextArea from "@/components/TextArea";
import { useMutation, useQuery } from "react-query";
import request from "@/endpoints/request";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Spinner from "@/components/Spinner";
function EditLesson() {
  const [extra, setExtra] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const router = useRouter();

  const {
    data,
    isLoading,
    mutate: editLesson,
    isSuccess,
    isError,
    error,
  } = useMutation(async (data: any) => {
    const token: string = localStorage.getItem("token") || "";
    const res = await request({
      url: `/api/lessons/${router.query.lesson}`,
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

  const lessonResponse = useQuery(
    "lesson",
    async () => {
      const res = await request({
        url: `/api/lessons/lesson/${router.query.lesson}`,
        method: "get",
      }).then((res) => {
        return res.data;
      });
      return res;
    },
    {
      enabled: false,
    }
  );

  React.useEffect(() => {
    if (router.isReady) {
      lessonResponse.refetch();
    }
  }, [router.isReady]);

  React.useEffect(() => {
    isSuccess && router.push(`/lesson/${router.query.lesson}`);
    isSuccess && toast.success("Lesson updated successfully");
    isError && toast.error(error as string);
  }, [isError, isSuccess, error]);

  const onSubmit = async () => {
    editLesson({
      name,
      description,
      extra,
    });
  };

  return lessonResponse.isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className="p-10 min-h-screen max-h-fit">
        <div className="sec-title w-fit flex items-center gap-4">
          Lecture name
        </div>
        <input
          type="text"
          className="text-input"
          placeholder="Lecture name.."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="sec-title w-fit">Lecture Description</div>
        <TextArea value={description} setValue={setDescription} />
        <div className="sec-title w-fit">Extra resources</div>
        <TextArea value={extra} setValue={setExtra} />

        <div className="btn-primary mt-16 text-light" onClick={onSubmit}>
          {isLoading ? <Spinner /> : "Submit"}
        </div>
      </div>
    </>
  );
}

export default EditLesson;
