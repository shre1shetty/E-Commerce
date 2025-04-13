import { AxiosInstanceUpload } from "@/lib/AxiosInstanceforUpload";

export const addLayout = async (body) => {
  try {
    const resp = await AxiosInstanceUpload.post("/Layout/addLayout", body);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
