import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/custom-hooks/useAuth";
import { addUser } from "@/redux/slices/userSlices";
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
  } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, token } = useSelector(
    (state: Rootstate) => state.userState
  );

  React.useEffect(() => {
    if (window && localStorage.getItem("token") && !isAuthenticated) {
      const token = localStorage.getItem("token") || "";
      Auth(token);
      data && dispatch(addUser({ token: token, user: data }));
    }
    if (
      window &&
      router.pathname !== "/login" &&
      router.pathname !== "/" &&
      !localStorage.getItem("token")
    ) {
      router.push("/login");
    }
  }, [router, data]);

  return <>{isLoading ? <Spinner /> : children}</>;
};

export default Auth;
