import { AdminAxiosInstance as AxiosInstance } from "@/lib/AdminAxiosInstance";

export const getVariantField = async (id = null) => {
  try {
    let res;
    if (id) {
      res = await AxiosInstance.get(`/Variants/getVariantField?id=${id}`);
    } else {
      res = await AxiosInstance.get(`/Variants/getVariantField`);
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteVariantField = async (data) => {
  try {
    const resp = await AxiosInstance.post(`Variants/deleteVariantField`, data);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
