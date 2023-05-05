import Spinner from "@/components/Spinner";
import { useUserLogin } from "@/custom-hooks/useLogin";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addUser } from "@/redux/slices/userSlices";

function login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const {
    data,
    isLoading,
    mutate: login,
    isSuccess,
    isError,
    error,
  } = useUserLogin();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (isSuccess && !isError) {
      toast.success("Login Successful!");
      localStorage.setItem("token", data.token);
      isSuccess && !isError && dispatch(addUser(data));
      router.push("/");
    } else if (isError) {
      toast.error(error);
    } else return;
  }, [isSuccess, isError]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    !isLoading && login({ phoneNumber, password }); // Login api call
  };
  return (
    <>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="hidden overflow-hidden relative lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img
            src="/login-bg.png"
            alt=""
            className="w-full h-full object-cover"
          />

          <div className="w-full h-full absolute z-10 top-0 right-0 bg-primary opacity-50"></div>
        </div>
        <div
          className="bg-white  w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
  flex items-center justify-center"
        >
          <div className="w-full h-90">
            <h1 className=" text-2xl font-bold ">Log in to your account</h1>
            <form className="mt-6" action="#" method="POST">
              <div>
                <label className="block ">Email Address</label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Enter your phone number"
                  className="text-input"
                  autoComplete=""
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block ">Password</label>
                <input
                  type="password"
                  name=""
                  id="password"
                  placeholder="Enter Password"
                  minLength={6}
                  className="text-input"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="btn-primary w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Log In"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default login;
