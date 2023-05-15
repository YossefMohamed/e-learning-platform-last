import React from "react";

function Quiz() {
  return (
    <div className="flex   flex-col px-[10%] mt-14 ">
      <div className="flex flex-col items-start w-full  gap-4">
        <div className="sec-title p-0 m-0">Quiz : Integraion by parts </div>
        <div className="quiz flex gap-4">
          <div className="ball w-11 h-11 flex items-center justify-center bg-primary aspect-square rounded-full text-light">
            1
          </div>
          <div className="ball w-11 h-11 flex items-center justify-center bg-primary aspect-square rounded-full text-light">
            2
          </div>
          <div className="ball w-11 h-11 flex items-center justify-center bg-primary aspect-square rounded-full text-light">
            3
          </div>
          <div className="ball w-11 h-11 flex items-center justify-center bg-primary aspect-square rounded-full text-light">
            4
          </div>
          <div className="ball w-11 h-11 flex items-center justify-center bg-primary aspect-square rounded-full text-light">
            5
          </div>
          <div className="ball w-11 h-11 flex items-center justify-center bg-primary aspect-square rounded-full text-light">
            6
          </div>
          <div className="ball w-11 h-11 flex items-center justify-center bg-primary aspect-square rounded-full text-light">
            7
          </div>
          <div className="ball w-11 h-11 flex items-center justify-center bg-gray-500 aspect-square rounded-full text-light">
            8
          </div>
          <div className="ball w-11 h-11 flex items-center justify-center bg-gray-500 aspect-square rounded-full text-light">
            9
          </div>
        </div>
        <h4 className="my-5 text-xl text-gray-600">Question 1 of 10</h4>
        <div className="mb-4 text-3xl font-bold">
          What type of framework is Next.js?
        </div>
        <div className="radio-button-group w-full">
          <div className="flex items-center w-full  py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-primary rounded-xl">
            <input
              type="radio"
              className="w-6 h-6 bg-primary"
              id="html"
              name="fav_language"
              value="HTML"
            />
            <label htmlFor="html">Reactjs framework</label>
          </div>
          <div className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-primary rounded-xl">
            <input
              type="radio"
              name="fav_language"
              className="w-6 h-6 bg-primary"
            />
            <p className="ml-6 ">Reactjs framework</p>
          </div>
          <div className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-primary rounded-xl">
            <input
              type="radio"
              name="fav_language"
              className="w-6 h-6 bg-primary"
            />
            <p className="ml-6 ">Reactjs framework</p>
          </div>
          <div className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-primary rounded-xl">
            <input
              type="radio"
              name="fav_language"
              className="w-6 h-6 bg-primary"
            />
            <p className="ml-6 ">Reactjs framework</p>
          </div>
        </div>
        <div className="flex group w-full justify-between gap-16">
          <div className="btn-primary w-full">Previous</div>
          <div className="btn-primary w-full">Next</div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
