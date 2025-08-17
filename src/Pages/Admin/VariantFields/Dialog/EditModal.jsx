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
import { useFormik } from "formik";
import { UpdateVariantField } from "./service";
import GlobalToast from "@/Components/GlobalToast";
import SelectElement from "@/Components/Select/SelectElement";

const EditModal = ({ refreshGrid, children, data = {} }) => {
  const [open, setopen] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      flag: "",
    },
  });
  const flagvalues = [
    {
      label: "Fill",
      value: "Fill",
    },
    {
      label: "Initials",
      value: "Initials",
    },
    {
      label: "Text",
      value: "Text",
    },
  ];
  const submitHandler = (data) => {
    UpdateVariantField(data).then((resp) => {
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
    Object.keys(data).forEach((key) =>
      formik.setFieldValue(key, data[key].toString())
    );
  }, [data]);
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Variant Field</DialogTitle>
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
            <Label>Field Style</Label>
            <SelectElement
              options={flagvalues}
              value={flagvalues.find(
                ({ value }) => value === formik.values.flag
              )}
              onChange={(data) => formik.setFieldValue("flag", data.value)}
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
