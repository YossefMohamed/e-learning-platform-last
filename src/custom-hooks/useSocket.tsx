// "undefined" means the URL will be computed from the `window.location` object

import React from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const URL = "https://e-learning-platform-server.onrender.com/";

  const socket = io(URL);
  return socket;
};

export default useSocket;
