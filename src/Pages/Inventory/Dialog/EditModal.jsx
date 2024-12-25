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

const EditModal = ({ filterTypeOptions, refreshGrid, children, data = {} }) => {
  const [open, setopen] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      inStock: "",
      sold: "",
      category: [],
      fabric: "",
      sizes: "",
      brand: "",
      colors: "",
      fitType: "",
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
  useEffect(() => {
    if (!isEmpty(data))
      Object.keys(data).forEach((key) => {
        formik.setFieldValue(key, data[key]);
      });
  }, [data]);
  //   useMemo(() => {
  //     formik.resetForm();
  //   }, [open]);
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
            <Label>Sizes</Label>
            <Input
              name={"sizes"}
              value={formik.values.sizes.toString()}
              onChange={(event) =>
                formik.setFieldValue("sizes", event.target.value.split(","))
              }
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
            <Label>Colors</Label>
            <Input
              name={"colors"}
              value={formik.values.colors.toString()}
              onChange={(event) =>
                formik.setFieldValue("colors", event.target.value.split(","))
              }
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
