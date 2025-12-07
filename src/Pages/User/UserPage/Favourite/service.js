import { AxiosInstance } from "@/lib/AxiosInstance";

export const getWishlistProductsByUserId = async (userId) => {
  try {
    const res = await AxiosInstance.post(
      "/wishlist/getWishlistProductsByUserId",
      {
        userId,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
