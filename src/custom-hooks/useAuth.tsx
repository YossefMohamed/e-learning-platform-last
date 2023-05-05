import request from "@/endpoints/request";
import { useMutation } from "react-query";

const getCurrentUser = async (token: String) => {
  const res = await request({
    url: `/api/users/`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    return res.data.user;
  });

  return res;
};

export const useAuth = () => {
  return useMutation((token: string) => getCurrentUser(token), {});
};
