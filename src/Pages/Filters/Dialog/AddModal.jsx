import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button as CustomButton } from "@/Components/ui/button";
import { useFormik } from "formik";
import { AddFilter } from "./service";
import GlobalToast from "@/Components/GlobalToast";

const AddModal = ({ refreshGrid }) => {
  const [open, setopen] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
  });
  const submitHandler = (data) => {
    AddFilter(data).then((resp) => {
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
          Add New Filter
          <span className="">
            <i className="fa-slid fa-plus"></i>
          </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Filter</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <Label>Name</Label>
            <Input name={"name"} onChange={formik.handleChange} />
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
