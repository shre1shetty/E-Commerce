import { AxiosInstance } from "@/lib/AxiosInstance";
import { AxiosInstanceUpload } from "@/lib/AxiosInstanceforUpload";

export const getInventory = async () => {
  try {
    const res = await AxiosInstance.get("/Inventory/getInventory");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (product) => {
  try {
    const res = await AxiosInstanceUpload.post("/Products/addProduct", product);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
