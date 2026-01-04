import { AdminAxiosInstance as AxiosInstance } from "@/lib/AdminAxiosInstance";
import { AdminAxiosInstanceforUpload as AxiosInstanceUpload } from "@/lib/AdminAxiosInstanceforUpload";

export const getInventory = async () => {
  try {
    const res = await AxiosInstance.get("/Inventory/getInventory");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (product) => {
  try {
    const res = await AxiosInstanceUpload.post("/Products/addProduct", product);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id, product) => {
  try {
    console.log(id, Object.fromEntries(product.entries()));
    const res = await AxiosInstanceUpload.post(
      `/Products/updateProduct?id=${id}`,
      product
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const res = await AxiosInstance.post("/Products/getProducts");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id) => {
  try {
    const res = await AxiosInstance.post(`/Products/getProductById?id=${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRatingsByproductId = async (id) => {
  try {
    const res = await AxiosInstance.get(
      `/Rating/getRatingsByproductId?productId=${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadInventoryTemplate = async (data) => {
  try {
    const res = await AdminAxiosInstanceforUpload.post(
      "/Inventory/uploadInventory",
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
