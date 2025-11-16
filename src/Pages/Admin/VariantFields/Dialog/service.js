import { AdminAxiosInstance as AxiosInstance } from "@/lib/AdminAxiosInstance";

export const AddVariantField = async (data, id) => {
  try {
    const resp = await AxiosInstance.post(
      `Variants/addVariantField?id=${id}`,
      data
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateVariantField = async (data) => {
  try {
    const resp = await AxiosInstance.post(`Variants/updateVariantField`, data);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
