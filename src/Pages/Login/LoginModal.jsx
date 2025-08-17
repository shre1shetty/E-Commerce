import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import React, { useState } from "react";
import "./index.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import GlobalToast from "@/Components/GlobalToast";
import { LoginUser } from "./service";
import { LS } from "@/lib/SecureLocalStorage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRole } from "@/Redux/Slice/UserSlice";
const LoginModal = ({ open, setopen }) => {
  const navigate = useNavigate();
  const [loginSignup, setloginSignup] = useState("login");
  const dispatch = useDispatch();
  const loginFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username / Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: () => {},
  });
  const handleLogin = (values) => {
    loginFormik.submitForm();
    loginFormik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        LoginUser(values).then((values) => {
          if (values.statusCode === 200) {
            GlobalToast({
              message: "Login successful",
              messageTimer: 2000,
              messageType: "success",
            });
            LS.set("userId", values._id);
            LS.set("username", values.username);
            LS.set("email", values.email);
            LS.set("contactNumber", values.contactNumber);
            if (values.role === "admin") {
              dispatch(setRole("admin"));
              LS.set("Role", "admin");
              navigate("/Overview");
            }
            setopen(false);
          } else {
            GlobalToast({
              message: values.message || "Login failed",
              messageTimer: 2000,
              messageType: "error",
            });
          }
        });
      } else {
        GlobalToast({
          message: "Please fill all the fields",
          messageTimer: 2000,
          messageType: "error",
        });
        console.log("Login failed", errors);
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={setopen}>
      {/* <DialogTrigger className="w-full">{children}</DialogTrigger> */}
      <DialogContent className="max-w-6xl">
        <div className="mask" data-state={loginSignup}>
          {loginSignup === "login" ? (
            <div className="font-extrabold text-center">
              <div className="text-white text-2xl">
                Don't have an account? Signup Now
              </div>
              <button
                className="login-signup-button"
                onClick={() => setloginSignup("signup")}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="font-extrabold text-center">
              <div className="text-white text-2xl">
                Already have an account? Login Now
              </div>
              <button
                className="login-signup-button"
                onClick={() => setloginSignup("login")}
              >
                Login
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 ">
          <div className="p-12">
            <div className="text-2xl font-bold">Login</div>
            <div className="text-sm text-muted-foreground">
              Enter your email and password to login.
            </div>
            <div className="mt-3">
              <Label className="">Username / Email</Label>
              <Input
                className=""
                placeholder="Enter username / email"
                name="username"
                value={loginFormik.values.username}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
              />
            </div>
            <div className="mt-3">
              <Label className="">Password</Label>
              <Input
                className=""
                placeholder="Enter password"
                type="password"
                name="password"
                value={loginFormik.values.password}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
              />
            </div>
            <div className="flex text-center items-center justify-center mt-4">
              <a href="" className="text-[13px] text-[var(--user-theme)]">
                Forgot your password ?
              </a>
            </div>
            <div className="flex items-center justify-center mt-4">
              <button
                className="bg-[var(--user-theme)] text-white px-28 py-2 rounded-full"
                onClick={() => handleLogin(loginFormik.values)}
              >
                Login
              </button>
            </div>
          </div>
          <div className="p-12 ">
            <div className="text-2xl font-bold">Sign Up</div>
            <div className="text-sm text-muted-foreground mb-2">
              Sign up for exclusive offers, early access to sales, and
              personalized recommendations! Join our community today.
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="mt-3">
                <Label className="">Username</Label>
                <Input className="" placeholder="Enter username" />
              </div>
              <div className="mt-3">
                <Label className="">Password</Label>
                <Input
                  className=""
                  placeholder="Enter password"
                  type="password"
                />
              </div>
              <div className="mt-3">
                <Label className="">Email</Label>
                <Input className="" placeholder="Enter email" />
              </div>
              <div className="mt-3">
                <Label className="">Phone Number</Label>
                <Input className="" placeholder="Enter phone number" />
              </div>
              <div className="mt-3">
                <Label>Address</Label>
                <Input className="" placeholder="Enter address" />
              </div>
              <div className="mt-3">
                <Label className="">Pincode</Label>
                <Input className="" placeholder="Enter pincode" />
              </div>
            </div>
            <div className="flex items-center justify-center mt-6">
              <button
                className="bg-[var(--user-theme)] text-white px-28 py-2 rounded-full"
                // onClick={() => setopen(false)}
              >
                SignUp
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
