import React from "react";

const CustomHeader = ({ title, children }) => {
  return (
    <div className="header">
      <div className="">{title}</div>
      <div className="">{children}</div>
    </div>
  );
};

export default CustomHeader;
