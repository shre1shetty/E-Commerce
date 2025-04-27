import { AxiosInstance } from "@/lib/AxiosInstance";

export const getProductsByCategory = async (id) => {
  const resp = await AxiosInstance.get(
    `/Products/getProductByCategory?id=${id}`
  );
  return resp.data;
};

export const getCategory = async () => {
  const resp = await AxiosInstance.get("/Filters/getFilterWithSubFilter");
  return resp.data;
};
