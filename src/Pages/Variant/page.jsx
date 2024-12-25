import AgGrid from "@/Components/AgGrid/AgGrid";
import CustomHeader from "@/Components/CustomHeader";
import React, { useEffect, useState } from "react";
import { DeleteVariant, getVariant } from "./service";
import EditModal from "./Dialog/EditModal";
import GlobalToast from "@/Components/GlobalToast";
import AddModal from "./Dialog/AddModal";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const [rows, setrows] = useState([]);
  const navigate = useNavigate();
  const deleteVariant = (id) => {
    DeleteVariant(id).then((resp) => {
      GlobalToast({
        message: resp.statusMsg,
        messageTimer: 2500,
        messageType: resp.statusCode === 200 ? "success" : "error",
      });
      refreshGrid();
    });
  };
  const headCells = [
    {
      field: "id",
      headerName: "Edit",
      cellRenderer: (params) => (
        <>
          <EditModal data={params.data} refreshGrid={refreshGrid}>
            <div className="flex justify-center items-center text-base  pt-2">
              <button className="fa-regular fa-pen-to-square"></button>
            </div>
          </EditModal>
          <button
            className="fa-regular fa-trash-can m-1 text-base"
            onClick={() => deleteVariant(params.data._id)}
          ></button>
          <button
            className="fa-solid fa-circle-plus text-base"
            onClick={() => navigate(`${params.data._id}`)}
          ></button>
        </>
      ),
    },
    {
      field: "name",
      headerName: "Name",
    },

    {
      field: "variantCount",
      headerName: "Variant Count",
    },
  ];
  const refreshGrid = () => {
    getVariant().then((resp) => setrows(resp));
  };
  useEffect(() => {
    getVariant().then((resp) => setrows(resp));
  }, []);

  return (
    <>
      <CustomHeader title={"Variants"}>
        <div className="pl-2 flex items-center">
          <AddModal refreshGrid={refreshGrid} />
        </div>
      </CustomHeader>
      <div className="mt-4">
        <AgGrid headCells={headCells} rows={rows} />
      </div>
    </>
  );
};

export default Page;
