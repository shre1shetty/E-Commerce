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
const RawCreateProductsToDisplayPage = lazy(() =>
  import("../Pages/Admin/ProductsToDisplay/rawCreate")
);
const EditProductsToDisplayPage = lazy(() =>
  import("../Pages/Admin/ProductsToDisplay/edit")
);
const Layout = lazy(() => import("@/Pages/Admin/Layout/Layout"));
const CreateLayout = lazy(() => import("@/Pages/Admin/Layout/Create"));
const Edit = lazy(() => import("@/Pages/Admin/Layout/Edit"));
export const Router = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Admin Routes */}
        <Route path="/OverView" element={<OverViewPage />} />
        <Route path="/Inventory" element={<InventoryPage />} />
        <Route path="/Filters" element={<FilterPage />} />
        <Route path="/Filters/:id" element={<FilterTypePage />} />
        <Route path="/Variant" element={<VariantPage />} />
        <Route path="/Variant/:id" element={<VariantFieldPage />} />
        <Route path="/ProductsToDisplay" element={<ProductsToDisplayPage />} />
        <Route
          path="/ProductsToDisplay/CreateNew"
          element={<RawCreateProductsToDisplayPage />}
        />
        <Route
          path="/ProductsToDisplay/Create"
          element={<CreateProductsToDisplayPage />}
        />
        <Route
          path="/ProductsToDisplay/Edit"
          element={<EditProductsToDisplayPage />}
        />
        <Route path="/Layout" element={<Layout />} />
        <Route path="/Layout/Create" element={<CreateLayout />} />
        <Route path="/Layout/Edit/:id" element={<Edit />} />
        {/* Admin Routes */}
      </Routes>
    </Suspense>
  );
};
