import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "./service";
import RegularProductCard from "@/Components/ProductCard/RegularProductCard";
import { getFileUrl } from "@/lib/utils";
import "./index.css";
import { getCategory } from "../Category/service";
import { Checkbox } from "primereact/checkbox";
import { ChevronDown, Menu } from "lucide-react";
import { Slider } from "primereact/slider";
import { InputNumber } from "primereact/inputnumber";
const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [label, setlabel] = useState("");
  const [products, setproducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [showFilter, setshowFilter] = useState(true);
  const [maxValue, setmaxValue] = useState(0);
  const [value, setvalue] = useState([0, 100]);
  const [category, setcategory] = useState([]);
  const [filters, setfilters] = useState([]);
  const [openCategory, setopenCategory] = useState({});
  useEffect(() => {
    for (const [key, value] of searchParams.entries()) {
      const formatted =
        key.charAt(0).toUpperCase() + key.slice(1) + " " + value;
      setlabel(formatted);
    }
    getProducts(Object.fromEntries(searchParams.entries())).then((resp) => {
      if (resp) {
        setproducts(resp);
        const max = resp.reduce(
          (acc, cur) => {
            return Math.max(acc, cur.price);
          },
          [0]
        );
        setmaxValue(max);
        setvalue([0, max]);
      }
    });
    getCategory().then(({ data }) => {
      setcategory(data);
    });
  }, [searchParams]);
  useEffect(() => {
    setfilteredProducts(
      products.filter(
        ({ category, price }) =>
          (filters.length == 0 ||
            category.some(({ value }) => filters.includes(value))) &&
          price >= value[0] &&
          price <= value[1]
      )
    );
  }, [filters, products, value]);
  return (
    <div className="">
      <div className="search-page-header">
        <label htmlFor="" className="">
          Showing search results for{" "}
          <span className="text-[var(--user-theme)]">{label}</span>
        </label>
        <div className="search-page-button-section">
          <div className="search-page-label-select">
            <label className="">Sort By</label>
            <select className="" id="">
              <option value="">Price</option>
              <option value="">Popularity</option>
              <option value="">Discount</option>
            </select>
          </div>

          <button
            className="filter"
            onClick={() => setshowFilter((prev) => !prev)}
          >
            <Menu />
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="search-products-container" data-showFilter={showFilter}>
          {filteredProducts.map((product) => (
            <RegularProductCard
              key={product._id}
              {...product}
              picture={getFileUrl(product.variantValues[0].values.picture[0])}
            />
          ))}
        </div>
        <div
          className={`${
            showFilter
              ? "w-[40%] min-w-[220px] md:w-1/5 border-l pl-4 border-slate-600 text-[#00003b]"
              : "w-0"
          } overflow-x-hidden transition-all duration-300 min-h-[560px]`}
        >
          <div className="price-range border-b-2 pb-3">
            <label htmlFor="range" className="range-label">
              Price
            </label>
            <div className=" mt-3">
              <div className="card flex justify-center px-3">
                <Slider
                  id="range"
                  min={0}
                  max={parseInt(maxValue)}
                  value={value}
                  onChange={(e) => setvalue(e.value)}
                  className="w-full"
                  range
                />
              </div>
              <div className="flex justify-between items-center gap-2 mt-3">
                <div className="price-div">
                  <InputNumber
                    inputId="currency-india"
                    min={0}
                    value={value[0]}
                    onValueChange={(e) =>
                      setvalue((prev) => [e.value, prev[1]])
                    }
                    mode="currency"
                    currency="INR"
                    locale="en-IN"
                  />
                </div>
                <span className="font-bold text-lg">-</span>
                <div className="price-div">
                  <InputNumber
                    inputId="currency-india"
                    min={0}
                    value={value[1]}
                    max={maxValue}
                    onValueChange={(e) =>
                      setvalue((prev) => [prev[0], e.value])
                    }
                    mode="currency"
                    currency="INR"
                    locale="en-IN"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="category-container">
            {category.map(({ name, _id, subFilter }) => (
              <div
                className="py-3 border-b-2 flex flex-col justify-center"
                key={_id}
              >
                <div className="flex justify-between font-semibold text-xs">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() =>
                      setopenCategory((prev) => ({
                        ...prev,
                        [_id]: !prev[_id],
                      }))
                    }
                  >
                    <label htmlFor="" className=" cursor-pointer">
                      {name}
                    </label>
                    <ChevronDown size={12} />
                  </div>
                  <button
                    className=""
                    onClick={() =>
                      setfilters((prev) =>
                        prev.filter(
                          (id) => !subFilter.some(({ _id }) => _id === id)
                        )
                      )
                    }
                  >
                    Reset
                  </button>
                </div>
                <div
                  className={`flex flex-col gap-2 collapse-div overflow-hidden ${
                    openCategory[_id] ? "h-full mt-3" : "h-0"
                  }`}
                >
                  {subFilter.map(({ name: _name, _id: id }) => (
                    <div
                      className={`flex items-center gap-2 text-[10px] `}
                      key={id}
                    >
                      <Checkbox
                        inputId={id}
                        checked={filters.some((i) => i === id)}
                        className="small-checkbox"
                        onChange={(event) =>
                          setfilters((prev) =>
                            event.checked
                              ? [...prev, id]
                              : prev.filter((i) => i !== id)
                          )
                        }
                      />
                      <label htmlFor={id} className="font-medium text-gray-500">
                        {_name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
