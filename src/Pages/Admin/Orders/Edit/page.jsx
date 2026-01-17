import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAdminOrdersById,
  getNextStage,
  getWorkFlowHistory,
  proceedToNextStage,
} from "./service";
import CustomHeader from "@/Components/CustomHeader";
import dayjs from "dayjs";
import { Accordion, AccordionTab } from "primereact/accordion";
import { convertForSelect, getFileUrl, parseValueMap } from "@/lib/utils";
import "./index.css";
import {
  ChevronDown,
  Contact,
  Mail,
  PencilLine,
  Phone,
  User,
} from "lucide-react";
import { Timeline } from "antd";
import TextArea from "antd/es/input/TextArea";
import SelectElement from "@/Components/Select/SelectElement";
import { Button } from "@/Components/ui/button";
import { useFormik } from "formik";
import { LS } from "@/lib/SecureLocalStorage";
import * as Yup from "yup";
import GlobalToast from "@/Components/GlobalToast";
const page = () => {
  const { id = "" } = useParams();
  const [Order, setOrder] = useState({});
  const [stages, setstages] = useState([]);
  const [actionStages, setactionStages] = useState([]);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      orderId: id,
      finalStage: false,
      workFlowStatusId: "",
      statusId: "",
      remarks: "",
      createdBy: LS.get("userId"),
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      workFlowStatusId: Yup.string().required("Required"),
      remarks: Yup.string().required("Required"),
    }),
  });

  const getVariantImage = useCallback((variantValues, variant) => {
    console.log("");
    const imageId = variantValues?.find(({ _id }) => _id === variant)?.values
      .picture;
    return imageId[0] ?? "";
  }, []);

  const getVariantName = ({ variantFields, variantValues, variant }) => {
    // console.log(variantFields, variantValues, variant);
    const variantField = variantValues.find(({ _id }) => _id === variant).name;
    const name = parseValueMap(
      variantFields.reduce((acc, curr, index) => {
        acc = { ...acc, [`field${index + 1}`]: curr.field };
        return acc;
      }, {}),
      variantField.slice(0, -7), // Remove "Variant" from the end
    );
    let formattedName = "";
    for (const [key, value] of Object.entries(name)) {
      formattedName += `${key.slice(0, -1)}: ${value} / `;
    }
    return formattedName.slice(0, -3); // Remove the last " / "
  };

  const handleSave = (data, order) => {
    formik.validateForm().then((errors) => {
      console.log(errors);
      if (Object.keys(errors).length === 0) {
        proceedToNextStage({
          ...data,
          ...order.userId,
          paymentId: order.paymentId,
          amount: order.amount,
        }).then((resp) => {
          GlobalToast({
            message: resp?.message,
            messageTimer: 2500,
            messageType: resp?.statusCode === 200 ? "success" : "error",
          });
          if (resp?.statusCode === 200) {
            navigate(-1);
          }
        });
      } else {
        GlobalToast({
          message: "Please fill all required fields",
          messageTimer: 2500,
          messageType: "error",
        });
      }
    });
  };

  useEffect(() => {
    getAdminOrdersById(id).then((resp) => {
      delete resp.userId._id;
      setOrder(resp);
    });
    getWorkFlowHistory(id).then(({ data }) => {
      const { filteredworkFlowDefinations, workFlowHistory } = data;
      let stagesData = [];
      workFlowHistory.forEach((element) => {
        stagesData.push({
          children: (
            <div>
              <p style={{ fontWeight: "bold" }}>
                {element.workFlowStatusId.stageName}
              </p>
              <p style={{ fontSize: "12px", color: "gray" }}>
                Updated By: {element.createdBy?.username || "Not Available"}
              </p>
              <p style={{ fontSize: "12px", color: "gray" }}>
                Remarks: {element.remarks || "No Remarks"}
              </p>
              <p style={{ fontSize: "12px", color: "gray" }}>
                Date: {dayjs(element?.createdAt).format("MMMM DD YYYY HH:mm")}
              </p>
            </div>
          ),
          color: "green",
        });
      });
      filteredworkFlowDefinations.forEach((element, index) => {
        if (index == 0) {
          getNextStage(element.stageFrom).then((resp) => {
            setactionStages(
              resp.map(({ stageName, _id, stageTo, finalStage }) => ({
                label: stageName,
                value: _id,
                statusId: stageTo,
                finalStage: finalStage,
              })),
            );
          });
        }
        stagesData.push({
          children: (
            <p style={{ color: index === 0 ? "orange" : "gray" }}>
              {element.stageName}
            </p>
          ),
          color: index === 0 ? "orange" : "gray",
        });
      });
      setstages(stagesData);
    });
  }, []);

  return (
    <div>
      <CustomHeader
        title={
          <div>
            <div className="flex items-center gap-2">
              Order ID: {id}
              <div className="success-chip">{Order.paymentMethod}</div>
              <div
                className={
                  Order.status?.firstStage
                    ? "error-chip"
                    : Order.status?.finalStage
                      ? "success-chip"
                      : "regular-chip"
                }
              >
                {Order.status?.stageName}
              </div>
            </div>
            <div className="text-sm text-slate-500 font-medium">
              {dayjs(Order.createdAt).format("MMMM DD YYYY HH:mm")}
            </div>
          </div>
        }
      >
        <div className="pl-2 flex items-center gap-3">
          <button
            className="fa-solid fa-arrow-left"
            onClick={() => navigate(-1)}
          ></button>
        </div>
      </CustomHeader>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Accordion multiple activeIndex={[0, 1, 2]}>
            <AccordionTab header="Order Items">
              <div className="flex flex-col gap-4">
                {Order.products?.map(
                  ({ productId, variant, quantity }, index) => (
                    <div className="order-products" key={index}>
                      <div className="image-div">
                        <img
                          src={getFileUrl(
                            getVariantImage(productId.variantValues, variant),
                          )}
                          alt=""
                          className=""
                        />
                      </div>
                      <div className="product-details-div">
                        <div className="">
                          <div className="order-product-type">
                            {productId.productType.name}
                          </div>
                          <div className="order-product-name">
                            {productId.name}
                          </div>
                        </div>

                        <div className="order-product-variant">
                          {getVariantName({
                            ...productId,
                            variant: variant,
                          })}
                        </div>
                      </div>
                      <div className="product-price-div">
                        <div className="price-chip">
                          {quantity} x ₹
                          {
                            productId.variantValues.find(
                              ({ _id }) => _id === variant,
                            ).values.price
                          }
                        </div>
                        <div className="amount-chip">
                          ₹
                          {quantity *
                            parseInt(
                              productId.variantValues.find(
                                ({ _id }) => _id === variant,
                              ).values.price,
                            )}
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </AccordionTab>
            <AccordionTab header="Order Summary">
              <div className="order-summary">
                <div className="summary-item">
                  <label htmlFor="" className="">
                    SubTotal
                  </label>
                  <div className="">₹{Order.summary?.subTotal}</div>
                </div>
                <div className="summary-item">
                  <label htmlFor="" className="">
                    Discount
                  </label>
                  <div className="">- ₹{Order.summary?.discount}</div>
                </div>
                <div className="summary-item">
                  <label htmlFor="" className="">
                    Shipping
                  </label>
                  <div className="">₹{Order.summary?.shipping}</div>
                </div>
                <div className="summary-item">
                  <label htmlFor="" className="">
                    Tax
                  </label>
                  <div className="">₹{Order.summary?.tax ?? 0}</div>
                </div>
                <div className="summary-item">
                  <label htmlFor="" className="total">
                    Total
                  </label>
                  <div className="total">₹{Order.summary?.total}</div>
                </div>
                <hr className="my-1" />
                <div className="summary-item">
                  <label htmlFor="" className="">
                    Paid by customer
                  </label>
                  <div className="">
                    ₹
                    {Order.paymentMethod?.toLowerCase() === "paynow"
                      ? Order.summary?.total
                      : 0}
                  </div>
                </div>
              </div>
            </AccordionTab>
            <AccordionTab header="Timeline">
              <Timeline items={stages} />
            </AccordionTab>
          </Accordion>
        </div>
        <div className="flex flex-col gap-4">
          <div className="order-notes-container">
            <div className="label-container">
              <label htmlFor="" className="">
                Notes
              </label>
              <button className="">
                <PencilLine type="button" size={14} color="gray" />
              </button>
            </div>
            <div className="order-note">First Customer and First Order</div>
          </div>
          <div className="order-customer-container">
            <div className="label-container">
              <label htmlFor="" className="">
                Customer
              </label>
              <button className="">
                <ChevronDown type="button" size={14} color="gray" />
              </button>
            </div>
            <div className="order-customer">
              <Contact type="button" size={14} color="gray" />
              {Order.userId?.username}
            </div>
          </div>
          <div className="order-contact-info-container">
            <div className="label-container">
              <label htmlFor="" className="">
                Contact Information
              </label>
              <button className="">
                <PencilLine type="button" size={14} color="gray" />
              </button>
            </div>
            <div className="order-contact-info">
              <div className=" flex gap-2 items-center">
                <Mail type="button" size={14} color="gray" />
                {Order.userId?.email}
              </div>
              <div className=" flex gap-2 items-center">
                <Phone type="button" size={14} color="gray" />
                {Order.userId?.contactNumber}
              </div>
            </div>
          </div>
          <div className="order-shipping-address-container">
            <div className="label-container">
              <label htmlFor="" className="">
                Shipping Address
              </label>
              <button className="">
                <PencilLine type="button" size={14} color="gray" />
              </button>
            </div>
            <div className="order-shipping-address">
              <div className=" flex gap-2 items-center">
                <Contact type="button" size={14} color="gray" />
                {Order.userId?.username}
              </div>
              <div className="">
                <div className="address">{Order.address}</div>
                <div className="city">{Order.city}</div>
                <div className="state">{Order.state}</div>
                <div className="pincode">{Order.pincode}</div>
                <div className="phone mt-1">+91 {Order.phone}</div>
              </div>
            </div>
          </div>
          <div className="refund-container">
            <label htmlFor="" className="">
              Refund status
            </label>
            <div className="content">
              {Order.refund?.completedAt && (
                <div className="">Refund Id :{Order.refund?.refundId}</div>
              )}
              <div className="">Amount : {Order.refund?.amount}</div>
              <div className="">Status : {Order.refund?.status}</div>
              <div className="">
                Initiated At :{" "}
                {dayjs(Order.refund?.initiatedAt).format("MMMM DD YYYY HH:mm")}
              </div>
              {Order.refund?.completedAt && (
                <div className="">
                  Completed At :{" "}
                  {dayjs(Order.refund?.completedAt).format(
                    "MMMM DD YYYY HH:mm",
                  )}
                </div>
              )}
            </div>
          </div>
          {!Order.isRejected && !Order.isCompleted && (
            <div className="order-action-container">
              <div className="label-container">
                <label htmlFor="" className="">
                  Action
                </label>
              </div>
              <div className="order-action">
                <div className="flex gap-2 pb-4">
                  <SelectElement
                    options={actionStages}
                    placeholder="Select Action"
                    className="w-full"
                    value={
                      actionStages.find(
                        ({ value }) => value === formik.values.workFlowStatusId,
                      ) || null
                    }
                    onChange={({ value, statusId, finalStage }) => {
                      formik.setFieldValue("workFlowStatusId", value);
                      formik.setFieldValue("statusId", statusId);
                      formik.setFieldValue("finalStage", finalStage);
                    }}
                  />
                  <TextArea
                    className="text-base !py-2"
                    autoSize
                    placeholder="Remarks"
                    name="remarks"
                    onChange={formik.handleChange}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleSave(formik.values, Order)}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
