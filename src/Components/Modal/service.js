import { AxiosInstanceUpload } from "@/lib/AxiosInstanceforUpload";

export const addReview = async (data) => {
  try {
    const response = await AxiosInstanceUpload.post("/Rating/addRating", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
