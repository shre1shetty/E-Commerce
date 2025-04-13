import { Search } from "lucide-react";
import React from "react";

const NavbarSearch = () => {
  return (
    <fieldset className="relative flex border border-gray-400  px-3 py-2 rounded-md h-full  text-xs gap-2 mr-2">
      <Search size={18} />
      <input
        type="text"
        className="border-none outline-none"
        placeholder="Search"
      />
    </fieldset>
  );
};

export default NavbarSearch;
