import Spinner from "@/components/Spinner";
import { logout } from "@/redux/slices/userSlices";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Logout = () => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  React.useEffect(() => {
    localStorage.removeItem("token");
    dispatch(logout());
    router.push("/");
  }, []);
  return (
    <div className="min-h-screen flex items-center">
      <Spinner />
    </div>
  );
};

export default Logout;
