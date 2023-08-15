import ChatContent from "@/components/ChatContent";
import ChatUser from "@/components/ChatUser";
import Spinner from "@/components/Spinner";
import request from "@/endpoints/request";
import { Rootstate } from "@/redux/store";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

const IndexMessages = () => {
  const [year, setYear] = React.useState("All years");
  const [name, setName] = React.useState("");

  const { token, user } = useSelector((state: Rootstate) => state.userState);
  const usersResponse = useQuery("users", async () => {
    const token: string = localStorage.getItem("token") || "";

    const res = await request({
      url: `/api/users/all`,
      params: {
        year,
        name,
      },
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });

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

  const chatsResponse = useQuery("allChatss", async () => {
    const token = localStorage.getItem("token");
    const res = await request({
      url: `/api/chats/`,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });

  const chatResponse = useMutation(async (id: string) => {
    const res = await request({
      url: `/api/chats/${id}`,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });

  const [select, setSelect] = React.useState(false);
  const onSelectChat = (id: string) => {
    chatResponse.mutate(id);
    setSelect((prev) => !prev);
  };

  React.useEffect(() => {
    name
      ? year && usersResponse.refetch()
      : year
      ? year !== "All years" && usersResponse.refetch()
      : null;
  }, [name, year, usersResponse]);

  return (
    <div className=" flex m-6 border h-[80vh]">
      {/* sidebar 2 */}
      {!select && (
        <div
          className={`md:w-[30%] w-[100%] bg-slate-50 border-r flex flex-col`}
        >
          <div className="h-[75px] border-b border-r px-4 flex items-center justify-center space-x-4">
            <input
              type="text"
              className="text-input flex-1"
              placeholder="Search by name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {user.isAdmin ? (
              <>
                {yearsResponse.isLoading ? (
                  <Spinner />
                ) : (
                  <div className="flex-1">
                    <select
                      id="years"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option selected value="All years">
                        All Chats
                      </option>
                      {yearsResponse.data?.map(
                        (year: { name: string; id: string }) => {
                          return (
                            <option value={year.id} key={year.id}>
                              {year.name}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                )}
              </>
            ) : null}
          </div>
          <div className="h-full ">
            {chatsResponse.isLoading ? (
              <div className="h-full flex items-center">
                <Spinner />
              </div>
            ) : (
              (name || year !== "All years") &&
              usersResponse.data?.map(
                ({ name, _id }: { name: string; _id: string }) => (
                  <ChatUser
                    name={name}
                    _id={_id}
                    onSelectChat={onSelectChat}
                    key={_id}
                    latestMessage={{
                      readBy: [user._id!],
                      content: `Start chatting with ${name}`,
                    }}
                  />
                )
              )
            )}
            {year == "All years" &&
              !chatsResponse.isLoading &&
              chatsResponse.data?.map(
                (chat: {
                  _id: string;
                  users: [{ name: string; _id: string }];
                  latestMessage: {
                    readBy: [string];
                    content: string;
                  };
                }) => {
                  return chat.users.map(
                    ({ name, _id }: { name: string; _id: string }) => {
                      console.log(_id !== user._id);

                      if (_id !== user._id)
                        return (
                          <ChatUser
                            name={name}
                            _id={_id}
                            onSelectChat={onSelectChat}
                            key={_id}
                            latestMessage={chat.latestMessage}
                          />
                        );
                    }
                  );
                }
              )}
            {!chatsResponse.isLoading &&
              !usersResponse.data?.length &&
              !chatsResponse.data?.length && (
                <div className="h-full flex  items-center justify-center">
                  Chats not found
                </div>
              )}
          </div>
        </div>
      )}
      {
        <ChatContent
          chatData={chatResponse.data}
          loading={chatResponse.isLoading}
          onBack={() => setSelect(false)}
          select={select}
        />
      }
    </div>
  );
};

export default IndexMessages;
