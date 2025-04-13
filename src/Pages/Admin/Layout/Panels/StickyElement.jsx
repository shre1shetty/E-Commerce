import SelectElement from "@/Components/Select/SelectElement";
import { useFormik } from "formik";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import * as Yup from "yup";
import React from "react";

const StickyElement = ({ formik }) => {
  const positionElement = [
    {
      label: "Top",
      value: "top",
    },
    {
      label: "Right",
      value: "right",
    },
    {
      label: "Left",
      value: "left",
    },
    {
      label: "Bottom",
      value: "bottom",
    },
  ];
  const handleNestedBlur = (field) => {
    formik.setFieldTouched(`stickyPanel.${field}`, true);
  };
  // const formik = useFormik({
  //   initialValues: {
  //     text: "",
  //     url: "",
  //     position: "right",
  //   },
  //   validationSchema: Yup.object().shape({
  //     text: Yup.string().required("Text is required"),
  //     url: Yup.string().required("URL is required"),
  //     position: Yup.string().required("Position is required"),
  //   }),
  // });
  return (
    <div className="grid grid-cols-5 gap-2 py-4 items-center">
      <FloatLabel>
        <InputText
          id="stickyText"
          className=""
          name="stickyPanel.text"
          value={formik.values.stickyPanel?.text}
          invalid={
            formik.touched.stickyPanel?.text && formik.errors.stickyPanel?.text
          }
          onBlur={() => handleNestedBlur("text")}
          onChange={formik.handleChange}
        />
        <label htmlFor="stickyText" className="">
          {formik.touched.stickyPanel?.text && formik.errors.stickyPanel?.text
            ? formik.errors.stickyPanel?.text
            : "Text"}
        </label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          id="stickyUrl"
          name="stickyPanel.url"
          value={formik.values.stickyPanel?.url}
          className=""
          invalid={
            formik.touched.stickyPanel?.url && formik.errors.stickyPanel?.url
          }
          onBlur={() => handleNestedBlur("url")}
          onChange={formik.handleChange}
        />
        <label htmlFor="stickyUrl" className="">
          {formik.touched.stickyPanel?.url && formik.errors.stickyPanel?.url
            ? formik.errors.stickyPanel?.url
            : "Url"}
        </label>
      </FloatLabel>
      <div className="mb-[25px]">
        <label htmlFor="" className="">
          Position
        </label>
        <SelectElement
          options={positionElement}
          className="bg-white"
          value={positionElement.find(
            ({ value }) => value === formik.values.stickyPanel?.position
          )}
          name={"position"}
          errorFlag={formik.errors.stickyPanel?.position}
          onChange={(data) =>
            formik.setFieldValue("stickyPanel.position", data.value)
          }
          placeholder={
            <span className="text-sm text-red-500">
              {formik.errors.stickyPanel?.position}
            </span>
          }
        />
        {formik.errors.stickyPanel?.position &&
          formik.touched.stickyPanel?.position && (
            <span className="">{formik.errors.stickyPanel?.position}</span>
          )}
      </div>
    </div>
  );
};

export default StickyElement;
