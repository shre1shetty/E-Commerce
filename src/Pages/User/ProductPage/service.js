import { AxiosInstance } from "@/lib/AxiosInstance";

export const addToCart = async (data) => {
  try {
    const res = await AxiosInstance.post("/Cart/AddToCart", data);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
