import { convertForSelect } from "@/lib/utils";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { getProducts } from "../../ProductsToDisplay/service";

const TopProduct = ({ product = [], setproduct }) => {
  const [products, setproducts] = useState([]);
  const formik = useFormik({
    initialValues: {
      product: [],
    },
  });
  useEffect(() => {
    getProducts().then((resp) => {
      setproducts(
        convertForSelect({ data: resp, label: "name", value: "_id" })
      );
    });
  }, []);
  return (
    <MultiSelect
      className="w-1/4 bg-white"
      options={products}
      value={product}
      onChange={(data) => setproduct(data)}
      labelledBy="Select"
    />
  );
};

export default TopProduct;
