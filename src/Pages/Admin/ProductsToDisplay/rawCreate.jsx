import CustomHeader from "@/Components/CustomHeader";
import SelectElement from "@/Components/Select/SelectElement";
import React, { useEffect, useState } from "react";
import { addProduct, getInventory } from "./service";
import {
  cn,
  combineUnique,
  convertForSelect,
  convertToFormData,
  generateCombinations,
} from "@/lib/utils";
import { useFormik } from "formik";
import { Input } from "@/Components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { ArrowLeft, Eye, PlusCircle, Trash2, X } from "lucide-react";
import { Button } from "@/Components/ui/button";
import "./main.css";
import { useNavigate } from "react-router-dom";
import InnerVariant from "./Variants/InnerVariant";
import MainVariant from "./Variants/MainVariant";
import Preview from "./Preview/Preview";
import { InputTextarea } from "primereact/inputtextarea";
import GlobalToast from "@/Components/GlobalToast";
import { getVariant } from "../Variant/service";
import { MultiSelect } from "react-multi-select-component";
import { getFilterType } from "../FilterType/service";
import * as yup from "yup";
import ErrorMessage from "@/Components/ErrorMessage/ErrorMessage";
const RawCreate = () => {
  const [filterOptions, setfilterOptions] = useState([]);
  const [showPreview, setshowPreview] = useState(false);
  const [variants, setvariants] = useState({
    options: [],
    raw: [],
  });
  const [variantFields, setvariantFields] = useState([]);

  const navigate = useNavigate();
  const variantSchema = yup.object({
    value: yup
      .array()
      .of(yup.string().required("Please enter a value"))
      .test(
        "unique",
        "Values must be unique",
        (list) => new Set(list).size === list?.length,
      )
      .min(1, "At least one value is required")
      .required("Value array is required"),
  });

  const variantValueSchema = yup.object({
    purchasePrice: yup
      .number()
      .typeError("Please enter numeric value")
      .required("Please enter purchase price"),
    price: yup
      .number()
      .typeError("Please enter numeric value")
      .required("Please enter price"),
    discountedPrice: yup
      .number()
      .typeError("Please enter numeric value")
      .required("Please enter discounted purchase price"),
    inStock: yup
      .number()
      .typeError("Please enter numeric value")
      .required("Please enter items in stock"),
    picture: yup.array().min(1, "At least one picture is required"),
  });

  const variantValuesSchema = yup.object({
    values: variantValueSchema,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      productType: "",
      price: "",
      brand: "",
      fabric: "",
      tags: [],
      variantFields: [],
      variantValues: [],
      category: [],
    },
    validationSchema: yup.object({
      name: yup.string().max(50).required("Enter Name"),
      description: yup.string().max(500).required("Enter Description"),
      productType: yup.string().required("Please select product type"),
      category: yup
        .array()
        .min(1, "Select atleast one category")
        .required("Select a category"),
      price: yup
        .number()
        .typeError("Enter numeric value")
        .required("Please enter price"),
      brand: yup.string().required("Brand name is required"),
      fabric: yup.string().required("Fabric/Material is required"),
      variantFields: yup.array().of(variantSchema),
      variantValues: yup.array().of(variantValuesSchema),
    }),
    onSubmit: () => {},
  });
  const SpecificationFormik = useFormik({
    initialValues: {
      field: "",
      value: "",
    },
    validationSchema: yup.object({
      field: yup.string().required("Field is required"),
      value: yup.string().required("Value is required"),
    }),
    onSubmit: () => {},
  });

  function getVariantFields(id) {
    const selectedVariant = variants.raw.find((data) => data._id === id);
    setvariantFields(selectedVariant.Fields);
    formik.setFieldValue(
      "variantFields",
      selectedVariant.Fields.map((field) => ({
        field: field.name,
        value: [],
        flag: field.flag,
      })),
    );
  }

  const handleAdd = (data) => {
    delete data._id;
    formik.submitForm();
    formik.validateForm().then((errors) => {
      console.log(errors);
      if (Object.keys(errors).length > 0) {
        if (Object.keys(errors).includes("variantValues")) {
          GlobalToast({
            message: "Fill all fields in variants",
            messageTimer: 1000,
            messageType: "error",
          });
        } else {
          GlobalToast({
            message: "Enter mandatory fields",
            messageTimer: 1000,
            messageType: "error",
          });
        }
      } else {
        const formData = convertToFormData(data);
        addProduct(formData).then((resp) => {
          if (resp.statusCode === 200) {
            GlobalToast({
              message: resp.statusMsg,
              messageTimer: 2000,
              messageType: "success",
            });
            navigate(-1);
          } else {
            GlobalToast({
              message: resp.statusMsg,
              messageTimer: 2000,
              messageType: "error",
            });
          }
        });
      }
    });
  };

  useEffect(() => {
    getVariant().then((resp) => {
      setvariants({
        options: resp.map((data) => ({
          label: data.name,
          value: data._id,
        })),
        raw: resp,
      });
    });
    getFilterType().then((resp) => {
      setfilterOptions(
        convertForSelect({ data: resp, label: "name", value: "_id" }),
      );
    });
  }, []);

  // useEffect(() => {
  //   console.log(formik.values);
  // }, [formik.values]);

  useEffect(() => {
    if (formik.values.variantFields[0]?.value.length > 0) {
      formik.setFieldValue(
        "variantValues",
        generateCombinations({
          data: formik.values.variantFields,
          price: formik.values.price,
          inStock: 0,
        }),
      );
    }
  }, [formik.values.variantFields, formik.values.price]);

  const handleAddSpecifiction = ({ field, value }) => {
    SpecificationFormik.submitForm();
    SpecificationFormik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        GlobalToast({
          message: "Enter mandatory fields",
          messageTimer: 1000,
          messageType: "error",
        });
      } else {
        formik.setFieldValue(
          "AdditionalSpecification",
          formik.values.AdditionalSpecification
            ? [...formik.values.AdditionalSpecification, { key: field, value }]
            : [{ key: field, value }],
        );
        SpecificationFormik.resetForm();
      }
    });
  };

  useEffect(() => {
    console.log(formik);
  }, [formik]);

  return (
    <>
      <CustomHeader title={"Add New Product"}>
        <div className="flex gap-1">
          <Button onClick={() => setshowPreview((prev) => !prev)}>
            <Eye />
          </Button>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Button>
        </div>
      </CustomHeader>
      <div
        className={cn(
          "grid h-[calc(100vh-120px)] gap-4 relative pb-2",
          showPreview ? "grid-cols-4" : "grid-cols-2",
        )}
      >
        <div className="col-span-3 text-lg font-medium text-gray-600 py-2 overflow-hidden">
          <Tabs
            defaultValue="account"
            className="w-full max-h-[90%] flex flex-col"
          >
            <TabsList className="w-fit">
              <TabsTrigger value="account">Base Details</TabsTrigger>
              <TabsTrigger value="password">Variants</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="flex-1 overflow-auto">
              <div className="pb-2 pr-1">
                {/*Base Information */}
                <label htmlFor="" className="form-label">
                  Base Information
                </label>
                <div className="p-4 border border-[#d5d5d5] rounded-md text-sm text-gray-700 mb-1 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <div className="w-1/3">
                      <label htmlFor="" className="form-label mandatory">
                        Name
                      </label>
                      <Input
                        type="text"
                        className={cn(
                          "form-control",
                          formik.touched.name && formik.errors.name
                            ? "errorClass"
                            : "",
                        )}
                        value={formik.values.name}
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <ErrorMessage
                        message={formik.errors.name}
                        isVisible={formik.touched.name && formik.errors.name}
                      />
                    </div>
                    <div className="w-1/3">
                      <label htmlFor="" className="form-label mandatory">
                        Product Type
                      </label>
                      <SelectElement
                        options={variants.options}
                        name={"productType"}
                        value={variants.options?.find(
                          (data) => data.value === formik.values.productType,
                        )}
                        errorFlag={
                          formik.touched.productType &&
                          formik.errors.productType
                        }
                        onChange={(data) => {
                          formik.setFieldValue("productType", data.value);
                          getVariantFields(data.value);
                        }}
                      />
                      <ErrorMessage
                        isVisible={
                          formik.touched.productType &&
                          formik.errors.productType
                        }
                        message={formik.errors.productType}
                      />
                    </div>
                  </div>
                  <div className="w-2/3">
                    <label htmlFor="" className="form-label mandatory">
                      Description
                    </label>
                    <InputTextarea
                      autoResize
                      className={cn(
                        "form-control",
                        formik.touched.description && formik.errors.description
                          ? "errorClass"
                          : "",
                      )}
                      name="description"
                      value={formik.values.description ?? ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <ErrorMessage
                      isVisible={
                        formik.touched.description && formik.errors.description
                      }
                      message={formik.errors.description}
                    />
                  </div>
                </div>
                {/*Base Information */}

                {/*Details*/}
                <label htmlFor="" className="form-label">
                  Details
                </label>
                <div
                  className={cn(
                    "p-4 border border-[#d5d5d5] rounded-md text-sm text-gray-700 mb-1 grid gap-2",
                    showPreview ? "grid-cols-3" : "grid-cols-4",
                  )}
                >
                  <div className="">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <Input
                      name="price"
                      className={cn(
                        "form-control",
                        formik.touched.price && formik.errors.price
                          ? "errorClass"
                          : "",
                      )}
                      value={formik.values.price ?? ""}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    <ErrorMessage
                      isVisible={formik.touched.price && formik.errors.price}
                      message={formik.errors.price}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="" className="form-label mandatory">
                      Category
                    </label>
                    <MultiSelect
                      options={filterOptions}
                      value={formik.values.category}
                      className={
                        formik.touched.category && formik.errors.category
                          ? "errorClass"
                          : ""
                      }
                      onChange={(data) =>
                        formik.setFieldValue("category", data)
                      }
                      labelledBy="Select"
                    />
                    <ErrorMessage
                      message={formik.errors.category}
                      isVisible={
                        formik.touched.category && formik.errors.category
                      }
                    />
                  </div>
                  <div className="">
                    <label htmlFor="brand" className="form-label mandatory">
                      Brand
                    </label>
                    <Input
                      name="brand"
                      className={
                        formik.touched.brand && formik.errors.brand
                          ? "errorClass"
                          : ""
                      }
                      value={formik.values.brand ?? ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <ErrorMessage
                      message={formik.errors.brand}
                      isVisible={formik.touched.brand && formik.errors.brand}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="fabric" className="form-label mandatory">
                      Fabric / Material Type
                    </label>
                    <Input
                      name="fabric"
                      className={
                        formik.touched.fabric && formik.errors.fabric
                          ? "errorClass"
                          : ""
                      }
                      value={formik.values.fabric ?? ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <ErrorMessage
                      message={formik.errors.fabric}
                      isVisible={formik.touched.fabric && formik.errors.fabric}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="fitType" className="form-label">
                      Fit Type
                    </label>
                    <Input
                      name="fitType"
                      value={formik.values.fitType ?? ""}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="tags" className="form-label">
                      Tags
                    </label>
                    <Input
                      name="tags"
                      value={formik.values.tags.toString() ?? ""}
                      onChange={(event) => {
                        formik.setFieldValue(
                          "tags",
                          event.target.value.split(","),
                        );
                      }}
                    />
                  </div>
                </div>
                {/*Details*/}

                {/*Variants */}
                <label htmlFor="" className="form-label">
                  Variants
                </label>
                <div
                  className={cn(
                    "p-4 border border-[#d5d5d5] rounded-md text-sm text-gray-700 mb-1 grid gap-2",
                    showPreview ? "grid-cols-3" : "grid-cols-4",
                  )}
                >
                  {variantFields?.map((data, index) => (
                    <div className="" key={index}>
                      <label htmlFor="" className="form-label">
                        {data.name}
                      </label>
                      <Input
                        name={`variantFields[${index}].value`}
                        value={
                          formik.values.variantFields
                            .find((val) => val.field === data.name)
                            ?.value.join(",") ?? ""
                        }
                        onBlur={formik.handleBlur}
                        onChange={(event) => {
                          formik.setFieldValue(
                            "variantFields",
                            formik.values.variantFields.some(
                              ({ field }) => field === data.name,
                            )
                              ? formik.values.variantFields.map((val) =>
                                  val.field === data.name
                                    ? {
                                        field: data.name,
                                        value: event.target.value.split(","),
                                        flag: data.flag,
                                      }
                                    : val,
                                )
                              : [
                                  ...formik.values.variantFields,
                                  {
                                    field: data.name,
                                    value: event.target.value.split(","),
                                    flag: data.flag,
                                  },
                                ],
                          );
                        }}
                      />
                      <ErrorMessage
                        isVisible={
                          formik.touched?.variantFields?.length > 0 &&
                          formik.touched?.variantFields[index]?.value &&
                          formik.errors?.variantFields?.length > 0 &&
                          formik.errors?.variantFields[index]?.value
                        }
                        message={
                          formik.errors?.variantFields?.length > 0
                            ? formik.errors.variantFields[index]?.value
                            : ""
                        }
                      />
                    </div>
                  ))}
                </div>
                {/*Variants */}

                {/*Additional Specifications*/}
                <label htmlFor="" className="form-label">
                  Additional Specifications
                </label>
                <div className="p-4 border border-[#d5d5d5] rounded-md text-sm gap-2">
                  <div className="Add-Field">
                    <div className="">
                      <label htmlFor="" className="form-label">
                        Field
                      </label>
                      <Input
                        name="field"
                        className={cn(
                          "form-control",
                          SpecificationFormik.touched.field &&
                            SpecificationFormik.touched.field
                            ? "errorClass"
                            : "",
                        )}
                        value={SpecificationFormik.values.field}
                        onChange={SpecificationFormik.handleChange}
                        onBlur={SpecificationFormik.handleBlur}
                      />
                      <ErrorMessage
                        message={SpecificationFormik.errors.field}
                        isVisible={
                          SpecificationFormik.touched.field &&
                          SpecificationFormik.errors.field
                        }
                      />
                    </div>
                    <div className="">
                      <label htmlFor="" className="form-label">
                        Value
                      </label>
                      <Input
                        name="value"
                        className={cn(
                          "form-control",
                          SpecificationFormik.touched.value &&
                            SpecificationFormik.touched.value
                            ? "errorClass"
                            : "",
                        )}
                        value={SpecificationFormik.values.value}
                        onChange={SpecificationFormik.handleChange}
                        onBlur={SpecificationFormik.handleBlur}
                      />
                      <ErrorMessage
                        message={SpecificationFormik.errors.value}
                        isVisible={
                          SpecificationFormik.touched.value &&
                          SpecificationFormik.errors.value
                        }
                      />
                    </div>
                    <Button
                      className="mt-6"
                      onClick={() =>
                        handleAddSpecifiction(SpecificationFormik.values)
                      }
                    >
                      Add Specification
                    </Button>
                  </div>
                  {formik.values.AdditionalSpecification?.length > 0 && (
                    <div
                      className={cn(
                        "p-4 border border-[#d5d5d5] rounded-md text-sm text-gray-700 mb-1 grid gap-2",
                        showPreview ? "grid-cols-3" : "grid-cols-4",
                      )}
                    >
                      {formik.values.AdditionalSpecification?.map(
                        ({ key, value }, index) => (
                          <div className="" key={index}>
                            <label htmlFor={key} className="form-label">
                              {key}
                            </label>
                            <div className="flex justify-between gap-1">
                              <Input
                                name={key}
                                value={value ?? ""}
                                onChange={(event) => {
                                  formik.setFieldValue(
                                    "AdditionalSpecification",
                                    formik.values.AdditionalSpecification.map(
                                      (val) =>
                                        val.key == key
                                          ? {
                                              key,
                                              value: event.target.value,
                                            }
                                          : val,
                                    ),
                                  );
                                }}
                              />
                              <Button
                                className={"!h-10"}
                                onClick={() => {
                                  formik.setFieldValue(
                                    "AdditionalSpecification",
                                    formik.values.AdditionalSpecification.filter(
                                      (val) => val.key !== key,
                                    ),
                                  );
                                }}
                              >
                                <Trash2 />
                              </Button>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
                {/*Additional Specifications*/}
              </div>
            </TabsContent>
            <TabsContent value="password" className="flex-1 overflow-auto">
              <div className="flex flex-col gap-2 text-sm pr-4 mb-2">
                {formik.values.variantFields[0]?.value?.map((val) => (
                  <Accordion
                    type="single"
                    collapsible
                    className="border border-[lightgray] px-6 py-4 rounded-md"
                  >
                    <AccordionItem value="item-1" className="border-none">
                      <AccordionTrigger className="p-0">
                        <MainVariant
                          baseValues={formik.values}
                          value={val}
                          field={formik.values.variantFields[0]?.field}
                          copyToAll={(value) => {
                            formik.setFieldValue(
                              "variantValues",
                              formik.values.variantValues.map((variant) => ({
                                ...variant,
                                values: value.find((data) =>
                                  data.name.includes(
                                    variant.name.slice(
                                      variant.name.indexOf(
                                        formik.values.variantFields[1].field,
                                      ),
                                      -7,
                                    ),
                                  ),
                                ).values,
                              })),
                            );
                          }}
                        />
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-2 mt-3">
                        {formik.values.variantFields[1]?.value?.map((val2) => (
                          <InnerVariant
                            showPreview={showPreview}
                            baseValues={
                              formik.values.variantValues?.find(
                                (value) =>
                                  value.name ===
                                  `${formik.values.variantFields[0].field}${val}${formik.values.variantFields[1].field}${val2}Variant`,
                              ) ?? formik.values
                            }
                            value1={val}
                            value2={val2}
                            field1={formik.values.variantFields[0]?.field}
                            field2={formik.values.variantFields[1]?.field}
                            setSizeVariantValues={(values) => {
                              formik.setFieldValue(
                                "variantValues",
                                formik.values.variantValues.map((value) =>
                                  value.name ===
                                  `${formik.values.variantFields[0].field}${val}${formik.values.variantFields[1].field}${val2}Variant`
                                    ? {
                                        name: `${formik.values.variantFields[0].field}${val}${formik.values.variantFields[1].field}${val2}Variant`,
                                        values: values,
                                      }
                                    : value,
                                ),
                              );
                            }}
                          />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center items-center">
            <Button onClick={() => handleAdd({ ...formik.values })}>Add</Button>
          </div>
        </div>
        <Preview data={formik.values} showPreview={showPreview} />
      </div>
    </>
  );
};

export default RawCreate;
