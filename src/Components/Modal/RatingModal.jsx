import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { Rate, Upload } from "antd";
import { InputTextarea } from "primereact/inputtextarea";
import { CloudUploadIcon } from "lucide-react";
import GlobalToast from "../GlobalToast";
import "./index.css";
import { Button } from "../ui/button";
import Dragger from "antd/es/upload/Dragger";
import { useFormik } from "formik";
import { LS } from "@/lib/SecureLocalStorage";
import { convertToFormData } from "@/lib/utils";
import { addReview } from "./service";
const RatingModal = ({ image, variant, name, open, setopen, id }) => {
  const [value, setValue] = useState(5);
  const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];
  const [fileList, setFileList] = useState([]);
  function getDescTitle(value, desc) {
    const item = desc?.[value - 1];
    return typeof item === "object" ? item.title : item;
  }
  const props = {
    name: "file",
    multiple: true,
    listType: "picture",
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newlist = fileList.slice();
      newlist.splice(index, 1);
      setFileList(newlist);
    },
    beforeUpload: (file) => {
      const fileExt = file.name.split(".").pop().toLowerCase();
      const validType = ["jpg", "png"].includes(fileExt);
      if (validType) {
        setFileList((prev) => [...prev, file]);
      } else {
        GlobalToast({
          message: "Invalid format only jpg and png are allowed",
          messageTimer: 1200,
          messageType: "error",
        });
      }
      return false;
    },
    fileList,
  };
  const formatAttributes = (obj) => {
    return Object.entries(obj).map(([key, value], index, arr) => (
      <span key={key}>
        <span>{key.slice(0, -1)}</span>: {value}
        {index < arr.length - 1 && " - "}
      </span>
    ));
  };
  const formik = useFormik({
    initialValues: {
      userId: LS.get("userId"),
      productId: id,
      rating: 5,
      comment: "",
      pictures: [],
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const handleSubmit = (values) => {
    formik.handleSubmit();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        GlobalToast({
          message: "Kindly fill mandatory details",
          messageTimer: 1200,
          messageType: "error",
        });
      } else {
        addReview(values).then((resp) => {
          if (resp) {
            GlobalToast({
              message: resp.message,
              messageTimer: 1200,
              messageType: resp.status === 200 ? "success" : "error",
            });
            setopen(false);
          }
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent>
        <DialogTitle className="text-center">Review</DialogTitle>
        <div className="">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 rating-product-container mb-4">
              <div className="img-container">
                <img src={image} alt="" className="h-full w-full" />
              </div>
              <div className="">
                <div className="product-title">{name}</div>
                <span className="product-category">
                  {formatAttributes(variant ?? {})}
                </span>
              </div>
            </div>
            <div className="flex flex-col text-center items-center">
              {formik.values.rating ? (
                <span>{getDescTitle(formik.values.rating, desc)}</span>
              ) : null}
              <Rate
                onChange={(val) => {
                  formik.setFieldValue("rating", val);
                }}
                value={formik.values.rating}
                size="large"
              />
            </div>
            <div className="">
              <label htmlFor="" className="">
                Write your review
              </label>
              <InputTextarea
                autoResize
                className="p-2 w-full !h-auto"
                rows={3}
                cols={30}
                name={"comment"}
                value={formik.values.comment}
                onChange={formik.handleChange}
                placeholder="Please share your opinion on the product"
              />
            </div>
            <div className="">
              <Dragger className="min-h-28" accept={".png,.jpg"} {...props}>
                <p className="ant-upload-drag-icon flex justify-center items-center">
                  <CloudUploadIcon color="#727272" />
                </p>
                <p className="ant-upload-hint">
                  Click here to add photos of product
                </p>
              </Dragger>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() =>
              handleSubmit({
                ...formik.values,
                pictures: fileList,
              })
            }
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RatingModal;
