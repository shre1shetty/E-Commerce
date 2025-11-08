import { AxiosInstance } from "@/lib/AxiosInstance";
import { LS } from "@/lib/SecureLocalStorage";

export const getOrdersByType = async (type) => {
  try {
    const userId = LS.get("userId");
    const res = await AxiosInstance.post("/Orders/getOrdersByType", {
      userId,
      type,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
