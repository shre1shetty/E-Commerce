import CustomHeader from "@/Components/CustomHeader";
import SelectElement from "@/Components/Select/SelectElement";
import React, { useEffect, useState } from "react";
import {
  addProduct,
  getInventory,
  getProductById,
  updateProduct,
} from "./service";
import {
  cn,
  combineUnique,
  convertForSelect,
  convertToBase64toFile,
  convertToFormData,
  fetchImageWithMetadata,
  getFileUrl,
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
import { useNavigate, useSearchParams } from "react-router-dom";
import InnerVariant from "./Variants/InnerVariant";
import MainVariant from "./Variants/MainVariant";
import Preview from "./Preview/Preview";
import { InputTextarea } from "primereact/inputtextarea";
import GlobalToast from "@/Components/GlobalToast";
import { getFilterType } from "../FilterType/service";
import { MultiSelect } from "react-multi-select-component";
const EditPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOptions, setfilterOptions] = useState([]);
  const [showPreview, setshowPreview] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      tags: [],
      category: [],
      variantFields: [],
    },
  });
  const SpecificationFormik = useFormik({
    initialValues: {
      field: "",
      value: "",
    },
  });

  const handleUpdate = (data) => {
    delete data._id;
    const formData = convertToFormData(data);
    updateProduct(searchParams.get("id"), formData).then((resp) => {
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
  };

  useEffect(() => {
    getProductById(searchParams.get("id")).then((resp) => {
      Object.keys(resp).forEach(async (key) => {
        if (key === "variantValues") {
          const newValues = await Promise.all(
            resp[key].map(async (value) => {
              const pictureArray = await Promise.all(
                value.values.picture.map(async (fileId) => {
                  const response = await fetchImageWithMetadata(
                    `${import.meta.env.VITE_BASE_URL}/file?id=${fileId}`
                  );
                  return response;
                })
              );
              return {
                ...value,
                values: {
                  ...value.values,
                  picture: pictureArray,
                },
              };
            })
          );
          formik.setFieldValue(key, newValues);
        } else {
          formik.setFieldValue(key, resp[key]);
        }
      });
    });
    getFilterType().then((resp) => {
      setfilterOptions(
        convertForSelect({ data: resp, label: "name", value: "_id" })
      );
    });
  }, []);

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  const handleAddSpecifiction = ({ field, value }) => {
    formik.setFieldValue(
      "AdditionalSpecification",
      formik.values.AdditionalSpecification
        ? [...formik.values.AdditionalSpecification, { key: field, value }]
        : [{ key: field, value }]
    );
    SpecificationFormik.resetForm();
  };

  return (
    <>
      <CustomHeader title={"Edit Product"}>
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
          showPreview ? "grid-cols-4" : "grid-cols-2"
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
                  <div className="w-1/3">
                    <label htmlFor="" className="form-label">
                      Name
                    </label>
                    <Input
                      type="text"
                      className="form-control"
                      value={formik.values.name}
                      name="name"
                      disabled
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div className="w-2/3">
                    <label htmlFor="" className="form-label">
                      Description
                    </label>
                    <InputTextarea
                      autoResize
                      className="p-2 text-sm text-gray-700"
                      name="description"
                      value={formik.values.description ?? ""}
                      onChange={formik.handleChange}
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
                    showPreview ? "grid-cols-3" : "grid-cols-4"
                  )}
                >
                  <div className="">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <Input
                      name="price"
                      value={formik.values.price ?? ""}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="inStock">
                    <label htmlFor="" className="form-label">
                      In Stock
                    </label>
                    <Input
                      name="inStock"
                      value={formik.values.inStock ?? ""}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="" className="form-label">
                      Category
                    </label>
                    <MultiSelect
                      options={filterOptions}
                      value={formik.values.category}
                      onChange={(data) =>
                        formik.setFieldValue("category", data)
                      }
                      labelledBy="Select"
                    />
                  </div>
                  <div className="">
                    <label htmlFor="brand" className="form-label">
                      Brand
                    </label>
                    <Input
                      name="brand"
                      value={formik.values.brand ?? ""}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="fabric" className="form-label">
                      Fabric
                    </label>
                    <Input
                      name="fabric"
                      value={formik.values.fabric ?? ""}
                      onChange={formik.handleChange}
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
                          event.target.value.split(",")
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
                    showPreview ? "grid-cols-3" : "grid-cols-4"
                  )}
                >
                  {formik.values.variantFields?.map((data, index) => (
                    <div className="" key={index}>
                      <label htmlFor="" className="form-label">
                        {data.field}
                      </label>
                      <Input
                        name={data.field}
                        value={
                          formik.values.variantFields
                            .find((val) => val.field === data.field)
                            ?.value.join(",") ?? ""
                        }
                        onChange={(event) => {
                          formik.setFieldValue(
                            "variantFields",
                            formik.values.variantFields.some(
                              ({ field }) => field === data.field
                            )
                              ? formik.values.variantFields.map((val) =>
                                  val.field === data.field
                                    ? {
                                        field: data.field,
                                        value: event.target.value.split(","),
                                        flag: data.flag,
                                      }
                                    : val
                                )
                              : [
                                  ...formik.values.variantFields,
                                  {
                                    field: data.field,
                                    value: event.target.value.split(","),
                                    flag: data.flag,
                                  },
                                ]
                          );
                        }}
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
                        value={SpecificationFormik.values.field}
                        onChange={SpecificationFormik.handleChange}
                      />
                    </div>
                    <div className="">
                      <label htmlFor="" className="form-label">
                        Value
                      </label>
                      <Input
                        name="value"
                        value={SpecificationFormik.values.value}
                        onChange={SpecificationFormik.handleChange}
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
                        showPreview ? "grid-cols-3" : "grid-cols-4"
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
                                          : val
                                    )
                                  );
                                }}
                              />
                              <Button
                                className={"!h-10"}
                                onClick={() => {
                                  formik.setFieldValue(
                                    "AdditionalSpecification",
                                    formik.values.AdditionalSpecification.filter(
                                      (val) => val.key !== key
                                    )
                                  );
                                }}
                              >
                                <Trash2 />
                              </Button>
                            </div>
                          </div>
                        )
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
                                        formik.values.variantFields[1].field
                                      ),
                                      -7
                                    )
                                  )
                                ).values,
                              }))
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
                                  `${formik.values.variantFields[0].field}${val}${formik.values.variantFields[1].field}${val2}Variant`
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
                                        ...value,
                                        values: values,
                                      }
                                    : value
                                )
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
            <Button onClick={() => handleUpdate({ ...formik.values })}>
              Update
            </Button>
          </div>
        </div>
        <Preview data={formik.values} showPreview={showPreview} />
      </div>
    </>
  );
};

export default EditPage;
