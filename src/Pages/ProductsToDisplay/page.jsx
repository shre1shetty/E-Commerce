import CustomHeader from "@/Components/CustomHeader";
import React from "react";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const navigate = useNavigate();
  return (
    <>
      <CustomHeader title={"Products To Display"}>
        <div className="pl-2 flex items-center gap-3">
          <button
            className="fa-regular fa-plus"
            onClick={() => navigate("Create")}
          ></button>
        </div>
      </CustomHeader>
    </>
  );
};

export default Page;
