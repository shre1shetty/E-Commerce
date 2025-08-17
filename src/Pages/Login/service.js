import { AxiosInstance } from "@/lib/AxiosInstance";

export const LoginUser = async (data) => {
  try {
    const res = await AxiosInstance.post("/User/LoginUser", data);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
