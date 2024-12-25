import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const OverViewPage = lazy(() => import("../Pages/OverView/page"));
const InventoryPage = lazy(() => import("../Pages/Inventory/page"));
const FilterPage = lazy(() => import("../Pages/Filters/page"));
const FilterTypePage = lazy(() => import("../Pages/FilterType/page"));
const VariantPage = lazy(() => import("../Pages/Variant/page"));
const VariantFieldPage = lazy(() => import("../Pages/VariantFields/page"));
const ProductsToDisplayPage = lazy(() =>
  import("../Pages/ProductsToDisplay/page")
);
const CreateProductsToDisplayPage = lazy(() =>
  import("../Pages/ProductsToDisplay/create")
);
export const Router = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path="/" element={<InventoryPage />} />
        <Route path="/OverView" element={<OverViewPage />} />
        <Route path="/Inventory" element={<InventoryPage />} />
        <Route path="/Filters" element={<FilterPage />} />
        <Route path="/Filters/:id" element={<FilterTypePage />} />
        <Route path="/Variant" element={<VariantPage />} />
        <Route path="/Variant/:id" element={<VariantFieldPage />} />
        <Route path="/ProductsToDisplay" element={<ProductsToDisplayPage />} />
        <Route
          path="/ProductsToDisplay/Create"
          element={<CreateProductsToDisplayPage />}
        />
      </Routes>
    </Suspense>
  );
};
