// "undefined" means the URL will be computed from the `window.location` object

import React from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const URL = process.env.url || "http://localhost:5000";

  const socket = io(URL);
  return socket;
};

export default useSocket;
