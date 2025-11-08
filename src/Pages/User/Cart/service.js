import { AxiosInstance } from "@/lib/AxiosInstance";

export const getCart = async (Id) => {
  try {
    const response = await AxiosInstance.get(`/Cart/getCart?userId=${Id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const changeQuantity = async (data) => {
  try {
    const resp = await AxiosInstance.post("/Cart/changeQuantity", data);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const confirmOrder = async (data) => {
  try {
    const resp = await AxiosInstance.post("/Payments/confirmOrder", data);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw new Error("Order confirmation failed");
  }
};
