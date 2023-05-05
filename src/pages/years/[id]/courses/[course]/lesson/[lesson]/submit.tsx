import React from "react";
import LessonLayout from "../../../../../../../../layouts/LessonLayout";

function Submit() {
  const [video, setVideo] = React.useState(false);

  React.useEffect(() => {
    setVideo(true);
  }, []);

  return (
    <LessonLayout>
      <>
        <div className="flex gap-6">
          <div className="flex-1 border p-4 flex flex-col">
            <div className="icons flex flex-col  flex-1 justify-center gap-4 max-h-[650px] ">
              <div className="group flex-1 flex flex-col gap-4  overflow-y-auto ">
                <div className=" m-0 text-xl   border-b-4 py-2">
                  <span className="font-bold uppercase">
                    Submit your work :
                  </span>{" "}
                  Integration by parts rule with examples
                </div>
                <div className="description py-4 max-h-[100%] overflow-y-auto flex flex-col gap-8">
                  <div className="flex justify-between">
                    <div className="text-xl font-bold">
                      Upload your solutions
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      Submitted
                    </div>
                  </div>
                  <input
                    className="block w-full text-sm text-gray-900 border  rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
                    id="Assignment"
                    type="file"
                    onChange={console.log}
                  />
                  <div className="flex justify-between">
                    <div className="alert py-0 flex items-center px-8">
                      _ / 10
                    </div>
                    <div className="btn btn-primary px-8 ml-auto">Submit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </LessonLayout>
  );
}

export default Submit;
