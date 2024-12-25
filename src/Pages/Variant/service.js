import { AxiosInstance } from "@/lib/AxiosInstance";

export const getVariant = async () => {
  try {
    const res = await AxiosInstance.get("/Variants/getVariant");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteVariant = async (id) => {
  try {
    const resp = await AxiosInstance.post(`Variants/deleteVariant?id=${id}`);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
