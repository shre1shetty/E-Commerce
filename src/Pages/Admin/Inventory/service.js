import { AxiosInstance } from "@/lib/AxiosInstance";

export const getInventory = async () => {
  try {
    const res = await AxiosInstance.get("/Inventory/getInventory");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteProduct = async (id) => {
  try {
    const resp = await AxiosInstance.post(`Inventory/deleteItem?id=${id}`);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
