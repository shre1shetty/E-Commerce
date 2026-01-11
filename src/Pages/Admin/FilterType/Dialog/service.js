import { AdminAxiosInstanceforUpload as AxiosInstanceUpload } from "@/lib/AdminAxiosInstanceforUpload";

export const AddFilterType = async (data, id) => {
  try {
    const resp = await AxiosInstanceUpload.post(
      `Filters/addFilterType?id=${id}`,
      data
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateFilterType = async (data) => {
  try {
    const resp = await AxiosInstanceUpload.post(
      `Filters/updateFilterType`,
      data
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
