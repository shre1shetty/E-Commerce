import React, { useEffect, useState } from "react";
import { Router } from "./Routes";
import Sidebar from "../Components/Sidebar/Sidebar";
import "./Router.scss";
import { BrowserRouter } from "react-router-dom";
import { LS } from "@/lib/SecureLocalStorage";
import { SidebarProvider } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/app-sidebar";
const RouteContainer = () => {
  const [open, setopen] = useState(false);
  return (
    <BrowserRouter basename="E-Cart">
      <div className="main-div">
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
          <div className="bg-[#f2f4f7] grow p-3">
            <div className="bg-white rounded-lg h-full px-[19px]">
              <Router />
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default RouteContainer;
