import React, { useEffect, useState } from "react";
import { Router } from "./Routes";
import "./Router.scss";
import { BrowserRouter } from "react-router-dom";
import { LS } from "@/lib/SecureLocalStorage";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/app-sidebar";
import { UserRouter } from "./UserRoutes";
import { getFooter, getLogo } from "./service";
import { convertToBase64toFile } from "@/lib/utils";
import Footer from "@/Components/Footer/Footer";
import { useSelector } from "react-redux";
import { Bell, Menu, Search } from "lucide-react";
import { useRef } from "react";

const NavBar = () => {
  const { open } = useSidebar();
  return (
    <>
      <div
        style={{
          width: `calc(
                        100% - ${open ? "16rem" : "3rem"} - 12px
                      )`,
        }}
        className="navbar-container max-sm:!w-[calc(100%-24px)]"
      >
        <SidebarTrigger></SidebarTrigger>
        <div className="navbar-search-container">
          <input type="text" className="" placeholder="Search ..." />
          <Search size={14} />
        </div>
        <div className="flex items-center gap-3">
          <button>
            <Bell size={20} color="#686886" />
          </button>
          <button className="h-8 w-8 rounded-full overflow-hidden">
            <img src="/Gokuprofile.png" alt="" className="h-full w-full" />
          </button>
        </div>
      </div>
    </>
  );
};
const RouteContainer = () => {
  const [logo, setlogo] = useState(null);
  const [footerDetails, setfooterDetails] = useState({});
  const sidebarRef = useRef(null);
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
            <SidebarProvider defaultOpen={false}>
              <div className="container-div w-full">
                <div className="" ref={sidebarRef}>
                  <AppSidebar />
                </div>
                <div className={"bg-[#f2f4f7] grow p-3 text-black"}>
                  <NavBar />
                  <div
                    className={
                      "bg-white rounded-lg h-full  px-1 md:px-[19px] mt-10"
                    }
                  >
                    <Router />
                  </div>
                </div>
              </div>
            </SidebarProvider>
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
