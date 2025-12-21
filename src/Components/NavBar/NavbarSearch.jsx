import { ArrowLeft, ArrowRight, ArrowUpRight, Search } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { getProducts } from "./service";
import { debounce, sortBy, uniqWith } from "lodash";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import HomeProductCard from "../ProductCard/HomeProductCard";
import "./index.css";
import Fuse from "fuse.js";
import { isMatch } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
const NavbarSearch = () => {
  const [open, setopen] = useState(false);
  const [Products, setProducts] = useState([]);
  const [searchOptions, setsearchOptions] = useState({});
  const navigate = useNavigate();
  const ref = useRef(null);
  const navigateToSearch = (event) => {
    setopen(false);
    navigate("Search?" + event);
  };
  const optionsList = (items) => {
    // console.log(items);
    return (
      <ul className="">
        {items.brand.length > 0 &&
          items.brand.map((item) => {
            return (
              <li
                className="suggestion-item"
                onClick={() => navigateToSearch("brand=" + item)}
              >
                <div className="brand-value">{item}</div>
                <div className="brand-label">In Brands</div>
                <ArrowUpRight
                  size={12}
                  className="absolute right-0 top-[18%] text-gray-600"
                />
              </li>
            );
          })}
        {items.fabric.length > 0 &&
          items.fabric.map((item) => {
            return (
              <li
                className="suggestion-item"
                onClick={() => navigateToSearch("fabric=" + item)}
              >
                <div className="fabric-value">{item}</div>
                <div className="fabric-label">In Fabric</div>
                <ArrowUpRight
                  size={12}
                  className="absolute right-0 top-[18%] text-gray-600"
                />
              </li>
            );
          })}
        {items.fitType.length > 0 &&
          items.fitType.map((item) => {
            return (
              <li
                className="suggestion-item"
                onClick={() => navigateToSearch("fitType=" + item)}
              >
                <div className="fitType-value">{item}</div>
                <div className="fitType-label">In Fit Type</div>
                <ArrowUpRight
                  size={12}
                  className="absolute right-0 top-[18%] text-gray-600"
                />
              </li>
            );
          })}
        {items.category.length > 0 &&
          items.category.map((item) => {
            return (
              <li
                className="suggestion-item"
                onClick={() => navigateToSearch("category=" + item)}
              >
                <div className="category-value">{item}</div>
                <div className="category-label">In Categories</div>
                <ArrowUpRight
                  size={12}
                  className="absolute right-0 top-[18%] text-gray-600"
                />
              </li>
            );
          })}
        {items.variantFields.length > 0 &&
          items.variantFields.map((item) => {
            return (
              <li
                className="suggestion-item"
                onClick={() => navigateToSearch("variantFields=" + item.value)}
              >
                <div className="variant-field-value">{item.value}</div>
                <div className="variant-field-label">In {item.label}</div>
                <ArrowUpRight
                  size={12}
                  className="absolute right-0 top-[18%] text-gray-600"
                />
              </li>
            );
          })}
        {items.name.length > 0 &&
          items.name.map((item) => {
            return (
              <li className="suggestion-item">
                <div className="product-label">{item}</div>
                <ArrowUpRight
                  size={12}
                  className="absolute right-0 top-[18%] text-gray-600"
                />
              </li>
            );
          })}
      </ul>
    );
  };
  const debounceRequest = useCallback(
    debounce((event) => {
      getProducts(event).then((res) => {
        if (res) {
          setProducts(res);
          const fuse = new Fuse(res, {
            keys: [
              "name",
              "brand",
              "fabric",
              "fitType",
              "category.label",
              "variantFields.value",
            ],
            threshold: 0.4,
            includeScore: true,
          });
          const fizzedSearched = sortBy(
            fuse.search(event),
            (val) => val.score
          ).map((val) => val.item);
          setsearchOptions(
            fizzedSearched.reduce(
              (acc, curr) => {
                if (isMatch(curr.name, event)) {
                  acc = { ...acc, name: [...acc.name, curr.name] };
                }
                if (isMatch(curr.brand, event)) {
                  acc = {
                    ...acc,
                    brand: [...new Set([...acc.brand, curr.brand])],
                  };
                }
                if (isMatch(curr.fabric, event)) {
                  acc = {
                    ...acc,
                    fabric: [...new Set([...acc.fabric, curr.fabric])],
                  };
                }
                if (isMatch(curr.fitType, event)) {
                  acc = {
                    ...acc,
                    fitType: [...new Set([...acc.fitType, curr.fitType])],
                  };
                }
                if (curr.category.some(({ label }) => isMatch(label, event))) {
                  acc = {
                    ...acc,
                    category: [
                      ...new Set([
                        ...acc.category,
                        curr.category.find(({ label }) => isMatch(label, event))
                          ?.label,
                      ]),
                    ],
                  };
                }
                if (
                  curr.variantFields.some(({ value }) =>
                    value.some((val) => isMatch(val, event))
                  )
                ) {
                  acc = {
                    ...acc,
                    variantFields: uniqWith(
                      [
                        ...acc.variantFields,
                        curr.variantFields.reduce(
                          (acc1, { field: label, value }) => {
                            if (value.some((val) => isMatch(val, event))) {
                              return (acc1 = {
                                label,
                                value: value.find((val) => isMatch(val, event)),
                              });
                            }
                          },
                          { label: "", value: "" }
                        ),
                      ],
                      (a, b) => a.label === b.label && a.value === b.value
                    ),
                  };
                }
                return acc;
              },

              {
                name: [],
                brand: [],
                fabric: [],
                fitType: [],
                category: [],
                variantFields: [],
              }
            )
          );
        } else {
          setProducts([]);
        }
      });
    }, 1000),
    []
  );

  return (
    <Dialog open={open} onOpenChange={setopen} className="">
      <DialogTrigger className="w-full">
        <div className="flex gap-2 items-center text-xs pl-2 w-full py-2 rounded-full bg-white">
          <Search size={16} className="text-gray-500" />
          Search
        </div>
      </DialogTrigger>
      <DialogContent className="[&>button]:hidden max-w-fit p-0">
        <div className="w-[80vw]">
          <fieldset className="relative flex p-4 rounded-md text-xs gap-2">
            <Search size={18} />
            <input
              type="text"
              className="border-none outline-none font-bold"
              placeholder="Search"
              onChange={(event) => {
                debounceRequest(event.target.value);
              }}
            />
          </fieldset>
          <div
            className={`w-[calc(100% - 8px)] m-2 mt-0 pt-2 border-t-2 ${
              Products.length > 0 ? "" : "hidden"
            }`}
          >
            <div className="flex flex-col md:flex-row gap-2">
              <div className="min-w-[250px]">
                <span className="text-xs font-medium text-slate-600">
                  Suggestions
                </span>
                {Object.values(searchOptions).length > 0 &&
                  optionsList(searchOptions)}
              </div>
              <div
                ref={ref}
                className="grow relative flex gap-1 overflow-auto hideScrollbar"
              >
                <div
                  className="fixed left-[calc(250px + 6px)] top-[65%] md:top-[50%] z-50 p-2 bg-white rounded-full shadow-md flex items-center justify-center scroll"
                  onClick={() => {
                    ref.current.scrollLeft -= 50;
                  }}
                >
                  <ArrowLeft size={18} />
                </div>
                {Products?.map(
                  ({
                    _id,
                    name,
                    variantFields,
                    variantValues,
                    price,
                    pictures,
                    description,
                    avgRating,
                  }) => (
                    <div className="min-w-[250px]">
                      <HomeProductCard
                        id={_id}
                        label={name}
                        description={description}
                        filters={variantFields}
                        price={price}
                        discountPrice={price}
                        variantValues={variantValues}
                        image={`http://localhost:5000/file?id=${pictures[0]}`}
                        onClick={() => {
                          setopen(false);
                          navigate(`/Product/${_id}`);
                        }}
                        avgRating={avgRating}
                      />
                    </div>
                  )
                )}
                <div
                  className="fixed right-3 top-[65%] md:top-[50%] z-50 p-2 bg-white rounded-full shadow-md flex items-center justify-center scroll"
                  onClick={() => {
                    ref.current.scrollLeft += 50;
                  }}
                >
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavbarSearch;
