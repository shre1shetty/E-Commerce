import React, { Suspense } from "react";
import "./index.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
const OrdersPage = React.lazy(() => import("./Order/page"));
const AddressPage = React.lazy(() => import("./Address/page"));
const page = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div>
      <h1 className="user-header">Your Account</h1>
      <span className="user-sub-header">
        Shrevan Shetty, Email: shrevan506@gmail.com
      </span>
      <div className="grid grid-cols-4 mt-7 gap-4">
        <div className="">
          <ul className="user-menu-list">
            <li
              className={
                pathname.toLowerCase() === "/userDetails/Orders".toLowerCase()
                  ? "active"
                  : ""
              }
            >
              <i class="fa-solid fa-truck"></i>
              <p className="" onClick={() => navigate("Orders")}>
                My Orders
              </p>
            </li>
            <li
              className={
                pathname.toLowerCase() ===
                "/userDetails/Addresses".toLowerCase()
                  ? "active"
                  : ""
              }
            >
              <i class="fa-solid fa-location-dot"></i>
              <p className="" onClick={() => navigate("Addresses")}>
                Your Addresses
              </p>
            </li>
            <li className="">
              <i class="fa-solid fa-lock"></i>
              <p className="">Login and Security</p>
            </li>
            <li className="">
              <i class="fa-solid fa-heart"></i>
              <p className="">Saved Items</p>
            </li>
            <li className="">
              <hr className="" />
            </li>
            <li className="">
              <i class="fa-solid fa-comment-dots"></i>
              <p className="">Customer Support</p>
            </li>
            <li className="">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
              <p className="">Logout</p>
            </li>
          </ul>
        </div>
        <div className="col-span-3">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route index path="/Orders" element={<OrdersPage />}></Route>
              <Route path="/Addresses" element={<AddressPage />}></Route>
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default page;
