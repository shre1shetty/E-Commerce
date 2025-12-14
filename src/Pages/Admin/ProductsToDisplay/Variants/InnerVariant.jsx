import GlobalToast from "@/Components/GlobalToast";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { cn, getFileUrl } from "@/lib/utils";
import { useFormik } from "formik";
import { PlusCircle, X, XIcon } from "lucide-react";
import "./index.css";
import React, { useEffect, useState } from "react";
import { isString } from "lodash";

const InnerVariant = ({
  showPreview,
  value1,
  value2,
  field1,
  field2,
  setSizeVariantValues,
  baseValues,
}) => {
  const formik = useFormik({
    initialValues: {
      picture: [],
    },
  });
  const handleClickListener = () => {
    setSizeVariantValues(formik.values);
    GlobalToast({
      message: "Saved Successfully",
      messageType: "success",
      messageTimer: 2000,
    });
  };
  useEffect(() => {
    if (baseValues.values) {
      formik.setFieldValue("purchasePrice", baseValues.values.purchasePrice);
      formik.setFieldValue("price", baseValues.values.price);
      formik.setFieldValue(
        "discountedPrice",
        baseValues.values.discountedPrice
      );
      formik.setFieldValue("inStock", baseValues.values.inStock);
      formik.setFieldValue("picture", baseValues.values.picture ?? []);
    }
  }, [baseValues]);
  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  return (
    <div
      className="w-full flex justify-between items-center px-2 py-3 border border-[#d5d5d5] rounded-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="font-bold text-sm">
        {field2} : {value2}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-2 items-center">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex gap-1 items-center">
              <label htmlFor="price" className="form-label whitespace-nowrap">
                Purchase Price :
              </label>
              <Input
                name="purchasePrice"
                value={formik.values.purchasePrice ?? ""}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="price" className="form-label whitespace-nowrap">
                Price :
              </label>
              <Input
                name="price"
                value={formik.values.price ?? ""}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="price" className="form-label whitespace-nowrap">
                Discounted Price :
              </label>
              <Input
                name="discountedPrice"
                value={formik.values.discountedPrice ?? ""}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="form-label whitespace-nowrap">
                In Stock :
              </label>
              <Input
                name="inStock"
                value={formik.values.inStock ?? ""}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="relative">
            <div className="border border-dashed border-black flex justify-center items-center p-2">
              {/* {formik.values.picture?.length > 0 ? (
                <img
                  className="h-[30px] w-full"
                  src={URL.createObjectURL(formik.values.picture[0])}
                  alt=""
                />
              ) : ( */}
              <PlusCircle />
              {/* )} */}
            </div>
            <div
              className=""
              onClick={(event) => {
                event.stopPropagation(); // Prevent accordion toggle when interacting with the input
              }}
            >
              <input
                type="file"
                className="absolute opacity-0 top-0 left-0 right-0 bottom-0 cursor-pointer"
                accept=".png"
                onChange={(event) => {
                  event.target.files[0] &&
                    formik.setFieldValue("picture", [
                      ...formik.values.picture,
                      event.target.files[0],
                    ]);
                  event.target.value = null;
                }}
              />
            </div>
          </div>
          {formik.values.picture?.map((image, index) => (
            <div className="relative border border-dashed border-black flex justify-center items-center p-2 image-container">
              <img
                className="h-[30px] w-full"
                src={
                  isString(image)
                    ? getFileUrl(image)
                    : URL.createObjectURL(image)
                }
                alt=""
              />
              <button
                className="cancel-button absolute z-10 top-0 right-0"
                onClick={() =>
                  formik.setFieldValue(
                    "picture",
                    formik.values.picture.filter(
                      (val, index1) => index1 !== index
                    )
                  )
                }
              >
                <XIcon className="" />
              </button>
            </div>
          ))}
        </div>

        <Button onClick={handleClickListener}>Save</Button>
      </div>
    </div>
  );
};

export default InnerVariant;
