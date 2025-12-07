import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button as CustomButton } from "@/Components/ui/button";
import { useFormik } from "formik";
import { AddProduct } from "./service";
import GlobalToast from "@/Components/GlobalToast";
import { MultiSelect } from "react-multi-select-component";
import { getVariant } from "@/Pages/Admin/Variant/service";
import SelectElement from "@/Components/Select/SelectElement";
import { InputTextarea } from "primereact/inputtextarea";

const AddModal = ({ refreshGrid, filterTypeOptions = [] }) => {
  const [open, setopen] = useState(false);
  const [variants, setvariants] = useState({
    options: [],
    fields: [],
  });
  const [variantFields, setvariantFields] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      productType: "",
      inStock: "",
      sold: "",
      category: [],
      fabric: "",
      sizes: "",
      brand: "",
      colors: "",
      fitType: "",
      variantFields: [],
    },
  });
  const submitHandler = (data) => {
    AddProduct(data).then((resp) => {
      GlobalToast({
        message: resp.statusMsg,
        messageTimer: 2500,
        messageType: resp.statusCode === 200 ? "success" : "error",
      });
      refreshGrid();
      setopen(false);
    });
  };
  function getVariantFields(id) {
    const selectedVariant = variants.raw.find((data) => data._id === id);
    console.log(selectedVariant);
    setvariantFields(selectedVariant.Fields);
  }
  useEffect(() => {
    formik.resetForm();
    setvariantFields([]);
    setvariants({
      options: [],
      fields: [],
    });
    if (open) {
      getVariant().then((resp) => {
        setvariants({
          options: resp.map((data) => ({
            label: data.name,
            value: data._id,
          })),
          raw: resp,
        });
      });
    }
  }, [open]);

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <div className="flex gap-1.5 text-sm border-[1.5px] border-black px-[13px] py-1.5 rounded-[20px]">
          Add New Product
          <span className="">
            <i className="fa-slid fa-plus"></i>
          </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <Label>Name</Label>
            <Input name={"name"} onChange={formik.handleChange} />
          </div>
          <div className="">
            <Label>Price</Label>
            <Input name={"price"} onChange={formik.handleChange} />
          </div>
          <div className="">
            <Label>Description</Label>
            <InputTextarea
              autoResize
              className="p-2 w-full"
              rows={1}
              name={"description"}
              onChange={formik.handleChange}
            />
          </div>
          <div className="">
            <Label>Product Type</Label>
            <SelectElement
              options={variants.options}
              name={"productType"}
              value={variants.options?.find(
                (data) => data.value === formik.values.productType
              )}
              onChange={(data) => {
                formik.setFieldValue("productType", data.value);
                getVariantFields(data.value);
              }}
            />
          </div>
          <div className="">
            <Label>In Stock</Label>
            <Input name={"inStock"} onChange={formik.handleChange} />
          </div>
          <div className="">
            <Label>Sold</Label>
            <Input name={"sold"} onChange={formik.handleChange} />
          </div>
          <div className="">
            <Label>Category</Label>
            {/* <Input name={"category"} onChange={formik.handleChange} /> */}
            <MultiSelect
              options={filterTypeOptions}
              value={formik.values.category}
              onChange={(data) => formik.setFieldValue("category", data)}
              labelledBy="Select"
            />
          </div>
          <div className="">
            <Label>Fabric</Label>
            <Input name={"fabric"} onChange={formik.handleChange} />
          </div>
          <div className="">
            <Label>Brand</Label>
            <Input name={"brand"} onChange={formik.handleChange} />
          </div>

          <div className="">
            <Label>Fit Type</Label>
            <Input name={"fitType"} onChange={formik.handleChange} />
          </div>
          {variantFields?.map((data, index) => (
            <div className="" key={index}>
              <Label>{data.name}</Label>
              <Input
                name={data.name}
                onChange={(event) => {
                  formik.setFieldValue(
                    "variantFields",
                    formik.values.variantFields.some(
                      ({ field }) => field === data.name
                    )
                      ? formik.values.variantFields.map((val) =>
                          val.field === data.name
                            ? {
                                field: data.name,
                                value: event.target.value.split(","),
                                flag: data.flag,
                              }
                            : val
                        )
                      : [
                          ...formik.values.variantFields,
                          {
                            field: data.name,
                            value: event.target.value.split(","),
                            flag: data.flag,
                          },
                        ]
                  );
                }}
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <CustomButton
            className=""
            onClick={() => submitHandler(formik.values)}
          >
            Submit
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
