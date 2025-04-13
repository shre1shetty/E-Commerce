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
import { useFormik } from "formik";
import { UpdateFilterType } from "./service";
import GlobalToast from "@/Components/GlobalToast";
import { convertToFormData } from "@/lib/utils";
import FileUploadButton from "@/Components/FileUpload/FIleUploadButton";

const EditModal = ({ refreshGrid, children, data = {} }) => {
  const [open, setopen] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
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
      formik.setFieldValue(key, data[key]?.toString())
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
