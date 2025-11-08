import { AxiosInstance } from "@/lib/AxiosInstance";
import { LS } from "@/lib/SecureLocalStorage";

export const getRows = async () => {
  try {
    const userId = LS.get("userId");
    const response = await AxiosInstance.get(
      `/Address/getAddresses?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addAddress = async (data) => {
  try {
    const res = await AxiosInstance.post("/Address/addAddress", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAddress = async (data) => {
  try {
    const res = await AxiosInstance.post("/Address/updateAddress", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
