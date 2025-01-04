import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button as CustomButton } from "@/Components/ui/button";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import { UpdateProduct } from "./service";
import GlobalToast from "@/Components/GlobalToast";
import { MultiSelect } from "react-multi-select-component";
import { isEmpty } from "lodash";
import { getVariant } from "@/Pages/Variant/service";
import SelectElement from "@/Components/Select/SelectElement";

const EditModal = ({ filterTypeOptions, refreshGrid, children, data = {} }) => {
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
    UpdateProduct(data).then((resp) => {
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
    console.log(id, variants);
    const selectedVariant = variants.raw?.find((data) => data._id === id);
    setvariantFields(selectedVariant?.Fields);
  }
  useEffect(() => {
    if (open) {
      getVariant().then((resp) => {
        setvariants({
          options: resp.map((data) => ({
            label: data.name,
            value: data._id,
          })),
          raw: resp,
        });
        const selectedVariant = resp?.find(
          (val) => val._id === data.productType
        );
        console.log(selectedVariant, resp[0]._id, data.productType);
        setvariantFields(selectedVariant?.Fields);
      });

      Object.keys(data).forEach((key) => {
        formik.setFieldValue(key, data[key]);
      });
    }
  }, [open]);
  //   useMemo(() => {
  //     formik.resetForm();
  //   }, [open]);
  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <Label>Name</Label>
            <Input
              value={formik.values.name}
              name={"name"}
              onChange={formik.handleChange}
            />
          </div>
          <div className="">
            <Label>Price</Label>
            <Input
              value={formik.values.price}
              name={"price"}
              onChange={formik.handleChange}
            />
          </div>
          <div className="">
            <Label>Description</Label>
            <TextArea
              autoSize
              className="p-2"
              value={formik.values.description}
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
            <Input
              value={formik.values.inStock}
              name={"inStock"}
              onChange={formik.handleChange}
            />
          </div>
          <div className="">
            <Label>Sold</Label>
            <Input
              value={formik.values.sold}
              name={"sold"}
              onChange={formik.handleChange}
            />
          </div>
          <div className="">
            <Label>Category</Label>
            {/* <Input
              value={formik.values.category}
              name={"category"}
              onChange={formik.handleChange}
            /> */}
            <MultiSelect
              options={filterTypeOptions}
              value={formik.values.category}
              onChange={(data) => formik.setFieldValue("category", data)}
              labelledBy="Select"
            />
          </div>
          <div className="">
            <Label>Fabric</Label>
            <Input
              value={formik.values.fabric}
              name={"fabric"}
              onChange={formik.handleChange}
            />
          </div>
          <div className="">
            <Label>Brand</Label>
            <Input
              value={formik.values.brand}
              name={"brand"}
              onChange={formik.handleChange}
            />
          </div>
          <div className="">
            <Label>Fit Type</Label>
            <Input
              value={formik.values.fitType}
              name={"fitType"}
              onChange={formik.handleChange}
            />
          </div>
          {variantFields?.map((data, index) => (
            <div className="" key={index}>
              <Label>{data.name}</Label>
              <Input
                name={data.name}
                value={formik.values.variantFields
                  ?.find((val) => val.field === data.name)
                  ?.value?.toString()}
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
export default EditModal;
