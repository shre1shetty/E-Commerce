import AgGrid from "@/Components/AgGrid/AgGrid";
import CustomHeader from "@/Components/CustomHeader";
import React, { useEffect, useState } from "react";
import AddModal from "./Dialog/AddModal";
import { deleteWorkFlowStage, getWorkFlowStages } from "./service";
import EditModal from "./Dialog/EditModal";
import GlobalToast from "@/Components/GlobalToast";

const page = () => {
  const [rows, setrows] = useState([]);
  const [open, setopen] = useState(false);
  const [editOpen, seteditOpen] = useState(false);
  const [editData, seteditData] = useState({});

  const getRows = () => {
    getWorkFlowStages().then((res) => {
      setrows(res.data);
    });
  };

  const deleteRow = (data) => {
    deleteWorkFlowStage(data).then((res) => {
      GlobalToast({
        message: res.statusMsg,
        messageTimer: 2500,
        messageType: res.statusCode === 200 ? "success" : "error",
      });
      getRows();
    });
  };

  const colDef = [
    {
      field: "Action",
      headerName: "Action",
      cellRenderer: ({ data }) => (
        <>
          <button
            className="fa-regular fa-pen-to-square m-1 text-base"
            onClick={() => {
              seteditData({
                ...data,
                stageFrom: data.stageFrom?._id,
                stageTo: data.stageTo?._id,
              });
              seteditOpen(true);
            }}
          ></button>

          <button
            className="fa-regular fa-trash-can m-1 text-base"
            onClick={() => deleteRow(data)}
          ></button>
        </>
      ),
    },
    {
      field: "stageName",
      headerName: "Stage Name",
    },
    {
      field: "stageFrom",
      headerName: "Stage From",
      cellRenderer: (params) => <span>{params.data.stageFrom?.stageName}</span>,
    },
    {
      field: "stageTo",
      headerName: "Stage To",
      cellRenderer: (params) => <span>{params.data.stageTo.stageName}</span>,
    },
    {
      field: "firstStage",
      headerName: "First Stage",
      cellRenderer: (params) => (
        <span>{params.data.firstStage ? "Yes" : "No"}</span>
      ),
    },

    {
      field: "finalStage",
      headerName: "Final Stage",
      cellRenderer: (params) => (
        <span>{params.data.finalStage ? "Yes" : "No"}</span>
      ),
    },
  ];

  useEffect(() => {
    getRows();
  }, []);

  return (
    <>
      <CustomHeader title={"Workflow Definition"}>
        <button
          className="fa-solid fa-plus"
          onClick={() => setopen(true)}
        ></button>
      </CustomHeader>
      <AgGrid rows={rows} headCells={colDef} />
      <AddModal open={open} setOpen={setopen} refreshGrid={getRows} />
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
