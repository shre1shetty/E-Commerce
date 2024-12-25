import React, { useMemo, useState } from "react";
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
import { AddProduct } from "./service";
import GlobalToast from "@/Components/GlobalToast";
import { MultiSelect } from "react-multi-select-component";

const AddModal = ({ refreshGrid, filterTypeOptions = [] }) => {
  const [open, setopen] = useState(false);
  const [selectedCategory, setselectedCategory] = useState([]);
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
  useMemo(() => {
    formik.resetForm();
  }, [open]);
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
            <TextArea
              autoSize
              className="p-2"
              name={"description"}
              onChange={formik.handleChange}
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
            <Label>Sizes</Label>
            <Input
              name={"sizes"}
              onChange={(event) =>
                formik.setFieldValue("sizes", event.target.value.split(","))
              }
            />
          </div>
          <div className="">
            <Label>Brand</Label>
            <Input name={"brand"} onChange={formik.handleChange} />
          </div>
          <div className="">
            <Label>Colors</Label>
            <Input
              name={"colors"}
              onChange={(event) =>
                formik.setFieldValue("colors", event.target.value.split(","))
              }
            />
          </div>
          <div className="">
            <Label>Fit Type</Label>
            <Input name={"fitType"} onChange={formik.handleChange} />
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

export default AddModal;
