import request from "@/endpoints/request";
import { Rootstate } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import CheckModal from "./CheckModal";

interface QuizCardProps {
  idx: number;
  _id: string;
  takenBy: [
    {
      user: string;
      score: number;
    }
  ];
  questions: [string];

  onDeleteQuiz: () => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  idx,
  _id,
  takenBy,
  questions,
  onDeleteQuiz,
}) => {
  const { user } = useSelector((state: Rootstate) => state.userState);
  const router = useRouter();

  const [closeModal, setCloseModal] = React.useState(false);
  const deleteQuiz = useMutation(async () => {
    const token: string = localStorage.getItem("token") || "";
    const res = await request({
      url: `/api/quizzes/${_id}`,
      method: "delete",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });

  React.useEffect(() => {
    onDeleteQuiz();
  }, [deleteQuiz.isSuccess, onDeleteQuiz]);
  return (
    <div className="flex gap-6" key={_id}>
      {closeModal && (
        <CheckModal
          closeModal={() => setCloseModal(false)}
          onSubmit={() => {
            setCloseModal(false);
            deleteQuiz.mutate();
          }}
        />
      )}
      <div className="flex-1 border p-4 flex flex-col">
        <div className="icons flex flex-col  flex-1 justify-center gap-4 max-h-[650px] ">
          <div className="group flex-1 flex flex-col gap-4  overflow-y-auto ">
            <div className=" m-0 text-xl   border-b-4 py-2">
              <span className="font-bold uppercase">Quiz {idx + 1}:</span>{" "}
              Integration by parts rule with examples
            </div>
            <div className="description py-4 max-h-[100%] overflow-y-auto flex flex-col gap-8">
              <div className="grade ">
                {takenBy.filter(
                  ({ user: userArray }: { user: string }) =>
                    userArray === user._id
                ).length
                  ? "You have already taken this quiz"
                  : "Start your quiz and once you take it the grade will be appear here"}
              </div>
              <div className="alert flex">
                {!takenBy.filter(
                  ({ user: userArray }: { user: string }) =>
                    userArray === user._id
                ).length
                  ? "_"
                  : takenBy.filter(
                      ({ user: userArray }: { user: string }) =>
                        userArray === user._id
                    )[0].score}{" "}
                / {questions.length}
              </div>
              <div className="flex md:flex-row flex-col gap-4">
                {!takenBy.filter(
                  ({ user: userArray }: { user: string }) =>
                    userArray === user._id
                ).length && questions.length ? (
                  <Link
                    href={`/quiz/${_id}`}
                    className="btn btn-primary px-8 w-full md:w-fit "
                  >
                    Start your quiz
                  </Link>
                ) : (
                  ""
                )}
                {user.isAdmin && (
                  <div
                    onClick={() =>
                      router.push("/quiz/" + "/create-quiz?quiz=" + _id)
                    }
                    className="btn btn-secondary px-8 w-full md:w-fit "
                  >
                    Edit this quiz
                  </div>
                )}

                {user.isAdmin && (
                  <div
                    onClick={() => {
                      setCloseModal(true);
                    }}
                    className="btn btn-secondary px-8 bg-danger border-danger text-light w-full md:w-fit "
                  >
                    Delete this quiz
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
