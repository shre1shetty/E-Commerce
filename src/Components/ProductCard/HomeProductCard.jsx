import { ceil, first, isString } from "lodash";
import React, { useEffect, useState } from "react";
import "./index.css";
import { convertToBase64toFile, getFileUrl } from "@/lib/utils";
import { Check, Heart, ShoppingBag, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addToWishList, removeFromWishList } from "./service";
import { useDispatch, useSelector } from "react-redux";
import { setWishList } from "@/Redux/Slice/WishlistSlice";
import { LS } from "@/lib/SecureLocalStorage";
import { AxiosInstance } from "@/lib/AxiosInstance";
const HomeProductCard = ({
  id,
  label,
  image,
  price = 0,
  discountedPrice = 0,
  filters,
  description,
  variantValues = [],
  onClick = null,
}) => {
  const navigate = useNavigate();
  const wishList = useSelector((state) => state.data.wishlist.wishlist);
  const isWishListed = wishList?.some(
    (val) => val.toString() === id.toString()
  );
  const dispatch = useDispatch();
  const [productPrice, setproductPrice] = useState(price);
  const [productDiscPrice, setproductDiscPrice] = useState(discountedPrice);
  const [productImage, setproductImage] = useState(null);
  const [variant1, setvariant1] = useState({ name: null, value: null });
  const [variant2, setvariant2] = useState({ name: null, value: null });
  const handleFilterChange = (color, variantValues, variant1, variant2) => {
    const val = variantValues.find(({ name }) =>
      name.includes(
        `${variant1.name}${variant1.value}${variant2.name}${variant2.value}`
      )
    );
    setproductImage(
      isString(val?.values.picture[0])
        ? getFileUrl(val?.values.picture[0])
        : URL.createObjectURL(val?.values.picture[0])
    );
    setproductPrice(val?.values.price);
    setproductDiscPrice(val?.values.discountedPrice);
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

  const removeItemfromWishlist = ({ productId, userId }) => {
    removeFromWishList({ productId, userId }).then((res) => {
      if (res) {
        AxiosInstance.post("/Wishlist/getWishlistByUser", {
          userId,
        }).then((res) => dispatch(setWishList(res.data)));
      }
    });
  };

  useEffect(() => {
    console.log(filters);
    setvariant1({
      name: filters[0]?.field,
      value: filters[0]?.value[0],
    });
    setvariant2({
      name: filters[1]?.field,
      value: filters[1]?.value[0],
    });

    if (variantValues[0]?.values?.picture.length > 0) {
      let image = variantValues.find(({ name }) =>
        name.includes(
          `${filters[0]?.field}${filters[0]?.value[0]}${filters[1]?.field}${filters[1]?.value[0]}`
        )
      )?.values?.picture[0];
      setproductImage(
        isString(image) ? getFileUrl(image) : URL.createObjectURL(image)
      );
    }
  }, [filters]);

  return (
    <div
      key={id}
      className="bg-[#f5f4f7] h-[290px] rounded-[25px] p-2 relative bg-cover bg-center cursor-pointer overflow-hidden home-card"
    >
      <div className="w-full h-[200px] hover:scale-[1.02] relative">
        <img
          src={productImage ? productImage : ""}
          alt=""
          className="h-full w-full block rounded-md card-image"
        />
      </div>
      <div className="flex justify-center absolute bottom-[98px] left-[45%] z-20">
        <div className="flex overflow-hidden rounded-lg items-end ">
          {filters
            .find(({ field }) => field === "Colors")
            ?.value.map((color) => (
              <div
                className="h-1 min-w-3 hover:h-1.5"
                style={{ backgroundColor: color }}
                onClick={() => {
                  if (
                    filters.findIndex(({ field }) => field === "Colors") === 0
                  ) {
                    setvariant1({ name: filters[0]?.field, value: color });
                    handleFilterChange(
                      color,
                      variantValues,
                      { name: "Colors", value: color },
                      variant2
                    );
                  } else {
                    setvariant2({ name: filters[1]?.field, value: color });
                    handleFilterChange(color, variantValues, variant1, {
                      name: "Colors",
                      value: color,
                    });
                  }
                }}
              ></div>
            ))}
        </div>
      </div>
      <div className="addtoCart">
        <button className="">
          <ShoppingBag
            size={14}
            onClick={() => (onClick ? onClick() : navigate(`/Product/${id}`))}
          />
        </button>
      </div>
      <div className="top-product-name">
        <p className="">{label}</p>
        <p className="top-product-description">
          {description.length > 30
            ? description.substring(0, 30) + "..."
            : description}
        </p>
      </div>
      <div className="top-product-price">
        <span className="currency">₹</span>
        <span className="">{productDiscPrice}</span>
        <span className="text-slate-500 text-[10px] line-through ml-1">
          {productPrice}
        </span>
      </div>
      <div className="wishlist">
        <button
          className=""
          onClick={() =>
            isWishListed
              ? removeItemfromWishlist({
                  productId: id,
                  userId: LS.get("userId"),
                })
              : addItemToWishlist({ productId: id, userId: LS.get("userId") })
          }
        >
          {isWishListed ? <Heart fill="red" stroke="red" /> : <Heart />}
        </button>
      </div>
      <div className="flex text-xs items-center font-extrabold text-blue-950 gap-1 absolute top-4 left-4">
        <Star fill="gold" size={12} color="gold" />
        <div className="">4.5</div>
      </div>
    </div>
  );
};

export default HomeProductCard;
