import React from "react";
import Spinner from "./Spinner";
import { Rootstate } from "@/redux/store";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import request from "@/endpoints/request";
import useSocket from "@/custom-hooks/useSocket";

const ChatContent: React.FC<{
  loading: boolean;
  chatData: {
    _id: string;
    users: [
      {
        name: string;
        _id: string;
      }
    ];
  };
}> = ({ loading, chatData }) => {
  const socket = useSocket();

  console.log(chatData);

  const { user, token } = useSelector((state: Rootstate) => state.userState);

  const messagesResponse = useQuery(
    `messages`,
    async () => {
      const token: string = localStorage.getItem("token") || "";

      const res = await request({
        url: `/api/messages/${chatData._id}`,
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
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

  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<any>([]);

  const [toUser, setToUser] = React.useState<{
    name: string;
    _id: string;
  }>({
    name: "",
    _id: "",
  });

  const {
    data,
    isLoading,
    mutate: createNewMessage,
    isSuccess,
    isError,
    error,
  } = useMutation(async (data: { content: string }) => {
    const token: string = localStorage.getItem("token") || "";

    const res = await request({
      url: `/api/messages/${chatData._id}`,
      method: "post",
      data,
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });

  const onSendButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(chatData._id);
    createNewMessage({
      content: message,
    });

    setMessage("");
  };

  React.useEffect(() => {
    socket.on("new message", (newMessage) => {
      setMessages((prev: any) => [...prev, newMessage]);
    });
  });

  React.useEffect(() => {
    isSuccess && console.log(data);
    isSuccess && socket.emit("new message", data);
  }, [isSuccess]);

  React.useEffect(() => {
    if (!loading && chatData) {
      socket.emit("join room", chatData._id);
      messagesResponse.refetch();
      setToUser(
        chatData.users.filter(
          (userChat: { _id: string }) => userChat._id !== user._id
        )[0]
      );
    }
  }, [loading, chatData]);

  React.useEffect(() => {
    messagesResponse.data && setMessages(messagesResponse.data);
  }, [messagesResponse.data]);
  return (
    <div className="flex-1  h-full flex flex-col">
      {loading ? (
        <Spinner />
      ) : (
        chatData && (
          <>
            <div className="h-[75px] border-b flex justify-between items-center w-full px-5 py-2 shadow-sm">
              <div className="flex items-center">
                <p className="font-semibold ml-3 text-slate-600">
                  {toUser.name}
                </p>
              </div>
            </div>
            <div className="flex flex-col h-full overflow-y-hidden">
              <div className="flex-1 px-10 py-4 overflow-y-auto">
                {/* messages */}
                {messages?.map(
                  (messageItem: {
                    _id: string;
                    sender: { _id: string };
                    content: string;
                  }) => {
                    console.log(messageItem);
                    if (messageItem.sender._id === user._id) {
                      return (
                        <>
                          <div className="w-full flex justify-end mt-3">
                            <div className="w-1/2 ">
                              <div className="flex items-center justify-end">
                                <p className="font-semibold mr-3 text-sm text-slate-600">
                                  Me{" "}
                                  <span className="text-slate-400 text-xs">
                                    3:25 PM
                                  </span>
                                </p>
                              </div>
                              <div className="mt-1 w-full bg-blue-500 p-4 rounded-b-xl rounded-tl-xl">
                                <p className=" text-sm text-white">
                                  {messageItem.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                    return (
                      <>
                        <div className="w-full flex flex-start overflow-y-auto">
                          <div className="w-1/2">
                            <div className="flex items-center">
                              <p className="font-semibold ml-3 text-sm text-slate-600">
                                {toUser.name}
                                <span className="text-slate-400 text-xs">
                                  3:21 PM
                                </span>
                              </p>
                            </div>
                            <div className="mt-3 w-full bg-slate-50 p-4 rounded-b-xl rounded-tr-xl">
                              <p className=" text-sm text-slate-500">
                                {messageItem.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  }
                )}
              </div>
              <div className=" w-full  px-5 py-3">
                <form
                  className="h-12 flex justify-between px-3 items-center border border-transparent bg-slate-50 rounded-lg"
                  onSubmit={onSendButton}
                >
                  <input
                    type="text"
                    className="text-input"
                    placeholder="Type your message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                  />
                  <div className="flex items-center space-x-4">
                    <button
                      className={`btn-primary rounded-none ${
                        (!message || isLoading) && "bg-gray-400 border-gray-400"
                      }`}
                      disabled={!message || isLoading}
                      onClick={() => console.log(message || isLoading)}
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default ChatContent;
