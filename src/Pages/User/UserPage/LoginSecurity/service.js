import { AxiosInstance } from "@/lib/AxiosInstance";
import { LS } from "@/lib/SecureLocalStorage";

export const getUserDetails = async () => {
  try {
    const userId = LS.get("userId");
    const response = await AxiosInstance.get(
      `/User/getUserDetails?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserDetails = async (data) => {
  try {
    const userId = LS.get("userId");
    const response = await AxiosInstance.post(
      `/User/updateUserDetails?userId=${userId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (data) => {
  try {
    const userId = LS.get("userId");
    const response = await AxiosInstance.post(
      `/User/updatePassword?userId=${userId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
