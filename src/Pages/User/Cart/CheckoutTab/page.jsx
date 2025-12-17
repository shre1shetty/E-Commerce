import SelectElement from "@/Components/Select/SelectElement";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import React from "react";
import States from "@/assets/states.json";
import Cities from "@/assets/cities.json";
import { InputTextarea } from "primereact/inputtextarea";
import { ArrowRight } from "lucide-react";
import { LS } from "@/lib/SecureLocalStorage";
import ErrorMessage from "@/Components/ErrorMessage/ErrorMessage";
import GlobalToast from "@/Components/GlobalToast";
const CheckoutTab = ({ setcurrent, setitems, formik }) => {
  const cities =
    Cities.find(({ value }) => formik.values.stateId === value)?.cities ?? [];
  const handleClick = (event) => {
    event.preventDefault();
    formik.submitForm();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        GlobalToast({
          message: "Please fill all mandatory fields",
          messageType: "error",
          messageTimer: 1200,
        });
      } else {
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
      }
    });
  };
  return (
    <div className=" h-[555px] mt-6">
      <form className="col-span-2 flex flex-col gap-4 overflow-y-auto pb-2">
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
            <div className="account-address-item col-span-2 md:col-span-3 lg:col-span-4">
              <label htmlFor="" className="mandatory">
                Address
              </label>
              <InputTextarea
                type="text"
                autoFocus
                placeholder="Enter Address"
                className={
                  formik.touched.address && formik.errors.address
                    ? "errorClass"
                    : ""
                }
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoResize
              />
              <ErrorMessage
                message={formik.errors.address}
                isVisible={formik.touched.address && formik.errors.address}
              />
            </div>
            <div className="account-address-item">
              <label htmlFor="" className="mandatory">
                State
              </label>
              <SelectElement
                options={States}
                value={States.find(
                  ({ label }) => label === formik.values.state
                )}
                errorFlag={formik.touched.state && formik.errors.state}
                placeholder="Select your state"
                onChange={({ label, value }) => {
                  formik.setFieldValue("state", label);
                  formik.setFieldValue("stateId", value);
                }}
              />
              <ErrorMessage
                message={formik.errors.state}
                isVisible={formik.touched.state && formik.errors.state}
              />
            </div>
            <div className="account-address-item">
              <label htmlFor="" className="mandatory">
                City
              </label>
              <SelectElement
                value={cities.find(({ label }) => formik.values.city === label)}
                options={cities}
                errorFlag={formik.touched.city && formik.errors.city}
                placeholder="Select your city"
                onChange={({ label }) => formik.setFieldValue("city", label)}
              />
              <ErrorMessage
                message={formik.errors.city}
                isVisible={formik.touched.city && formik.errors.city}
              />
            </div>
            <div className="account-address-item">
              <label htmlFor="" className="mandatory">
                Pincode
              </label>
              <InputNumber
                className={
                  formik.touched.pincode && formik.errors.pincode
                    ? "errorClass w-full"
                    : "w-full"
                }
                placeholder="Enter your pincode"
                maxLength={6}
                useGrouping={false}
                name="pincode"
                value={formik.values.pincode}
                onChange={({ value }) => formik.setFieldValue("pincode", value)}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage
                message={formik.errors.pincode}
                isVisible={formik.touched.pincode && formik.errors.pincode}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="toPayment" onClick={handleClick}>
            Proceed to Payment
            <ArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutTab;
