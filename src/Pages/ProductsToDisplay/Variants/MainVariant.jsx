import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useFormik } from "formik";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

const MainVariant = ({ size, setSizeVariantValues, baseValues }) => {
  const formik = useFormik({
    initialValues: {},
  });
  const handleClickListener = () => {
    setSizeVariantValues(formik.values);
  };
  useEffect(() => {
    if (baseValues[`${size}sizeVariant`]) {
      formik.setValues(baseValues[`${size}sizeVariant`]);
    } else {
      formik.setFieldValue("price", baseValues.price);
      formik.setFieldValue("inStock", baseValues.inStock);
      if (baseValues.pictures?.length > 0) {
        formik.setFieldValue("picture", baseValues.pictures[0]);
      }
    }
  }, [baseValues]);

  return (
    <div
      className="w-full flex justify-between items-center pr-2"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="font-extrabold text-base">Size : {size}</div>
      <div className="flex items-center gap-4">
        <div className="flex gap-2 items-center">
          <div className="grid grid-cols-2 gap-4">
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
              {formik.values.picture ? (
                <img
                  className="h-[30px] w-full"
                  src={URL.createObjectURL(formik.values.picture)}
                  alt=""
                />
              ) : (
                <PlusCircle />
              )}
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
                    formik.setFieldValue("picture", event.target.files[0]);
                  event.target.value = null;
                }}
              />
            </div>
          </div>
        </div>
        <Button onClick={handleClickListener}>Save</Button>
      </div>
    </div>
  );
};

export default MainVariant;
