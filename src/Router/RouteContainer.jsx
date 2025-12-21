import React, { createContext, useEffect, useState } from "react";
import { Router } from "./Routes";
import "./Router.scss";
import { BrowserRouter } from "react-router-dom";
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
import NavBar from "@/Components/NavBar/NavBar";
import LoginModal from "@/Pages/Login/LoginModal";

const AdminNavBar = () => {
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

export const loginStateContext = createContext({
  open: false,
  setopen: () => {},
});
const RouteContainer = () => {
  const [logo, setlogo] = useState(null);
  const [open, setopen] = useState(false);
  const [footerDetails, setfooterDetails] = useState({});
  const role = useSelector((state) => state.data.role.role);

  const ContextValue = { open, setopen };

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
                <AppSidebar />
                <div className={"bg-[#f2f4f7] grow p-3 text-black"}>
                  <AdminNavBar />
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
          <loginStateContext.Provider value={ContextValue}>
            <NavBar logo={logo} />
            <div className={"grow"}>
              <div className={"px-2 md:px-[19px] h-full"}>
                <UserRouter />
              </div>
            </div>
            <Footer logo={logo} footerDetails={footerDetails} />
            <LoginModal open={open} setopen={setopen} />
          </loginStateContext.Provider>
        )}
      </div>
    </BrowserRouter>
  );
};

export default RouteContainer;
