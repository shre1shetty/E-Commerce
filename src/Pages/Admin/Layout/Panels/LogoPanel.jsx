import { PlusCircleIcon } from "lucide-react";
import React, { useState } from "react";

const LogoPanel = ({ Image, setImage, children }) => {
  // const [Image, setImage] = useState(null);
  return (
    <>
      <div className="flex flex-col gap-2 text-sm font-semibold mb-2">
        <label htmlFor="iconFile" className="">
          Select Icon
        </label>
        <div className="w-fit text-center relative  bg-white">
          <input
            type="file"
            name="iconFile"
            id=""
            className="absolute z-1 opacity-0 w-full h-full left-0"
            max={1}
            onChange={(event) => setImage(event.target.files[0])}
          />
          {Image ? (
            <>
              <img
                src={URL.createObjectURL(Image)}
                alt=""
                className="w-[96px] h-[96px] m-3"
              />
              <text className="mt-2">{Image.name}</text>
            </>
          ) : (
            <div className="p-9">
              <PlusCircleIcon />
            </div>
          )}
        </div>
      </div>
      {children}
    </>
  );
};

export default LogoPanel;
