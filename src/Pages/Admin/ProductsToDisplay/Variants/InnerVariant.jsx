import GlobalToast from "@/Components/GlobalToast";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { cn, getFileUrl } from "@/lib/utils";
import { setNestedObjectValues, useFormik } from "formik";
import { PlusCircle, X, XIcon } from "lucide-react";
import "./index.css";
import React, { useEffect, useState } from "react";
import { isString } from "lodash";
import ErrorMessage from "@/Components/ErrorMessage/ErrorMessage";
import * as yup from "yup";

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
      purchasePrice: "",
      price: "",
      discountedPrice: "",
      inStock: 0,
      picture: [],
    },
    validationSchema: yup.object({
      purchasePrice: yup
        .number()
        .typeError("Please enter numeric value")
        .required("Please enter purchase price"),
      price: yup
        .number()
        .typeError("Please enter numeric value")
        .required("Please enter price"),
      discountedPrice: yup
        .number()
        .typeError("Please enter numeric value")
        .required("Please enter discounted purchase price"),
      inStock: yup
        .number()
        .typeError("Please enter numeric value")
        .required("Please enter items in stock"),
      picture: yup.array().min(1, "At least one image is required"),
    }),
    onSubmit: () => {},
  });
  const handleClickListener = () => {
    formik.submitForm();
    formik.validateForm().then((errors) => {
      console.log(errors);
      if (Object.keys(errors).length > 0) {
        GlobalToast({
          message: "Fill all fields",
          messageType: "error",
          messageTimer: 1000,
        });
      } else {
        setSizeVariantValues(formik.values);
        GlobalToast({
          message: "Saved Successfully",
          messageType: "success",
          messageTimer: 1000,
        });
      }
    });
  };
  useEffect(() => {
    if (baseValues.values) {
      formik.setFieldValue(
        "purchasePrice",
        baseValues.values.purchasePrice ?? "",
      );
      formik.setFieldValue("price", baseValues.values.price ?? "");
      formik.setFieldValue(
        "discountedPrice",
        baseValues.values.discountedPrice ?? "",
      );
      formik.setFieldValue("inStock", baseValues.values.inStock ?? 0);
      formik.setFieldValue("picture", baseValues.values.picture ?? []);
    }
  }, [baseValues]);

  return (
    <div
      className="w-full flex flex-col gap-2  px-2 py-3 border border-[#d5d5d5] rounded-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="font-bold text-sm">
        {field2} : {value2}
      </div>
      <div className="flex items-center gap-4 grow">
        <div className="flex gap-2 grow">
          <div className="grid grid-cols-4 gap-4 grow">
            <div className="">
              <label htmlFor="price" className="form-label whitespace-nowrap">
                Purchase Price :
              </label>
              <div className="">
                <Input
                  name="purchasePrice"
                  className={cn(
                    "form-control",
                    formik.touched.purchasePrice && formik.errors.purchasePrice
                      ? "errorClass"
                      : "",
                  )}
                  value={formik.values.purchasePrice ?? ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <ErrorMessage
                  isVisible={
                    formik.touched.purchasePrice && formik.errors.purchasePrice
                  }
                  message={formik.errors.purchasePrice}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="price" className="form-label whitespace-nowrap">
                Price :
              </label>
              <div>
                <Input
                  name="price"
                  className={cn(
                    "form-control",
                    formik.touched.price && formik.errors.price
                      ? "errorClass"
                      : "",
                  )}
                  value={formik.values.price ?? ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <ErrorMessage
                  isVisible={formik.touched.price && formik.errors.price}
                  message={formik.errors.price}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="price" className="form-label whitespace-nowrap">
                Discounted Price :
              </label>
              <div>
                <Input
                  name="discountedPrice"
                  className={cn(
                    "form-control",
                    formik.touched.discountedPrice &&
                      formik.errors.discountedPrice
                      ? "errorClass"
                      : "",
                  )}
                  value={formik.values.discountedPrice ?? ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <ErrorMessage
                  isVisible={
                    formik.touched.discountedPrice &&
                    formik.errors.discountedPrice
                  }
                  message={formik.errors.discountedPrice}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="" className="form-label whitespace-nowrap">
                In Stock :
              </label>
              <div>
                <Input
                  name="inStock"
                  className={cn(
                    "form-control",
                    formik.touched.inStock && formik.errors.inStock
                      ? "errorClass"
                      : "",
                  )}
                  value={formik.values.inStock ?? ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <ErrorMessage
                  isVisible={formik.touched.inStock && formik.errors.inStock}
                  message={formik.errors.inStock}
                />
              </div>
            </div>
          </div>
          <div className="relative mt-[23px]">
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
                accept=".webp"
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
                      (val, index1) => index1 !== index,
                    ),
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
