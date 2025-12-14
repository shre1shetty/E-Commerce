import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { uploadInventoryTemplate } from "./service";
import FileUploadButton from "@/Components/FileUpload/FIleUploadButton";
import { Label } from "@/Components/ui/label";
import { Button as CustomButton } from "@/Components/ui/button";

const ProductUploadtemplate = ({ open, setopen }) => {
  const [file, setfile] = useState(null);
  const uploadHandler = (file) => {
    const data = new FormData();
    data.append("file", file);
    uploadInventoryTemplate(data).then((res) => console.log(res));
  };
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Template</DialogTitle>
        </DialogHeader>
        <div className="">
          <Label>Upload xlsx</Label>
          <FileUploadButton type=".xlsx" value={file} onChange={setfile} />
        </div>
        <DialogFooter>
          <CustomButton className="" onClick={() => uploadHandler(file)}>
            Submit
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductUploadtemplate;
