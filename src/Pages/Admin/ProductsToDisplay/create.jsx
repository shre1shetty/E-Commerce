import CustomHeader from "@/Components/CustomHeader";
import SelectElement from "@/Components/Select/SelectElement";
import React, { useEffect, useState } from "react";
import { addProduct, getInventory } from "./service";
import { cn, combineUnique, convertForSelect } from "@/lib/utils";
import { useFormik } from "formik";
import { Input } from "@/Components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ArrowLeft, Eye, PlusCircle, Trash2, X } from "lucide-react";
import { Button } from "@/Components/ui/button";
import "./main.css";
import { useNavigate } from "react-router-dom";
import InnerVariant from "./Variants/InnerVariant";
import MainVariant from "./Variants/MainVariant";
import Preview from "./Preview/Preview";
import { InputTextarea } from "primereact/inputtextarea";
import GlobalToast from "@/Components/GlobalToast";
const Create = () => {
  const [InventoryItems, setInventoryItems] = useState([]);
  const [originalInventory, setoriginalInventory] = useState([]);
  const [showPreview, setshowPreview] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      variantFields: [],
    },
  });
  const SpecificationFormik = useFormik({
    initialValues: {
      field: "",
      value: "",
    },
  });

  const handleAdd = (data) => {
    delete data._id;
    const formData = new FormData();
    Object.keys(data).forEach((key, index) => {
      // console.log(key);
      if (
        key === "category" ||
        key === "variantFields" ||
        key === "AdditionalSpecification"
      ) {
        data[key].forEach((value2, index1) => {
          Object.keys(value2).forEach((key1) => {
            let fieldValue = value2[key1];

            // Check if the value is an object or array, and stringify it
            if (Array.isArray(fieldValue)) {
              fieldValue.forEach((value, index2) => {
                formData.append(`${key}[${index1}][${key1}][${index2}]`, value);
              });
            } else {
              formData.append(`${key}[${index1}][${key1}]`, fieldValue);
            }
          });
          // formData.append(key, picture);
        });
      } else if (key === "variantValues") {
        data[key].forEach((variant, index1) => {
          formData.append(`variantValues[${index1}][name]`, variant.name);
          Object.keys(variant.values).forEach((key) => {
            formData.append(
              `variantValues[${index1}][values][${key}]`,
              variant.values[key]
            );
          });
        });
      } else if (key === "pictures") {
        data[key].forEach((picture, index) => {
          formData.append(`pictures[${index}]`, picture);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

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
  };

  useEffect(() => {
    getInventory().then((resp) => {
      setInventoryItems(
        convertForSelect({ data: resp, label: "name", value: "_id" })
      );
      setoriginalInventory(resp);
    });
  }, []);

  useEffect(() => {
    if (formik.values.Title !== "" && formik.values.Title) {
      const selectedOption = originalInventory.find(
        (data) => data._id === formik.values.Title
      );
      Object.keys(selectedOption).forEach((key) =>
        formik.setFieldValue(key, selectedOption[key])
      );
      const values = [];
      selectedOption?.variantFields[0].value.forEach((data) => {
        selectedOption?.variantFields[1].value.forEach((data2) =>
          values.push({
            name: `${selectedOption?.variantFields[0].field}${data}${selectedOption?.variantFields[1].field}${data2}Variant`,
            values: {
              price: selectedOption?.price,
              inStock: selectedOption?.inStock,
              picture: null,
            },
          })
        );
      });

      formik.setFieldValue("variantValues", values);
    }
  }, [formik.values.Title]);

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  const handleAddSpecifiction = ({ field, value }) => {
    formik.setFieldValue(
      "AdditionalSpecification",
      formik.values.AdditionalSpecification
        ? [...formik.values.AdditionalSpecification, { [field]: value }]
        : [{ [field]: value }]
    );
    SpecificationFormik.resetForm();
  };

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
          showPreview ? "grid-cols-3" : "grid-cols-2"
        )}
      >
        <div className="col-span-2 text-lg font-medium text-gray-600 py-2 overflow-hidden">
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
                      Title
                    </label>
                    <SelectElement
                      options={InventoryItems}
                      value={InventoryItems.find(
                        (data) => data.value === formik.values.Title
                      )}
                      onChange={(data) =>
                        formik.setFieldValue("Title", data.value)
                      }
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

                {/*Pictures*/}
                <label htmlFor="" className="form-label">
                  Pictures
                </label>
                <div className="p-4 border border-[#d5d5d5] rounded-md text-sm text-gray-700 mb-1 grid grid-cols-11 gap-4 overflow-hidden">
                  {formik.values.pictures?.map((picture) => (
                    <div className="relative">
                      <div className="border border-dashed border-black flex justify-center items-center h-full rounded-md overflow-hidden">
                        <img
                          className="h-[72px] w-full"
                          src={URL.createObjectURL(picture)}
                          alt=""
                        />
                      </div>
                      <button
                        className="absolute flex items-center justify-center h-full w-full top-0 opacity-0 left-1/2 transform -translate-x-1/2 translate-y-0 hover:opacity-80"
                        onClick={() =>
                          formik.setFieldValue(
                            "pictures",
                            formik.values.pictures?.filter(
                              (data) => data !== picture
                            )
                          )
                        }
                      >
                        <X />
                      </button>
                    </div>
                  ))}
                  <div className="relative">
                    <div className="border border-dashed border-black flex justify-center items-center py-6">
                      <PlusCircle />
                    </div>
                    <input
                      type="file"
                      className="absolute opacity-0 top-0 left-0 right-0 bottom-0"
                      accept=".png"
                      onChange={(event) => {
                        event.target.files[0] &&
                          formik.setFieldValue(
                            "pictures",
                            formik.values.pictures
                              ? [
                                  ...formik.values.pictures,
                                  event.target.files[0],
                                ]
                              : [event.target.files[0]]
                          );
                        event.target.value = null;
                      }}
                    />
                  </div>
                </div>
                {/*Pictures*/}

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
                </div>
                {/*Details*/}

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
                        (data, index) => (
                          <div className="" key={index}>
                            <label
                              htmlFor={Object.keys(data)[0]}
                              className="form-label"
                            >
                              {Object.keys(data)[0]}
                            </label>
                            <div className="flex justify-between gap-1">
                              <Input
                                name={Object.keys(data)[0]}
                                value={data[Object.keys(data)[0]] ?? ""}
                                onChange={(event) => {
                                  formik.setFieldValue(
                                    "AdditionalSpecification",
                                    formik.values.AdditionalSpecification.map(
                                      (val) =>
                                        val == data
                                          ? {
                                              [Object.keys(data)[0]]:
                                                event.target.value,
                                            }
                                          : val
                                    )
                                  );
                                }}
                              />
                              <Button
                                onClick={() => {
                                  formik.setFieldValue(
                                    "AdditionalSpecification",
                                    formik.values.AdditionalSpecification.filter(
                                      (val) => val !== data
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
                                        name: `${formik.values.variantFields[0].field}${val}${formik.values.variantFields[1].field}${val2}Variant`,
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
            <Button onClick={() => handleAdd({ ...formik.values })}>Add</Button>
          </div>
        </div>
        <Preview data={formik.values} showPreview={showPreview} />
      </div>
    </>
  );
};

export default Create;
