import React from "react";
import "./index.css";
const IconButton = ({ children, onClick }) => {
  return (
    <button className="iconButton" onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
