import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Button as CustomButton } from "@/Components/ui/button";
import SelectElement from "@/Components/Select/SelectElement";
import { getVariant } from "../Variant/service";
import { exportToExcel } from "@/lib/utils";
const ProductTemplateModal = ({ open, setopen }) => {
  const [variants, setvariants] = useState([]);
  let defaultRows = {
    name: "",
    description: "",
    productType: "",
    inStock: "",
    category: "",
    fabric: "",
    brand: "",
    fitType: "",
  };
  const [productType, setproductType] = useState("");
  const downloadHandler = (productType) => {
    if (productType && productType !== "") {
      const Fields = variants
        .find((v) => v.value === productType)
        .filterTypes.map((ft) => ft.name);
      defaultRows.productType = productType;
      Fields.forEach((field) => (defaultRows[field] = ""));
      exportToExcel({ data: [defaultRows], fileName: "product_template.xlsx" });
      setopen(false);
    } else {
      alert("Please select product type");
    }
  };
  useEffect(() => {
    if (open) {
      setproductType("");
      getVariant().then((resp) => {
        setvariants(
          resp.map((data) => ({
            label: data.name,
            value: data._id,
            filterTypes: data.Fields || [],
          }))
        );
      });
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Template</DialogTitle>
        </DialogHeader>
        <div className="">
          <Label>Product Type</Label>
          <SelectElement
            options={variants}
            value={variants.find(({ value }) => value === productType)}
            onChange={({ value }) => setproductType(value)}
          />
        </div>
        <DialogFooter>
          <CustomButton
            className=""
            onClick={() => downloadHandler(productType)}
          >
            Submit
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductTemplateModal;
