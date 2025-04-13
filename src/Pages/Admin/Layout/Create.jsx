import CustomHeader from "@/Components/CustomHeader";
import React, { useEffect, useRef } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "@/Components/ui/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { useNavigate } from "react-router-dom";
import LogoPanel from "./Panels/LogoPanel";
import HeaderElement from "./Panels/HeaderElement";
import CategoryElement from "./Panels/CategoryElement";
import TopProduct from "./Panels/TopProduct";
import FooterElement from "./Panels/FooterElement";
import StickyElement from "./Panels/StickyElement";
import { useFormik } from "formik";
import * as Yup from "yup";
import { convertToFormData } from "@/lib/utils";
import { addLayout } from "./service";
const Create = () => {
  const navigate = useNavigate();
  const stepperRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      layoutName: "",
      logo: "",
      headerElement: {
        headerType: null,
        rows: [],
      },
      category: [],
      topProduct: [],
      footerDetails: {
        address: "",
        contact: "",
        instagram: "",
        facebook: "",
        youtube: "",
      },
      stickyPanel: {
        text: "",
        url: "",
        position: "right",
      },
    },
    validationSchema: Yup.object().shape({
      layoutName: Yup.string().required("Layout Name is required"),
      stickyPanel: Yup.object().shape({
        text: Yup.string().required("Text is required"),
        url: Yup.string().required("URL is required"),
        position: Yup.string().required("Position is required"),
      }),
    }),
  });
  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  const submitHandler = (body) => {
    const formData = convertToFormData(body);
    addLayout(formData).then((resp) => console.log(resp));
  };

  return (
    <>
      <CustomHeader title={"Create Layout"}>
        <div className="pl-2 flex items-center gap-3">
          <button
            className="fa-regular fa-plus"
            onClick={() => navigate(-1)}
          ></button>
        </div>
      </CustomHeader>
      <div className="card w-[calc(100vw-110px)]">
        <Stepper
          ref={stepperRef}
          // style={{ flexBasis: "50rem" }}
          // orientation="vertical"
        >
          <StepperPanel header="Layout Name">
            <div className="grid grid-cols-4 py-4">
              <FloatLabel>
                <InputText
                  id="layoutName"
                  className=""
                  value={formik.values.layoutName}
                  name="layoutName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <label htmlFor="layoutName" className="">
                  Name
                </label>
              </FloatLabel>
            </div>
            <Button
              className="h-fit px-4 py-2 text-xs"
              onClick={() => stepperRef.current.nextCallback()}
            >
              Next
            </Button>
          </StepperPanel>
          <StepperPanel header="Logo">
            <LogoPanel
              Image={formik.values.logo}
              setImage={(image) => formik.setFieldValue("logo", image)}
            >
              <div className="flex gap-2">
                <Button onClick={() => stepperRef.current.prevCallback()}>
                  Prev
                </Button>
                <Button onClick={() => stepperRef.current.nextCallback()}>
                  Next
                </Button>
              </div>
            </LogoPanel>
          </StepperPanel>
          <StepperPanel header="Header Element">
            <div className="flex flex-col gap-3">
              <label htmlFor="" className="text-sm font-semibold">
                Type Of Header
              </label>
              <HeaderElement
                headerElement={formik.values.headerElement}
                setHeaderValues={(values) =>
                  formik.setFieldValue("headerElement", values)
                }
              />
              <div className="flex gap-2">
                <Button onClick={() => stepperRef.current.prevCallback()}>
                  Prev
                </Button>
                <Button onClick={() => stepperRef.current.nextCallback()}>
                  Next
                </Button>
              </div>
            </div>
          </StepperPanel>
          <StepperPanel header="Category">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm font-semibold">
                  Select Categories
                </label>
                <CategoryElement
                  category={formik.values.category}
                  setcategory={(value) =>
                    formik.setFieldValue("category", value)
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => stepperRef.current.prevCallback()}>
                  Prev
                </Button>
                <Button onClick={() => stepperRef.current.nextCallback()}>
                  Next
                </Button>
              </div>
            </div>
          </StepperPanel>

          <StepperPanel header="Top Products">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm font-semibold">
                  Select Top Products To Display
                </label>
                <TopProduct
                  product={formik.values.topProduct}
                  setproduct={(value) =>
                    formik.setFieldValue("topProduct", value)
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => stepperRef.current.prevCallback()}>
                  Prev
                </Button>
                <Button onClick={() => stepperRef.current.nextCallback()}>
                  Next
                </Button>
              </div>
            </div>
          </StepperPanel>
          <StepperPanel header="Footer Details">
            <div className="flex flex-col gap-2">
              <FooterElement
                values={formik.values.footerDetails}
                setvalues={(values) =>
                  formik.setFieldValue("footerDetails", values)
                }
              />
              <div className="flex gap-2">
                <Button onClick={() => stepperRef.current.prevCallback()}>
                  Prev
                </Button>
                <Button onClick={() => stepperRef.current.nextCallback()}>
                  Next
                </Button>
              </div>
            </div>
          </StepperPanel>
          <StepperPanel header="Sticky Panel">
            <div className="flex flex-col gap-2">
              <StickyElement formik={formik} />
              <div className="flex gap-2">
                <Button onClick={() => stepperRef.current.prevCallback()}>
                  Prev
                </Button>
                <Button onClick={() => submitHandler(formik.values)}>
                  Submit
                </Button>
              </div>
            </div>
          </StepperPanel>
        </Stepper>
      </div>
    </>
  );
};

export default Create;
