import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { isEmpty } from "lodash";
const Preview = ({ data, showPreview }) => {
  const [values, setvalues] = useState({});
  const [colorSize, setcolorSize] = useState({ color: "", size: "" });
  const [picturesArray, setpicturesArray] = useState([]);
  const handleChange = ({ color, size, array }) => {
    setcolorSize({ color, size });
    const PictureArray = array.pictures;
    if (array[`${color}${size}colorVariant`].picture) {
      PictureArray[0] = array[`${color}${size}colorVariant`].picture;
    }
    setpicturesArray(PictureArray);
  };
  useEffect(() => {
    if (!isEmpty(data)) {
      setvalues(data);
      if (!isEmpty(data.colors) || !isEmpty(data.sizes))
        setcolorSize({
          color: data.colors[0],
          size: data.sizes[0],
        });
      if (data.pictures) {
        if (data[`${data.colors[0]}${data.sizes[0]}colorVariant`].picture) {
          const PictureArray = data.pictures;
          PictureArray[0] =
            data[`${data.colors[0]}${data.sizes[0]}colorVariant`].picture;
          setpicturesArray(PictureArray);
        } else {
          setpicturesArray(data.pictures);
        }
      }
    }
  }, [data]);

  return (
    <div
      className={cn(
        "flex flex-col gap-2 overflow-auto bg-[#181c2a] text-lg font-medium text-white rounded-md px-8 py-2",
        showPreview ? "" : "hidden"
      )}
    >
      <label htmlFor="" className="form-label">
        Preview
      </label>
      <div className="h-64 border border-gray-300 rounded-md bg-white">
        <Carousel className="w-full h-full max-h-64">
          <CarouselContent className="h-full">
            {picturesArray?.map((data, index) => (
              <CarouselItem
                key={index}
                className="h-full flex justify-center items-center"
              >
                <div className="h-full w-full rounded-md overflow-hidden flex justify-center items-center">
                  <img
                    alt=""
                    src={URL.createObjectURL(data)}
                    className="object-cover max-w-full object-center max-h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex justify-between">
        <label htmlFor="" className="form-label">
          {values?.name}
        </label>
        <label htmlFor="" className="form-label">
          ₹{values[`${colorSize.color}${colorSize.size}colorVariant`]?.price}
        </label>
      </div>
      <div className="flex justify-between items-center">
        <div className="">
          <label htmlFor="" className="form-label text-base">
            Size
          </label>
          <div className="flex gap-1">
            {values?.sizes?.map((val, index) => (
              <button
                className={cn(
                  "border py-2 px-3 text-sm rounded-lg bg-[#272b3c]",
                  colorSize.size === val ? "border-gray-200" : "border-gray-600"
                )}
                key={index}
                onClick={() =>
                  handleChange({
                    color: colorSize.color,
                    size: val,
                    array: values,
                  })
                }
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        <div className="">
          <label htmlFor="" className="form-label text-base">
            Color
          </label>
          <div className="flex gap-1">
            {values?.colors?.map((val, index) => (
              <button
                className={cn(
                  `h-3 w-3 p-3 text-sm rounded-full`,
                  colorSize.color === val
                    ? "border-2 border-gray-200"
                    : " border border-gray-600"
                )}
                key={index}
                style={{ backgroundColor: val }}
                onClick={() =>
                  handleChange({
                    color: val,
                    size: colorSize.size,
                    array: values,
                  })
                }
              ></button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2">
        <label htmlFor="" className="form-label text-sm">
          Product Description :
        </label>
        <div className="text-xs font-normal py-2">{values?.description}</div>
      </div>
      <div className="">
        <label htmlFor="" className="form-label text-sm">
          Specifications :
        </label>
        <div className="flex flex-col gap-1 text-sm font-normal py-2">
          <text>
            <span className="text-gray-300">Brand : </span>
            {values?.brand}
          </text>
          <text>
            <span className="text-gray-300">Fabric : </span>
            {values?.fabric}
          </text>
          <text>
            <span className="text-gray-300">Fit Type : </span>
            {values?.fitType}
          </text>
          {values?.AdditionalSpecification?.map((data, index) => (
            <text key={index}>
              <span className="text-gray-300">{Object.keys(data)[0]} : </span>
              {data[Object.keys(data)[0]]}
            </text>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preview;
