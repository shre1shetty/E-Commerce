import CustomHeader from "@/Components/CustomHeader";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLayouts, toggleLayoutActiveStatus } from "./service";
import AgGrid from "@/Components/AgGrid/AgGrid";
import { Checkbox } from "primereact/checkbox";

const Layout = () => {
  const [rows, setrows] = useState([]);
  const navigate = useNavigate();
  const toggleActive = ({ layoutId, isActive }) => {
    toggleLayoutActiveStatus({ layoutId, isActive }).then((res) => {
      getLayouts().then((res) => setrows(res));
    });
  };
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
      cellRenderer: (params) => (
        <div className="h-full-w-full flex justify-center items-center">
          <Checkbox
            checked={params.data.isActive}
            onChange={(event) => {
              toggleActive({
                layoutId: params.data._id,
                isActive: event.checked,
              });
            }}
            className="!h-full !w-6"
            size={10}
          ></Checkbox>
        </div>
      ),
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
