import CustomHeader from "@/Components/CustomHeader";
import React, { useEffect, useState } from "react";
import AddModal from "./Dialog/AddModal";
import AgGrid from "@/Components/AgGrid/AgGrid";
import { getStages } from "./service";
import EditModal from "./Dialog/EditModal";

const page = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, seteditOpen] = useState(false);
  const [rows, setrows] = useState([]);
  const [editData, seteditData] = useState({});
  const getRows = () => {
    getStages().then((res) => {
      if (res) {
        setrows(res.data);
      }
    });
  };
  const colDef = [
    {
      field: "Action",
      headerName: "Action",
      cellRenderer: (params) => (
        <>
          <button
            className="fa-regular fa-pen-to-square m-1 text-base"
            onClick={() => {
              seteditData(params.data);
              seteditOpen(true);
            }}
          ></button>

          <button className="fa-regular fa-trash-can m-1 text-base"></button>
        </>
      ),
    },
    {
      field: "stageName",
      headerName: "Stage Name",
    },
    {
      field: "description",
      headerName: "Description",
    },
    {
      field: "rejectStage",
      headerName: "Reject Stage",
      cellRenderer: (params) => (
        <span>{params.data.rejectStage ? "Yes" : "No"}</span>
      ),
    },
  ];

  useEffect(() => {
    getRows();
  }, []);

  return (
    <>
      <CustomHeader title={"Stages"}>
        <AddModal open={open} setOpen={setOpen} refreshGrid={getRows} />
      </CustomHeader>
      <AgGrid rows={rows} headCells={colDef} />
      <EditModal
        open={editOpen}
        setOpen={seteditOpen}
        refreshGrid={getRows}
        data={editData}
      />
    </>
  );
};

export default page;
