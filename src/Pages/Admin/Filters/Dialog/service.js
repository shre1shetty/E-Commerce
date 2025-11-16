import { AdminAxiosInstance as AxiosInstance } from "@/lib/AdminAxiosInstance";

export const AddFilter = async (data) => {
  try {
    const resp = await AxiosInstance.post("Filters/addFilter", data);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateFilter = async (data) => {
  try {
    const resp = await AxiosInstance.post(
      `Filters/updateFilter?id=${data._id}`,
      data
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
