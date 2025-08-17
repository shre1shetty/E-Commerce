import LoginPage from "@/Pages/Login/LoginPage";
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const CategoryPage = lazy(() => import("@/Pages/User/Category/page"));
const HomePage = lazy(() => import("../Pages/User/HomePage/HomePage"));
const Search = lazy(() => import("@/Pages/User/Search/Search"));
const ProductPage = lazy(() => import("@/Pages/User/ProductPage/page"));
const CartPage = lazy(() => import("@/Pages/User/Cart/page"));
export const UserRouter = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} /> */}

        {/* User Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/Category/:id" element={<CategoryPage />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Product/:id" element={<ProductPage />} />
        <Route path="/Cart" element={<CartPage />} />
        <Route path="*" element={<div>No page found</div>} />
        {/* User Routes */}
      </Routes>
    </Suspense>
  );
};
