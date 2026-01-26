import React, {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
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
import { AuthContext } from "@/context/AuthContextProvider";
import ScrollToTop from "@/Components/ScrollToTop/ScrollToTop";
import ForgetPassModal from "@/Components/Modal/ForgetPassModal";

export const loginStateContext = createContext({
  open: false,
  setopen: () => {},
});

export const forgetPassStateContext = createContext({
  openModal: false,
  setopenModal: () => {},
});

const RouteContainer = () => {
  const [open, setopen] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const { role } = useContext(AuthContext); //useSelector((state) => state.data.role.role);
  const ContextValue = { open, setopen };
  const forgetPassContextValue = { openModal, setopenModal };
  return (
    <BrowserRouter basename="/">
      <ScrollToTop />
      <div className="main-div">
        <forgetPassStateContext.Provider value={forgetPassContextValue}>
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
            <ForgetPassModal open={openModal} setopen={setopenModal} />
          </loginStateContext.Provider>
        </forgetPassStateContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default RouteContainer;
