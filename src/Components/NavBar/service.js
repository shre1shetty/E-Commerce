import { AxiosInstance } from "@/lib/AxiosInstance";

export const getProducts = async (terms) => {
  try {
    const response = await AxiosInstance.get(
      `/products/getProductBySearch?searchTerm=${terms}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
