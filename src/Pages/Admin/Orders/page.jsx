import AgGrid from "@/Components/AgGrid/AgGrid";
import CustomHeader from "@/Components/CustomHeader";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { getOrders } from "./service";

const page = () => {
  const [rows, setrows] = useState([]);
  const columnDefs = [
    {
      field: "Action",
      headerName: "Action",
      cellRenderer: (params) => (
        <>
          <button className="fa-regular fa-pen-to-square m-1 text-base"></button>
          <button className="fa-regular fa-trash-can m-1 text-base"></button>
        </>
      ),
    },
    {
      field: "Orders",
      headerName: "Orders",
      cellRenderer: ({ data }) => (
        <div className="py-1.5">
          <div className="leading-snug">
            {data.products.map((val) => val.name).toString()}
          </div>
          <div className="text-[10px] text-slate-500 leading-snug">
            # {data.orderId}
          </div>
        </div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Date",
      cellRenderer: ({ data }) => (
        <span className="">
          {dayjs(data.createdAt).format("DD-MM-YYYY HH:mm")}
        </span>
      ),
    },
    {
      field: "userId",
      headerName: "Customer",
      cellRenderer: ({ data }) => (
        <span className="">{data.userId.username}</span>
      ),
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      cellRenderer: ({ data }) => (
        <span className="success-chip">{data.paymentMethod}</span>
      ),
    },
    {
      field: "status",
      headerName: "Order Status",
      cellRenderer: ({ data }) => (
        <span
          className={
            data.status.firstStage
              ? "error-chip"
              : data.status.finalStage
              ? "success-chip"
              : "regular-chip"
          }
        >
          {data.status.stageName}
        </span>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      cellRenderer: ({ data }) => <span className="">₹ {data.amount}</span>,
    },
  ];

  useEffect(() => {
    getOrders().then((resp) => setrows(resp));
  }, []);

  return (
    <>
      <CustomHeader title={"Orders"}></CustomHeader>
      <AgGrid rows={rows} headCells={columnDefs} />
    </>
  );
};

export default page;
