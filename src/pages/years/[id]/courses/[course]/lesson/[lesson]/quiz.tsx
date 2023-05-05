import React from "react";
import LessonLayout from "../../../../../../../../layouts/LessonLayout";
import Link from "next/link";

function Quiz() {
  const [video, setVideo] = React.useState(false);

  React.useEffect(() => {
    setVideo(true);
  }, []);

  return (
    <LessonLayout>
      <>
        {/* <div className="flex gap-6">
          <div className="flex-1 border p-4 flex flex-col">
            <div className="icons flex flex-col  flex-1 justify-center gap-4 max-h-[650px] ">
              <div className="group flex-1 flex flex-col gap-4  overflow-y-auto ">
                <div className=" m-0 text-xl   border-b-4 py-2">
                  <span className="font-bold uppercase">Quiz :</span>{" "}
                  Integration by parts rule with examples
                </div>
                <div className="description py-4 max-h-[100%] overflow-y-auto flex flex-col gap-8">
                  <div className="grade ">
                    Start your quiz and once you take it the grade will be
                    appear here
                  </div>
                  <div className="alert flex">_ / 10</div>

                  <Link href="/quiz/123" className="btn btn-primary px-8 ">
                    Start your quiz
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </>
      <div className="flex gap-6">
        <div className="flex-1 border p-4 flex flex-col">
          <div className="icons flex flex-col  flex-1 justify-center gap-4 max-h-[650px] ">
            <div className="group flex-1 flex flex-col gap-4  overflow-y-auto ">
              <div className=" m-0 text-xl   border-b-4 py-2">
                <span className="font-bold uppercase">Quiz :</span> Integration
                by parts rule with examples
              </div>
              <div className="description py-4 max-h-[100%] overflow-y-auto flex flex-col gap-8">
                <div className="grade ">
                  There is now quizes for this lesson
                </div>

                <Link href="/quiz/123" className="btn btn-primary px-8 ">
                  Create a quiz
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}

export default Quiz;
