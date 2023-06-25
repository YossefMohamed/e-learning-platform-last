import React from "react";

const ChatUser = () => {
  return (
    <div className="px-5 py-4  border-b  flex items-center   cursor-pointer  hover:bg-slate-100">
      <div className="ml-4">
        <p
          x-text="user.name"
          className="text-md font-semibold text-slate-600 m-0 p-0"
        >
          Yaroslav Zubkp
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
