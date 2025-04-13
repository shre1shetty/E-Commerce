import LoginPage from "@/Pages/Login/LoginPage";
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const OverViewPage = lazy(() => import("../Pages/Admin/OverView/page"));
const InventoryPage = lazy(() => import("../Pages/Admin/Inventory/page"));
const FilterPage = lazy(() => import("../Pages/Admin/Filters/page"));
const FilterTypePage = lazy(() => import("../Pages/Admin/FilterType/page"));
const VariantPage = lazy(() => import("../Pages/Admin/Variant/page"));
const VariantFieldPage = lazy(() =>
  import("../Pages/Admin/VariantFields/page")
);
const ProductsToDisplayPage = lazy(() =>
  import("../Pages/Admin/ProductsToDisplay/page")
);
const CreateProductsToDisplayPage = lazy(() =>
  import("../Pages/Admin/ProductsToDisplay/create")
);
const EditProductsToDisplayPage = lazy(() =>
  import("../Pages/Admin/ProductsToDisplay/edit")
);
const HomePage = lazy(() => import("../Pages/User/HomePage/HomePage"));
export const UserRouter = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* User Routes */}
        <Route path="/Home" element={<HomePage />} />

        {/* User Routes */}
      </Routes>
    </Suspense>
  );
};
