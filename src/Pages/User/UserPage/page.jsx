import React, { Suspense } from "react";
import "./index.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { LS } from "@/lib/SecureLocalStorage";
import { useDispatch } from "react-redux";
import { setRole } from "@/Redux/Slice/UserSlice";
import { setCount } from "@/Redux/Slice/CountSlice";
const OrdersPage = React.lazy(() => import("./Order/page"));
const AddressPage = React.lazy(() => import("./Address/page"));
const WishlistPage = React.lazy(() => import("./Favourite/page"));
const page = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  return (
    <div>
      <h1 className="user-header">Your Account</h1>
      <span className="user-sub-header">
        {LS.get("username")}, Email: {LS.get("email")}
      </span>
      <div className="flex flex-col sm:grid grid-cols-4 mt-3 md:mt-7 gap-4">
        <div className="">
          <ul className="user-menu-list">
            <li
              className={
                pathname.toLowerCase() === "/userDetails/Orders".toLowerCase()
                  ? "active"
                  : ""
              }
              onClick={() => navigate("Orders")}
            >
              <i class="fa-solid fa-truck"></i>
              <p className="">My Orders</p>
            </li>
            <li
              className={
                pathname.toLowerCase() ===
                "/userDetails/Addresses".toLowerCase()
                  ? "active"
                  : ""
              }
              onClick={() => navigate("Addresses")}
            >
              <i class="fa-solid fa-location-dot"></i>
              <p className="">Your Addresses</p>
            </li>
            <li className="">
              <i class="fa-solid fa-lock"></i>
              <p className="">Login and Security</p>
            </li>
            <li
              className={
                pathname.toLowerCase() === "/userDetails/Wishlist".toLowerCase()
                  ? "active"
                  : ""
              }
              onClick={() => navigate("Wishlist")}
            >
              <i class="fa-solid fa-heart"></i>
              <p className="">Saved Items</p>
            </li>
            <li className="!hidden sm:!flex">
              <hr className="" />
            </li>
            <li className="">
              <i class="fa-solid fa-comment-dots"></i>
              <p className="">Customer Support</p>
            </li>
            <li
              className=""
              onClick={() => {
                LS.clear();
                dispatch(setRole("user"));
                dispatch(setCount(0));
                navigate("/");
              }}
            >
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
              <Route path="/Wishlist" element={<WishlistPage />}></Route>
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default page;
