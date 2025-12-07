import { AxiosInstance } from "@/lib/AxiosInstance";

export const addToWishList = async ({ productId, userId }) => {
  try {
    const res = await AxiosInstance.post("/Wishlist/addToWishlist", {
      productId,
      userId,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeFromWishList = async ({ productId, userId }) => {
  try {
    const res = await AxiosInstance.post("/Wishlist/removeFromWishList", {
      productId,
      userId,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
