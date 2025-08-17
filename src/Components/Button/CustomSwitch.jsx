import { cn } from "@/lib/utils";
import { InputSwitch } from "primereact/inputswitch";
import React from "react";

const CustomSwitch = ({ checked, onChange, label, className }) => {
  return (
    <div
      className={cn("flex items-center gap-2 text-sm font-medium ", className)}
    >
      <InputSwitch checked={checked} onChange={onChange} />
      <span className="">{label}</span>
    </div>
  );
};

export default CustomSwitch;
