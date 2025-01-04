import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo.png";
import "./Sidebar.scss";
import { useNavigate } from "react-router-dom";
import { LS } from "@/lib/SecureLocalStorage";
const mainMenu = [
  {
    name: "Overview",
    icon: "fa-solid fa-chart-pie",
    navigateTo: "/Overview",
  },
  {
    name: "Products To Display",
    icon: "fa-solid fa-cart-shopping",
  },
  {
    name: "Orders",
    icon: "fa-solid fa-box-open",
  },
  {
    name: "Inventory",
    icon: "fa-solid fa-warehouse",
    navigateTo: "/Inventory",
  },
  {
    name: "Customers",
    icon: "fa-regular fa-user",
  },
];
const Sidebar = () => {
  const navigate = useNavigate();
  const navigationHandler = (item) => {
    navigate(item.navigateTo ?? "/");
  };
  const regex = /[^\/]+\/(.+)$/;
  const menuName = window.location.pathname.match(regex);
  LS.set("activeMenu", menuName?.length > 0 ? menuName[1] : "");

  return (
    <div className="sidebar">
      <div className="sidebar-header flex h-16 items-center gap-2 text-lg text-[#7e8394]">
        <img src={Logo} alt="" className="w-auto h-full" />
        <div>E-Cart Solutions</div>
      </div>
      <div className="sidebar-body grow">
        <div className="text-xs font-medium px-2 py-2.5">Main</div>
        <ul className="">
          {mainMenu.map((option) => (
            <li
              className={`flex gap-2 items-center px-2 py-2.5 text-base cursor-pointer text-[#ffffffb5] ${
                LS.get("activeMenu") === option.name ? "active" : ""
              }`}
              onClick={() => navigationHandler(option)}
            >
              <i className={option.icon}></i>
              <span className="">{option.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
