import GlobalToast from "@/Components/GlobalToast";
import { AdminAxiosInstance as AxiosInstance } from "@/lib/AdminAxiosInstance";

export const addStage = async (data) => {
  try {
    const response = await AxiosInstance.post("/Stage/AddStage", data);
    return response.data;
  } catch (error) {
    console.log(error);
    GlobalToast({
      message: "Error adding stage",
      messageTimer: 2500,
      messageType: "error",
    });
  }
};

export const updateStage = async (data) => {
  try {
    const response = await AxiosInstance.post("/Stage/updateStage", data);
    return response.data;
  } catch (error) {
    console.log(error);
    GlobalToast({
      message: "Error adding stage",
      messageTimer: 2500,
      messageType: "error",
    });
  }
};

export const getStages = async () => {
  try {
    const response = await AxiosInstance.get("/Stage/GetStages");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
