import { AxiosInstance } from "@/lib/AxiosInstance";
import { AxiosInstanceUpload } from "@/lib/AxiosInstanceforUpload";

export const addLayout = async (body) => {
  try {
    const resp = await AxiosInstanceUpload.post("/Layout/addLayout", body);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLayouts = async () => {
  try {
    const resp = await AxiosInstanceUpload.get("/Layout/getLayouts");
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const editLayout = async (id) => {
  try {
    const resp = await AxiosInstance.get(`/Layout/editLayout?id=${id}`);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateLayout = async (body, id) => {
  try {
    const resp = await AxiosInstanceUpload.post(
      `/Layout/updateLayout?id=${id}`,
      body
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
