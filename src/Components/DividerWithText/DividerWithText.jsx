import React from "react";
import "./index.css";
const DividerWithText = ({ textColor, children }) => {
  return (
    <div className="flex justify-center items-center gap-2 px-20 text-base font-bold shiny-text">
      <span
        className="grow h-[2px]"
        style={{ backgroundColor: textColor }}
      ></span>

      {children}
      <span
        className="grow h-[2px]"
        style={{ backgroundColor: textColor }}
      ></span>
    </div>
  );
};

export default DividerWithText;
