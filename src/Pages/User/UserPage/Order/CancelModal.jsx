import ErrorMessage from "@/Components/ErrorMessage/ErrorMessage";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { LS } from "@/lib/SecureLocalStorage";
import { useFormik } from "formik";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect } from "react";
import * as yup from "yup";
import { cancelOrder } from "./service";
import GlobalToast from "@/Components/GlobalToast";

const CancelModal = ({
  open,
  setopen,
  amount,
  refundableAmount,
  orderId,
  refreshGrid,
}) => {
  const formik = useFormik({
    initialValues: {
      _id: "",
      userId: "",
      remarks: "",
    },
    validationSchema: yup.object({
      remarks: yup.string().min(10).max(30).required("Remarks is required"),
    }),
  });
  useEffect(() => {
    if (open) {
      formik.resetForm();
      formik.setFieldValue("_id", orderId);
      formik.setFieldValue("userId", LS.get("userId"));
    }
  }, [open, orderId]);

  const handleSubmit = (values) => {
    cancelOrder(values).then((resp) => {
      GlobalToast({
        message: resp.message,
        messageTimer: 1200,
        messageType: resp.statusCode === 200 ? "success" : "error",
      });
      refreshGrid();
      setopen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent>
        <DialogTitle className="text-center">
          Cancel Order {`[${orderId}]`}
        </DialogTitle>
        <span className="text-sm">
          Cancellation is allowed, however refund amount depends on the order
          stage. Certain charges such as packaging, handling or delivery may be
          non-refundable.
        </span>
        <div className="cancelation-details">
          <span className="">
            Order amount : <span className="text-sky-800">{amount}</span>
          </span>
          <span className="">
            Refundable amount :{" "}
            <span className="text-green-600">{refundableAmount}</span>
          </span>
        </div>
        <span className="cancel-confirmation-text">
          Do you still want to cancel this order ?
        </span>
        <div className="">
          <Label>Remarks</Label>
          <InputTextarea
            name="remarks"
            autoResize
            rows={1}
            value={formik.values.remarks}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorMessage
            message={formik.errors.remarks}
            isVisible={formik.touched.remarks && formik.errors.remarks}
          />
        </div>

        <DialogFooter>
          <Button onClick={() => handleSubmit(formik.values)}>Proceed</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelModal;
