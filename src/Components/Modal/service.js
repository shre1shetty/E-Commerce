import { AxiosInstance } from "@/lib/AxiosInstance";
import { AxiosInstanceUpload } from "@/lib/AxiosInstanceforUpload";

export const addReview = async (data) => {
  try {
    const response = await AxiosInstanceUpload.post("/Rating/addRating", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendEmail = async (email) => {
  try {
    const response = await AxiosInstance.post("/User/forgotPassword", {
      email,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const validateOTP = async (otp, email) => {
  try {
    const response = await AxiosInstance.post("/User/validateOTP", {
      otp,
      email,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const resetPassword = async (email, newPassword, otp) => {
  try {
    const resp = await AxiosInstance.post("/User/resetPassword", {
      email,
      newPassword,
      otp,
    });
    return resp.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
