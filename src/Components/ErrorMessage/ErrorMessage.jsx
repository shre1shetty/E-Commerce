import React from "react";

const ErrorMessage = ({ isVisible = false, message }) => {
  return isVisible && <span className="text-xs text-red-500">{message}</span>;
};

export default ErrorMessage;
