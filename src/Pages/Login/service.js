import { AxiosInstance } from "@/lib/AxiosInstance";

export const LoginUser = async (data) => {
  try {
    const res = await AxiosInstance.post("/User/LoginUser", data, {
      withCredentials: true,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (data) => {
  try {
    const response = await AxiosInstance.post("/User/AddUser", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
