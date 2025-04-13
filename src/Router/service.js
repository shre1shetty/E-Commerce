import { AxiosInstance } from "@/lib/AxiosInstance";

export const getLogo = async () => {
  try {
    const resp = await AxiosInstance.get("/Layout/getLogo");
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFooter = async () => {
  try {
    const resp = await AxiosInstance.get("/Layout/getFooter");
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
