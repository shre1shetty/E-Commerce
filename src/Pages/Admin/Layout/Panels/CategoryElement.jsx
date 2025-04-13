import { convertForSelect } from "@/lib/utils";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { getFilterType } from "../../FilterType/service";

const CategoryElement = ({ category, setcategory }) => {
  const [filterTypeOptions, setfilterTypeOptions] = useState([]);
  const formik = useFormik({
    initialValues: {
      category: [],
    },
  });
  useEffect(() => {
    getFilterType().then((resp) => {
      setfilterTypeOptions(
        convertForSelect({ data: resp, label: "name", value: "_id" })
      );
    });
  }, []);
  return (
    <MultiSelect
      className="w-1/4 bg-white"
      options={filterTypeOptions}
      value={category}
      onChange={(data) => setcategory(data)}
      labelledBy="Select"
    />
  );
};

export default CategoryElement;
