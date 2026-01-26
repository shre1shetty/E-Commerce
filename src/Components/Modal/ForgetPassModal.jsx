import { Segmented } from "antd";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import "./index.css";
import { useFormik } from "formik";
import * as yup from "yup";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import GlobalToast from "../GlobalToast";
import { resetPassword, sendEmail, validateOTP } from "./service";
import { InputOtp } from "primereact/inputotp";
import { LS } from "@/lib/SecureLocalStorage";
import { useDispatch } from "react-redux";
import { setRole } from "@/Redux/Slice/UserSlice";
import { AxiosInstance } from "@/lib/AxiosInstance";
import { setWishList } from "@/Redux/Slice/WishlistSlice";
import { setCount } from "@/Redux/Slice/CountSlice";
const ForgetPassModal = ({ open, setopen }) => {
  const [active, setactive] = useState("email");
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      email: yup.string().when([], {
        is: () => active === "email",
        then: (schema) =>
          schema.email("Invalid email format").required("Email is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      otp: yup.number().when([], {
        is: () => active === "otp",
        then: (schema) =>
          schema.typeError("OTP must be a number").required("OTP is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      password: yup.string().when([], {
        is: () => active === "reset",
        then: (schema) =>
          schema
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              "Password must contain at least 8 characters, including uppercase, lowercase, numbers and special characters",
            )
            .required("Password is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      confirmPassword: yup.string().when([], {
        is: () => active === "reset",
        then: (schema) =>
          schema
            .oneOf([yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    onSubmit: () => {},
  });

  function handleSubmit(e, values, active) {
    e.preventDefault();
    formik.handleSubmit();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        GlobalToast({
          message: "Please fill all required fields correctly",
          messageTimer: 1200,
          messageType: "error",
        });
        return;
      } else {
        if (active === "email") {
          sendEmail(values.email).then((res) => {
            if (res.statusCode === 200) {
              GlobalToast({
                message: res.statusMsg,
                messageTimer: 1200,
                messageType: "success",
              });
              setactive("otp");
              formik.setTouched({});
            } else {
              GlobalToast({
                message: res.statusMsg,
                messageTimer: 1200,
                messageType: "error",
              });
              return;
            }
          });
        } else if (active === "otp") {
          validateOTP(values.otp, values.email).then((res) => {
            if (res.statusCode === 200) {
              GlobalToast({
                message: res.statusMsg,
                messageTimer: 1200,
                messageType: "success",
              });
              setactive("reset");
              formik.setTouched({});
            } else {
              GlobalToast({
                message: res.statusMsg,
                messageTimer: 1200,
                messageType: "error",
              });
              return;
            }
          });
        } else {
          resetPassword(values.email, values.password, values.otp).then(
            (res) => {
              if (res.statusCode === 200) {
                GlobalToast({
                  message: "Login successful",
                  messageTimer: 2000,
                  messageType: "success",
                });
                LS.set("userId", res._id);
                LS.set("username", res.username);
                LS.set("email", res.email);
                LS.set("contactNumber", res.contactNumber);
                if (import.meta.env.DEV) {
                  LS.set("refreshToken", res.refreshToken);
                }
                if (res.role === "admin") {
                  dispatch(setRole("admin"));
                  LS.set("Role", "admin");
                  AxiosInstance.defaults.headers.common["Authorization"] =
                    `Bearer ${res.accessToken}`;
                  AxiosInstanceforUpload.defaults.headers.common[
                    "Authorization"
                  ] = `Bearer ${res.accessToken}`;
                  navigate("/admin/Overview");
                }
                AxiosInstance.post("/Wishlist/getWishlistByUser", {
                  userId: res._id,
                }).then((res) => {
                  dispatch(setWishList(res.data));
                });
                AxiosInstance.get(`/Cart/getCartCount?userId=${res._id}`).then(
                  (resp) => {
                    dispatch(setCount(resp.data.count ?? 0));
                  },
                );
                setopen(false);
              } else {
                GlobalToast({
                  message: res.statusMsg || "Login failed",
                  messageTimer: 2000,
                  messageType: "error",
                });
              }
            },
          );
        }
      }
    });
  }

  useEffect(() => {
    if (open) {
      formik.resetForm();
      setactive("email");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent>
        <Segmented
          options={[
            {
              label: "Email",
              value: "email",
              disabled: active === "reset",
            },
            {
              label: "OTP",
              value: "otp",
              disabled: active == "email",
            },
            {
              label: "Reset",
              value: "reset",
              disabled: active !== "reset",
            },
          ]}
          value={active}
          onChange={setactive}
          block
        />
        <div className="forgot-modal">
          <header>
            <h1 className="">
              {active === "email"
                ? "Forgot Password"
                : active === "otp"
                  ? "Enter OTP"
                  : "Reset Password"}
            </h1>
            <div className="sub-text">
              {active === "email"
                ? "Enter registered email"
                : active === "otp"
                  ? "Enter OTP sent to your email"
                  : "Enter your new password"}
            </div>
          </header>
          <form action="" className="">
            {active === "email" && (
              <div className="">
                <label htmlFor="" className="">
                  Email Address
                </label>
                <fieldset>
                  <i class="fa-regular fa-envelope"></i>
                  <input
                    name="email"
                    type="email"
                    className=""
                    autoComplete="off"
                    autoFocus
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </fieldset>
                <ErrorMessage
                  message={formik.errors.email}
                  isVisible={formik.touched.email && formik.errors.email}
                />
              </div>
            )}
            {active === "otp" && (
              <InputOtp
                id="otpInput"
                value={formik.values.otp}
                onChange={(e) => formik.setFieldValue("otp", e.value)}
                autoFocus
                integerOnly
                length={6}
              />
            )}
            {active === "reset" && (
              <>
                <div className="">
                  <label htmlFor="" className="">
                    New Password
                  </label>
                  <fieldset>
                    <i class="fa-solid fa-lock"></i>
                    <input
                      name="password"
                      type="password"
                      className=""
                      autoComplete="off"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </fieldset>
                  <ErrorMessage
                    message={formik.errors.password}
                    isVisible={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </div>
                <div className="">
                  <label htmlFor="" className="">
                    Confirm Password
                  </label>
                  <fieldset>
                    <i class="fa-solid fa-lock"></i>
                    <input
                      name="confirmPassword"
                      type="password"
                      className=""
                      autoComplete="off"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </fieldset>
                  <ErrorMessage
                    message={formik.errors.confirmPassword}
                    isVisible={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                  />
                </div>
              </>
            )}
            <footer className="text-center">
              <button
                type="submit"
                onClick={(e) => handleSubmit(e, formik.values, active)}
              >
                Submit
              </button>
            </footer>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ForgetPassModal;
