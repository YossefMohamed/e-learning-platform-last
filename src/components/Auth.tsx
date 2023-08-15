import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import useSocket from "@/custom-hooks/useSocket";
import { addUser, logout, stopLoading } from "@/redux/slices/userSlices";
import { AppDispatch } from "@/redux/store";
import { useAuth } from "@/custom-hooks/useAuth";

interface AuthProps {
  children: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data, isError, mutate: checkAuth } = useAuth();
  const socket = useSocket();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(stopLoading());
      checkAuth(token);
    } else if (router.pathname !== "/login" && router.pathname !== "/") {
      router.push("/login");
      dispatch(logout());
      setLoading(false);
    } else if (router.pathname === "/login" || router.pathname === "/") {
      setLoading(false);
      dispatch(stopLoading());
      dispatch(logout());
    }
  }, [router, dispatch, checkAuth]);

  useEffect(() => {
    if (isError) {
      dispatch(stopLoading());
      dispatch(logout());
      setLoading(false);
      localStorage.removeItem("token");
    }
  }, [isError, dispatch]);

  useEffect(() => {
    if (data && localStorage.getItem("token")) {
      const token = localStorage.getItem("token") || "";
      dispatch(addUser({ token, user: data }));
      setLoading(false);
      dispatch(stopLoading());
      socket.emit("login", data._id);
    }
  }, [data, dispatch, socket]);

  return loading ? <Spinner /> : <>{children}</>;
};

export default Auth;
