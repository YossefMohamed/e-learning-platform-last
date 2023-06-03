import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/custom-hooks/useAuth";
import { addUser } from "@/redux/slices/userSlices";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "@/redux/store";
import Spinner from "./Spinner";
const Auth = ({ children }: any) => {
  const isSSR = typeof window === "undefined";

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
  const { isAuthenticated, token } = useSelector(
    (state: Rootstate) => state.userState
  );

  React.useLayoutEffect(() => {
    if (window && localStorage.getItem("token") && !isAuthenticated) {
      const token = localStorage.getItem("token") || "";
      Auth(token);
      data && dispatch(addUser({ token: token, user: data }));
    }
    if (
      router.pathname !== "/login" &&
      router.pathname !== "/" &&
      !isAuthenticated &&
      status !== "loading"
    ) {
      router.push("/login");
    }
  }, [router, data]);

  if (isLoading) return <Spinner />;

  return children;
};

export default Auth;
