import { convertToBase64toFile, getFileUrl } from "@/lib/utils";
import React, { useContext } from "react";
import "./index.css";
import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addToWishList, removeFromWishList } from "./service";
import { useDispatch, useSelector } from "react-redux";
import { setWishList } from "@/Redux/Slice/WishlistSlice";
import { loginStateContext } from "@/Router/RouteContainer";
import { LS } from "@/lib/SecureLocalStorage";
import { AxiosInstance } from "@/lib/AxiosInstance";

const RegularProductCard = ({
  _id,
  name,
  picture,
  description,
  price,
  variantFields,
  variantValues,
  avgRating = 4.5,
}) => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.data.wishlist.wishlist);
  const isWishListed = wishList?.some(
    (val) => val.toString() === _id.toString()
  );
  const navigate = useNavigate();
  const getVariantField = ({ flag, value }) => {
    if (flag === "Fill") {
      return (
        <div className="flex gap-[2px] items-center justify-end">
          {value.map((color, index) => (
            <div
              className={` h-3 w-3 rounded-sm`}
              key={index}
              style={{
                backgroundColor: color,
              }}
            ></div>
          ))}
        </div>
      );
    } else if (flag === "Text") {
      return (
        <div className="flex gap-1 items-center justify-end">
          {value.map((value, index) => (
            <div className="text-flag" key={index}>
              {value}
            </div>
          ))}
        </div>
      );
    }
  };
  const addItemToWishlist = ({ productId, userId }) => {
    addToWishList({ productId, userId }).then((res) => {
      if (res) {
        AxiosInstance.post("/Wishlist/getWishlistByUser", {
          userId,
        }).then((res) => dispatch(setWishList(res.data)));
      }
    });
  };

  const { setopen } = useContext(loginStateContext);

  const removeItemfromWishlist = ({ productId, userId }) => {
    removeFromWishList({ productId, userId }).then((res) => {
      if (res) {
        AxiosInstance.post("/Wishlist/getWishlistByUser", {
          userId,
        }).then((res) => dispatch(setWishList(res.data)));
      }
    });
  };
  return (
    <div className="product-card" onClick={() => navigate(`/Product/${_id}`)}>
      <div className="ratings">
        <Star fill="gold" color="gold" size={15} />
        <span className="">{avgRating.toFixed(1)}</span>
      </div>
      <div className="product-wishlist">
        <button
          className=""
          onClick={(event) => {
            event.stopPropagation();
            if (LS.get("userId")) {
              isWishListed
                ? removeItemfromWishlist({
                    productId: _id,
                    userId: LS.get("userId"),
                  })
                : addItemToWishlist({
                    productId: _id,
                    userId: LS.get("userId"),
                  });
            } else {
              setopen(true);
            }
          }}
        >
          {isWishListed ? <Heart fill="red" stroke="red" /> : <Heart />}
        </button>
      </div>
      <div className="background-circle"></div>
      <div className="product-image">
        <img
          src={picture}
          alt=""
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
      <div className="details-div">
        <div className=" relative">
          <div className="w-full">
            <p className="detail-name">{name}</p>
            <p className="detail-description">
              {description.length > 42
                ? description.slice(0, 42) + "..."
                : description}
            </p>
            <p className="detail-price">₹{price}</p>
          </div>
          <div className="variant-container">
            {variantFields.map(getVariantField)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegularProductCard;
