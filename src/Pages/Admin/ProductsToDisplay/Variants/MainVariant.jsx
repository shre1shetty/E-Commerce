import GlobalToast from "@/Components/GlobalToast";
import { Button } from "@/Components/ui/button";
import React, { useEffect, useState } from "react";

const MainVariant = ({ value, field, baseValues, copyToAll }) => {
  const handleCopy = () => {
    copyToAll(
      baseValues.variantValues?.filter((val) =>
        val.name.includes(`${field}${value}`)
      )
    );
    GlobalToast({
      message: "Saved Successfully",
      messageType: "success",
      messageTimer: 2000,
    });
  };

  return (
    <div
      className="w-full flex justify-between items-center pr-2"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="font-extrabold text-base">
        {field} : {value}
      </div>

      <Button onClick={handleCopy}>CopyToAll</Button>
    </div>
  );
};

export default MainVariant;
