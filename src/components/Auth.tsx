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
  const { loading } = useSelector((state: Rootstate) => state.userState);

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
  const { isAuthenticated, token, user } = useSelector(
    (state: Rootstate) => state.userState
  );

  React.useEffect(() => {
    dispatch(loadingAction());
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token") || "";
      !data && Auth(token);

      data && dispatch(stopLoadingAction());

      data && dispatch(addUser({ token: token, user: data }));
    } else if (
      router.pathname !== "/login" &&
      router.pathname !== "/" &&
      !data
    ) {
      dispatch(stopLoadingAction());
      router.push("/login");
    }
  }, [router, data]);

  return loading ? <Spinner /> : children;
};

export default Auth;
