import CustomHeader from "@/Components/CustomHeader";
import React from "react";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
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
        {/* <AgGrid headCells={headCells} rows={rows} /> */}
      </div>
    </>
  );
};

export default Layout;
