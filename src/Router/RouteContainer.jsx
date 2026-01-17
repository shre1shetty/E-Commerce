import React, { createContext, Suspense, useEffect, useState } from "react";
import AdminRoutes from "./Routes";
import "./Router.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/app-sidebar";
import UserRouter from "./UserRoutes";
import { getFooter, getLogo } from "./service";
import { convertToBase64toFile } from "@/lib/utils";
import Footer from "@/Components/Footer/Footer";
import { useSelector } from "react-redux";
import { Bell, Menu, Search } from "lucide-react";
import { useRef } from "react";
import NavBar from "@/Components/NavBar/NavBar";
import LoginModal from "@/Pages/Login/LoginModal";
import UserLayout from "@/Layout/UserLayout";
import HomePage from "@/Pages/User/HomePage/HomePage";
import AdminLayout from "@/Layout/AdminLayout";

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

  return (
    <BrowserRouter basename="/">
      <div className="main-div">
        <loginStateContext.Provider value={ContextValue}>
          <Routes>
            {role === "admin" && (
              <Route path="/admin" element={<AdminLayout />}>
                {AdminRoutes}
              </Route>
            )}
            {/*  */}
            <Route element={<UserLayout />}>{UserRouter}</Route>
            <Route path="*" element={<div>No page found</div>} />
          </Routes>

          <LoginModal open={open} setopen={setopen} />
        </loginStateContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default RouteContainer;
