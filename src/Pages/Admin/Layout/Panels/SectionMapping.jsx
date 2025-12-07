import ErrorMessage from "@/Components/ErrorMessage/ErrorMessage";
import SelectElement from "@/Components/Select/SelectElement";
import { convertForSelect, handleResize } from "@/lib/utils";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { getProducts } from "../../ProductsToDisplay/service";
import GlobalToast from "@/Components/GlobalToast";
import * as Yup from "yup";
import { Segmented, Splitter } from "antd";
import AgGrid from "@/Components/AgGrid/AgGrid";
import { EditIcon, Trash2 } from "lucide-react";
import HomeProductCard from "@/Components/ProductCard/HomeProductCard";
import FileUploadButton from "@/Components/FileUpload/FIleUploadButton";
const SectionMapping = ({ sections, setsections }) => {
  const containerRef = useRef(null);
  const [products, setproducts] = useState([]);
  // const [sections, setsections] = useState([]);
  const [sectionNames, setsectionNames] = useState([]);
  const [activeSection, setactiveSection] = useState("");
  const [active, setactive] = useState("Grid");
  const [rows, setrows] = useState([]);
  const sectionTypes = [
    {
      label: "Banner",
      value: "Banner",
    },
    {
      label: "Category",
      value: "Category",
    },
  ];
  const formik = useFormik({
    initialValues: {
      section: "",
      type: "",
      overlayText: "",
      overlaySubText: "",
      overlayBgImage: "",
      categoryName: "",
      products: [],
      size: 100,
      prodPerRow: 1,
      gap: 1,
    },
    validationSchema: Yup.object({
      section: Yup.string().required(),
      type: Yup.string().required(),
      overlayText: Yup.string().when("type", {
        is: (val) => val === "Banner",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),
      overlaySubText: Yup.string().when("type", {
        is: (val) => val === "Banner",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),
      categoryName: Yup.string().when("type", {
        is: (val) => val === "Category",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),
      prodPerRow: Yup.string().when("type", {
        is: (val) => val === "Category",
        then: (schema) => schema.required("Products per row is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      gap: Yup.string().when("type", {
        is: (val) => val === "Category",
        then: (schema) => schema.required("Gap is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      products: Yup.array().when("type", {
        is: (val) => val === "Category",
        then: (schema) =>
          schema.min(1, "At least one product is required").required(),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    onSubmit: () => {},
  });

  const addSection = (values, sections) => {
    formik.submitForm();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        GlobalToast({
          message: "Mandatory Fields are required",
          messageTimer: 1000,
          messageType: "error",
        });
      } else {
        values.gap = parseInt(values.gap);
        if (values.id) {
          const id = values.id;
          setsections(
            sections.map((val, index) =>
              index.toString() === id ? values : val
            )
          );
        } else {
          const sectionRowsLength = sections.filter(
            ({ section }) => section === values.section
          ).length;
          const equalSize = 100 / (sectionRowsLength + 1);
          setsections(
            [...sections, values].map((val) =>
              val.section === values.section ? { ...val, size: equalSize } : val
            )
          );
        }
        formik.resetForm();
      }
    });
  };

  useEffect(() => {
    getProducts().then((resp) => {
      setproducts(
        convertForSelect({ data: resp, label: "name", value: "_id" })
      );
    });
  }, []);
  useEffect(() => {
    console.log(sections);
    const sectionArray = sections.reduce(
      (acc, curr) =>
        (acc = acc.includes(curr.section) ? acc : [...acc, curr.section]),
      []
    );
    setsectionNames(sectionArray);
    if (sectionArray.length > 0) {
      setactiveSection(sectionArray[0]);
    }
  }, [sections]);

  useEffect(() => {
    setrows(sections.filter(({ section }) => section === activeSection));
  }, [activeSection, sections]);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-7 gap-1 ">
        <div className="">
          <label htmlFor="" className="">
            Section
          </label>
          <InputText
            name="section"
            className={
              formik.touched.section && formik.errors.section
                ? "errorClass"
                : ""
            }
            value={formik.values.section}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorMessage
            isVisible={formik.touched.section && formik.errors.section}
            message={formik.errors.section}
          />
        </div>
        <div className="">
          <label htmlFor="" className="">
            Type
          </label>
          <SelectElement
            errorFlag={formik.touched.type && formik.errors.type}
            options={sectionTypes}
            value={sectionTypes.find(
              ({ value }) => value === formik.values.type
            )}
            onChange={({ value }) => formik.setFieldValue("type", value)}
          />
          <ErrorMessage
            isVisible={formik.touched.type && formik.errors.type}
            message={formik.errors.type}
          />
        </div>
        {formik.values.type === "Banner" && (
          <>
            <div className="">
              <label htmlFor="" className="">
                Background Image
              </label>
              <FileUploadButton
                onChange={(file) =>
                  formik.setFieldValue("overlayBgImage", file)
                }
                value={formik.values.overlayBgImage}
              />
              <ErrorMessage
                isVisible={
                  formik.touched.overlayBgImage && formik.errors.overlayBgImage
                }
                message={formik.errors.overlayBgImage}
              />
            </div>
            <div className="">
              <label htmlFor="" className="">
                Overlay Text
              </label>
              <InputText
                name="overlayText"
                className={
                  formik.touched.overlayText && formik.errors.overlayText
                    ? "errorClass"
                    : ""
                }
                value={formik.values.overlayText}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage
                isVisible={
                  formik.touched.overlayText && formik.errors.overlayText
                }
                message={formik.errors.overlayText}
              />
            </div>
            <div className="">
              <label htmlFor="" className="">
                Overlay Sub Text
              </label>
              <InputText
                name="overlaySubText"
                className={
                  formik.touched.overlaySubText && formik.errors.overlaySubText
                    ? "errorClass"
                    : ""
                }
                value={formik.values.overlaySubText}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage
                isVisible={
                  formik.touched.overlaySubText && formik.errors.overlaySubText
                }
                message={formik.errors.overlaySubText}
              />
            </div>
          </>
        )}
        {formik.values.type === "Category" && (
          <>
            <div className="">
              <label htmlFor="" className="">
                Category Name
              </label>
              <InputText
                name="categoryName"
                className={
                  formik.touched.categoryName && formik.errors.categoryName
                    ? "errorClass"
                    : ""
                }
                value={formik.values.categoryName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage
                isVisible={
                  formik.touched.categoryName && formik.errors.categoryName
                }
                message={formik.errors.categoryName}
              />
            </div>
            <div className="">
              <label htmlFor="" className="">
                Products
              </label>
              <MultiSelect
                className={
                  "bg-white " +
                  (formik.touched.products && formik.errors.products
                    ? "errorClass"
                    : "")
                }
                options={products}
                value={formik.values.products}
                onChange={(data) => formik.setFieldValue("products", data)}
                labelledBy="Select"
              />
              <ErrorMessage
                isVisible={formik.touched.products && formik.errors.products}
                message={formik.errors.products}
              />
            </div>
            <div className="">
              <label htmlFor="" className="">
                Products per row
              </label>
              <InputText
                name="prodPerRow"
                className={
                  formik.touched.prodPerRow && formik.errors.prodPerRow
                    ? "errorClass"
                    : ""
                }
                value={formik.values.prodPerRow}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage
                isVisible={
                  formik.touched.prodPerRow && formik.errors.prodPerRow
                }
                message={formik.errors.prodPerRow}
              />
            </div>
            <div className="">
              <label htmlFor="" className="">
                Gap
              </label>
              <InputText
                name="gap"
                className={
                  formik.touched.gap && formik.errors.gap ? "errorClass" : ""
                }
                value={formik.values.gap}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage
                isVisible={formik.touched.gap && formik.errors.gap}
                message={formik.errors.gap}
              />
            </div>
          </>
        )}
        <button
          className="px-[18px] py-2 text-white rounded-lg bg-black h-[40px] mt-6"
          onClick={() => addSection(formik.values, sections)}
        >
          Add
        </button>
      </div>
      <Segmented
        options={sectionNames}
        className="w-1/2 !text-sm font-semibold mb-2"
        block
        value={activeSection}
        onChange={setactiveSection}
      />
      <Segmented
        options={["Grid", "Sizing"]}
        className="w-1/2 !text-sm font-semibold"
        block
        value={active}
        onChange={setactive}
      />
      {active === "Grid" && (
        <AgGrid
          headCells={[
            {
              field: "",
              headerName: "Edit",
              cellRenderer: ({ data, node }) => (
                <div className="flex gap-2 items-center font-bold h-[32.5714px]">
                  <button
                    onClick={() => formik.setValues({ id: node.id, ...data })}
                  >
                    <EditIcon type="button" size={20} />
                  </button>
                  <button
                    onClick={() =>
                      setsections(
                        sections.filter(
                          (val, index) => index.toString() !== node.id
                        )
                      )
                    }
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ),
            },
            {
              field: "section",
              headerName: "Section",
            },
            {
              field: "type",
              headerName: "Type",
            },
            {
              field: "overlayText",
              headerName: "Overlay Text",
            },
            {
              field: "overlaySubText",
              headerName: "Overlay Sub Text",
            },
            {
              field: "categoryName",
              headerName: "Category Name",
            },
            {
              field: "prodPerRow",
              headerName: "PPR",
            },
            {
              field: "gap",
              headerName: "Gap",
            },
            {
              field: "",
              headerName: "Products",
              flex: 2,
              cellRenderer: ({ data }) => (
                <div className="">
                  {data.products.map((val) => val.label).toString()}
                </div>
              ),
            },
          ]}
          rows={rows}
        />
      )}
      {active === "Sizing" && (
        <div ref={containerRef} className="">
          <Splitter
            style={{ height: 500, boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
            onResize={(pixelSizes) => {
              const [size1, size2] = handleResize(
                pixelSizes,
                containerRef.current?.offsetWidth
              );
              let flag = 0;
              const newResizedSection = sections.map((val) => {
                if (val.section === activeSection) {
                  const size = flag === 1 ? size2 : size1;
                  flag = 1;
                  return { ...val, size };
                }
                return val;
              });
              setsections(newResizedSection);
            }}
          >
            {rows.map(
              ({ type, size, gap, prodPerRow, products, overlayBgImage }) => (
                <Splitter.Panel size={`${size}%`}>
                  {type === "Banner" ? (
                    <div className="bg-white flex justify-center items-center h-full">
                      <img
                        src={URL.createObjectURL(overlayBgImage)}
                        alt=""
                        className="h-full w-full"
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        gap: `${gap}px`,
                        display: "grid",
                        gridTemplateColumns: `repeat(auto-fit, minmax(190px,calc((100% / ${prodPerRow}) - ${gap}px)))`,
                      }}
                      // className={`grid gap-[${gap}px] mt-4 grid-cols-[repeat(auto-fit,minmax(calc((100%/${prodPerRow})-${gap}px),1fr))]`}
                    >
                      {products.map((product) => (
                        <div className="h-[290px] max-w-[272px] bg-white flex justify-center items-center">
                          {product.label}
                        </div>
                      ))}
                    </div>
                  )}
                </Splitter.Panel>
              )
            )}
          </Splitter>
        </div>
      )}
    </div>
  );
};

export default SectionMapping;
