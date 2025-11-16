import { AdminAxiosInstance as AxiosInstance } from "@/lib/AdminAxiosInstance";

export const AddVariant = async (data) => {
  try {
    const resp = await AxiosInstance.post("Variants/addVariant", data);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateVariant = async (data) => {
  try {
    const resp = await AxiosInstance.post(
      `Variants/updateVariant?id=${data._id}`,
      data
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
