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
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { addWorkflowStage, getStagesForDrpDown } from "../service";
import { convertForSelect } from "@/lib/utils";
import SelectElement from "@/Components/Select/SelectElement";

const AddModal = ({ open, setOpen, refreshGrid }) => {
  const [stages, setstages] = useState([]);
  const formik = useFormik({
    initialValues: {
      stageFrom: "",
      stageTo: "",
      stageName: "",
      firstStage: false,
      finalStage: false,
    },
    validationSchema: Yup.object({
      stageFrom: Yup.string().when("firstStage", {
        is: false,
        then: () => Yup.string().required("Stage From is required"),
        otherwise: () => Yup.string().notRequired(),
      }),
      stageTo: Yup.string().required("Stage To is required"),
      stageName: Yup.string().required("Stage Name is required"),
    }),
    onSubmit: () => {},
  });

  const handleSubmit = (data) => {
    formik.handleSubmit();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        addWorkflowStage(data).then((res) => {
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
      getStagesForDrpDown().then((resp) => {
        if (resp) {
          setstages(
            convertForSelect({
              data: resp.data,
              label: "stageName",
              value: "_id",
            })
          );
        }
      });
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add WorkFlow Stage</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4">
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
            <Label className="mandatory">Stage From</Label>
            <SelectElement
              name={"stageFrom"}
              options={stages}
              value={stages.find(
                ({ value }) => value === formik.values.stageFrom
              )}
              onChange={({ value }) => formik.setFieldValue("stageFrom", value)}
            />
            <ErrorMessage
              message={formik.errors.stageFrom}
              isVisible={formik.touched.stageFrom && formik.errors.stageFrom}
            />
          </div>
          <div className="">
            <Label className="mandatory">Stage To</Label>
            <SelectElement
              name={"stageTo"}
              options={stages}
              value={stages.find(
                ({ value }) => value === formik.values.stageTo
              )}
              onChange={({ value }) => formik.setFieldValue("stageTo", value)}
            />
            <ErrorMessage
              message={formik.errors.stageTo}
              isVisible={formik.touched.stageTo && formik.errors.stageTo}
            />
          </div>
          <CustomSwitch
            className={""}
            checked={formik.values.firstStage}
            onChange={(e) => formik.setFieldValue("firstStage", e.value)}
            label={"First Stage"}
          />
          <CustomSwitch
            checked={formik.values.finalStage}
            onChange={(e) => formik.setFieldValue("finalStage", e.value)}
            label={"Final Stage"}
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
