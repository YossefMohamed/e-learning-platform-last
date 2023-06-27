import request from "@/endpoints/request";
import { Rootstate } from "@/redux/store";
import React from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";

const ChatUser: React.FC<{
  name: string;
  _id: string;
}> = ({ name, _id }) => {
  const { token } = useSelector((state: Rootstate) => state.userState);

  const {
    data,
    isLoading,
    mutate: createNewChat,
    isSuccess,
    isError,
    error,
  } = useMutation(async (data: any) => {
    const res = await request({
      url: `/api/chats/`,
      method: "post",
      data: {
        users: [_id],
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      console.log(res.data);
      return res.data;
    });

    return res;
  });

  React.useEffect(() => {
    isLoading &&
      toast.loading(`Create Chat with ${name}`, {
        duration: 2000,
      });
    data && toast.success("Chat has been created");
  }, [data, isLoading]);

  return (
    <div
      className="px-5 py-4  border-b  flex items-center   cursor-pointer  hover:bg-slate-100"
      onClick={createNewChat}
    >
      <div className="ml-4">
        <p
          x-text="user.name"
          className="text-md font-semibold text-slate-600 m-0 p-0"
        >
          {name}
        </p>
        <p
          className="text-xs text-slate-400 -mt-0.5 font-semibold"
          x-text="user.email"
        >
          is is long ipsum avaliable...
        </p>
      </div>
    </div>
  );
};

export default ChatUser;
