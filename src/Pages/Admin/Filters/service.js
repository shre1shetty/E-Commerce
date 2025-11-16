import { AdminAxiosInstance as AxiosInstance } from "@/lib/AdminAxiosInstance";

export const getFilter = async () => {
  try {
    const res = await AxiosInstance.get("/Filters/getFilter");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteFilter = async (id) => {
  try {
    const resp = await AxiosInstance.post(`Filters/deleteFilter?id=${id}`);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
