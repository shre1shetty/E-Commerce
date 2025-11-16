import GlobalToast from "@/Components/GlobalToast";
import { AdminAxiosInstance as AxiosInstance } from "@/lib/AdminAxiosInstance";

export const getStagesForDrpDown = async () => {
  try {
    const response = await AxiosInstance.get("/Stage/getStagesForDrpDown");
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

export const addWorkflowStage = async (data) => {
  try {
    const response = await AxiosInstance.post(
      "/WorkFlowDefination/addWorkFlowStage",
      data
    );
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

export const updateWorkFlowStage = async (data) => {
  try {
    const response = await AxiosInstance.post(
      "/WorkFlowDefination/updateWorkFlowStage",
      data
    );
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

export const deleteWorkFlowStage = async (data) => {
  try {
    const response = await AxiosInstance.post(
      "/WorkFlowDefination/deleteWorkFlowStage",
      data
    );
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

export const getWorkFlowStages = async () => {
  try {
    const response = await AxiosInstance.get(
      "/WorkFlowDefination/getWorkFlowStages"
    );
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
