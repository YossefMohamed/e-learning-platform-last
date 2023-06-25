import ChatUser from "@/components/ChatUser";
import request from "@/endpoints/request";
import { Rootstate } from "@/redux/store";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

const index = () => {
  const [year, setYear] = React.useState("");

  const { token } = useSelector((state: Rootstate) => state.userState);

  const yearsResponse = useQuery("years", async () => {
    const res = await request({
      url: `/api/years/`,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });

  return (
    <div className=" flex m-6 border h-[90vh]">
      {/* sidebar 2 */}
      <div className="w-[30%] bg-slate-50 border-r flex flex-col">
        <div className="h-[75px] border-b border-r px-4 flex items-center justify-center space-x-4">
          <div className="px-4 py-4 border-b-4 border-b-blue-500">All</div>
          {!yearsResponse.isLoading && (
            <div className="flex-1">
              <select
                id="years"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option selected value="All years">
                  All years
                </option>
                {yearsResponse.data?.map(
                  (year: { name: string; id: string }) => {
                    return <option value={year.id}>{year.name}</option>;
                  }
                )}
              </select>
            </div>
          )}
        </div>
        <div className="h-full ">
          <ChatUser />
          <ChatUser />
          <ChatUser />
          <ChatUser />
        </div>
      </div>
      <div className="flex-1  h-full flex flex-col">
        <div className="h-[75px] border-b flex justify-between items-center w-full px-5 py-2 shadow-sm">
          <div className="flex items-center">
            <p className="font-semibold ml-3 text-slate-600">Mircel Jones</p>
          </div>
        </div>
        <div className="flex-1 px-10 py-4">
          {/* messages */}
          <div className="w-full flex flex-start overflow-y-auto">
            <div className="w-1/2">
              <div className="flex items-center">
                <img
                  className="h-5 w-5 overflow-hidden rounded-full"
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                  alt=""
                />
                <p className="font-semibold ml-3 text-sm text-slate-600">
                  Mircel Jones{" "}
                  <span className="text-slate-400 text-xs">3:21 PM</span>
                </p>
              </div>
              <div className="mt-3 w-full bg-slate-50 p-4 rounded-b-xl rounded-tr-xl">
                <p className=" text-sm text-slate-500">
                  Hey all, <br />
                  There are many variation of passages of Lorem ipsum avaliable,
                  but the jority have alternation in some form , by injected
                  humor, or randomise words which don't look even slightly
                  believable.
                </p>
              </div>
            </div>
          </div>
          {/* me */}
          <div className="w-full flex justify-end mt-3">
            <div className="w-1/2 ">
              <div className="flex items-center justify-end">
                <p className="font-semibold mr-3 text-sm text-slate-600">
                  Me <span className="text-slate-400 text-xs">3:25 PM</span>
                </p>
                <img
                  className="h-5 w-5 overflow-hidden rounded-full"
                  src="https://source.unsplash.com/random/500x500/?face"
                  alt=""
                />
              </div>
              <div className="mt-3 w-full bg-blue-500 p-4 rounded-b-xl rounded-tl-xl">
                <p className=" text-sm text-white">
                  Hey, <br />
                  we are own hidden lake forest which is netural lake are
                  generaly found in mountain.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="  w-full  px-5 py-3">
          <div className="h-12 flex justify-between px-3 items-center border border-transparent bg-slate-50 rounded-lg">
            <input
              type="text"
              className="text-input"
              placeholder="Type your message"
            />
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 stroke-slate-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 stroke-slate-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
