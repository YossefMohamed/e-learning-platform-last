import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/custom-hooks/useAuth";
import {
  addUser,
  loading as loadingAction,
  stopLoading as stopLoadingAction,
} from "@/redux/slices/userSlices";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "@/redux/store";
import Spinner from "./Spinner";
const Auth = ({ children }: any) => {
  const router = useRouter();
  const {
    data,
    isLoading,
    mutate: Auth,
    isSuccess,
    isError,
    error,
    status,
  } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (router.isReady && localStorage.getItem("token")) {
      const token = localStorage.getItem("token") || "";
      !data && Auth(token);
    } else if (router.pathname !== "/login" && router.pathname !== "/") {
      router.push("/login");
      setLoading(false);
    }
  }, [router]);

  console.log(loading);
  React.useEffect(() => {
    const token = localStorage.getItem("token") || "";
    data && dispatch(addUser({ token: token, user: data }));
    data && setLoading(false);
  }, [isSuccess, data]);
  return loading ? <Spinner /> : children;
};

export default Auth;
