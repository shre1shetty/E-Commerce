import { AdminAxiosInstance } from "@/lib/AdminAxiosInstance";
import { AdminAxiosInstanceforUpload } from "@/lib/AdminAxiosInstanceforUpload";
import { AxiosInstance } from "@/lib/AxiosInstance";
import { LS } from "@/lib/SecureLocalStorage";
import React, { createContext, useLayoutEffect, useState } from "react";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [accessToken, setaccessToken] = useState(null);
  const [role, setrole] = useState(null);
  useLayoutEffect(() => {
    if (window.location.pathname !== import.meta.env.BASE_URL)
      AxiosInstance.post(
        "/User/refreshToken",
        import.meta.env.PROD ? {} : { refreshToken: LS.get("refreshToken") },
        { withCredentials: true }
      )
        .then((res) => {
          console.log(res);
          if (res.data.role === "admin") {
            setaccessToken(res.data.accessToken);
            setrole("admin");
            AdminAxiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.data.accessToken}`;
            AdminAxiosInstanceforUpload.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.data.accessToken}`;
          }
        })
        .catch((error) => {
          AxiosInstance.post("/User/logout", {}, { withCredentials: true });
          setaccessToken(null);
          setrole(null);
        });
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
