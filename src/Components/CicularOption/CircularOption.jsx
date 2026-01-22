import React from "react";

const CircularOption = ({ onClick, image, children }) => {
  return (
    <div
      className="bg-[#fffaef] border-2 border-b-0 shadow-[0px_0px_8px_2px_lightgray] border-[var(--user-theme)] border-e w-[60px] md:w-[120px] lg:w-[140px] h-[60px] md:h-[120px] lg:h-[140px] rounded-full relative bg-cover bg-center cursor-pointer p-1 hover:scale-[1.1]"
      onClick={onClick}
    >
      <img
        src={image}
        alt={children}
        className="w-full h-full block rounded-full"
      />
      <div className="px-2 py-1 rounded-lg absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-gray-600 font-bold text-sm bg-white bg-opacity-50 border border-[#d2d2d2] text-center">
        {children}
      </div>
    </div>
  );
};

export default CircularOption;
