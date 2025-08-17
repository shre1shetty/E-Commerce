import GlobalToast from "@/Components/GlobalToast";
import { AxiosInstance } from "@/lib/AxiosInstance";

export const getOrders = async () => {
  try {
    const response = await AxiosInstance.get("/Orders/getAdminOrders");
    return response.data;
  } catch (error) {
    console.error(error);
    GlobalToast({
      message: "Error while fetching Orders",
      messageTimer: 2500,
      messageType: "error",
    });
  }
};
