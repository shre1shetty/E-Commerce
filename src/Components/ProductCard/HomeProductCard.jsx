import { ceil } from "lodash";
import React, { useEffect, useState } from "react";
import "./index.css";
import { convertToBase64toFile } from "@/lib/utils";
import { Check } from "lucide-react";
const HomeProductCard = ({
  id,
  label,
  image,
  price = 0,
  discountPrice = 0,
  filters,
  description,
  variantValues,
}) => {
  const [productImage, setproductImage] = useState(null);
  const [variant1, setvariant1] = useState({ name: null, value: null });
  const [variant2, setvariant2] = useState({ name: null, value: null });
  const handleFilterChange = (color, variantValues, variant1, variant2) => {
    console.log(variant1, variant2);
    const val = variantValues.find(({ name }) =>
      name.includes(
        `${variant1.name}${variant1.value}${variant2.name}${variant2.value}`
      )
    );
    setproductImage(convertToBase64toFile(val?.values.picture));
  };

  const getColorDiv = (color, variantValues, index) => {
    return (
      <span
        className="colorDiv"
        style={{ backgroundColor: color }}
        onClick={() => {
          if (index === 0) {
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
      >
        {variant1.value === color || variant2.value === color ? (
          <Check size={12} color="white" />
        ) : (
          "\u00A0"
        )}
      </span>
    );
  };

  useEffect(() => {
    setvariant1({
      name: filters[0]?.field,
      value: filters[0]?.value[0],
    });
    setvariant2({
      name: filters[1]?.field,
      value: filters[1]?.value[0],
    });
    console.log(
      `${filters[0]?.field}${filters[0]?.value[0]}${filters[1]?.field}${filters[1]?.value[0]}`,
      variantValues.find(({ name }) =>
        name.includes(
          `${filters[0]?.field}${filters[0]?.value[0]}${filters[1]?.field}${filters[1]?.value[0]}`
        )
      )
    );
    setproductImage(
      convertToBase64toFile(
        variantValues.find(({ name }) =>
          name.includes(
            `${filters[0]?.field}${filters[0]?.value[0]}${filters[1]?.field}${filters[1]?.value[0]}`
          )
        ).values?.picture
      )
    );
  }, [filters]);

  // useEffect(() => {
  //   setproductImage(image);
  // }, [image]);

  return (
    <div
      key={id}
      className="border-[1px] bg-white border-[#a06743] rounded-[2px] p-2 relative bg-cover bg-center cursor-pointer overflow-hidden"
    >
      <div className="w-full h-[250px] hover:scale-[1.02] relative mb-6">
        <img
          src={productImage ? URL.createObjectURL(productImage) : ""}
          alt=""
          className="h-full w-full block rounded-md"
        />
      </div>
      <div className="hidden-div">
        <div className="flex justify-between w-full pb-1 rounded-lg text-[#633b22] font-bold text-base/4 name">
          <text className="text-nowrap w-full block">{label}</text>
          <span className="text-green-600 flex gap-1">
            ₹{discountPrice}
            {"   "}
            <del className="text-red-400 text-[9px]">₹{price}</del>
          </span>
        </div>
        <div className="description">
          <text className="">{description}</text>
        </div>
        <div className="filterdiv">
          {filters?.map(({ field, value }, index) => (
            <div className="flex gap-1">
              {value.map((value) =>
                field === "Colors" ? (
                  getColorDiv(value, variantValues, index)
                ) : (
                  <span
                    className={`normalDiv text-xs text-[#7a4e33] font-bold ${
                      variant1.value === value || variant2.value === value
                        ? "activefilter"
                        : ""
                    }`}
                  >
                    {value}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bg-[#a06743] text-white font-bold text-sm px-9 py-1.5 top-1 -right-[21px] rotate-[31deg] text-center">
        {ceil(((price - discountPrice) / price) * 100)}% Off
      </div>
    </div>
  );
};

export default HomeProductCard;
