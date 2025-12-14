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
import { Bell, Menu, Search } from "lucide-react";
import { useRef } from "react";
const RouteContainer = () => {
  const [open, setopen] = useState(false);
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

  useEffect(() => {
    const handleOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setopen(false);
      }
    };
    document.addEventListener("touchstart", handleOutside);

    return () => {
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  return (
    <BrowserRouter basename="/">
      <div className="main-div">
        {role === "admin" ? (
          <>
            <div className="container-div">
              <div className="" ref={sidebarRef}>
                <SidebarProvider open={open}>
                  <AppSidebar open={open} />
                </SidebarProvider>
              </div>
              <div className={"bg-[#f2f4f7] grow p-3"}>
                <div
                  style={{
                    width: `calc(100% - ${(open ? 256 : 54) + 12}px)`,
                  }}
                  className="navbar-container max-sm:!w-[calc(100%-24px)]"
                >
                  <button className="" onClick={() => setopen((prev) => !prev)}>
                    <Menu color="#686886" />
                  </button>
                  <div className="navbar-search-container">
                    <input type="text" className="" placeholder="Search ..." />
                    <Search size={14} />
                  </div>
                  <div className="flex items-center gap-3">
                    <button>
                      <Bell size={20} color="#686886" />
                    </button>
                    <button className="h-8 w-8 rounded-full overflow-hidden">
                      <img
                        src="/Gokuprofile.png"
                        alt=""
                        className="h-full w-full"
                      />
                    </button>
                  </div>
                </div>
                <div
                  className={
                    "bg-white rounded-lg h-full  px-1 md:px-[19px] mt-10"
                  }
                >
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
