import { useFormik } from "formik";
import React, { useEffect } from "react";
import { LoginUser } from "./service";
import { LS } from "@/lib/SecureLocalStorage";
import { Input } from "@/Components/ui/input";

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
  });
  const loginUser = (data) => {
    LoginUser(data).then((resp) => {
      console.log(resp);
      LS.set("Role", resp.loginRole);
      window.location.href = resp.redirectTo;
    });
  };

  useEffect(() => {
    LS.clear();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        className=""
        name="username"
        onChange={formik.handleChange}
      />
      <Input
        type="password"
        className=""
        name="password"
        onChange={formik.handleChange}
      />
      <button onClick={() => loginUser(formik.values)}>Login</button>
    </div>
  );
};

export default LoginPage;
