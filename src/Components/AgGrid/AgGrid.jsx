import React, { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./AgGrid.scss";
const AgGrid = ({
  headCells,
  rows,
  className = "",
  disablePagination = true,
  setSelectedId,
  setPageData,
  columnId,
}) => {
  const gridapiRef = useRef(null);
  const defaultCol = {
    flex: 1,
    minWidth: 100,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    filter: true,
    wrapText: true,
    autoHeight: true,
    icons: {
      filter:
        '<i class="fa-solid fa-ellipsis-vertical p-1" style="color:#fff !important"/>',
    },
    filterParams: {
      buttons: ["reset"],
      closeOnApply: true,
    },
  };

  const returnId = (event) => {
    if (setSelectedId) {
      if (setPageData) {
        setPageData((prev) => ({
          ...prev,
          pageSize: gridapiRef.current.paginationGetPageSize(),
          pageNumber: gridapiRef.current.paginationGetCurrentPage(),
        }));
      }
      if (columnId) {
        const id = columnId;
        event.node.isSelected()
          ? setSelectedId((prev) => [...prev, event.data[id]])
          : setSelectedId((prev) =>
              prev.filter((val) => val !== event.data[id])
            );
      } else {
        event.node.isSelected()
          ? setSelectedId((prev) => [...prev, event.data])
          : setSelectedId((prev) => prev.filter((val) => val !== event.data));
      }
    }
  };

  return (
    <div className="ag-theme-quartz h-fit w-full">
      <AgGridReact
        columnDefs={headCells}
        rowData={rows}
        className={className}
        domLayout="autoHeight"
        suppressDragLeaveHidesColumns={true}
        pagination={disablePagination}
        paginationPageSizeSelector={[5, 10, 20, 100]}
        paginationPageSize={10}
        rowSelection={"multiple"}
        suppressCellFocus={true}
        suppressAnimationFrame={true}
        suppressRowTransform={true}
        defaultColDef={defaultCol}
        enableCellTextSelection={true}
        // onGridReady={onReady}
        onRowSelected={(event) => returnId(event)}
        // onRowDataUpdated={handleChange}
        // onCellMouseDown={handleChange}
        // onPaginationChanged={(event) => returnPageCount(event)}
      />
    </div>
  );
};

export default AgGrid;
