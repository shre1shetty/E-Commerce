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
    <div className="grid grid-cols-4 gap-2">
      {products.map((product) => (
        <HomeProductCard
          id={product._id}
          label={product.name}
          price={parseInt(product.price)}
          discountPrice={product.price}
          filters={product.variantFields}
          description={product.description}
          variantValues={product.variantValues}
        />
      ))}
    </div>
  );
};

export default page;
