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
  const [values, setvalues] = useState({ variantFields: [] });
  const [variantFields, setvariantFields] = useState({
    varient1: "",
    varient2: "",
  });
  const [field1Field2, setfield1Field2] = useState({ field1: "", field2: "" });
  const [picturesArray, setpicturesArray] = useState([]);
  const handleChange = ({ field1, field2, array, variantFields }) => {
    setfield1Field2({ field1, field2 });
    const PictureArray = array.pictures;
    const newImage = array.variantValues.find(
      (val) =>
        val.name ===
        `${variantFields.varient1}${field1}${variantFields.varient2}${field2}Variant`
    ).values.picture;
    if (newImage) {
      PictureArray[0] = newImage;
    }
    setpicturesArray(PictureArray);
  };
  useEffect(() => {
    if (!isEmpty(data)) {
      setvariantFields({
        varient1: data.variantFields[0]?.field,
        varient2: data.variantFields[1]?.field,
      });
      setvalues(data);
      if (!isEmpty(data.variantFields[0]) || !isEmpty(data.variantFields[1]))
        setfield1Field2({
          field1: data.variantFields[0].value[0],
          field2: data.variantFields[1].value[0],
        });
      if (data.pictures) {
        if (
          data.variantValues.find(
            (val) =>
              val.name ===
              `${data.variantFields[0].field}${data.variantFields[0].value[0]}${data.variantFields[1].field}${data.variantFields[1].value[0]}Variant`
          )?.values.picture
        ) {
          const PictureArray = data.pictures;
          PictureArray[0] = data.variantValues.find(
            (val) =>
              val.name ===
              `${data.variantFields[0].field}${data.variantFields[0].value[0]}${data.variantFields[1].field}${data.variantFields[1].value[0]}Variant`
          )?.values.picture;
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
          ₹
          {
            values.variantValues?.find(
              (val) =>
                val.name ===
                `${variantFields.varient1}${field1Field2.field1}${variantFields.varient2}${field1Field2.field2}Variant`
            )?.values?.price
          }
        </label>
      </div>
      <div className="flex justify-between items-center">
        <div className="">
          <label htmlFor="" className="form-label text-base">
            {variantFields.varient1}
          </label>
          <div className="flex gap-1">
            {values?.variantFields[0]?.value?.map((val, index) => (
              <button
                className={cn(
                  field1Field2.field1 === val
                    ? "border-gray-200"
                    : "border-gray-600",
                  values?.variantFields[0].flag === "Fill"
                    ? "h-3 w-3 p-3 rounded-full"
                    : "border py-1 px-2 rounded-lg"
                )}
                style={{
                  backgroundColor:
                    values?.variantFields[0].flag === "Fill" ? val : "#272b3c",
                }}
                key={index}
                onClick={() =>
                  handleChange({
                    field2: field1Field2.field2,
                    field1: val,
                    array: values,
                    variantFields: variantFields,
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
            {variantFields.varient2}
          </label>
          <div className="flex gap-1">
            {values?.variantFields[1]?.value?.map((val, index) => (
              <button
                className={cn(
                  field1Field2.field2 === val
                    ? "border-2 border-gray-200"
                    : " border border-gray-600",
                  values?.variantFields[1].flag === "Fill"
                    ? "h-3 w-3 p-3 rounded-full"
                    : "border py-1 px-2 rounded-lg"
                )}
                key={index}
                style={{
                  backgroundColor:
                    values?.variantFields[1].flag === "Fill" ? val : "#272b3c",
                }}
                onClick={() =>
                  handleChange({
                    field2: val,
                    field1: field1Field2.field1,
                    array: values,
                    variantFields: variantFields,
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
