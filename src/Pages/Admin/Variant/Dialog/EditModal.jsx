import React, { useEffect, useState } from "react";
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
import { UpdateVariant } from "./service";
import GlobalToast from "@/Components/GlobalToast";
import { InputNumber } from "primereact/inputnumber";
import AgGrid from "@/Components/AgGrid/AgGrid";

const EditModal = ({ refreshGrid, children, data = {} }) => {
  const [open, setopen] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      gstSlabs: [],
    },
  });
  const slabFormik = useFormik({
    initialValues: {
      minPrice: 0,
      maxPrice: null, // null = no upper limit
      gstPercentage: 0,
    },
  });

  const handleAddSlab = ({ slabFormik, formik }) => {
    if (slabFormik.values.id) {
    } else {
      const updatedSlabs = [...formik.values.gstSlabs, slabFormik.values];
      formik.setFieldValue("gstSlabs", updatedSlabs);
      slabFormik.resetForm();
    }
  };

  const submitHandler = (data) => {
    console.log(data);
    UpdateVariant(data).then((resp) => {
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
    console.log(data);
    Object.keys(data).forEach((key) => formik.setFieldValue(key, data[key]));
  }, [data]);
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Variant</DialogTitle>
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
          <div className="col-span-2 bg-black text-white px-2 py-2 rounded-md text-center">
            GST Configuration
          </div>
          <div className="col-span-2 grid grid-cols-4 gap-1 items-end">
            <div className="">
              <Label>Minimum Price</Label>
              <InputNumber
                className="w-full"
                value={slabFormik.values.minPrice}
                name={"minPrice"}
                onChange={({ value }) =>
                  slabFormik.setFieldValue("minPrice", value)
                }
              />
            </div>
            <div className="">
              <Label>Maximum Price</Label>
              <InputNumber
                className="w-full"
                value={slabFormik.values.maxPrice}
                name={"maxPrice"}
                onChange={({ value }) =>
                  slabFormik.setFieldValue("maxPrice", value)
                }
              />
            </div>
            <div className="">
              <Label>GST</Label>
              <InputNumber
                className="w-full"
                value={slabFormik.values.gstPercentage}
                name={"gstPercentage"}
                onChange={({ value }) =>
                  slabFormik.setFieldValue("gstPercentage", value)
                }
              />
            </div>
            <CustomButton
              className="!h-10"
              onClick={() => handleAddSlab({ slabFormik, formik })}
            >
              Submit
            </CustomButton>
          </div>
          <div className="col-span-2">
            <AgGrid
              rows={formik.values.gstSlabs}
              headCells={[
                {
                  field: "minPrice",
                  headerName: "Minimum Price",
                },
                {
                  field: "maxPrice",
                  headerName: "Maximum Price",
                },
                {
                  field: "gstPercentage",
                  headerName: "GST Percentage",
                },
              ]}
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
