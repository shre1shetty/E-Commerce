import LoginPage from "@/Pages/Login/LoginPage";
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const CategoryPage = lazy(() => import("@/Pages/User/Category/page"));
const HomePage = lazy(() => import("../Pages/User/HomePage/HomePage"));
export const UserRouter = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* User Routes */}
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Category/:id" element={<CategoryPage />} />
        {/* User Routes */}
      </Routes>
    </Suspense>
  );
};
