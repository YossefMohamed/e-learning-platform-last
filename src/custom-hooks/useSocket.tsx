// "undefined" means the URL will be computed from the `window.location` object

import React from "react";
import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";

const useSocket = () => {
  const URL = "http://localhost:5000";

  const socket = io(URL);
  return socket;
};

export default useSocket;
