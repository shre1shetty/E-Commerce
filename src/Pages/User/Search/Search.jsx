import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "./service";
import RegularProductCard from "@/Components/ProductCard/RegularProductCard";
import { getFileUrl } from "@/lib/utils";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setproducts] = useState([]);
  useEffect(() => {
    getProducts(Object.fromEntries(searchParams.entries())).then((resp) =>
      setproducts(resp)
    );
  }, [searchParams]);
  return (
    <div className="">
      <div className="grid grid-cols-5 gap-3">
        {products.map((product) => (
          <RegularProductCard
            key={product._id}
            {...product}
            picture={getFileUrl(product.variantValues[0].values.picture[0])}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
