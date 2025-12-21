import "./index.css";
import React, { useEffect, useState } from "react";
import States from "@/assets/states.json";
import Cities from "@/assets/cities.json";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import SelectElement from "@/Components/Select/SelectElement";
import { useFormik } from "formik";
import ErrorMessage from "@/Components/ErrorMessage/ErrorMessage";
import { InputNumber } from "primereact/inputnumber";
import * as Yup from "yup";
import GlobalToast from "@/Components/GlobalToast";
import { addAddress, updateAddress } from "./service";
import { LS } from "@/lib/SecureLocalStorage";
const AddressBlock = ({ values = {}, newFlag = false, refreshGrid }) => {
  const [editFlag, seteditFlag] = useState(newFlag || false);
  const formik = useFormik({
    initialValues: {
      addressName: "",
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      state: "",
      stateId: "",
      city: "",
      pincode: "",
      userId: LS.get("userId"),
    },
    onSubmit: () => {},
    validationSchema: Yup.object({
      addressName: Yup.string().required("Address name is required"),
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phoneNumber: Yup.number()
        .typeError("Enter valid value")
        .required("Phone number is required"),
      address: Yup.string().required("Address is required"),
      state: Yup.string().required("State is required"),
      city: Yup.string().required("City is required"),
      pincode: Yup.string().required("Pincode is required"),
    }),
  });
  const cities =
    Cities.find(
      ({ value }) => formik.values.stateId.toString() === value.toString()
    )?.cities ?? [];

  const submitHandler = (values) => {
    formik.submitForm();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        GlobalToast({
          message: "Please fill all required fields",
          messageTimer: 1200,
          messageType: "error",
        });
      } else {
        if (newFlag) {
          addAddress(values)
            .then((res) => {
              formik.resetForm();
              seteditFlag(newFlag);
              GlobalToast({
                message: res.message,
                messageTimer: 1200,
                messageType: "success",
              });
              refreshGrid();
            })
            .catch((error) => {
              GlobalToast({
                message: "Error adding address",
                messageTimer: 1200,
                messageType: "error",
              });
            });
        } else {
          updateAddress(values)
            .then((res) => {
              formik.resetForm();
              seteditFlag(newFlag);
              GlobalToast({
                message: res.message,
                messageTimer: 1200,
                messageType: "success",
              });
              refreshGrid();
            })
            .catch((error) => {
              GlobalToast({
                message: "Error adding address",
                messageTimer: 1200,
                messageType: "error",
              });
            });
        }
      }
    });
  };
  useEffect(() => {
    if (Object.keys(values).length > 0)
      [
        "_id",
        "addressName",
        "name",
        "email",
        "phoneNumber",
        "address",
        "state",
        "stateId",
        "city",
        "pincode",
      ].forEach((val) => formik.setFieldValue(val, values[val] ?? ""));
  }, [values]);

  return (
    <div className="address-container">
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="">
          <input
            type="text"
            className="outline-none focus:!border-slate-500 border-b-2 border-white hover:border-slate-300"
            placeholder="Address name"
            name="addressName"
            value={formik.values.addressName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <ErrorMessage
            message={formik.errors.addressName}
            isVisible={formik.touched.addressName && formik.errors.addressName}
          />
        </div>
        <div className="col-span-3 grid md:grid-cols-subgrid grid-cols-2 gap-2 md:gap-4">
          <div className="">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <InputText
              className={
                formik.touched.name && formik.errors.name ? "errorClass" : ""
              }
              id="Name"
              placeholder="Name"
              name="name"
              disabled={!editFlag}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <ErrorMessage
              message={formik.errors.name}
              isVisible={formik.touched.name && formik.errors.name}
            />
          </div>
          <div className="">
            <label htmlFor="Email" className="form-label">
              Email
            </label>
            <InputText
              className=""
              id="Email"
              placeholder="email address"
              name="email"
              disabled={!editFlag}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <ErrorMessage
              message={formik.errors.email}
              isVisible={formik.touched.email && formik.errors.email}
            />
          </div>
          <div className="">
            <label htmlFor="PhoneNumber" className="form-label">
              Phone Number
            </label>
            <InputText
              className=""
              id="PhoneNumber"
              placeholder="phone number"
              name="phoneNumber"
              disabled={!editFlag}
              value={formik.values.phoneNumber}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <ErrorMessage
              message={formik.errors.phoneNumber}
              isVisible={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
          </div>
        </div>
        <div className="col-span-3">
          <label htmlFor="Address" className="form-label">
            Address
          </label>
          <InputTextarea
            autoResize
            className=""
            id="Address"
            placeholder="Flat / Building, Street name, Area..."
            name="address"
            disabled={!editFlag}
            value={formik.values.address}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <ErrorMessage
            message={formik.errors.address}
            isVisible={formik.touched.address && formik.errors.address}
          />
        </div>
        <div className="col-span-3 grid md:grid-cols-subgrid grid-cols-2 gap-2 md:gap-4">
          <div className="">
            <label htmlFor="" className="form-label">
              State
            </label>
            <SelectElement
              options={States}
              value={States.find(({ label }) => label === formik.values.state)}
              errorFlag={formik.touched.state && formik.errors.state}
              disabled={!editFlag}
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
          <div className="">
            <label htmlFor="" className="form-label">
              City
            </label>
            <SelectElement
              value={cities.find(({ label }) => formik.values.city === label)}
              options={cities}
              errorFlag={formik.touched.city && formik.errors.city}
              disabled={!editFlag}
              placeholder="Select your city"
              onChange={({ label }) => formik.setFieldValue("city", label)}
            />
            <ErrorMessage
              message={formik.errors.city}
              isVisible={formik.touched.city && formik.errors.city}
            />
          </div>
          <div className="">
            <label htmlFor="" className="form-label">
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
              disabled={!editFlag}
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
        {editFlag && (
          <div className="col-span-3 flex items-center justify-end mt-2">
            <button
              className="save-button "
              onClick={() => submitHandler(formik.values)}
            >
              Save Address
            </button>
          </div>
        )}
      </div>
      {!newFlag && (
        <button
          className="fa-regular fa-pen-to-square absolute top-4 right-4 text-xl"
          onClick={() => seteditFlag(true)}
        />
      )}
    </div>
  );
};

export default AddressBlock;
