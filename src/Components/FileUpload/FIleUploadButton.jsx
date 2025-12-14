import { PlusIcon, X } from "lucide-react";
import React, { useRef } from "react";
import "./index.css";
const FileUploadButton = ({ value, onChange, type }) => {
  const ref = useRef(null);
  return (
    <div className="relative cursor-pointer fileUploadDiv">
      <input
        type="file"
        hidden={value}
        ref={ref}
        accept={type ?? ".png,.jpg,.jpeg"}
        name=""
        id=""
        className="absolute z-10 opacity-0 h-full w-full"
        onChange={(e) => onChange(e.target.files[0])}
      />
      <div className="flex gap-2 fileUploadInnerDiv">
        {!value ? (
          <>
            <PlusIcon />
            <span className="">Upload</span>
          </>
        ) : (
          <>
            <span className="">{value?.name}</span>
            <X
              onClick={() => {
                onChange(null);
                ref.current.value = null;
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploadButton;
