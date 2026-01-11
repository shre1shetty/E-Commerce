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
import { UpdateFilterType } from "./service";
import GlobalToast from "@/Components/GlobalToast";
import {
  convertToBase64toFile,
  convertToFormData,
  getFileUrl,
} from "@/lib/utils";
import FileUploadButton from "@/Components/FileUpload/FIleUploadButton";
import * as Yup from "yup";

const EditModal = ({ refreshGrid, children, data = {} }) => {
  const [open, setopen] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter a name"),
      iamge: Yup.string().required("Please select a iamge"),
    }),
  });
  const submitHandler = (data) => {
    UpdateFilterType(convertToFormData(data)).then((resp) => {
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
    Object.keys(data).forEach((key) =>
      formik.setFieldValue(
        key,
        key === "image"
          ? convertToBase64toFile(data[key])
          : data[key]?.toString()
      )
    );
  }, [data]);
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
            <Label>Image</Label>
            <FileUploadButton
              value={formik.values.image}
              onChange={(image) => formik.setFieldValue("image", image)}
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
