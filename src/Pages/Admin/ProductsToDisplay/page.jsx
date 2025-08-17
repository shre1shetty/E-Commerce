import AgGrid from "@/Components/AgGrid/AgGrid";
import CustomHeader from "@/Components/CustomHeader";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "./service";
import IconButton from "@/Components/Button/IconButton";
import { CirclePlus, PackagePlus } from "lucide-react";

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
      cellRenderer: ({ data }) => (
        <span className="">
          {data.description.length > 30
            ? data.description.slice(0, 30) + "..."
            : data.description}
        </span>
      ),
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
        <div className="pl-2 flex items-center gap-2">
          <IconButton onClick={() => navigate(`CreateNew`)}>
            <CirclePlus size={16} />
          </IconButton>
          <IconButton onClick={() => navigate(`Create`)}>
            <PackagePlus size={16} />
          </IconButton>
        </div>
      </CustomHeader>
      <div className="mt-4">
        <AgGrid headCells={headCells} rows={rows} />
      </div>
    </>
  );
};

export default Page;
