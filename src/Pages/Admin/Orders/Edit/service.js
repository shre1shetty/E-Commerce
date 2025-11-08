import GlobalToast from "@/Components/GlobalToast";
import { AxiosInstance } from "@/lib/AxiosInstance";

export const getAdminOrdersById = async (id) => {
  try {
    const response = await AxiosInstance.post("/Orders/getAdminOrdersById", {
      id,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    GlobalToast({
      message: error.message,
      messageTimer: 2500,
      messageType: "error",
    });
  }
};

export const getWorkFlowHistory = async (id) => {
  try {
    const response = await AxiosInstance.get(
      `/WorkFlowDefination/getWorkFlowHistory?orderId=${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    GlobalToast({
      message: error.message,
      messageTimer: 2500,
      messageType: "error",
    });
  }
};

export const getNextStage = async (stageId) => {
  try {
    const resp = await AxiosInstance.get(
      `/WorkFlowDefination/getNextStage?currentStageId=${stageId}`
    );
    return resp.data;
  } catch (error) {
    console.log(error);
    GlobalToast({
      message: error.message,
      messageTimer: 2500,
      messageType: "error",
    });
  }
};

export const proceedToNextStage = async (data) => {
  try {
    const resp = await AxiosInstance.post(
      `/WorkFlowDefination/proceedToNextStage`,
      data
    );
    return resp.data;
  } catch (error) {
    console.log(error);
    GlobalToast({
      message: error.message,
      messageTimer: 2500,
      messageType: "error",
    });
  }
};
