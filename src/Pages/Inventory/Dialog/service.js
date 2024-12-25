import { AxiosInstance } from "@/lib/AxiosInstance";

export const AddProduct = async (data) => {
  try {
    const resp = await AxiosInstance.post("Inventory/addItem", data);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateProduct = async (data) => {
  try {
    const resp = await AxiosInstance.post(
      `Inventory/updateItem?id=${data._id}`,
      data
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
