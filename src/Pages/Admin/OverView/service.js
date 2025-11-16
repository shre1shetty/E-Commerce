import { AdminAxiosInstance as AxiosInstance } from "@/lib/AdminAxiosInstance";

export const getMonthlySales = async () => {
  try {
    const res = await AxiosInstance.get("/Dashboard/getMonthlyOrders");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTopProducts = async () => {
  try {
    const res = await AxiosInstance.get("/Dashboard/getTopProducts");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOverAllStats = async () => {
  try {
    const res = await AxiosInstance.get("/Dashboard/getOverAllData");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const salesByCategory = async () => {
  try {
    const res = await AxiosInstance.get("/Dashboard/salesByCategory");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecentRatings = async () => {
  try {
    const resp = await AxiosInstance.get("/Rating/getRecentRatings");
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
