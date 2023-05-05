import React from "react";
import { BsPen, BsPlayBtn } from "react-icons/bs";
import { FaFile } from "react-icons/fa";

import TextArea from "@/components/TextArea";
import { useMutation } from "react-query";
import request from "@/endpoints/request";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Spinner from "@/components/Spinner";

function Add() {
  const [extra, setExtra] = React.useState("");
  const [quiz, setQuiz] = React.useState("");
  const [video, setVideo] = React.useState<any>("");
  const [name, setName] = React.useState("");
  const [assignment, setAssignment] = React.useState<any>("");
  const [file, setFile] = React.useState<any>("");
  const [description, setDescription] = React.useState("");

  const router = useRouter();
  const {
    data,
    isLoading,
    mutate: createNewLesson,
    isSuccess,
    isError,
    error,
  } = useMutation(async (data: any) => {
    const token: string = localStorage.getItem("token") || "";

    const res = await request({
      url: `/api/lessons/${router.query.course}/${router.query.unit}`,
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

  const onSubmit = () => {
    const formData = new FormData();

    formData.append("video", video);
    formData.append("assignment", assignment);
    formData.append("file", file);
    formData.append("name", name);
    formData.append("extra", extra);
    formData.append("quiz", quiz);
    formData.append("description", description);
    !isLoading && createNewLesson(formData);
  };

  React.useEffect(() => {
    isSuccess &&
      router.push(`/years/${router.query.id}/courses/${router.query.course}`);
    isError && toast.error(error);
  }, [isError, isSuccess, error]);

  return (
    <div className="p-10 min-h-screen max-h-fit">
      <div className="sec-title w-fit flex items-center gap-4">
        Lecture Video <BsPlayBtn />
      </div>
      <input
        className="block w-full text-sm text-gray-900 border  rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
        id="Video"
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setVideo(e.target.files[0]);
          }
        }}
        accept="video/mp4,video/x-m4v,video/*"
      />
      <div className="sec-title w-fit flex items-center gap-4">
        Lecture File <FaFile />
      </div>
      <input
        className="block w-full text-sm text-gray-900 border  rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
        id="File"
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <div className="sec-title w-fit flex items-center gap-4">
        Lecture Assignment <BsPen />
      </div>
      <input
        className="block w-full text-sm text-gray-900 border  rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
        id="Assignment"
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setAssignment(e.target.files[0]);
          }
        }}
      />

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

      <div className="sec-title w-fit">Quiz</div>
      <TextArea value={quiz} setValue={setQuiz} />

      <div className="btn-primary mt-16 text-light" onClick={onSubmit}>
        {isLoading ? <Spinner /> : "Submit"}
      </div>
    </div>
  );
}

export default Add;
