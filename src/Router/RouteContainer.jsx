import React, { useEffect, useState } from "react";
import { Router } from "./Routes";
import "./Router.scss";
import { BrowserRouter } from "react-router-dom";
import { LS } from "@/lib/SecureLocalStorage";
import { SidebarProvider } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/app-sidebar";
import NavBar from "@/Components/NavBar/NavBar";
import { UserRouter } from "./UserRoutes";
import { getFooter, getLogo } from "./service";
import { convertToBase64toFile } from "@/lib/utils";
import Footer from "@/Components/Footer/Footer";
import { useSelector } from "react-redux";
const RouteContainer = () => {
  const [open, setopen] = useState(false);
  const [AdminLogin, setAdminLogin] = useState(true);
  const [logo, setlogo] = useState(null);
  const [footerDetails, setfooterDetails] = useState({});
  const role = useSelector((state) => state.data.role.role);
  useEffect(() => {
    getLogo().then(({ logo }) => {
      setlogo(`${import.meta.env.VITE_BASE_URL}/file?id=${logo}`);
    });
    getFooter().then(({ footerDetails }) => setfooterDetails(footerDetails));
  }, []);

  return (
    <BrowserRouter basename="/">
      <div className="main-div">
        {role === "admin" ? (
          <>
            <div className="container-div">
              <div
                className=""
                onMouseEnter={() => setopen(true)}
                onMouseLeave={() => setopen(false)}
              >
                <SidebarProvider open={open}>
                  <AppSidebar open={open} />
                </SidebarProvider>
              </div>
              <div className={"bg-[#f2f4f7] grow p-3"}>
                <div className={"bg-white rounded-lg h-full px-[19px]"}>
                  <Router />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <NavBar logo={logo} />
            <div className={"grow"}>
              <div className={"px-[19px] h-full"}>
                <UserRouter />
              </div>
            </div>
            <Footer logo={logo} footerDetails={footerDetails} />
          </>
        )}
      </div>
    </BrowserRouter>
  );
};

export default RouteContainer;
