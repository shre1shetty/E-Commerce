import { AxiosInstance } from "@/lib/AxiosInstance";

export const getFilterType = async (id = null) => {
  try {
    let res;
    if (id) {
      res = await AxiosInstance.get(`/Filters/getFilterType?id=${id}`);
    } else {
      res = await AxiosInstance.get(`/Filters/getFilterType`);
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteFilterType = async (data) => {
  try {
    const resp = await AxiosInstance.post(`Filters/deleteFilterType`, data);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
