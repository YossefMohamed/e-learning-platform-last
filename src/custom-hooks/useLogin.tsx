import request from "@/endpoints/request";
import { useMutation } from "react-query";

type LoginData = {
  phoneNumber: string;
  password: string;
};

const postUserData = async (data: LoginData) => {
  const res = await request({
    url: `/api/users/signin`,
    method: "post",
    data,
  }).then((res) => {
    return res.data.user;
  });

  return res;
};

export const useUserLogin = () => {
  return useMutation((data: LoginData) => postUserData(data), {});
};
