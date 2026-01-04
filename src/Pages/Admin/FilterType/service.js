import { AdminAxiosInstance as AxiosInstance } from "@/lib/AdminAxiosInstance";

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

export const ToggleShowOnSearch = async (body) => {
  try {
    const resp = await AxiosInstance.post("/Filters/toggleShowOnSearch", body);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
