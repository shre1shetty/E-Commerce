import { Accordion, AccordionTab } from "primereact/accordion";
import React, { useEffect, useState } from "react";
import { getUserDetails, updatePassword, updateUserDetails } from "./service";
import { Label } from "@/Components/ui/label";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "@/Components/ErrorMessage/ErrorMessage";
import GlobalToast from "@/Components/GlobalToast";
import { Button } from "@/Components/ui/button";

const page = () => {
  const [userDetails, setUserDeatis] = useState({});
  const [allowEdit, setallowEdit] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: userDetails.username,
      email: userDetails.email,
      contactNumber: userDetails.contactNumber,
    },
    enableReinitialize: true,
    onSubmit: () => {},
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      contactNumber: Yup.string().required("Contact number is required"),
    }),
  });

  const passWordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: () => {},
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Please enter current password"),
      newPassword: Yup.string().required("Please enter new password"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Please confirm new password"),
    }),
  });

  const handleSubmit = (values) => {
    formik.handleSubmit();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        GlobalToast({
          message: "Please fill all details",
          messageTimer: 1200,
          messageType: "error",
        });
      } else {
        updateUserDetails(values).then((resp) => {
          if (resp) {
            GlobalToast({
              message: resp.statusMsg,
              messageTimer: 1200,
              messageType: resp.statusCode === 200 ? "success" : "error",
            });
            setallowEdit(false);
          }
        });
      }
    });
  };
  const handleReset = (values) => {
    passWordFormik.handleSubmit();
    passWordFormik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        GlobalToast({
          message: "Please fill all details",
          messageTimer: 1200,
          messageType: "error",
        });
      } else {
        updatePassword(values).then((resp) => {
          if (resp) {
            GlobalToast({
              message: resp.statusMsg,
              messageTimer: 1200,
              messageType: resp.statusCode === 200 ? "success" : "error",
            });
            setallowEdit(false);
          }
        });
      }
    });
  };

  useEffect(() => {
    getUserDetails().then((response) => {
      if (response) setUserDeatis(response);
    });
  }, []);

  return (
    <Accordion activeIndex={0}>
      <AccordionTab header="Basic Details" className="relative">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <div className="">
            <Label>UserName</Label>
            <InputText
              name="username"
              autoFocus
              value={formik.values.username}
              className={
                formik.errors.username && formik.touched.username
                  ? "errorClass"
                  : ""
              }
              disabled={!allowEdit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <ErrorMessage
              message={formik.errors.username}
              isVisible={formik.errors.username && formik.touched.username}
            />
          </div>
          <div className="">
            <Label>Email</Label>
            <InputText
              name="email"
              className={
                formik.errors.email && formik.touched.email ? "errorClass" : ""
              }
              value={formik.values.email}
              disabled={!allowEdit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <ErrorMessage
              message={formik.errors.email}
              isVisible={formik.errors.email && formik.touched.email}
            />
          </div>
          <div className="">
            <Label>Contact number</Label>
            <InputText
              name="contactNumber"
              className={
                formik.errors.contactNumber && formik.touched.contactNumber
                  ? "errorClass"
                  : ""
              }
              value={formik.values.contactNumber}
              disabled={!allowEdit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <ErrorMessage
              message={formik.errors.contactNumber}
              isVisible={
                formik.errors.contactNumber && formik.touched.contactNumber
              }
            />
          </div>
        </div>
        <div className="absolute top-0 right-4 text-base flex gap-2 items-center">
          <button
            className={`fa-solid fa-arrows-rotate`}
            onClick={() => formik.setValues(userDetails)}
          ></button>
          <button
            className={`fa-regular ${
              allowEdit ? "fa-floppy-disk" : "fa-pen-to-square"
            } `}
            onClick={() =>
              allowEdit ? handleSubmit(formik.values) : setallowEdit(true)
            }
          ></button>
        </div>
      </AccordionTab>
      <AccordionTab header="Reset Password">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <div className="">
            <Label className="mandatory">Current Password</Label>
            <InputText
              name="currentPassword"
              type="password"
              autoFocus
              className={
                passWordFormik.errors.currentPassword &&
                passWordFormik.touched.currentPassword
                  ? "errorClass"
                  : ""
              }
              value={passWordFormik.values.currentPassword}
              onChange={passWordFormik.handleChange}
              onBlur={passWordFormik.handleBlur}
            />
            <ErrorMessage
              message={passWordFormik.errors.currentPassword}
              isVisible={
                passWordFormik.errors.currentPassword &&
                passWordFormik.touched.currentPassword
              }
            />
          </div>
          <div className="">
            <Label className="mandatory">New Password</Label>
            <InputText
              name="newPassword"
              type="password"
              className={
                passWordFormik.errors.newPassword &&
                passWordFormik.touched.newPassword
                  ? "errorClass"
                  : ""
              }
              value={passWordFormik.values.newPassword}
              onChange={passWordFormik.handleChange}
              onBlur={passWordFormik.handleBlur}
            />
            <ErrorMessage
              message={passWordFormik.errors.newPassword}
              isVisible={
                passWordFormik.errors.newPassword &&
                passWordFormik.touched.newPassword
              }
            />
          </div>
          <div className="">
            <Label className="mandatory">Confirm New Password</Label>
            <InputText
              name="confirmNewPassword"
              type="password"
              className={
                passWordFormik.errors.confirmNewPassword &&
                passWordFormik.touched.confirmNewPassword
                  ? "errorClass"
                  : ""
              }
              value={passWordFormik.values.confirmNewPassword}
              onChange={passWordFormik.handleChange}
              onBlur={passWordFormik.handleBlur}
            />
            <ErrorMessage
              message={passWordFormik.errors.confirmNewPassword}
              isVisible={
                passWordFormik.errors.confirmNewPassword &&
                passWordFormik.touched.confirmNewPassword
              }
            />
          </div>
          <Button
            className="mt-7 !h-10"
            onClick={() => {
              handleReset(passWordFormik.values);
            }}
          >
            Submit
          </Button>
        </div>
      </AccordionTab>
    </Accordion>
  );
};

export default page;
