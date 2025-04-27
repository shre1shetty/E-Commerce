import CustomHeader from "@/Components/CustomHeader";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLayouts } from "./service";
import AgGrid from "@/Components/AgGrid/AgGrid";

const Layout = () => {
  const [rows, setrows] = useState([]);
  const navigate = useNavigate();
  const headCells = [
    {
      field: "id",
      headerName: "Action",
      cellRenderer: (params) => (
        <div className="flex text-base gap-2 pt-2">
          <button
            className="fa-regular fa-pen-to-square"
            onClick={() => navigate(`Edit/${params.data._id}`)}
          ></button>
          <button
            className="fa-regular fa-trash-can"
            onClick={() => console.log("delete")}
          ></button>
        </div>
      ),
    },
    {
      field: "layoutName",
      headerName: "Layout Name",
    },
    {
      field: "isActive",
      headerName: "Is Active",
    },
  ];
  useEffect(() => {
    getLayouts().then((res) => setrows(res));
  }, []);

  return (
    <>
      <CustomHeader title={"Layout"}>
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

export default Layout;
