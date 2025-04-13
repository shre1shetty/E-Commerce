import AgGrid from "@/Components/AgGrid/AgGrid";
import CustomHeader from "@/Components/CustomHeader";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "./service";

const Page = () => {
  const navigate = useNavigate();
  const [rows, setrows] = useState([]);
  const headCells = [
    {
      field: "id",
      headerName: "Edit",
      cellRenderer: (params) => (
        <>
          <button
            className="fa-regular fa-pen-to-square text-base"
            onClick={() => navigate(`Edit?id=${params.data._id}`)}
          ></button>
          <button className="fa-regular fa-trash-can ml-1 text-base"></button>
        </>
      ),
    },
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "price",
      headerName: "Price",
    },
    {
      field: "description",
      headerName: "Description",
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
    },
    {
      field: "fabric",
      headerName: "fabric",
    },
    {
      field: "brand",
      headerName: "Brand",
    },
    {
      field: "fitType",
      headerName: "Fit Type",
    },
    {
      field: "variantFields",
      headerName: "Variants",
    },
  ];
  useEffect(() => {
    getProducts().then((resp) => setrows(resp));
  }, []);

  return (
    <>
      <CustomHeader title={"Products To Display"}>
        <div className="pl-2 flex items-center gap-3">
          <button
            className="fa-regular fa-plus"
            onClick={() => navigate("Create")}
          ></button>
        </div>
      </CustomHeader>
      <div className="mt-4">
        <AgGrid headCells={headCells} rows={rows} />
      </div>
    </>
  );
};

export default Page;
