import AgGrid from "@/Components/AgGrid/AgGrid";
import GlobalToast from "@/Components/GlobalToast";
import React, { useEffect, useState } from "react";
import { DeleteVariantField, getVariantField } from "./service";
import { useNavigate, useParams } from "react-router-dom";
import CustomHeader from "@/Components/CustomHeader";
import AddModal from "./Dialog/AddModal";
import EditModal from "./Dialog/EditModal";

const Page = () => {
  const { id } = useParams();
  const [rows, setrows] = useState([]);
  const navigate = useNavigate();
  const variantField = (itemId) => {
    DeleteVariantField({ itemId: itemId, id: id }).then((resp) => {
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
          <EditModal
            data={{ ...params.data, id: id }}
            refreshGrid={refreshGrid}
          >
            <div className="flex justify-center items-center text-base  pt-2">
              <button className="fa-regular fa-pen-to-square"></button>
            </div>
          </EditModal>
          <button
            className="fa-regular fa-trash-can ml-1 text-base"
            onClick={() => variantField(params.data._id)}
          ></button>
        </>
      ),
    },
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "flag",
      headerName: "Flag",
    },
  ];
  const refreshGrid = () => {
    getVariantField(id).then((resp) => setrows(resp));
  };
  useEffect(() => {
    getVariantField(id).then((resp) => setrows(resp));
  }, []);

  return (
    <>
      <CustomHeader title={"Variant Fields"}>
        <div className="pl-2 flex items-center gap-3">
          <button
            className="fa-regular fa-circle-left"
            onClick={() => navigate(-1)}
          ></button>
          <AddModal refreshGrid={refreshGrid} id={id} />
        </div>
      </CustomHeader>
      <div className="mt-4">
        <AgGrid headCells={headCells} rows={rows} />
      </div>
    </>
  );
};

export default Page;
