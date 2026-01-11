import React, { useEffect, useMemo, useState } from "react";
import "./Inventory.css";
import { Input } from "@/Components/ui/input";
import { cn, convertForSelect, matches } from "@/lib/utils";
import AgGrid from "@/Components/AgGrid/AgGrid";
import AddModal from "./Dialog/AddModal";
import { DeleteProduct, getInventory } from "./service";
import EditModal from "./Dialog/EditModal";
import { groupBy, map, uniq } from "lodash";
import CustomHeader from "@/Components/CustomHeader";
import { getFilterType } from "../FilterType/service";
import GlobalToast from "@/Components/GlobalToast";

const Page = () => {
  const [filterList, setfilterList] = useState(["ALL"]);
  const [filteredRows, setfilteredRows] = useState([]);
  const [rows, setrows] = useState([]);
  const [selectedFilter, setselectedFilter] = useState("ALL");
  const [filterOptions, setfilterOptions] = useState([]);
  const filterHandler = (filter) => {
    setselectedFilter(filter);
    if (filter === "ALL") {
      setfilteredRows(rows);
    } else {
      setfilteredRows((prev) =>
        rows.filter((data) =>
          data.category.some(
            (val) => val.label.toLowerCase() === filter.toLowerCase()
          )
        )
      );
    }
  };
  const deleteProduct = (id) => {
    DeleteProduct(id).then((resp) => {
      GlobalToast({
        message: resp.statusMsg,
        messageTimer: 2500,
        messageType: resp.statusCode === 200 ? "success" : "error",
      });
      refreshGrid();
    });
  };
  const headCells = useMemo(
    () => [
      {
        field: "id",
        headerName: "Edit",
        cellRenderer: (params) => (
          <>
            <EditModal
              filterTypeOptions={filterOptions}
              data={params.data}
              refreshGrid={refreshGrid}
            >
              <div className="flex justify-center items-center text-base  pt-2">
                <button className="fa-regular fa-pen-to-square"></button>
              </div>
            </EditModal>
            <button
              className="fa-regular fa-trash-can ml-1 text-base"
              onClick={() => deleteProduct(params.data._id)}
            ></button>
          </>
        ),
      },
      {
        field: "name",
        headerName: "Name",
        flex: 2,
      },
      {
        field: "price",
        headerName: "Price",
      },
      {
        field: "description",
        headerName: "Description",
        flex: 2,
      },
      {
        field: "inStock",
        headerName: "In Stock",
      },
      {
        field: "sold",
        headerName: "Sold",
      },
      {
        field: "category",
        headerName: "Category",
        cellRenderer: (params) => (
          <div className="">
            {params.data.category.map((data) => data.label).toString()}
          </div>
        ),
      },

      {
        field: "fabric",
        headerName: "Fabric",
      },
      {
        field: "brand",
        headerName: "Brand",
      },
      {
        field: "fitType",
        headerName: "Fit Type",
      },
    ],
    [filterOptions]
  );
  useEffect(() => {
    getInventory().then((resp) => setrows(resp));
    getFilterType().then((resp) => {
      setfilterOptions(
        convertForSelect({ data: resp, label: "name", value: "_id" })
      );
      setfilterList(["ALL", ...resp.map((data) => data.name)]);
    });
  }, []);
  useEffect(() => {
    setfilteredRows(rows);
  }, [rows]);

  const refreshGrid = () => {
    getInventory().then((resp) => setrows(resp));
  };

  const handleSearch = (searchTerms) => {
    if (searchTerms === "") {
      setfilteredRows(
        rows.filter((data) =>
          selectedFilter === "ALL"
            ? true
            : data.category.some(
                (val) =>
                  val.label.toLowerCase() === selectedFilter.toLowerCase()
              )
        )
      );
    } else {
      setfilteredRows((prev) => {
        const data1 = rows.filter(
          (data) =>
            matches(data, searchTerms) &&
            (selectedFilter === "ALL"
              ? true
              : data.category.some(
                  (val) =>
                    val.label.toLowerCase() === selectedFilter.toLowerCase()
                ))
        );
        return data1;
      });
    }
  };

  return (
    <>
      <CustomHeader title={"Inventory"}>
        <div className="">
          <div className="flex gap-2 divide-x-2">
            <div className="relative">
              <i className="fa-solid fa-search text-sm absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
              <Input
                className="pl-8 text-gray-500"
                onChange={(event) => handleSearch(event.target.value)}
              />
            </div>

            <div className="pl-2 flex items-center">
              <AddModal
                refreshGrid={refreshGrid}
                filterTypeOptions={filterOptions}
              />
            </div>
          </div>
        </div>
      </CustomHeader>

      <div className="">
        <div className="filter-list">
          {filterList.map((category, index) => (
            <button
              key={index}
              className={cn(
                "filter-option",
                selectedFilter === category ? "active-option" : ""
              )}
              onClick={() => filterHandler(category, rows)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <AgGrid rows={filteredRows} headCells={headCells} />
        </div>
      </div>
    </>
  );
};

export default Page;
