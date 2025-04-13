import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useFormik } from "formik";
import { FileUpload } from "primereact/fileupload";
import React, { useEffect, useState } from "react";

const HeaderAddModal = () => {
  const [open, setopen] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      url: "",
    },
  });
  useEffect(() => {
    formik.resetForm();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <div className="flex gap-1.5 text-sm border-[1.5px] border-black px-[13px] py-1.5 rounded-[20px]">
          Add New Variant
          <span className="">
            <i className="fa-slid fa-plus"></i>
          </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Slide</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <Label>Name</Label>
            <Input name={"name"} onChange={formik.handleChange} />
          </div>
          <div className="">
            <Label>Name</Label>
            <FileUpload
              name="url"
              onUpload={formik.handleChange}
              accept="image/*"
              maxFileSize={1000000}
            />
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeaderAddModal;
