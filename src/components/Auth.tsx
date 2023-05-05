import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/custom-hooks/useAuth";
import { addUser } from "@/redux/slices/userSlices";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "@/redux/store";
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
  const { isAuthenticated, user } = useSelector(
    (state: Rootstate) => state.userState
  );
  React.useEffect(() => {
    const token: string = localStorage.getItem("token") || "";
    !isAuthenticated && Auth(token);
    data && dispatch(addUser(data));
  }, [router]);
  React.useEffect(() => {
    if (window && localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user")!);
      dispatch(addUser(user));
    }
  }, []);
  return <>{children}</>;
};

export default Auth;
