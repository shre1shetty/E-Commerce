import { AxiosInstance } from "@/lib/AxiosInstance";

export const getProducts = async (values) => {
  try {
    const response = await AxiosInstance.post("/products/search", values);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
