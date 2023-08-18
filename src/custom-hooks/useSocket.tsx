// "undefined" means the URL will be computed from the `window.location` object

import { constants } from "@/infrastructure/constants";
import React from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const URL = constants.url || "http://localhost:5000";

  const socket = io(URL);
  return socket;
};

export default useSocket;
