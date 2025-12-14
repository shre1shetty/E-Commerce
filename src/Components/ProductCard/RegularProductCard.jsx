import { convertToBase64toFile, getFileUrl } from "@/lib/utils";
import React from "react";
import "./index.css";
import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegularProductCard = ({
  _id,
  name,
  picture,
  description,
  price,
  variantFields,
  variantValues,
}) => {
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
  return (
    <div className="product-card" onClick={() => navigate(`/Product/${_id}`)}>
      <div className="ratings">
        <Star fill="gold" color="gold" size={15} />
        <span className="">4.5</span>
      </div>
      <div className="product-wishlist">
        <Heart />
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
