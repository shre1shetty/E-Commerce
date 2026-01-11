import CustomSwitch from "@/Components/Button/CustomSwitch";
import ErrorMessage from "@/Components/ErrorMessage/ErrorMessage";
import GlobalToast from "@/Components/GlobalToast";
import { Button } from "@/Components/ui/button";
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
import React, { useEffect } from "react";
import * as Yup from "yup";
import { addStage } from "../service";

const AddModal = ({ open, setOpen, refreshGrid }) => {
  const formik = useFormik({
    initialValues: {
      stageName: "",
      description: "",
      rejectStage: false,
    },
    validationSchema: Yup.object({
      stageName: Yup.string().required("Stage name is required"),
      description: Yup.string().required("Description is required"),
    }),
  });

  const handleSubmit = (data) => {
    formik.handleSubmit();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        addStage(data).then((res) => {
          if (res) {
            GlobalToast({
              message: "Stage added successfully",
              messageTimer: 2500,
              messageType: "success",
            });
            refreshGrid();
            setOpen(false);
          }
        });
      } else {
        GlobalToast({
          message: "Mandatory Fields are required",
          messageTimer: 2500,
          messageType: "error",
        });
      }
    });
  };

  useEffect(() => {
    if (open) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <i className="fa-solid fa-plus"></i>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Stage</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <Label className="mandatory">Name</Label>
            <Input
              name={"stageName"}
              value={formik.values.stageName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <ErrorMessage
              message={formik.errors.stageName}
              isVisible={formik.touched.stageName && formik.errors.stageName}
            />
          </div>
          <div className="">
            <Label className="mandatory">Description</Label>
            <Input
              name={"description"}
              value={formik.values.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <ErrorMessage
              message={formik.errors.description}
              isVisible={
                formik.touched.description && formik.errors.description
              }
            />
          </div>
          <CustomSwitch
            checked={formik.values.rejectStage}
            onChange={(e) => formik.setFieldValue("rejectStage", e.value)}
            label={"Reject Stage"}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              handleSubmit(formik.values);
            }}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
