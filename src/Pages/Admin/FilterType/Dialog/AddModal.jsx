import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button as CustomButton } from "@/Components/ui/button";
import { useFormik } from "formik";
import { AddFilterType } from "./service";
import GlobalToast from "@/Components/GlobalToast";
import FileUploadButton from "@/Components/FileUpload/FIleUploadButton";
import { convertToFormData } from "@/lib/utils";
import * as Yup from "yup";

const AddModal = ({ refreshGrid, id }) => {
  const [open, setopen] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter a name"),
      image: Yup.string().required("Please select a iamge"),
    }),
  });
  const submitHandler = (data) => {
    formik.validateForm().then((errors) => {
      console.log(errors, data);
      if (Object.keys(errors).length > 0) {
        GlobalToast({
          message: "Enter mandatory Fields",
          messageTimer: 1200,
          messageType: "error",
        });
      } else {
        AddFilterType(convertToFormData(data), id).then((resp) => {
          GlobalToast({
            message: resp.statusMsg,
            messageTimer: 2500,
            messageType: resp.statusCode === 200 ? "success" : "error",
          });
          refreshGrid();
          setopen(false);
        });
      }
    });
  };
  useEffect(() => {
    formik.resetForm();
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <div className="flex gap-1.5 text-sm border-[1.5px] border-black px-[13px] py-1.5 rounded-[20px]">
          Add New Filter Type
          <span className="">
            <i className="fa-slid fa-plus"></i>
          </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Filter Type</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <Label>Name</Label>
            <Input name={"name"} onChange={formik.handleChange} />
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

export default AddModal;
