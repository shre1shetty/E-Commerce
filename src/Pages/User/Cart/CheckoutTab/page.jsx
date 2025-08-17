import SelectElement from "@/Components/Select/SelectElement";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import React from "react";
import States from "@/assets/states.json";
import Cities from "@/assets/cities.json";
import { InputTextarea } from "primereact/inputtextarea";
import { ArrowRight } from "lucide-react";
import { LS } from "@/lib/SecureLocalStorage";
const CheckoutTab = ({ setcurrent, setitems, formik }) => {
  const cities =
    Cities.find(({ value }) => formik.values.stateId === value)?.cities ?? [];

  return (
    <div className=" h-[555px] mt-6">
      <div className="col-span-2 flex flex-col gap-4 overflow-y-auto pb-2">
        <div className="account-details">
          <label htmlFor="" className="account-details-label">
            1. Account Details
          </label>
          <div className="account-details-content">
            <div className="account-detail-item">
              <label htmlFor="">Name</label>
              <InputText type="text" value={LS.get("username")} disabled />
            </div>
            <div className="account-detail-item">
              <label htmlFor="">Email ID</label>
              <InputText type="email" value={LS.get("email")} disabled />
            </div>
            <div className="account-detail-item">
              <label htmlFor="">Phone</label>
              <InputNumber
                className="w-full"
                placeholder="Enter your phone number"
                maxLength={14}
                useGrouping={false}
                prefix="+91 "
                // value={formik.values.phone}
                onChange={({ value }) => formik.setFieldValue("phone", value)}
              />
            </div>
          </div>
        </div>
        <div className="account-address">
          <label htmlFor="" className="account-address-label">
            2. Delivery Address
          </label>
          <div className="account-address-content">
            <div className="account-address-item col-span-4">
              <label htmlFor="">Address</label>
              <InputTextarea
                type="text"
                placeholder="Enter Address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
                autoResize
              />
            </div>
            <div className="account-address-item">
              <label htmlFor="">State</label>
              <SelectElement
                options={States}
                value={States.find(
                  ({ label }) => label === formik.values.state
                )}
                placeholder="Select your state"
                onChange={({ label, value }) => {
                  formik.setFieldValue("state", label);
                  formik.setFieldValue("stateId", value);
                }}
              />
            </div>
            <div className="account-address-item">
              <label htmlFor="">City</label>
              <SelectElement
                value={cities.find(({ label }) => formik.values.city === label)}
                options={cities}
                placeholder="Select your city"
                onChange={({ label }) => formik.setFieldValue("city", label)}
              />
            </div>
            <div className="account-address-item">
              <label htmlFor="">Pincode</label>
              <InputNumber
                className="w-full"
                placeholder="Enter your pincode"
                maxLength={6}
                useGrouping={false}
                name="pincode"
                value={formik.values.pincode}
                onChange={({ value }) => formik.setFieldValue("pincode", value)}
                onBlur={formik.onBlur}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="toPayment"
            onClick={() => {
              setcurrent(3);
              setitems((prev) => {
                return prev.map((item, index) => {
                  if (index === 1) {
                    return { ...item, status: "finish" };
                  }
                  if (index === 2) {
                    return { ...item, status: "process" };
                  }
                  return item;
                });
              });
            }}
          >
            Proceed to Payment
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutTab;
