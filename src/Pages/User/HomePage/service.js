import { AxiosInstance } from "@/lib/AxiosInstance";

export const getLayout = async () => {
  try {
    const response = await AxiosInstance.get("/Layout/getLayout");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
