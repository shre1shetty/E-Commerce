import React from "react";
import "./index.css";
const DividerWithText = ({ children }) => {
  return (
    <div className="flex justify-center items-center gap-2 px-1 md:px-20 text-base font-bold shiny-text">
      <span className="grow h-[2px] divider-bg"></span>

      {children}
      <span className="grow h-[2px] divider-bg"></span>
    </div>
  );
};

export default DividerWithText;
