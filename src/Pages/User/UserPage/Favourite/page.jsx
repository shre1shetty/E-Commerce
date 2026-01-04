import React, { useEffect, useState } from "react";
import { getWishlistProductsByUserId } from "./service";
import { LS } from "@/lib/SecureLocalStorage";
import HomeProductCard from "@/Components/ProductCard/HomeProductCard";

const page = () => {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    getWishlistProductsByUserId(LS.get("userId")).then((res) =>
      setproducts(res ?? [])
    );
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {products.map((product) => (
        <HomeProductCard
          id={product._id}
          label={product.name}
          price={product.variantValues[0].values.price}
          discountedPrice={product.variantValues[0].values.discountedPrice}
          filters={product.variantFields}
          description={product.description}
          variantValues={product.variantValues}
          avgRating={product.avgRating}
        />
      ))}
    </div>
  );
};

export default page;
