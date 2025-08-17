import { cn } from "@/lib/utils";
import React from "react";
import ReactSelect from "react-select";
const SelectElement = ({
  disabled,
  errorFlag,
  name,
  value,
  onChange,
  options,
  className = "",
  placeholder = "Select...",
}) => {
  const customStyles = {
    singleValue: (provided, state) => ({
      ...provided,
      color: "#7e828e",
      lineHeight: "32px",
    }),
    control: (styles, { isFocused, isHovered }) => ({
      ...styles,
      height: "38px",
      minHeight: "38px",
      flexWrap: "nowrap",
      padding: "0px",
      margin: "0px",
      boxShadow: "none",
      backgroundColor: isFocused ? "white" : disabled ? "#e9ecef" : "white",
      borderColor: isFocused
        ? "var(--user-theme)"
        : errorFlag
        ? "red"
        : "#aeaeae",
      color: "#e7e828e",
    }),
    option: (styles, { isFocused, isDisabled, isSelected }) => ({
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "var(--select-option-color)"
        : isFocused
        ? "var(--select-option-hover-color)"
        : undefined,
      "&:focus,$:active": {
        backgroundColor: isSelected
          ? "var(--select-option-color)"
          : "var(--select-option-hover-color)",
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      "pointer-events": "auto",
      zIndex: 9999,
      fontSize: 14,
    }),
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
  };
  return (
    <ReactSelect
      className={cn("text-sm pointer-events-auto", className)}
      name={name}
      value={value ?? []}
      styles={customStyles}
      options={options}
      onChange={(data) => onChange(data ?? { value: "" })}
      isDisabled={disabled}
      isClearable
      menuPortalTarget={document.body}
      placeholder={<div>{placeholder}</div>}
    />
  );
};

export default SelectElement;
