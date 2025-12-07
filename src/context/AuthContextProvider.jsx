import { AdminAxiosInstance } from "@/lib/AdminAxiosInstance";
import { AdminAxiosInstanceforUpload } from "@/lib/AdminAxiosInstanceforUpload";
import { AxiosInstance } from "@/lib/AxiosInstance";
import { LS } from "@/lib/SecureLocalStorage";
import { TokenStore } from "@/lib/TokenStore";
import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
// ...existing code...

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [accessToken, setaccessToken] = useState(null);
  const [role, setrole] = useState(null);

  useEffect(() => {
    const refresh = async () => {
      if (window.location.pathname === import.meta.env.BASE_URL) return;

      try {
        const payload = import.meta.env.PROD
          ? {}
          : { refreshToken: LS.get("refreshToken") };

        const res = await AxiosInstance.post("/User/refreshToken", payload, {
          withCredentials: true,
        });
        if (res.data?.role === "admin") {
          setaccessToken(res.data.accessToken);
          TokenStore.setToken(res.data.accessToken);
          setrole("admin");
          // AdminAxiosInstance.defaults.headers.common[
          //   "Authorization"
          // ] = `Bearer ${res.data.accessToken}`;
          AdminAxiosInstanceforUpload.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.accessToken}`;
        }
      } catch (error) {
        // best-effort logout on error
        try {
          await AxiosInstance.post(
            "/User/logout",
            {},
            { withCredentials: true }
          );
        } catch (e) {
          // ignore
        }
        setaccessToken(null);
        setrole(null);
      }
    };

    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
